/**
 * API Client for Emotion Detection Backend
 * Calls Railway-hosted emotion detection endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://obsidianabyss-api-production.up.railway.app';

export interface EmotionalAnalysisResult {
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

export interface RegimeForecastResult {
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
export async function analyzeTradesFromCSV(csvContent: string, userId: string = 'demo-user'): Promise<EmotionalAnalysisResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/emotional-decisions/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/csv',
        'x-user-id': userId
      },
      body: csvContent
    });

    if (!response.ok) {
      let error = 'Failed to upload trades';
      try {
        const errorData = await response.json();
        error = errorData.error || error;
      } catch {
        // Use default error message
      }
      return { ok: false, error };
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
export async function getAnalysisSummary(userId: string = 'demo-user'): Promise<EmotionalAnalysisResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/emotional-decisions/summary`, {
      headers: {
        'x-user-id': userId
      }
    });

    if (!response.ok) {
      return { ok: false, error: 'Failed to fetch summary' };
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
export async function getRegimeForecast(): Promise<RegimeForecastResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/regime-forecast`);

    if (!response.ok) {
      return { ok: false, error: 'Failed to fetch forecast' };
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
 * Check if backend is reachable
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET'
    });
    return response.ok;
  } catch {
    return false;
  }
}
