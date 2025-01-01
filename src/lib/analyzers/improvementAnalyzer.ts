import type { CodeAnalysis, Improvement } from '../../types/analysis';

export async function suggestImprovements(analysis: CodeAnalysis): Promise<Improvement[]> {
  const improvements: Improvement[] = [];
  const { metrics, quality, structure } = analysis;

  // Complexity improvements
  if (metrics.complexity > 5) {
    improvements.push({
      type: 'complexity',
      title: 'High Complexity',
      description: 'Consider breaking down complex functions into smaller, more manageable pieces.',
      priority: 'high'
    });
  }

  // Readability improvements
  if (quality.readability < 80) {
    improvements.push({
      type: 'readability',
      title: 'Improve Readability',
      description: 'Consider adding more comments and breaking long lines into smaller ones.',
      priority: 'medium'
    });
  }

  // Structure improvements
  if (!structure.hasClasses && metrics.lines > 100) {
    improvements.push({
      type: 'structure',
      title: 'Consider OOP',
      description: 'For better organization, consider using classes to structure your code.',
      priority: 'low'
    });
  }

  return improvements;
}