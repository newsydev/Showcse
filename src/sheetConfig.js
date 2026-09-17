/**
 * ─────────────────────────────────────────────────────────
 *  GOOGLE SHEET CONFIGURATION
 * ─────────────────────────────────────────────────────────
 *  Values are loaded from your .env file (never hardcoded).
 *
 *  To set up:
 *    1. Open the .env file in the project root
 *    2. Replace YOUR_SHEET_ID_HERE with your actual Google Sheet ID
 *    3. Save — the app hot-reloads automatically
 *
 *  .env file:
 *    VITE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
 *    VITE_SHEET_NAME=Sheet1
 * ─────────────────────────────────────────────────────────
 */

const SHEET_ID   = import.meta.env.VITE_SHEET_ID;
const SHEET_NAME = import.meta.env.VITE_SHEET_NAME || 'Sheet1';

const isConfigured = SHEET_ID && SHEET_ID !== 'YOUR_SHEET_ID_HERE';

export const SHEET_CSV_URL = isConfigured
  ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`
  : null;
