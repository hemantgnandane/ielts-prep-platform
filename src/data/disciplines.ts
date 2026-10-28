import { DisciplineModule } from '../types';

export const disciplinesData: DisciplineModule[] = [
  {
    id: 'listening',
    title: 'Listening',
    duration: '30 Minutes (+10m Paper / 2m Digital)',
    questionCount: '40 Questions · 4 Sections',
    badge: 'Universal Across Tracks',
    academicSpecifics: {
      overview: 'Evaluates your capability to comprehend spoken native English across social interactions, educational seminars, and academic lectures.',
      taskBreakdown: [
        { name: 'Section 1', desc: 'Everyday transactional dialogue between two speakers (e.g. travel booking, course inquiry).' },
        { name: 'Section 2', desc: 'Monologue situated in an everyday social context (e.g. guided heritage tour, local community speech).' },
        { name: 'Section 3', desc: 'Academic discussion with up to 4 university students and a tutor analyzing research methodology.' },
        { name: 'Section 4', desc: 'Uninterrupted university lecture on an academic subject (e.g. marine paleontology, anthropology).' }
      ],
      evaluationCriteria: [
        'Form and table completion with exact word-count constraints',
        'Multiple choice and diagram/map labeling accuracy',
        'Phonetic decoding of diverse international native accents (UK, AUS, NZ, NA)'
      ],
      sampleFocus: 'Accents: British RP, Australian, Canadian. Single audio playback only.'
    },
    generalSpecifics: {
      overview: 'Identical audio recording format and questions as Academic track; assesses daily communicative competence in work and community scenarios.',
      taskBreakdown: [
        { name: 'Section 1', desc: 'Everyday transactional dialogue between two speakers (e.g. hotel booking, rental agreement).' },
        { name: 'Section 2', desc: 'Monologue situated in an everyday social context (e.g. campus facilities or company orientation).' },
        { name: 'Section 3', desc: 'Group conversation concerning workplace training, project delivery, or educational modules.' },
        { name: 'Section 4', desc: 'Academic or general scientific exposition delivered as a continuous monologue.' }
      ],
      evaluationCriteria: [
        'Form, note, and flowchart completion with exact word-count limits',
        'Spatial orientation and plan/map labeling precision',
        'Identifying subtle speaker attitude, intent, and unstated agreements'
      ],
      sampleFocus: 'Identical standard across both tracks: 40 questions, one playthrough.'
    }
  },
  {
    id: 'reading',
    title: 'Reading',
    duration: '60 Minutes',
    questionCount: '40 Questions · 3 Sections',
    badge: 'Track-Divergent Content',
    academicSpecifics: {
      overview: 'Features 3 long, dense academic texts extracted from scholarly journals, books, and analytical periodicals suited for university matriculation.',
      taskBreakdown: [
        { name: 'Passage 1', desc: 'Factual exposition with descriptive analysis (e.g. evolutionary biology, archaeological breakthroughs).' },
        { name: 'Passage 2', desc: 'Discursive text examining competing scientific hypotheses or architectural/sociological case studies.' },
        { name: 'Passage 3', desc: 'Complex, dense intellectual debate with nuanced philosophical or socio-economic arguments.' }
      ],
      evaluationCriteria: [
        'True / False / Not Given & Yes / No / Not Given logic differentiation',
        'Paragraph heading matching & locating specific detailed information',
        'Summary completion & sentence completion without spelling errors'
      ],
      sampleFocus: 'Total word count: 2,150–2,750 words. Requires skimming, scanning, and deep inferential synthesis.'
    },
    generalSpecifics: {
      overview: 'Focuses on materials candidates encounter in daily living, workplace training handbooks, corporate guidelines, and general interest magazines.',
      taskBreakdown: [
        { name: 'Section 1 (Social Survival)', desc: '2–3 short factual notices, advertisements, timetables, or community guides.' },
        { name: 'Section 2 (Workplace Context)', desc: '2 texts addressing employment contracts, staff manuals, safety policies, or workplace welfare.' },
        { name: 'Section 3 (General Reading)', desc: 'One extended, descriptive text of general interest with intricate structural prose.' }
      ],
      evaluationCriteria: [
        'Factual data retrieval from schedules and employee handbooks',
        'Understanding regulatory terms, conditions, and liability boundaries',
        'Recognizing argumentative tone and implicit author intent'
      ],
      sampleFocus: 'Scoring curve is stricter: 34/40 required for Band 7.0 (vs. 30/40 in Academic).'
    }
  },
  {
    id: 'writing',
    title: 'Writing',
    duration: '60 Minutes',
    questionCount: '2 Tasks (150 & 250 words)',
    badge: 'Task 1 Divergence',
    academicSpecifics: {
      overview: 'Rigorous analytical writing assessing graphical data interpretation and academic discursive argumentative exposition.',
      taskBreakdown: [
        { name: 'Task 1 (Report · 20m)', desc: 'Summarize, describe, or explain visual data: bar charts, line graphs, pie charts, process diagrams, or comparative maps (Min 150 words).', time: '20 min' },
        { name: 'Task 2 (Essay · 40m)', desc: 'Formal academic discursive essay addressing a point of view, problem/solution, or debate with justified arguments (Min 250 words).', time: '40 min' }
      ],
      evaluationCriteria: [
        'Task Achievement: Overview reporting with key features, trends, and comparisons (Task 1)',
        'Coherence and Cohesion: Logical paragraphing, clear progression, referencing and linking devices',
        'Lexical Resource: Precise academic collocations, natural idiomatic expressions, low error rate',
        'Grammatical Range and Accuracy: Complex sentence structures with high punctuation precision'
      ],
      sampleFocus: 'Task 2 carries double the weighting of Task 1 toward the final writing band score.'
    },
    generalSpecifics: {
      overview: 'Tests communicative writing tailored for workplace correspondence, official requests, and everyday personal and civic scenarios.',
      taskBreakdown: [
        { name: 'Task 1 (Letter · 20m)', desc: 'Draft a letter in response to a given situation: formal (complaint/request), semi-formal (colleague), or informal (friend) (Min 150 words).', time: '20 min' },
        { name: 'Task 2 (Essay · 40m)', desc: 'Discursive essay presenting opinions, general factual arguments, or social policy evaluations (Min 250 words).', time: '40 min' }
      ],
      evaluationCriteria: [
        'Task Response: Addressing all three bullet points in the letter prompt with appropriate tone and register',
        'Coherence and Cohesion: Clear structure with logical transitions between paragraphs',
        'Lexical Resource: Flexible vocabulary suited to formal, semi-formal, or personal registers',
        'Grammatical Range: Variety of compound and complex clauses with control of modal verbs'
      ],
      sampleFocus: 'Register consistency is critical: formal letters must never use contractions or slang.'
    }
  },
  {
    id: 'speaking',
    title: 'Speaking',
    duration: '11–14 Minutes',
    questionCount: '3 Parts · 1-on-1 Interview',
    badge: 'Universal Face-to-Face',
    academicSpecifics: {
      overview: 'Interactive face-to-face or high-definition video call interview conducted with an accredited official IELTS examiner.',
      taskBreakdown: [
        { name: 'Part 1 (Intro & Interview · 4–5m)', desc: 'General questions regarding hometown, studies, work, routine, technology, or personal interests.' },
        { name: 'Part 2 (Individual Long Turn · 3–4m)', desc: 'Candidate receives a task card (Cue Card); 1 minute preparation followed by a 2-minute uninterrupted speech.' },
        { name: 'Part 3 (Two-way Discussion · 4–5m)', desc: 'In-depth abstract discussion expanding thematically upon the topic explored in Part 2.' }
      ],
      evaluationCriteria: [
        'Fluency and Coherence: Sustained speech without excessive hesitation, natural discourse markers',
        'Lexical Resource: Broad vocabulary range, figurative speech, and topic-specific terminology',
        'Grammatical Range and Accuracy: Mixed conditionals, relative clauses, passive voice mastery',
        'Pronunciation: Intonation contours, stress timing, and natural connected speech phenomena'
      ],
      sampleFocus: 'Unscripted assessment recorded for multi-examiner standardization and quality assurance.'
    },
    generalSpecifics: {
      overview: 'Evaluated using the exact same standard band descriptor rubrics as the Academic track; tests spontaneous verbal English capability.',
      taskBreakdown: [
        { name: 'Part 1 (Intro & Interview · 4–5m)', desc: 'Warm-up conversational queries covering home life, daily routine, employment, and lifestyle habits.' },
        { name: 'Part 2 (Individual Long Turn · 3–4m)', desc: 'Cue Card response with 1 minute prep followed by 2 minutes of continuous personal narrative.' },
        { name: 'Part 3 (Two-way Discussion · 4–5m)', desc: 'Broader thematic exploration of social issues, civic habits, technology, and cultural trends.' }
      ],
      evaluationCriteria: [
        'Fluency and Coherence: Natural pacing, discourse connectors, avoidance of repetitive speech',
        'Lexical Resource: Idiomatic flexibility and effective circumlocution when needed',
        'Grammatical Range: Accurate complex structures and past narrative tense command',
        'Pronunciation: Phoneme clarity, sentence stress, rhythm, and intelligibility'
      ],
      sampleFocus: 'Scored on the official 9-band scale across all four equal-weighted criteria.'
    }
  }
];

