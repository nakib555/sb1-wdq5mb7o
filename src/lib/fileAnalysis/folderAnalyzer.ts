import { AnalysisResult } from '../../types/analysis';

export interface FolderAnalysis {
  totalFiles: number;
  fileTypes: Record<string, number>;
  totalLines: number;
  averageComplexity: number;
  fileAnalyses: Record<string, AnalysisResult>;
  dependencies?: Record<string, string[]>;
  imports?: Record<string, string[]>;
}

export async function analyzeFolder(files: File[]): Promise<FolderAnalysis> {
  const fileTypes: Record<string, number> = {};
  const fileAnalyses: Record<string, AnalysisResult> = {};
  let totalLines = 0;
  let totalComplexity = 0;

  // Analyze each file
  for (const file of files) {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'unknown';
    fileTypes[extension] = (fileTypes[extension] || 0) + 1;

    const analysis = await analyzeFile(file);
    fileAnalyses[file.name] = analysis;
    
    totalLines += analysis.analysis.metrics.lines;
    totalComplexity += analysis.analysis.metrics.complexity;
  }

  return {
    totalFiles: files.length,
    fileTypes,
    totalLines,
    averageComplexity: totalComplexity / files.length,
    fileAnalyses
  };
}