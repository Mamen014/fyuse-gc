'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VirtualTryOnResultPage = () => {
  const searchParams = useSearchParams();
  const matchingAnalysis = searchParams.get('matchingAnalysis');
  const [analysisLines, setAnalysisLines] = useState([]);

  useEffect(() => {
    if (matchingAnalysis) {
      const lines = formatMatchingAnalysis(matchingAnalysis);
      setAnalysisLines(lines);
    }
  }, [matchingAnalysis]);

  const formatMatchingAnalysis = (rawString) => {
    const lines = [];
    const pattern = /\*\*(.*?)\*\*[:：]?\s*([^*]*)/g;
    let match;

    while ((match = pattern.exec(rawString)) !== null) {
      const key = match[1]?.trim() || '';
      const value = match[2]?.trim() || '';
      if (key && value) {
        lines.push({ key, value });
      }
    }

    return lines;
  };

  const matchValue = analysisLines.find(line =>
    line.key.toLowerCase().includes('match')
  )?.value;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <main className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(163,113,247,0.2)] p-8 text-white">
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight">Matching Analysis</h1>
        <p className="text-center text-gray-300 mb-10">Explore your detailed fit analysis results</p>

        {matchValue && (
          <div className="flex justify-center mb-10">
            <div className="relative w-44 h-44 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 p-1">
              <div className="w-full h-full flex flex-col items-center justify-center rounded-full bg-[#1c1b3a] text-purple-300 font-bold text-4xl shadow-inner">
                {matchValue}
                <span className="text-sm text-purple-400 font-medium mt-2">Match Score</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-left">
          <h2 className="text-2xl font-semibold text-white mb-4">Detailed Analysis</h2>
          <div className="space-y-3 text-gray-200 text-base">
            {analysisLines
              .filter(line => !line.key.toLowerCase().includes('match'))
              .map((line, index) => (
                <div key={index}>
                  <span className="text-white font-medium">{line.key}:</span>{' '}
                  <span className="text-purple-100">{line.value}</span>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VirtualTryOnResultPage;