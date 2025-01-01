import { useState } from 'react';
import { analyzeFile } from '../lib/fileAnalysis/fileReader';
import { analyzeFolder, type FolderAnalysis } from '../lib/fileAnalysis/folderAnalyzer';
import type { AnalysisResult } from '../types/analysis';

interface FileAnalysisState {
  type: 'file' | 'folder';
  result: AnalysisResult | FolderAnalysis | null;
}

export function useFileAnalysis() {
  const [analysis, setAnalysis] = useState<FileAnalysisState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeFiles = async (files: File[]) => {
    try {
      setLoading(true);
      setError(null);

      if (files.length === 1) {
        const result = await analyzeFile(files[0]);
        setAnalysis({ type: 'file', result });
      } else {
        const result = await analyzeFolder(files);
        setAnalysis({ type: 'folder', result });
      }
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
    analyzeFiles
  };
}