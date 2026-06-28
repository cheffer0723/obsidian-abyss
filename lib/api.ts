/**
 * API Client for Emotion Detection Backend
 * Connects Next.js frontend to Express API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface EmotionalAnalysis {
  ok: boolean;
  analysis?: {
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
  };
  error?: string;
}

export interface RegimeForecast {
  ok: boolean;
  forecast?: {
    type: string;
    confidence: number;
    probabilities: {
      bull: number;
      bear: number;
      sideways: number;
    };
  };
  error?: string;
}

/**
 * Upload CSV trades and get emotional analysis
 */
export async function uploadTradesCSV(csvContent: string): Promise<EmotionalAnalysis> {
  try {
    const response = await fetch(`${API_BASE_URL}/emotional-decisions/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv',
        'x-user-id': 'demo-user' // In production, use actual user ID
      },
      body: csvContent
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        ok: false,
        error: error.error || 'Failed to upload trades'
      };
    }

    return await response.json();
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Get user's emotional analysis summary
 */
export async function getEmotionalSummary(): Promise<EmotionalAnalysis> {
  try {
    const response = await fetch(`${API_BASE_URL}/emotional-decisions/summary`, {
      headers: {
        'x-user-id': 'demo-user'
      }
    });

    if (!response.ok) {
      return {
        ok: false,
        error: 'Failed to fetch summary'
      };
    }

    return await response.json();
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

/**
 * Get 7-day regime forecast
 */
export async function getRegimeForecast(): Promise<RegimeForecast> {
  try {
    const response = await fetch(`${API_BASE_URL}/regime-forecast`);

    if (!response.ok) {
      return {
        ok: false,
        error: 'Failed to fetch forecast'
      };
    }

    return await response.json();
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}
