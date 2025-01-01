import { CodeAnalysis } from '../../types/analysis';

export async function analyzeCode(code: string): Promise<CodeAnalysis> {
  // Basic code analysis
  const lines = code.split('\n');
  const complexity = calculateComplexity(code);
  const patterns = identifyPatterns(code);
  
  return {
    metrics: {
      lines: lines.length,
      complexity,
      patterns
    },
    structure: analyzeStructure(code),
    quality: assessCodeQuality(code)
  };
}

function calculateComplexity(code: string): number {
  // Simple complexity calculation based on nesting and loops
  const nestingLevel = (code.match(/{/g) || []).length;
  const loops = (code.match(/for|while|do/g) || []).length;
  return nestingLevel + loops;
}

function identifyPatterns(code: string): string[] {
  const patterns = [];
  
  if (code.includes('class')) patterns.push('OOP');
  if (code.includes('=>')) patterns.push('Functional');
  if (code.includes('async')) patterns.push('Asynchronous');
  
  return patterns;
}

function analyzeStructure(code: string) {
  return {
    hasClasses: code.includes('class'),
    hasFunctions: code.includes('function'),
    hasAsync: code.includes('async'),
    hasJSX: code.includes('jsx'),
    hasHooks: code.includes('use')
  };
}

function assessCodeQuality(code: string) {
  return {
    readability: calculateReadability(code),
    maintainability: calculateMaintainability(code),
    testability: calculateTestability(code)
  };
}

function calculateReadability(code: string): number {
  // Simple readability score based on line length and naming
  const avgLineLength = code.split('\n')
    .map(line => line.trim().length)
    .reduce((a, b) => a + b, 0) / code.split('\n').length;
    
  return Math.min(100, Math.max(0, 100 - (avgLineLength - 40)));
}

function calculateMaintainability(code: string): number {
  // Basic maintainability score
  const complexity = calculateComplexity(code);
  return Math.max(0, 100 - (complexity * 5));
}

function calculateTestability(code: string): number {
  // Basic testability score
  const hasPureFunctions = !code.includes('Math.random') && !code.includes('Date');
  const hasSmallFunctions = code.split('function').length < 5;
  
  return hasPureFunctions && hasSmallFunctions ? 90 : 70;
}