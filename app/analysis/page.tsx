'use client';

import { useState, useEffect } from 'react';
import { getRegimeForecast } from '@/lib/api';
import Link from 'next/link';

interface Analysis {
  summary: {
    totalTrades: number;
    emotionalTrades: number;
    disciplinedTrades: number;
    totalEmotionalCost: number;
    currencyGain: number;
    potentialGain: number;
    missedOpportunity: number;
  };
  breakdown: {
    fomoChaseTrades: any[];
    panicExitTrades: any[];
    greedHoldTrades: any[];
    disciplinedTrades: any[];
  };
  monthlyBreakdown: any[];
  regimeForecast: any;
  disciplineScore: number;
}

export default function AnalysisPage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load analysis from session storage
    const saved = sessionStorage.getItem('emotionalAnalysis');
    if (saved) {
      const data = JSON.parse(saved);
      setAnalysis(data);
    }

    // Fetch regime forecast
    const fetchForecast = async () => {
      const result = await getRegimeForecast();
      if (result.ok && result.forecast) {
        setForecast(result.forecast);
      }
    };

    fetchForecast();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">No analysis data found</p>
          <Link href="/upload">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Upload CSV
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const emotionalPercentage = analysis.summary.totalTrades > 0
    ? (analysis.summary.emotionalTrades / analysis.summary.totalTrades * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Your Emotional Decisions</h1>
          <p className="text-slate-400">The dollar cost of your trading emotions</p>
        </div>

        {/* Main Cost Card */}
        <div className="bg-gradient-to-r from-red-900/30 to-red-900/10 border border-red-800 rounded-lg p-8">
          <div className="text-center">
            <p className="text-slate-400 mb-2">Total Emotional Cost</p>
            <p className="text-5xl font-bold text-red-400">
              ${Math.abs(analysis.summary.totalEmotionalCost).toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}
            </p>
            <p className="text-slate-500 mt-2">
              {emotionalPercentage}% of your trades were emotionally driven
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total Trades</p>
            <p className="text-3xl font-bold text-white">{analysis.summary.totalTrades}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Disciplined Trades</p>
            <p className="text-3xl font-bold text-green-400">{analysis.summary.disciplinedTrades}</p>
            <p className="text-xs text-slate-500 mt-1">{analysis.disciplineScore.toFixed(1)}% score</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Emotional Trades</p>
            <p className="text-3xl font-bold text-red-400">{analysis.summary.emotionalTrades}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Missed Opportunity</p>
            <p className="text-3xl font-bold text-yellow-400">
              ${Math.abs(analysis.summary.missedOpportunity).toLocaleString('en-US', {
                maximumFractionDigits: 0
              })}
            </p>
          </div>
        </div>

        {/* Emotional Patterns Breakdown */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Emotional Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-4 rounded">
              <p className="text-slate-400 mb-2">FOMO Chasing</p>
              <p className="text-2xl font-bold text-orange-400">
                {analysis.breakdown.fomoChaseTrades.length}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Entered on high momentum, ended in losses
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded">
              <p className="text-slate-400 mb-2">Panic Exits</p>
              <p className="text-2xl font-bold text-red-500">
                {analysis.breakdown.panicExitTrades.length}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Exited during sharp dips, missed rebounds
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded">
              <p className="text-slate-400 mb-2">Greed Holding</p>
              <p className="text-2xl font-bold text-amber-400">
                {analysis.breakdown.greedHoldTrades.length}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Held through reversals on winning trades
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded">
              <p className="text-slate-400 mb-2">Disciplined Trades</p>
              <p className="text-2xl font-bold text-green-400">
                {analysis.breakdown.disciplinedTrades.length}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Aligned with market regime and plan
              </p>
            </div>
          </div>
        </div>

        {/* Discipline Score Meter */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Discipline Score</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full transition-all"
                  style={{ width: `${Math.min(analysis.disciplineScore, 100)}%` }}
                />
              </div>
            </div>
            <div className="text-3xl font-bold text-white min-w-max">
              {analysis.disciplineScore.toFixed(1)}%
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-4">
            {analysis.disciplineScore < 30
              ? 'Your emotional decisions significantly impacted returns. Focus on pre-trade planning.'
              : analysis.disciplineScore < 70
              ? 'Room for improvement. Strengthen your trading plan and stick to it.'
              : 'Excellent discipline. Your trades align well with your strategy.'}
          </p>
        </div>

        {/* Market Regime Forecast */}
        {forecast && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">7-Day Regime Forecast</h2>
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                {forecast.type === 'BULL'
                  ? '📈 Bull Regime'
                  : forecast.type === 'BEAR'
                  ? '📉 Bear Regime'
                  : '↔️ Sideways'}
              </p>
              <p className="text-slate-400 mb-6">Confidence: {(forecast.confidence * 100).toFixed(0)}%</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded">
                  <p className="text-slate-500 text-sm">Bull Probability</p>
                  <p className="text-2xl font-bold text-green-400">
                    {(forecast.probabilities?.bull * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded">
                  <p className="text-slate-500 text-sm">Sideways Probability</p>
                  <p className="text-2xl font-bold text-slate-400">
                    {(forecast.probabilities?.sideways * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded">
                  <p className="text-slate-500 text-sm">Bear Probability</p>
                  <p className="text-2xl font-bold text-red-400">
                    {(forecast.probabilities?.bear * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Breakdown */}
        {analysis.monthlyBreakdown && analysis.monthlyBreakdown.length > 0 && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Monthly Breakdown</h2>
            <div className="space-y-3">
              {analysis.monthlyBreakdown.map((month: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between bg-slate-900 p-4 rounded">
                  <div>
                    <p className="text-white font-semibold">{month.month}</p>
                    <p className="text-slate-400 text-sm">{month.emotionalTradeCount} emotional trades</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-semibold">
                      ${Math.abs(month.emotionalCost).toLocaleString('en-US', {
                        maximumFractionDigits: 2
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <Link href="/upload">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded">
              Upload New CSV
            </button>
          </Link>
          <button
            onClick={() => {
              sessionStorage.removeItem('emotionalAnalysis');
              window.location.reload();
            }}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded"
          >
            Clear Results
          </button>
        </div>
      </div>
    </div>
  );
}
