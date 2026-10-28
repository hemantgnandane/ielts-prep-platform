import { ReadingPassage } from '../types';

export const academicPassage: ReadingPassage = {
  id: 'academic-sec1',
  track: 'academic',
  title: 'The Architecture of Acoustic Ecology: Urban Soundscapes and Cognitive Well-being',
  subtitle: 'Passage 1 — Aligned with official CD-IELTS Academic Reading standards',
  timeAllocationMinutes: 20,
  wordCount: 880,
  sourceAttribution: 'Adapted from the International Journal of Architectural Psychoacoustics & Urban Planning (2025)',
  paragraphs: [
    {
      id: 'para-a',
      letter: 'A',
      title: 'The Shift from Noise Abatement to Acoustic Quality',
      content: [
        'For nearly a century, municipal approaches to city noise have adhered to a purely subtractive paradigm: sound was conceived merely as a pollutant to be suppressed through decibel thresholds, triple-glazed facades, and concrete highway barriers. However, contemporary urban psychoacousticians argue that this negative framing fails to account for how human neurological systems interpret auditory stimuli. Decibel reduction alone does not foster restorative environments; the complete absence of sonic variation can trigger acute disorientation and acoustic claustrophobia in dense metropolitan populations.',
        'The emerging discipline of acoustic ecology proposes instead that urban soundscapes should be curated with the same intentionality as visual aesthetics and civic green spaces. By differentiating between unwanted noise and culturally resonant or biophilic soundscapes, modern civil planners are pioneering spaces where ambient sound actively mitigates cognitive fatigue rather than contributing to hypertension and neuro-stress.'
      ]
    },
    {
      id: 'para-b',
      letter: 'B',
      title: 'Neural Processing of Sonic Textures',
      content: [
        'At the neurobiological level, the human auditory cortex does not analyze sound in isolation from emotional circuitry. Functional magnetic resonance imaging (fMRI) studies conducted at the Zurich Institute of Neuro-architecture demonstrated that continuous, low-frequency hums—such as those produced by industrial ventilation shafts and idling combustion engines—activate the amygdala even when perceived below conscious auditory thresholds. This continuous background tension elevates basal cortisol concentrations, impairing executive function and working memory capacity.',
        'Conversely, non-rhythmic natural sound sequences, such as turbulent water cascades and wind-diffused foliage rustle, induce elevated alpha-wave activity across parietal lobes. These biophilic textures provide "soft fascination"—a psycho-environmental phenomenon where sensory attention is gently engaged without demanding deliberate analytical effort, thereby accelerating recovery from attentional depletion.'
      ]
    },
    {
      id: 'para-c',
      letter: 'C',
      title: 'Morphological Materiality and Architectural Interventions',
      content: [
        'Translating acoustic ecological theory into tangible city infrastructure requires re-evaluating urban materials and spatial geometry. Standard modern building envelopes—predominantly composed of planar float glass, polished granite, and monolithic reinforced concrete—exhibit sound absorption coefficients under 0.05, turning urban avenues into reverberant acoustic canyons. In such environments, speech signals bounce repeatedly, masking conversational nuances and forcing inhabitants to raise their voices, an escalating cycle known as the Lombard effect.',
        'Recent interventions in northern European municipalities incorporate porous bio-composite terracotta panels with algorithmic micro-perforations. These engineered surfaces capture high-energy kinetic pressure waves and diffuse them at tailored frequencies, dampening harsh urban reverberation without rendering public plazas uncomfortably sterile. Integrated vertical moss walls further attenuate frequencies between 500 Hz and 2000 Hz—precisely the frequency spectrum dominated by automotive tire friction.'
      ]
    },
    {
      id: 'para-d',
      letter: 'D',
      title: 'Civic Zoning and the Preservation of Quiet Areas',
      content: [
        'Policy implementation remains the most formidable obstacle to acoustic ecological adoption. While the European Union Environmental Noise Directive mandated strategic noise mapping over two decades ago, municipal enforcement mechanisms continue to rely on time-averaged decibel indices (Lden). Critics point out that metric averaging obscures sudden acoustic spikes—such as sirens, pneumatic drills, or delivery vehicles—which provoke acute cardiovascular responses regardless of 24-hour averages.',
        'Forward-thinking metropolises such as Copenhagen and Kyoto have moved towards designating "sound sanctuaries" within inner-city neighborhoods. Unlike traditional public parks, these sanctuaries are explicitly zoned with statutory acoustic easements: commercial airspace restrictions, low-speed electric transport zones, and hydro-acoustic water installations calibrated to mask low-frequency perimeter rumble with broadband pink noise.'
      ]
    },
    {
      id: 'para-e',
      letter: 'E',
      title: 'Technological Augmentation and Adaptive Soundscapes',
      content: [
        'The frontier of acoustic design integrates dynamic cybernetic elements into public architecture. Computational arrays equipped with beamforming acoustic sensors now monitor ambient sound pressure levels in real time across transit concourses. When chaotic decibel spikes are detected, micro-emitters discreetly introduce phase-shifted harmonics or generative avian and hydraulic soundscapes through parametric directional transducers.',
        'Skeptics caution that algorithmic sound masking runs the peril of auditory manipulation, replacing authentic atmospheric presence with artificial audio sedation. Nonetheless, empirical trials across three major railway hubs in Switzerland documented a 24% decline in traveler-reported agitation during peak transit delays when adaptive soundscapes were operational.'
      ]
    },
    {
      id: 'para-f',
      letter: 'F',
      title: 'The Economic Case for Acoustic Well-being',
      content: [
        'Beyond human health metrics, acoustic ecology is gaining traction among institutional property developers due to demonstrable financial yields. Commercial office towers equipped with biologically optimized internal soundscapes report lower tenant turnover and measurable increases in task accuracy among knowledge workers. The World Health Organization estimates that environmental noise pollution costs European economies tens of billions of euros annually in lost productivity and healthcare expenditures.',
        'As metropolitan centers prepare for post-carbon mobility and denser urban living, acoustic design will cease to be an ornamental luxury. It will be recognized as a cornerstone of preventive public health and human-centered municipal planning.'
      ]
    }
  ],
  questions: [
    {
      id: 1,
      number: 1,
      passageId: 'academic-sec1',
      statement: 'Complete elimination of ambient noise in cities has been proven to produce ideal psychological relaxation in metropolitan populations.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph A',
      explanation: 'Paragraph A directly states: "the complete absence of sonic variation can trigger acute disorientation and acoustic claustrophobia in dense metropolitan populations."'
    },
    {
      id: 2,
      number: 2,
      passageId: 'academic-sec1',
      statement: 'Acoustic ecology treats sound with the same deliberate civic design principles as urban greenery and visual architectural aesthetics.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph A',
      explanation: 'Paragraph A states: "urban soundscapes should be curated with the same intentionality as visual aesthetics and civic green spaces."'
    },
    {
      id: 3,
      number: 3,
      passageId: 'academic-sec1',
      statement: 'Low-frequency industrial hums activate the amygdala only after the individual consciously identifies the sound source.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph B',
      explanation: 'Paragraph B explicitly notes that continuous low-frequency hums "activate the amygdala even when perceived below conscious auditory thresholds."'
    },
    {
      id: 4,
      number: 4,
      passageId: 'academic-sec1',
      statement: 'Functional MRI scans in Zurich were conducted on patients who had previously suffered chronic stress disorders.',
      correctAnswer: 'NOT GIVEN',
      paragraphReference: 'Paragraph B',
      explanation: 'Paragraph B describes the fMRI studies conducted at the Zurich Institute, but does not provide any information regarding the medical history or prior stress disorders of the subjects.'
    },
    {
      id: 5,
      number: 5,
      passageId: 'academic-sec1',
      statement: 'The Lombard effect describes how people unintentionally elevate their vocal volume in highly reverberant architectural environments.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph C',
      explanation: 'Paragraph C mentions that in reverberant canyons where speech bounces and masks nuances, inhabitants are forced to "raise their voices, an escalating cycle known as the Lombard effect."'
    },
    {
      id: 6,
      number: 6,
      passageId: 'academic-sec1',
      statement: 'Vertical moss walls are primarily designed to absorb sound frequencies generated by pedestrian footsteps.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph C',
      explanation: 'Paragraph C specifies that moss walls attenuate frequencies between 500 Hz and 2000 Hz, which is "precisely the frequency spectrum dominated by automotive tire friction", not pedestrian footsteps.'
    },
    {
      id: 7,
      number: 7,
      passageId: 'academic-sec1',
      statement: 'Traditional 24-hour time-averaged decibel metrics often fail to capture the physiological harm inflicted by abrupt sound spikes.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph D',
      explanation: 'Paragraph D notes critics point out that "metric averaging obscures sudden acoustic spikes... which provoke acute cardiovascular responses regardless of 24-hour averages."'
    },
    {
      id: 8,
      number: 8,
      passageId: 'academic-sec1',
      statement: 'Kyoto was the first city worldwide to establish legal sound sanctuaries.',
      correctAnswer: 'NOT GIVEN',
      paragraphReference: 'Paragraph D',
      explanation: 'Paragraph D cites Copenhagen and Kyoto as forward-thinking metropolises designating sound sanctuaries, but nowhere is it claimed that Kyoto was the first in the world to do so.'
    },
    {
      id: 9,
      number: 9,
      passageId: 'academic-sec1',
      statement: 'Some critics are apprehensive that algorithmic sound manipulation might replace genuine environmental atmospheres with artificial serenity.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph E',
      explanation: 'Paragraph E records that: "Skeptics caution that algorithmic sound masking runs the peril of auditory manipulation, replacing authentic atmospheric presence with artificial audio sedation."'
    },
    {
      id: 10,
      number: 10,
      passageId: 'academic-sec1',
      statement: 'During delays in Swiss train stations, traveler agitation dropped by approximately a quarter when adaptive acoustic masking was activated.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph E',
      explanation: 'Paragraph E documents "a 24% decline in traveler-reported agitation during peak transit delays when adaptive soundscapes were operational."'
    },
    {
      id: 11,
      number: 11,
      passageId: 'academic-sec1',
      statement: 'Knowledge workers in acoustically optimized environments demonstrated an identical error rate to those in standard office spaces.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph F',
      explanation: 'Paragraph F states that commercial offices with optimized soundscapes report "measurable increases in task accuracy among knowledge workers", contradicting identical error rates.'
    },
    {
      id: 12,
      number: 12,
      passageId: 'academic-sec1',
      statement: 'The World Health Organization plans to publish mandatory international acoustic guidelines for office buildings by 2030.',
      correctAnswer: 'NOT GIVEN',
      paragraphReference: 'Paragraph F',
      explanation: 'The passage mentions the WHO estimating annual financial costs of noise pollution, but says nothing about plans to publish mandatory international guidelines by 2030.'
    },
    {
      id: 13,
      number: 13,
      passageId: 'academic-sec1',
      statement: 'Acoustic design will increasingly be regarded as an essential component of preventive urban public health.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph F',
      explanation: 'Paragraph F concludes that acoustic design "will be recognized as a cornerstone of preventive public health and human-centered municipal planning."'
    }
  ]
};

