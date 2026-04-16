// UK National Curriculum + GCSE (AQA/Edexcel) objectives for Maths and English
// Each objective represents a specific learning outcome a student should master
// Mapped to our internal topics so progress tracking can be computed automatically

export type KeyStage = "KS1" | "KS2" | "KS3" | "GCSE";
export type ExamBoard = "National" | "AQA" | "Edexcel" | "Both"; // Both = AQA+Edexcel shared

export interface CurriculumObjective {
  id: string;
  subject: "maths" | "english";
  keyStage: KeyStage;
  yearGroup: number; // 1-11 (Year 1 to GCSE Year 11)
  topic: string; // maps to our app topic
  level: number; // app level required (1-6) to count toward mastery
  description: string;
  examBoard: ExamBoard;
}

// MATHS objectives — spans Year 1 through GCSE
// Year groups: 1-2 (KS1), 3-6 (KS2), 7-9 (KS3), 10-11 (GCSE)
// App levels: 1 = age 5 (Y1), 2 = age 6 (Y2), 3 = age 7 (Y3), 4 = age 8-9, 5 = age 9-11 (Y5-6), 6 = GCSE

export const MATHS_OBJECTIVES: CurriculumObjective[] = [
  // ============ ADDITION ============
  { id: "m-add-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Addition", level: 1, description: "Add one-digit numbers to 10", examBoard: "National" },
  { id: "m-add-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Addition", level: 2, description: "Add numbers within 20 mentally", examBoard: "National" },
  { id: "m-add-3", subject: "maths", keyStage: "KS2", yearGroup: 3, topic: "Addition", level: 3, description: "Add 2-digit numbers with regrouping", examBoard: "National" },
  { id: "m-add-4", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Addition", level: 4, description: "Add 3-digit numbers using column method", examBoard: "National" },
  { id: "m-add-5", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Addition", level: 5, description: "Add 4-digit numbers and understand place value", examBoard: "National" },
  { id: "m-add-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Addition", level: 6, description: "Solve multi-step addition problems in context", examBoard: "Both" },

  // ============ SUBTRACTION ============
  { id: "m-sub-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Subtraction", level: 1, description: "Subtract one-digit numbers within 10", examBoard: "National" },
  { id: "m-sub-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Subtraction", level: 2, description: "Subtract within 20 mentally", examBoard: "National" },
  { id: "m-sub-3", subject: "maths", keyStage: "KS2", yearGroup: 3, topic: "Subtraction", level: 3, description: "Subtract 2-digit numbers with borrowing", examBoard: "National" },
  { id: "m-sub-4", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Subtraction", level: 4, description: "Subtract 3-digit numbers using column method", examBoard: "National" },
  { id: "m-sub-5", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Subtraction", level: 5, description: "Subtract 4+ digit numbers including negatives", examBoard: "National" },
  { id: "m-sub-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Subtraction", level: 6, description: "Apply subtraction to real-world multi-step problems", examBoard: "Both" },

  // ============ MULTIPLICATION ============
  { id: "m-mul-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Multiplication", level: 1, description: "Count in 2s, 5s, 10s; understand groups", examBoard: "National" },
  { id: "m-mul-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Multiplication", level: 2, description: "Recall 2, 5, 10 times tables", examBoard: "National" },
  { id: "m-mul-3", subject: "maths", keyStage: "KS2", yearGroup: 3, topic: "Multiplication", level: 3, description: "Learn 3, 4, 6, 7, 8, 9 times tables", examBoard: "National" },
  { id: "m-mul-4", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Multiplication", level: 4, description: "All times tables up to 12×12", examBoard: "National" },
  { id: "m-mul-5", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Multiplication", level: 5, description: "Multiply 2-digit × 2-digit numbers (long mult.)", examBoard: "National" },
  { id: "m-mul-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Multiplication", level: 6, description: "Powers, indices, and multi-step multiplication", examBoard: "Both" },

  // ============ DIVISION ============
  { id: "m-div-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Division", level: 1, description: "Understand sharing and halving", examBoard: "National" },
  { id: "m-div-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Division", level: 2, description: "Divide by 2, 5, 10", examBoard: "National" },
  { id: "m-div-3", subject: "maths", keyStage: "KS2", yearGroup: 3, topic: "Division", level: 3, description: "Short division with times tables", examBoard: "National" },
  { id: "m-div-4", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Division", level: 4, description: "Short division with remainders", examBoard: "National" },
  { id: "m-div-5", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Division", level: 5, description: "Long division of 3+ digit numbers", examBoard: "National" },
  { id: "m-div-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Division", level: 6, description: "Division in ratio and proportion problems", examBoard: "Both" },

  // ============ FRACTIONS ============
  { id: "m-fra-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Fractions", level: 1, description: "Recognise halves and quarters", examBoard: "National" },
  { id: "m-fra-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Fractions", level: 2, description: "Find simple unit fractions of quantities", examBoard: "National" },
  { id: "m-fra-3", subject: "maths", keyStage: "KS2", yearGroup: 3, topic: "Fractions", level: 3, description: "Add/subtract fractions with same denominator", examBoard: "National" },
  { id: "m-fra-4", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Fractions", level: 4, description: "Simplify and convert between mixed/improper", examBoard: "National" },
  { id: "m-fra-5", subject: "maths", keyStage: "KS2", yearGroup: 6, topic: "Fractions", level: 5, description: "Multiply and divide fractions", examBoard: "National" },
  { id: "m-fra-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Fractions", level: 6, description: "Solve equations involving fractions", examBoard: "Both" },

  // ============ DECIMALS ============
  { id: "m-dec-1", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Decimals", level: 1, description: "Understand halves and wholes as decimals (money)", examBoard: "National" },
  { id: "m-dec-2", subject: "maths", keyStage: "KS2", yearGroup: 3, topic: "Decimals", level: 2, description: "Add and subtract simple decimals", examBoard: "National" },
  { id: "m-dec-3", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Decimals", level: 3, description: "Multiply/divide decimals by whole numbers", examBoard: "National" },
  { id: "m-dec-4", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Decimals", level: 4, description: "Round decimals to 1 and 2 decimal places", examBoard: "National" },
  { id: "m-dec-5", subject: "maths", keyStage: "KS2", yearGroup: 6, topic: "Decimals", level: 5, description: "Convert between fractions, decimals, percentages", examBoard: "National" },
  { id: "m-dec-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Decimals", level: 6, description: "Recurring decimals and standard form", examBoard: "Both" },

  // ============ ALGEBRA ============
  { id: "m-alg-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Algebra Basics", level: 1, description: "Complete number patterns", examBoard: "National" },
  { id: "m-alg-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Algebra Basics", level: 2, description: "Find missing numbers in simple equations", examBoard: "National" },
  { id: "m-alg-3", subject: "maths", keyStage: "KS2", yearGroup: 6, topic: "Algebra Basics", level: 3, description: "Solve one-step linear equations", examBoard: "National" },
  { id: "m-alg-4", subject: "maths", keyStage: "KS3", yearGroup: 7, topic: "Algebra Basics", level: 4, description: "Solve two-step equations and use variables", examBoard: "National" },
  { id: "m-alg-5", subject: "maths", keyStage: "KS3", yearGroup: 9, topic: "Algebra Basics", level: 5, description: "Expand brackets and substitute values", examBoard: "National" },
  { id: "m-alg-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Algebra Basics", level: 6, description: "Factorise, solve quadratics, and simultaneous equations", examBoard: "Both" },

  // ============ GEOMETRY ============
  { id: "m-geo-1", subject: "maths", keyStage: "KS1", yearGroup: 1, topic: "Geometry", level: 1, description: "Identify 2D shapes (circle, square, triangle)", examBoard: "National" },
  { id: "m-geo-2", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Geometry", level: 2, description: "Identify 3D shapes and their properties", examBoard: "National" },
  { id: "m-geo-3", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Geometry", level: 3, description: "Calculate area and perimeter of rectangles", examBoard: "National" },
  { id: "m-geo-4", subject: "maths", keyStage: "KS2", yearGroup: 6, topic: "Geometry", level: 4, description: "Measure and calculate angles in triangles", examBoard: "National" },
  { id: "m-geo-5", subject: "maths", keyStage: "KS3", yearGroup: 8, topic: "Geometry", level: 5, description: "Area/circumference of circles; volumes of cuboids", examBoard: "National" },
  { id: "m-geo-6", subject: "maths", keyStage: "GCSE", yearGroup: 11, topic: "Geometry", level: 6, description: "Pythagoras, trigonometry (SOH-CAH-TOA)", examBoard: "Both" },

  // ============ PERCENTAGES ============
  { id: "m-per-1", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Percentages", level: 1, description: "Understand 50% and 100% as half and whole", examBoard: "National" },
  { id: "m-per-2", subject: "maths", keyStage: "KS2", yearGroup: 4, topic: "Percentages", level: 2, description: "Find 50%, 25%, 10% of amounts", examBoard: "National" },
  { id: "m-per-3", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Percentages", level: 3, description: "Calculate simple percentage of a quantity", examBoard: "National" },
  { id: "m-per-4", subject: "maths", keyStage: "KS2", yearGroup: 6, topic: "Percentages", level: 4, description: "Find any % of an amount; percentage increase", examBoard: "National" },
  { id: "m-per-5", subject: "maths", keyStage: "KS3", yearGroup: 8, topic: "Percentages", level: 5, description: "Percentage change and reverse percentages", examBoard: "National" },
  { id: "m-per-6", subject: "maths", keyStage: "GCSE", yearGroup: 10, topic: "Percentages", level: 6, description: "Compound interest and depreciation", examBoard: "Both" },

  // ============ RATIOS ============
  { id: "m-rat-1", subject: "maths", keyStage: "KS1", yearGroup: 2, topic: "Ratios", level: 1, description: "Compare quantities (more/less/same)", examBoard: "National" },
  { id: "m-rat-2", subject: "maths", keyStage: "KS2", yearGroup: 5, topic: "Ratios", level: 2, description: "Simplify simple ratios", examBoard: "National" },
  { id: "m-rat-3", subject: "maths", keyStage: "KS2", yearGroup: 6, topic: "Ratios", level: 3, description: "Share amounts in given ratio", examBoard: "National" },
  { id: "m-rat-4", subject: "maths", keyStage: "KS3", yearGroup: 7, topic: "Ratios", level: 4, description: "Share using part:part and part:whole ratios", examBoard: "National" },
  { id: "m-rat-5", subject: "maths", keyStage: "KS3", yearGroup: 9, topic: "Ratios", level: 5, description: "Scale factors, map scales, direct proportion", examBoard: "National" },
  { id: "m-rat-6", subject: "maths", keyStage: "GCSE", yearGroup: 11, topic: "Ratios", level: 6, description: "Three-part ratios and inverse proportion", examBoard: "Both" },
];

// ENGLISH objectives — spans Year 1 through GCSE
export const ENGLISH_OBJECTIVES: CurriculumObjective[] = [
  // ============ READING ============
  { id: "e-rea-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Reading", level: 1, description: "Understand basic book parts (title, cover)", examBoard: "National" },
  { id: "e-rea-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Reading", level: 2, description: "Distinguish fiction/non-fiction; identify author", examBoard: "National" },
  { id: "e-rea-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Reading", level: 3, description: "Identify protagonist, plot, and story structure", examBoard: "National" },
  { id: "e-rea-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Reading", level: 4, description: "Analyse setting, theme, and point of view", examBoard: "National" },
  { id: "e-rea-5", subject: "english", keyStage: "KS3", yearGroup: 8, topic: "Reading", level: 5, description: "Recognise symbolism, foreshadowing, genre", examBoard: "National" },
  { id: "e-rea-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Reading", level: 6, description: "Analyse tone, motif, and dramatic irony in texts", examBoard: "Both" },

  // ============ SPELLING ============
  { id: "e-spe-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Spelling", level: 1, description: "Spell common 3-letter words (CVC)", examBoard: "National" },
  { id: "e-spe-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Spelling", level: 2, description: "Spell Year 2 common exception words", examBoard: "National" },
  { id: "e-spe-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Spelling", level: 3, description: "Spell Year 3/4 spelling list words", examBoard: "National" },
  { id: "e-spe-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Spelling", level: 4, description: "Spell Year 5/6 spelling list words", examBoard: "National" },
  { id: "e-spe-5", subject: "english", keyStage: "KS3", yearGroup: 8, topic: "Spelling", level: 5, description: "Spell complex academic vocabulary", examBoard: "National" },
  { id: "e-spe-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Spelling", level: 6, description: "Accurate spelling in extended writing", examBoard: "Both" },

  // ============ GRAMMAR ============
  { id: "e-gra-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Grammar", level: 1, description: "Identify nouns, verbs, adjectives simply", examBoard: "National" },
  { id: "e-gra-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Grammar", level: 2, description: "Use proper nouns; form simple plurals", examBoard: "National" },
  { id: "e-gra-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Grammar", level: 3, description: "Identify articles, adjectives; irregular plurals", examBoard: "National" },
  { id: "e-gra-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Grammar", level: 4, description: "Adverbs, pronouns, prepositions; past tenses", examBoard: "National" },
  { id: "e-gra-5", subject: "english", keyStage: "KS3", yearGroup: 8, topic: "Grammar", level: 5, description: "Homophones (their/there/they're); conjunctions", examBoard: "National" },
  { id: "e-gra-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Grammar", level: 6, description: "Active/passive voice; subordinate clauses; subjunctive", examBoard: "Both" },

  // ============ PUNCTUATION ============
  { id: "e-pun-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Punctuation", level: 1, description: "Use capital letters and full stops", examBoard: "National" },
  { id: "e-pun-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Punctuation", level: 2, description: "Use question marks, exclamation marks, commas in lists", examBoard: "National" },
  { id: "e-pun-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Punctuation", level: 3, description: "Use apostrophes for possession and speech marks", examBoard: "National" },
  { id: "e-pun-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Punctuation", level: 4, description: "Commas in compound sentences; ellipsis; dashes", examBoard: "National" },
  { id: "e-pun-5", subject: "english", keyStage: "KS3", yearGroup: 8, topic: "Punctuation", level: 5, description: "Semicolons, colons, hyphens", examBoard: "National" },
  { id: "e-pun-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Punctuation", level: 6, description: "Accurate punctuation in extended writing", examBoard: "Both" },

  // ============ VOCABULARY ============
  { id: "e-voc-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Vocabulary", level: 1, description: "Basic adjectives and opposites", examBoard: "National" },
  { id: "e-voc-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Vocabulary", level: 2, description: "Synonyms for common words", examBoard: "National" },
  { id: "e-voc-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Vocabulary", level: 3, description: "Synonyms and antonyms", examBoard: "National" },
  { id: "e-voc-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Vocabulary", level: 4, description: "Ambitious vocabulary (reluctant, generous, etc.)", examBoard: "National" },
  { id: "e-voc-5", subject: "english", keyStage: "KS3", yearGroup: 8, topic: "Vocabulary", level: 5, description: "Sophisticated vocabulary (meticulous, dubious)", examBoard: "National" },
  { id: "e-voc-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Vocabulary", level: 6, description: "Advanced vocabulary (ubiquitous, ephemeral, pragmatic)", examBoard: "Both" },

  // ============ CREATIVE WRITING ============
  { id: "e-cre-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Creative Writing", level: 1, description: "Understand story structure (beginning/middle/end)", examBoard: "National" },
  { id: "e-cre-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Creative Writing", level: 2, description: "Use adjectives; create simple characters/settings", examBoard: "National" },
  { id: "e-cre-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Creative Writing", level: 3, description: "Use similes; understand first-person narration", examBoard: "National" },
  { id: "e-cre-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Creative Writing", level: 4, description: "Use metaphors, dialogue, flashbacks", examBoard: "National" },
  { id: "e-cre-5", subject: "english", keyStage: "KS3", yearGroup: 8, topic: "Creative Writing", level: 5, description: "Alliteration, personification, hyperbole; show don't tell", examBoard: "National" },
  { id: "e-cre-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Creative Writing", level: 6, description: "Onomatopoeia, pathetic fallacy, juxtaposition, hooks", examBoard: "Both" },

  // ============ COMPREHENSION ============
  { id: "e-com-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Comprehension", level: 1, description: "Basic literal understanding of text", examBoard: "National" },
  { id: "e-com-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Comprehension", level: 2, description: "Identify main idea; distinguish fact/opinion", examBoard: "National" },
  { id: "e-com-3", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Comprehension", level: 3, description: "Summarise text; understand opinions vs facts", examBoard: "National" },
  { id: "e-com-4", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Comprehension", level: 4, description: "Skim and scan; identify topic sentences; paraphrase", examBoard: "National" },
  { id: "e-com-5", subject: "english", keyStage: "KS3", yearGroup: 9, topic: "Comprehension", level: 5, description: "Use PEE (Point/Evidence/Explain); identify bias", examBoard: "National" },
  { id: "e-com-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Comprehension", level: 6, description: "Analyse tone, connotation, rhetorical devices; synthesis", examBoard: "Both" },

  // ============ POETRY ============
  { id: "e-poe-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Poetry", level: 1, description: "Recognise rhyming words; simple rhymes", examBoard: "National" },
  { id: "e-poe-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Poetry", level: 2, description: "Understand rhythm and verse", examBoard: "National" },
  { id: "e-poe-3", subject: "english", keyStage: "KS2", yearGroup: 4, topic: "Poetry", level: 3, description: "Stanzas, limericks, and imagery in poetry", examBoard: "National" },
  { id: "e-poe-4", subject: "english", keyStage: "KS2", yearGroup: 6, topic: "Poetry", level: 4, description: "Haiku (5-7-5); free verse; repetition", examBoard: "National" },
  { id: "e-poe-5", subject: "english", keyStage: "KS3", yearGroup: 9, topic: "Poetry", level: 5, description: "Enjambment, rhyme schemes, couplets, meter", examBoard: "National" },
  { id: "e-poe-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Poetry", level: 6, description: "Sonnets, iambic pentameter, volta, odes", examBoard: "Both" },

  // ============ SHAKESPEARE ============
  { id: "e-sha-1", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Shakespeare Intro", level: 1, description: "Know who Shakespeare was (basic)", examBoard: "National" },
  { id: "e-sha-2", subject: "english", keyStage: "KS2", yearGroup: 3, topic: "Shakespeare Intro", level: 2, description: "Recognise plays are performed in theatres; The Globe", examBoard: "National" },
  { id: "e-sha-3", subject: "english", keyStage: "KS2", yearGroup: 5, topic: "Shakespeare Intro", level: 3, description: "Basic biographical info; famous quotations", examBoard: "National" },
  { id: "e-sha-4", subject: "english", keyStage: "KS3", yearGroup: 7, topic: "Shakespeare Intro", level: 4, description: "Play types (tragedy/comedy/history); key plots", examBoard: "National" },
  { id: "e-sha-5", subject: "english", keyStage: "KS3", yearGroup: 9, topic: "Shakespeare Intro", level: 5, description: "Analyse main plays (Hamlet, Macbeth, R&J)", examBoard: "National" },
  { id: "e-sha-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Shakespeare Intro", level: 6, description: "Iambic pentameter, soliloquies, themes in plays", examBoard: "Both" },

  // ============ ESSAY SKILLS ============
  { id: "e-ess-1", subject: "english", keyStage: "KS1", yearGroup: 1, topic: "Essay Skills", level: 1, description: "Understand beginning/middle/end structure", examBoard: "National" },
  { id: "e-ess-2", subject: "english", keyStage: "KS1", yearGroup: 2, topic: "Essay Skills", level: 2, description: "Write in clear paragraphs with connectives", examBoard: "National" },
  { id: "e-ess-3", subject: "english", keyStage: "KS2", yearGroup: 4, topic: "Essay Skills", level: 3, description: "Plan, draft, edit writing", examBoard: "National" },
  { id: "e-ess-4", subject: "english", keyStage: "KS2", yearGroup: 6, topic: "Essay Skills", level: 4, description: "Thesis statements; topic sentences; evidence", examBoard: "National" },
  { id: "e-ess-5", subject: "english", keyStage: "KS3", yearGroup: 9, topic: "Essay Skills", level: 5, description: "Counter-arguments; transitional phrases; engage reader", examBoard: "National" },
  { id: "e-ess-6", subject: "english", keyStage: "GCSE", yearGroup: 10, topic: "Essay Skills", level: 6, description: "Formal register; structured analysis; hedging language", examBoard: "Both" },
];

export const ALL_OBJECTIVES: CurriculumObjective[] = [
  ...MATHS_OBJECTIVES,
  ...ENGLISH_OBJECTIVES,
];

// Helper: Given a child's topic progress data, compute which objectives they've mastered.
// Mastery rule: at least 5 attempts at the required level (or higher), with ≥ 80% accuracy.
// We approximate this using topic_progress records and current child level.

export interface ObjectiveProgress {
  objective: CurriculumObjective;
  status: "mastered" | "in_progress" | "not_started";
  attempts: number;
  accuracy: number;
}

export function computeObjectiveProgress(
  objective: CurriculumObjective,
  topicAttempts: number,
  topicCorrect: number,
  childCurrentLevel: number
): ObjectiveProgress {
  const accuracy = topicAttempts > 0 ? topicCorrect / topicAttempts : 0;

  // Must be at or past the level this objective represents
  const reachedLevel = childCurrentLevel >= objective.level;

  let status: "mastered" | "in_progress" | "not_started" = "not_started";

  if (!reachedLevel && topicAttempts === 0) {
    status = "not_started";
  } else if (reachedLevel && topicAttempts >= 5 && accuracy >= 0.8) {
    status = "mastered";
  } else if (topicAttempts > 0) {
    status = "in_progress";
  } else {
    status = "not_started";
  }

  return { objective, status, attempts: topicAttempts, accuracy };
}

export function summariseSubject(
  subject: "maths" | "english",
  progressList: ObjectiveProgress[]
) {
  const subjectObjectives = progressList.filter((p) => p.objective.subject === subject);
  const mastered = subjectObjectives.filter((p) => p.status === "mastered").length;
  const inProgress = subjectObjectives.filter((p) => p.status === "in_progress").length;
  const notStarted = subjectObjectives.filter((p) => p.status === "not_started").length;
  const total = subjectObjectives.length;

  const gcseObjectives = subjectObjectives.filter((p) => p.objective.keyStage === "GCSE");
  const gcseMastered = gcseObjectives.filter((p) => p.status === "mastered").length;

  return {
    total,
    mastered,
    inProgress,
    notStarted,
    percentComplete: total > 0 ? Math.round((mastered / total) * 100) : 0,
    gcseTotal: gcseObjectives.length,
    gcseMastered,
    gcsePercent: gcseObjectives.length > 0 ? Math.round((gcseMastered / gcseObjectives.length) * 100) : 0,
  };
}