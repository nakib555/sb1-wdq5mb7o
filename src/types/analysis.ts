export interface CodeAnalysis {
  metrics: {
    lines: number;
    complexity: number;
    patterns: string[];
  };
  structure: {
    hasClasses: boolean;
    hasFunctions: boolean;
    hasAsync: boolean;
    hasJSX: boolean;
    hasHooks: boolean;
  };
  quality: {
    readability: number;
    maintainability: number;
    testability: number;
  };
}

export interface Improvement {
  type: 'complexity' | 'readability' | 'structure';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  analysis: CodeAnalysis;
  explanation: string;
  improvements: Improvement[];
  timestamp: string;
}