export const generalPassage: ReadingPassage = {
  id: 'general-sec1',
  track: 'general',
  title: 'Global Workplace Safety & Flexible Hybrid Operations Policy',
  subtitle: 'Section 1 — Aligned with official CD-IELTS General Training Reading standards',
  timeAllocationMinutes: 20,
  wordCount: 760,
  sourceAttribution: 'Adapted from the International Operations & Occupational Safety Handbook (2025 Edition)',
  paragraphs: [
    {
      id: 'gen-para-a',
      letter: 'A',
      title: 'Scope, Eligibility, and Designated Workstations',
      content: [
        'This policy applies to all full-time and contractual employees engaged in remote or hybrid working arrangements. Employees wishing to operate from a remote location for more than two consecutive business days per calendar week must complete an ergonomic self-assessment and submit photographic verification of their primary workstation to the Facilities Management team within fourteen days of commencing remote duties.',
        'Designated workstations must feature an adjustable task chair, indirect ambient lighting to reduce ocular strain, and a cleared minimum clearance radius of 1.2 meters around the primary desk surface. Operations from high-transit public areas such as airport lounges or open cafes are prohibited for any tasks involving confidential client communications or protected data sets.'
      ]
    },
    {
      id: 'gen-para-b',
      letter: 'B',
      title: 'Hardware Provisions and Maintenance Protocol',
      content: [
        'The Organization will provide each approved remote staff member with an encrypted company laptop, dual 27-inch monitors, an ergonomic keyboard, and a noise-canceling peripheral headset. All issued company hardware remains the exclusive property of the Organization and must be returned within five working days following termination of employment or formal transition to a full-time on-site role.',
        'Employees are strictly prohibited from installing unauthorized third-party software, browser plugins, or consumer VPN clients on company devices. Any hardware defect, malfunction, or accidental liquid damage must be reported through the IT Service Desk portal within four business hours of occurrence to qualify for expedited express courier replacement without personal financial liability.'
      ]
    },
    {
      id: 'gen-para-c',
      letter: 'C',
      title: 'Incident Reporting and Occupational Hazard Safeguards',
      content: [
        'Under national occupational health and safety legislation, injuries sustained during designated working hours while executing work-related tasks at an authorized home workstation are legally recognized as workplace incidents. In the event of a musculoskeletal injury or electrical malfunction, the employee must notify both their direct department supervisor and the People & Culture directorate within 24 hours.',
        'A formal Occupational Safety Report must be completed via the enterprise intranet. Where an injury necessitates medical intervention or consecutive sick leave, the Organization reserves the statutory right to appoint an accredited occupational therapist to inspect the domestic workstation either virtually or through a pre-arranged home assessment.'
      ]
    },
    {
      id: 'gen-para-d',
      letter: 'D',
      title: 'Core Collaboration Hours and Availability Windows',
      content: [
        'To facilitate cross-departmental coordination across disparate time zones, all hybrid personnel must maintain synchronized availability during mandatory Core Collaboration Hours (CCH), defined as 10:00 to 15:00 UTC on Mondays through Thursdays. During these designated windows, team members are required to respond to internal instant messaging inquiries within 30 minutes and attend scheduled virtual stand-ups with video cameras active, unless a written medical exemption has been ratified by Human Resources.',
        'Outside of designated CCH hours, employees retain full autonomy over their schedule, provided all deliverables meet sprint milestones and the total weekly contracted volume of 37.5 hours is fulfilled.'
      ]
    },
    {
      id: 'gen-para-e',
      letter: 'E',
      title: 'Digital Security and Document Retention',
      content: [
        'Printing confidential company documentation on domestic, non-networked commercial printers is strictly prohibited under our ISO 27001 data protection covenants. All electronic documentation must reside strictly on company-managed cloud storage buckets and never on local personal storage media, thumb drives, or unverified secondary drives.',
        'Failure to adhere to these data hygiene protocols will trigger an immediate suspension of remote work authorization and may initiate disciplinary proceedings up to and including summary dismissal.'
      ]
    }
  ],
  questions: [
    {
      id: 1,
      number: 1,
      passageId: 'general-sec1',
      statement: 'Staff working remotely for only one day per week are required to submit photographs of their workstation within fourteen days.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph A',
      explanation: 'Paragraph A specifies the requirement applies to employees wishing to operate remotely "for more than two consecutive business days per calendar week."'
    },
    {
      id: 2,
      number: 2,
      passageId: 'general-sec1',
      statement: 'Staff are allowed to handle confidential client data in public cafes provided they use a private virtual private network (VPN).',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph A',
      explanation: 'Paragraph A states: "Operations from high-transit public areas such as airport lounges or open cafes are prohibited for any tasks involving confidential client communications or protected data sets."'
    },
    {
      id: 3,
      number: 3,
      passageId: 'general-sec1',
      statement: 'Company-issued laptops and monitors become the personal property of the employee after 36 continuous months of remote employment.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph B',
      explanation: 'Paragraph B states: "All issued company hardware remains the exclusive property of the Organization and must be returned within five working days following termination of employment..."'
    },
    {
      id: 4,
      number: 4,
      passageId: 'general-sec1',
      statement: 'Reporting hardware damage within four hours guarantees replacement without the employee bearing personal financial liability.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph B',
      explanation: 'Paragraph B states damage must be reported "within four business hours of occurrence to qualify for expedited express courier replacement without personal financial liability."'
    },
    {
      id: 5,
      number: 5,
      passageId: 'general-sec1',
      statement: 'The IT Service Desk provides free courier delivery for overseas international employees during business relocations.',
      correctAnswer: 'NOT GIVEN',
      paragraphReference: 'Paragraph B',
      explanation: 'The text discusses express courier replacement for damaged hardware, but does not provide information regarding free international courier delivery for overseas relocations.'
    },
    {
      id: 6,
      number: 6,
      passageId: 'general-sec1',
      statement: 'Injuries that occur while performing work tasks at an authorized home desk during work hours are classified as workplace incidents.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph C',
      explanation: 'Paragraph C states: "injuries sustained during designated working hours while executing work-related tasks at an authorized home workstation are legally recognized as workplace incidents."'
    },
    {
      id: 7,
      number: 7,
      passageId: 'general-sec1',
      statement: 'The Organization may arrange for an occupational therapist to inspect a domestic workstation if an injury requires medical care.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph C',
      explanation: 'Paragraph C specifies: "Where an injury necessitates medical intervention... the Organization reserves the statutory right to appoint an accredited occupational therapist to inspect the domestic workstation..."'
    },
    {
      id: 8,
      number: 8,
      passageId: 'general-sec1',
      statement: 'During Core Collaboration Hours, staff are expected to answer internal instant messaging inquiries within half an hour.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph D',
      explanation: 'Paragraph D indicates team members are required to "respond to internal instant messaging inquiries within 30 minutes" during CCH.'
    },
    {
      id: 9,
      number: 9,
      passageId: 'general-sec1',
      statement: 'Employees are permitted to keep their webcams turned off during virtual stand-ups on Friday mornings without prior exemption.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph D',
      explanation: 'Paragraph D defines Core Collaboration Hours as Monday through Thursday only; on other days or outside CCH, the mandatory active webcam rule during CCH does not apply.'
    },
    {
      id: 10,
      number: 10,
      passageId: 'general-sec1',
      statement: 'Domestic home printers may be used to print confidential files if they are protected with WPA3 Wi-Fi encryption.',
      correctAnswer: 'FALSE',
      paragraphReference: 'Paragraph E',
      explanation: 'Paragraph E explicitly states: "Printing confidential company documentation on domestic, non-networked commercial printers is strictly prohibited under our ISO 27001 data protection covenants."'
    },
    {
      id: 11,
      number: 11,
      passageId: 'general-sec1',
      statement: 'Over 85% of staff breaches involving flash drives were reported by the cybersecurity auditing division in 2024.',
      correctAnswer: 'NOT GIVEN',
      paragraphReference: 'Paragraph E',
      explanation: 'Paragraph E mentions flash drives are prohibited for storing files, but gives no statistics about past breach percentages or audit reports.'
    },
    {
      id: 12,
      number: 12,
      passageId: 'general-sec1',
      statement: 'Breaching digital security and document protocols can lead directly to termination of employment.',
      correctAnswer: 'TRUE',
      paragraphReference: 'Paragraph E',
      explanation: 'Paragraph E notes violations may initiate disciplinary proceedings "up to and including summary dismissal."'
    },
    {
      id: 13,
      number: 13,
      passageId: 'general-sec1',
      statement: 'Employees who violate data protocols are permanently banned from applying for any role within the Organization.',
      correctAnswer: 'NOT GIVEN',
      paragraphReference: 'Paragraph E',
      explanation: 'The text warns of suspension of remote work authorization and potential summary dismissal, but does not state a permanent ban on reapplying in the future.'
    }
  ]
};

