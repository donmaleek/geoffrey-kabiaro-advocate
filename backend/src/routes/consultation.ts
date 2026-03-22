import express from 'express';
import { body, validationResult } from 'express-validator';
import Consultation from '../models/Consultation';
import MpesaService from '../services/mpesa';
import { authenticateToken } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = express.Router();
const mpesa = new MpesaService({
  consumerKey: process.env.MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
  shortcode: process.env.MPESA_SHORTCODE!,
  passkey: process.env.MPESA_PASSKEY!,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
});

// Book consultation with M-Pesa payment
router.post('/book', 
  authenticateToken,
  body('type').isIn(['initial', 'followup', 'emergency']),
  body('date').isISO8601(),
  body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('topic').notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { type, date, time, topic, preferredMethod } = req.body;
      const fee = type === 'emergency' ? 10000 : type === 'followup' ? 3000 : 5000;

      // Create consultation record
      const consultation = new Consultation({
        clientId: req.user.id,
        type,
        scheduledDate: new Date(`${date}T${time}:00`),
        topic,
        preferredMethod,
        fee,
        status: 'pending_payment'
      });

      await consultation.save();

      // Initiate M-Pesa payment
      const mpesaResponse = await mpesa.stkPush(
        req.user.phone,
        fee,
        `CONS-${consultation._id}`
      );

      consultation.mpesaCheckoutId = mpesaResponse.CheckoutRequestID;
      await consultation.save();

      res.json({
        success: true,
        consultationId: consultation._id,
        checkoutId: mpesaResponse.CheckoutRequestID,
        message: 'Payment initiated. Please complete M-Pesa transaction.'
      });
    } catch (error) {
      logger.error('Consultation booking failed:', error);
      res.status(500).json({ error: 'Failed to book consultation' });
    }
});

// Check consultation status
router.get('/:id/status', authenticateToken, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id)
      .populate('clientId', 'name email phone');
    
    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    if (consultation.clientId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(consultation);
  } catch (error) {
    logger.error('Failed to fetch consultation:', error);
    res.status(500).json({ error: 'Failed to fetch consultation' });
  }
});

// M-Pesa callback endpoint
router.post('/mpesa-callback', async (req, res) => {
  try {
    const { Body: { stkCallback } } = req.body;
    
    const consultation = await Consultation.findOne({
      mpesaCheckoutId: stkCallback.CheckoutRequestID
    });

    if (!consultation) {
      return res.status(404).json({ error: 'Consultation not found' });
    }

    if (stkCallback.ResultCode === 0) {
      // Payment successful
      consultation.status = 'confirmed';
      consultation.paymentStatus = 'completed';
      consultation.paymentDetails = {
        transactionId: stkCallback.CallbackMetadata.Item.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value,
        amount: stkCallback.CallbackMetadata.Item.find((i: any) => i.Name === 'Amount')?.Value,
        time: new Date()
      };
      
      await consultation.save();

      // Send confirmation email/SMS
      await sendConsultationConfirmation(consultation);
    } else {
      // Payment failed
      consultation.status = 'cancelled';
      consultation.paymentStatus = 'failed';
      consultation.paymentError = stkCallback.ResultDesc;
      await consultation.save();
    }

    res.json({ success: true });
  } catch (error) {
    logger.error('M-Pesa callback failed:', error);
    res.status(500).json({ error: 'Callback processing failed' });
  }
});

export default router;