'use client';

import { useState } from 'react';
import { uploadTradesCSV } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setError(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = input?.files?.[0];

    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const csvContent = await file.text();
      const result = await uploadTradesCSV(csvContent);

      if (result.ok) {
        // Store analysis in session storage for display page
        if (result.analysis) {
          sessionStorage.setItem('emotionalAnalysis', JSON.stringify(result.analysis));
        }
        router.push('/analysis');
      } else {
        setError(result.error || 'Failed to analyze trades');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-2">Emotional Decisions</h1>
          <p className="text-slate-400 mb-8">
            Upload your trade history to discover how much your emotions cost you.
          </p>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={loading}
                className="hidden"
                id="csv-input"
              />
              <label
                htmlFor="csv-input"
                className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors"
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-slate-400">
                    {fileName ? fileName : 'Click to select CSV'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Expected columns: date, ticker, side, entryPrice, exitPrice, quantity
                  </p>
                </div>
              </label>
            </div>

            {error && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-4">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !fileName}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {loading ? 'Analyzing...' : 'Analyze My Trades'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <p className="text-slate-500 text-sm mb-4">CSV Format Example:</p>
            <pre className="bg-slate-900 p-4 rounded text-xs text-slate-300 overflow-x-auto">
{`date,ticker,side,entryPrice,exitPrice,quantity
2026-06-28,BTC,BUY,45000,46000,0.5
2026-06-27,ETH,BUY,2500,2450,1.0`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
