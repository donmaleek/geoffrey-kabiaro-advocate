'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import toast from 'react-hot-toast';
import axios from 'axios';

interface ValuationResult {
  estimatedTimeline: string;
  estimatedCost: string;
  successProbability: number;
  recommendations: string[];
}

export function CaseValuationTool() {
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/ai/case-valuation', data);
      setResult(response.data);
      toast.success('Case valuation complete!');
    } catch (error) {
      toast.error('Failed to value case. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8">
      <h3 className="font-serif text-2xl font-bold mb-2">
        Instant Case Valuation
      </h3>
      <p className="text-gray-300 mb-6">
        Get an estimate of timeline and costs for your legal matter
      </p>

      {!result ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Case Type
            </label>
            <Select {...register('caseType', { required: true })}>
              <option value="">Select case type</option>
              <option value="land_dispute">Land Dispute</option>
              <option value="employment">Employment Matter</option>
              <option value="corporate">Corporate Transaction</option>
              <option value="family">Family Matter</option>
              <option value="litigation">Commercial Litigation</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Estimated Value (KES)
            </label>
            <Input
              type="number"
              placeholder="e.g., 5000000"
              {...register('value', { required: true, min: 0 })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Complexity Level
            </label>
            <Select {...register('complexity', { required: true })}>
              <option value="low">Low - Standard matter</option>
              <option value="medium">Medium - Some complexities</option>
              <option value="high">High - Highly complex</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Urgency
            </label>
            <Select {...register('urgency', { required: true })}>
              <option value="normal">Normal (3-6 months)</option>
              <option value="urgent">Urgent (1-3 months)</option>
              <option value="emergency">Emergency (Immediate)</option>
            </Select>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            loading={loading}
          >
            Get Valuation
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-gold/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Estimated Timeline</div>
              <div className="text-xl font-bold text-gold">{result.estimatedTimeline}</div>
            </div>
            <div className="p-4 bg-gold/10 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Estimated Cost</div>
              <div className="text-xl font-bold text-gold">{result.estimatedCost}</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-2">Success Probability</div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                <div
                  style={{ width: `${result.successProbability}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gold"
                />
              </div>
              <div className="text-right mt-1 text-sm font-semibold text-gold">
                {result.successProbability}%
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300">
                  <span className="text-gold">→</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => window.location.href = '/consultation'}
          >
            Schedule Strategy Session
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setResult(null)}
          >
            Value Another Case
          </Button>
        </div>
      )}
    </Card>
  );
}