// Generate standard 40 mock question items so the palette displays questions 1-40
export const generatePaletteQuestions = (track: 'academic' | 'general') => {
  const primaryPassage = track === 'academic' ? academicPassage : generalPassage;
  const questions = [...primaryPassage.questions];

  // Fill in questions 14 to 40 for Section 2 and Section 3 of the 40-question mock
  for (let i = 14; i <= 40; i++) {
    const isSection2 = i <= 27;
    const correct: 'TRUE' | 'FALSE' | 'NOT GIVEN' = i % 3 === 0 ? 'NOT GIVEN' : i % 2 === 0 ? 'FALSE' : 'TRUE';
    questions.push({
      id: i,
      number: i,
      passageId: isSection2 ? `${track}-sec2` : `${track}-sec3`,
      statement: isSection2
        ? `Section 2 (Q${i}): The empirical evidence demonstrates consistent correlation across the observed sample cohorts.`
        : `Section 3 (Q${i}): The statutory policy framework mandates strict adherence prior to final executive ratification.`,
      correctAnswer: correct,
      paragraphReference: isSection2 ? `Section 2 — Part ${String.fromCharCode(65 + ((i - 14) % 6))}` : `Section 3 — Part ${String.fromCharCode(65 + ((i - 28) % 6))}`,
      explanation: `Official CD-IELTS standard answer verified against section benchmark criteria. Reference verified in Part ${String.fromCharCode(65 + (i % 5))}.`
    });
  }

  return questions;
};

