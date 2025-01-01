import React from 'react';
import { File, Folder } from 'lucide-react';
import type { FolderAnalysis } from '../lib/fileAnalysis/folderAnalyzer';
import type { AnalysisResult } from '../types/analysis';

interface FileAnalysisViewProps {
  analysis: AnalysisResult | FolderAnalysis;
  type: 'file' | 'folder';
}

export function FileAnalysisView({ analysis, type }: FileAnalysisViewProps) {
  if (type === 'folder') {
    const folderAnalysis = analysis as FolderAnalysis;
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Folder className="w-6 h-6 text-blue-500" />
          <h2 className="text-lg font-semibold">Folder Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Overview</h3>
            <dl className="space-y-1">
              <div className="flex justify-between">
                <dt className="text-gray-500">Total Files</dt>
                <dd className="font-medium">{folderAnalysis.totalFiles}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Total Lines</dt>
                <dd className="font-medium">{folderAnalysis.totalLines}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Average Complexity</dt>
                <dd className="font-medium">{folderAnalysis.averageComplexity.toFixed(1)}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">File Types</h3>
            <div className="space-y-1">
              {Object.entries(folderAnalysis.fileTypes).map(([type, count]) => (
                <div key={type} className="flex justify-between">
                  <span className="text-gray-500">.{type}</span>
                  <span className="font-medium">{count} files</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-600">Individual Files</h3>
          {Object.entries(folderAnalysis.fileAnalyses).map(([fileName, fileAnalysis]) => (
            <div key={fileName} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <File className="w-4 h-4 text-gray-400" />
                <h4 className="font-medium">{fileName}</h4>
              </div>
              <SingleFileAnalysis analysis={fileAnalysis} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <SingleFileAnalysis analysis={analysis as AnalysisResult} />;
}

function SingleFileAnalysis({ analysis }: { analysis: AnalysisResult }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Code Quality"
          value={`${analysis.analysis.quality.readability}%`}
          label="Readability"
        />
        <MetricCard
          title="Complexity"
          value={analysis.analysis.metrics.complexity.toString()}
          label="Score"
        />
        <MetricCard
          title="Size"
          value={analysis.analysis.metrics.lines.toString()}
          label="Lines"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Improvements</h3>
        <div className="space-y-2">
          {analysis.improvements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm"
            >
              <span className={`
                px-2 py-0.5 rounded-full text-xs
                ${improvement.priority === 'high' ? 'bg-red-100 text-red-700' :
                  improvement.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'}
              `}>
                {improvement.priority}
              </span>
              <div>
                <p className="font-medium">{improvement.title}</p>
                <p className="text-gray-600">{improvement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, label }: { title: string; value: string; label: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="mt-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-gray-500 text-sm ml-1">{label}</span>
      </div>
    </div>
  );
}