'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface Payment {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: string;
  reference?: string;
}

interface InvoiceListProps {
  invoices?: Payment[];
  total?: number;
  paid?: number;
  outstanding?: number;
}

const sampleInvoices: Payment[] = [
  {
    id: 'INV-001',
    description: 'Initial Retainer — Land Dispute Matter',
    amount: 50000,
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    status: 'paid',
    method: 'M-Pesa',
    reference: 'QGH3X8K9J2',
  },
  {
    id: 'INV-002',
    description: 'Court Appearances & Filings — Month 1',
    amount: 35000,
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    status: 'paid',
    method: 'Bank Transfer',
    reference: 'TXN-2024-441',
  },
  {
    id: 'INV-003',
    description: 'Witness Fees & Disbursements',
    amount: 22000,
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'pending',
    method: undefined,
    reference: undefined,
  },
  {
    id: 'INV-004',
    description: 'Expert Witness Report — Surveyor',
    amount: 18000,
    date: new Date(Date.now() - 86400000 * 20).toISOString(),
    status: 'overdue',
    method: undefined,
    reference: undefined,
  },
];

const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  paid: 'success',
  pending: 'warning',
  overdue: 'danger',
};

function formatKES(amount: number) {
  return `KES ${amount.toLocaleString('en-KE')}`;
}

export function InvoiceList({
  invoices = sampleInvoices,
  total = 125000,
  paid = 85000,
  outstanding = 40000,
}: InvoiceListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
          <div className="text-xs text-gray-500 mb-1">Total Billed</div>
          <div className="font-bold text-white text-lg">{formatKES(total)}</div>
        </div>
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
          <div className="text-xs text-gray-500 mb-1">Paid</div>
          <div className="font-bold text-emerald-400 text-lg">{formatKES(paid)}</div>
        </div>
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
          <div className="text-xs text-gray-500 mb-1">Outstanding</div>
          <div className="font-bold text-amber-400 text-lg">{formatKES(outstanding)}</div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Invoices</h4>
        {invoices.map((inv, index) => (
          <motion.div
            key={inv.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === inv.id ? null : inv.id)}
              className="w-full flex items-center gap-4 p-4 hover:bg-white/5 transition-colors text-left"
            >
              {/* Status dot */}
              <div
                className={`w-2 h-2 rounded-full flex-none ${
                  inv.status === 'paid'
                    ? 'bg-emerald-400'
                    : inv.status === 'overdue'
                    ? 'bg-red-400'
                    : 'bg-amber-400'
                }`}
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-mono text-gray-500">{inv.id}</span>
                  <Badge variant={statusVariant[inv.status]}>{inv.status}</Badge>
                </div>
                <div className="text-sm font-medium text-white truncate">{inv.description}</div>
              </div>

              <div className="text-right flex-none">
                <div className="font-semibold text-white">{formatKES(inv.amount)}</div>
                <div className="text-xs text-gray-500">
                  {format(new Date(inv.date), 'dd MMM yyyy')}
                </div>
              </div>

              <svg
                className={`w-4 h-4 text-gray-500 flex-none transition-transform ${
                  expandedId === inv.id ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded details */}
            {expandedId === inv.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 pb-4 border-t border-white/10"
              >
                <div className="pt-4 grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <span className="text-gray-500">Invoice Date</span>
                    <div className="text-white">{format(new Date(inv.date), 'dd MMMM yyyy')}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment Method</span>
                    <div className="text-white">{inv.method ?? '—'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Reference</span>
                    <div className="font-mono text-white text-xs">{inv.reference ?? '—'}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount</span>
                    <div className="text-white font-semibold">{formatKES(inv.amount)}</div>
                  </div>
                </div>

                {inv.status !== 'paid' && (
                  <Button variant="primary" size="sm" className="w-full">
                    Pay Now via M-Pesa — {formatKES(inv.amount)}
                  </Button>
                )}
                {inv.status === 'paid' && (
                  <Button variant="outline" size="sm" className="w-full">
                    Download Receipt
                  </Button>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
