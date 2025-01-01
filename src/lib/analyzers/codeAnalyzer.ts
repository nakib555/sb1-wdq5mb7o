import { analyzeCode } from './analyzers';
import { generateExplanation } from './explanationGenerator';
import { suggestImprovements } from './improvementAnalyzer';
import type { AnalysisResult } from '../../types/analysis';

export async function analyzeSubmission(code: string): Promise<AnalysisResult> {
  const analysis = await analyzeCode(code);
  const explanation = await generateExplanation(analysis);
  const improvements = await suggestImprovements(analysis);

  return {
    analysis,
    explanation,
    improvements,
    timestamp: new Date().toISOString()
  };
}