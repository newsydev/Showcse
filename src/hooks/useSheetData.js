import { useState, useEffect } from 'react';

/**
 * Actual column layout from the Google Sheet:
 *  A(0):  Timestamp
 *  B(1):  Team Name
 *  C(2):  Total Number of Members
 *  D(3):  Member 1 Name
 *  E(4):  Member 1 Roll No
 *  F(5):  Member 1 Email
 *  G(6):  Member 1 Mobile No
 *  H(7):  Member 2 Name
 *  I(8):  Member 2 Roll No
 *  J(9):  Member 2 Email
 *  K(10): Member 2 Mobile No
 *  L(11): Member 3 Name
 *  M(12): Member 3 Roll No
 *  N(13): Member 3 Email
 *  O(14): Member 3 Mobile No
 *  P(15): Member 4 Name
 *  Q(16): Member 4 Roll No
 *  R(17): Member 4 Email
 *  S(18): Member 4 Mobile No
 *  T(19): Dataset Name
 *  U(20): Dataset Source / URL
 *  V(21): Target / Output Variable Name
 *  W(22): Problem Statement & Objective
 *  X(23): GitHub Repository URL
 *  Y(24): Google Colab Notebook URL
 *  Z(25): YouTube Video Demonstration URL
 */

function parseCSVLine(line) {
  const cols = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      // Handle escaped double-quotes inside quoted fields
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      cols.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  cols.push(current.trim());
  return cols;
}

function parseCSV(text) {
  // Split into lines, but keep quoted newlines together
  const lines = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; current += ch; }
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (current.trim()) lines.push(current);
      current = '';
      if (ch === '\r' && text[i + 1] === '\n') i++;
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);

  if (lines.length < 2) return [];

  // Skip header row
  return lines.slice(1).map((line, rowIndex) => {
    const cols = parseCSVLine(line);
    const get = (i) => (cols[i] || '').replace(/^"|"$/g, '').trim();

    // Build member list — skip blank or "NA" members
    const members = [];
    for (let m = 0; m < 4; m++) {
      const base = 3 + m * 4; // D, H, L, P
      const name = get(base);
      if (name && name.toLowerCase() !== 'na') {
        members.push({
          name,
          rollNo: get(base + 1),
          email:  get(base + 2),
          phone:  get(base + 3),
        });
      }
    }

    const teamName   = get(1);
    const id         = `T${String(rowIndex + 1).padStart(3, '0')}`;
    const teamNum    = String(rowIndex + 1).padStart(2, '0');
    const timestamp  = get(0);
    const dataset    = get(19);
    const datasetUrl = get(20);
    const target     = get(21);
    const problem    = get(22);
    const github     = get(23);
    const colab      = get(24);
    const youtube    = get(25);

    return {
      id,
      team:         `TEAM #${teamNum}`,
      teamCode:     id,
      teamName:     teamName || `Team ${teamNum}`,
      totalMembers: get(2),
      members,
      timestamp,
      datasetName:       dataset,
      datasetUrl:        datasetUrl,
      targetVariable:    target,
      problemStatement:  problem,
      githubUrl:         github,
      colabUrl:          colab,
      youtubeUrl:        youtube,
      // Fields expected by useFilters / ProjectGrid
      title:        teamName || `Team ${teamNum}`,
      shortDesc:    problem,
      fullDesc:     problem,
      institution:  'Submitted',
      tags:         [dataset].filter(Boolean),
      tagColors:    {},
      previewType:  'terminal',
      xp:           0,
      featured:     false,
    };
  }).filter((p) => p.teamName);
}

export function useSheetData(sheetUrl) {
  const [projects, setProjects] = useState(null);
  const [error, setError]       = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  async function fetchData() {
    try {
      setError(null);
      const res = await fetch(sheetUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status} — make sure the sheet is set to "Anyone with the link can view"`);
      const text = await res.text();
      const parsed = parseCSV(text);
      setProjects(parsed);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to load sheet data');
    }
  }

  useEffect(() => {
    if (!sheetUrl) return;
    fetchData();
    const interval = setInterval(fetchData, 60_000);
    return () => clearInterval(interval);
  }, [sheetUrl]);

  return { projects, error, lastUpdated, refetch: fetchData };
}
