import { useState } from 'react';
import { analyzeSubmission } from '../lib/analyzers/codeAnalyzer';
import type { AnalysisResult } from '../types/analysis';

export function useCodeAnalysis() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeCode = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyzeSubmission(code);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return {
    analysis,
    loading,
    error,
    analyzeCode
  };
}