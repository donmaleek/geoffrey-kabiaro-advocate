'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ProgressBar } from './ui/ProgressBar';
import toast from 'react-hot-toast';
import axios from 'axios';

const healthCheckSchema = z.object({
  hasWill: z.boolean(),
  hasBusinessRegistration: z.boolean(),
  hasEmploymentContract: z.boolean(),
  hasLandDocuments: z.boolean(),
  hasTaxCompliance: z.boolean(),
  hasIntellectualProperty: z.boolean(),
});

type HealthCheckData = z.infer<typeof healthCheckSchema>;

export function LegalHealthChecker() {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<any>(null);
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<HealthCheckData>({
    resolver: zodResolver(healthCheckSchema),
    defaultValues: {
      hasWill: false,
      hasBusinessRegistration: false,
      hasEmploymentContract: false,
      hasLandDocuments: false,
      hasTaxCompliance: false,
      hasIntellectualProperty: false,
    }
  });

  const questions = [
    {
      key: 'hasWill',
      question: 'Do you have a valid, updated will?',
      description: 'A will ensures your assets are distributed according to your wishes.',
      icon: '📝'
    },
    {
      key: 'hasBusinessRegistration',
      question: 'Is your business properly registered?',
      description: 'Proper registration protects you from personal liability.',
      icon: '🏢'
    },
    {
      key: 'hasEmploymentContract',
      question: 'Do you have signed employment contracts for all employees?',
      description: 'Employment contracts protect both employer and employee rights.',
      icon: '📄'
    },
    {
      key: 'hasLandDocuments',
      question: 'Are your land documents verified and up to date?',
      description: 'Land fraud is common. Verified documents protect your property.',
      icon: '🏠'
    },
    {
      key: 'hasTaxCompliance',
      question: 'Are you fully tax compliant with KRA?',
      description: 'Tax compliance avoids penalties and legal issues.',
      icon: '💰'
    },
    {
      key: 'hasIntellectualProperty',
      question: 'Have you registered your intellectual property?',
      description: 'Protect your brand, inventions, and creative works.',
      icon: '💡'
    }
  ];

  const onSubmit = async (data: HealthCheckData) => {
    try {
      const response = await axios.post('/api/ai/legal-health-check', data);
      setResults(response.data);
      toast.success('Legal health assessment complete!');
    } catch (error) {
      toast.error('Failed to complete assessment. Please try again.');
      console.error(error);
    }
  };

  const currentQuestion = questions[step];

  return (
    <Card className="p-8">
      {!results ? (
        <>
          <div className="mb-8">
            <h3 className="font-serif text-2xl font-bold mb-2">
              Legal Health Checkup
            </h3>
            <p className="text-gray-300">
              Answer 6 quick questions to assess your legal risk profile
            </p>
          </div>

          <ProgressBar 
            value={(step / questions.length) * 100} 
            className="mb-8"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="text-4xl mb-4">{currentQuestion.icon}</div>
              <h4 className="text-xl font-semibold mb-2">
                {currentQuestion.question}
              </h4>
              <p className="text-gray-300 mb-6">
                {currentQuestion.description}
              </p>
              
              <div className="flex gap-4">
                <Button
                  variant={watch(currentQuestion.key as any) ? 'primary' : 'outline'}
                  onClick={() => {
                    register(currentQuestion.key as any).onChange({ target: { value: true } });
                    setTimeout(() => {
                      if (step < questions.length - 1) {
                        setStep(step + 1);
                      } else {
                        handleSubmit(onSubmit)();
                      }
                    }, 300);
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant={!watch(currentQuestion.key as any) ? 'primary' : 'outline'}
                  onClick={() => {
                    register(currentQuestion.key as any).onChange({ target: { value: false } });
                    setTimeout(() => {
                      if (step < questions.length - 1) {
                        setStep(step + 1);
                      } else {
                        handleSubmit(onSubmit)();
                      }
                    }, 300);
                  }}
                >
                  No
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="text-sm text-gray-400">
            Question {step + 1} of {questions.length}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              Your Legal Risk Score
            </h3>
            <div className="text-4xl font-bold text-gold mb-4">
              {results.riskScore}/100
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Identified Risks</h4>
            <ul className="space-y-2">
              {results.risks?.map((risk: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-red-400">⚠️</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {results.recommendations?.map((rec: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-400">✓</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Required Documents</h4>
            <ul className="space-y-2">
              {results.requiredDocuments?.map((doc: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-gold">📄</span>
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <Button 
            variant="primary" 
            className="w-full"
            onClick={() => window.location.href = '/consultation'}
          >
            Schedule Consultation to Address These Issues
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              setResults(null);
              setStep(0);
            }}
          >
            Retake Assessment
          </Button>
        </motion.div>
      )}
    </Card>
  );
}