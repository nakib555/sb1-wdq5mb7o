import type { CodeAnalysis } from '../../types/analysis';

export async function generateExplanation(analysis: CodeAnalysis): Promise<string> {
  const { metrics, structure, quality } = analysis;
  
  const explanations = [
    `Code Analysis Summary:`,
    `\nStructure:`,
    `- ${structure.hasClasses ? 'Uses' : 'Does not use'} classes`,
    `- ${structure.hasFunctions ? 'Contains' : 'No'} functions`,
    `- ${structure.hasAsync ? 'Has' : 'No'} async operations`,
    
    `\nMetrics:`,
    `- ${metrics.lines} lines of code`,
    `- Complexity score: ${metrics.complexity}`,
    `- Identified patterns: ${metrics.patterns.join(', ')}`,
    
    `\nQuality Scores:`,
    `- Readability: ${quality.readability}%`,
    `- Maintainability: ${quality.maintainability}%`,
    `- Testability: ${quality.testability}%`
  ];
  
  return explanations.join('\n');
}