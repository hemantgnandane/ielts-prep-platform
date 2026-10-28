import { TrackComparisonRow } from '../types';

export const comparisonMatrix: TrackComparisonRow[] = [
  {
    dimension: 'Primary Objective',
    academic: 'University admission (Undergraduate, Postgraduate), Tier 4 student visas, and professional licensing (Medical, Dental, Engineering, Law councils).',
    general: 'Permanent residency applications (Express Entry Canada, Australia Subclass 189/190, UK Skilled Worker), work visas, secondary education, and employment.',
    relevanceTag: 'Visa & Goal'
  },
  {
    dimension: 'Listening Module',
    academic: '40 questions, 4 sections (dialogue, social monologue, academic tutorial, university lecture). Identical audio and questions.',
    general: '40 questions, 4 sections (dialogue, social monologue, academic tutorial, university lecture). Identical audio and questions.',
    relevanceTag: '100% Identical'
  },
  {
    dimension: 'Reading Module',
    academic: '3 long academic passages (2,150–2,750 words) from journals, research books, and analytical texts. High syntactic and cognitive density.',
    general: 'Section 1 (everyday notices), Section 2 (workplace contracts, training guidelines), Section 3 (general descriptive text). Multi-text layout.',
    relevanceTag: 'Significant Divergence'
  },
  {
    dimension: 'Reading Scoring Scale',
    academic: 'Band 7.0 = 30–32 / 40 correct\nBand 8.0 = 35–36 / 40 correct\nBand 9.0 = 39–40 / 40 correct',
    general: 'Band 7.0 = 34–35 / 40 correct\nBand 8.0 = 37–38 / 40 correct\nBand 9.0 = 40 / 40 correct (Stricter margin of error)',
    relevanceTag: 'Raw Mark Nuance'
  },
  {
    dimension: 'Writing Task 1',
    academic: 'Visual data report: synthesize line graphs, bar charts, pie diagrams, tables, process flowcharts, or dual geographic maps (Min 150 words).',
    general: 'Functional letter writing: formal complaint, official notification, semi-formal colleague note, or personal communication (Min 150 words).',
    relevanceTag: 'Format Specific'
  },
  {
    dimension: 'Writing Task 2',
    academic: 'Academic discursive essay: formal register, analytical thesis, academic argument justification (Min 250 words, 40 minutes).',
    general: 'Discursive essay: semi-formal or formal register, personal viewpoint supported by real-world or personal examples (Min 250 words, 40 minutes).',
    relevanceTag: 'Register & Stance'
  },
  {
    dimension: 'Speaking Module',
    academic: '11–14 minutes, 3 parts, 1-on-1 interview with certified examiner. Identical criteria (FC, LR, GRA, PR).',
    general: '11–14 minutes, 3 parts, 1-on-1 interview with certified examiner. Identical criteria (FC, LR, GRA, PR).',
    relevanceTag: '100% Identical'
  },
  {
    dimension: 'Test Validity',
    academic: '2 years from the official Test Report Form (TRF) issue date across all global receiving organizations.',
    general: '2 years from the official Test Report Form (TRF) issue date across immigration departments and licensing boards.',
    relevanceTag: 'Universal'
  }
];

