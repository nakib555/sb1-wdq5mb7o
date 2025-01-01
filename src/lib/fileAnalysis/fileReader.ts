import { AnalysisResult } from '../../types/analysis';

export async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function analyzeFile(file: File): Promise<AnalysisResult> {
  const content = await readFileContent(file);
  const fileType = getFileType(file.name);
  
  // Analyze based on file type
  switch (fileType) {
    case 'javascript':
    case 'typescript':
      return analyzeJavaScript(content);
    case 'python':
      return analyzePython(content);
    default:
      return analyzeGenericCode(content);
  }
}

function getFileType(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'py':
      return 'python';
    default:
      return 'unknown';
  }
}