export type Theme = { title: string; body: string; evidence: string };
export type Company = {
  id: string;
  n: string;
  short: string;
  name: string;
  descriptor: string;
  intro: string;
  question: string;
  keyword: string;
  metric: string;
  themes: Theme[];
  reflection: string;
};

export const companies: Company[] = [
  {
    id: 'de-shaw', n: '01', short: 'D.E.S.', name: 'D. E. Shaw & Co',
    descriptor: 'Financial research · data · automation',
    intro: 'Worked across investment research, financial datasets, and recurring workflows, with a focus on making complex information easier to compare, analyse, and reuse.',
    question: 'How do you make complex research easier to use?',
    keyword: 'clarity', metric: '5 hrs → ~2 mins',
    themes: [
      { title: 'Making unlike things comparable', body: 'Standardised information across funds, benchmarks, filings, and research sources so different datasets could be analysed side by side.', evidence: '150+ funds & benchmarks · 15 years of data' },
      { title: 'Automating the repeatable, keeping judgment human', body: 'Automated repetitive extraction, sorting, and formatting while keeping review-heavy research decisions manual.', evidence: '~5 hrs → ~2 mins' },
      { title: 'From learning the workflow to owning it', body: 'Moved from learning the quarterly 13F process to independently managing timelines, coordination, and final outputs.', evidence: '350+ institutional funds' },
      { title: 'Finding the signal in financial data', body: 'Compared holdings, fee structures, company filings, and market datasets to identify patterns and differences that mattered.', evidence: '8+ hedge funds · 60+ companies' },
      { title: 'Making knowledge transferable', body: 'Turned recurring work into SOPs, checklists, and training material that newer analysts could use independently.', evidence: '10–15 workflows · onboarding ~4 weeks → ~2 weeks' },
    ],
    reflection: 'solving the task, then questioning the process.',
  },
  {
    id: 'groww', n: '02', short: 'Groww', name: 'Groww',
    descriptor: 'Customer operations · onboarding · support',
    intro: 'Worked with customer and support data to understand where users were getting stuck and how onboarding and self-service could be made smoother.',
    question: 'Where do customers get stuck, and why?',
    keyword: 'friction', metric: '5,000+ queries',
    themes: [
      { title: 'Finding recurring friction', body: 'Analysed 5,000+ KYC and activation queries to identify the issues customers repeatedly faced.', evidence: 'activation time ↓ ~25%' },
      { title: 'Understanding why self-service escalated', body: 'Looked at chatbot and support-query patterns to understand where customers still needed human help.', evidence: 'escalations ↓ ~20%' },
      { title: 'Making support knowledge easier to use', body: 'Helped structure workflows and internal guidance so issues could be handled more consistently.', evidence: 'onboarding efficiency ↑ ~30%' },
    ],
    reflection: 'where are people getting stuck?',
  },
  {
    id: 'mensa', n: '03', short: 'Mensa', name: 'Mensa Brands',
    descriptor: 'E-commerce · growth · consumer behaviour',
    intro: 'Worked on Amazon advertising, product positioning, and competitor analysis to understand what helped products get discovered and chosen.',
    question: 'What makes one product get noticed over another?',
    keyword: 'choice', metric: '300+ competitor products',
    themes: [
      { title: 'Improving discoverability', body: 'Worked on keywords, listings, and advertising across gardening products to improve how often they appeared in search.', evidence: 'impressions ↑ ~60%' },
      { title: 'Understanding the shelf around the product', body: 'Compared 300+ competitor products across 5–6 brands to understand pricing, features, reviews, positioning, and bundles.', evidence: '300+ products · 5–6 brands' },
      { title: 'Making ad spend work harder', body: 'Used campaign performance and marketplace insights to refine advertising across 40–60 products.', evidence: 'sales doubled across ~80% · ad spend ↓ ~40%' },
    ],
    reflection: 'what makes one product stand out?',
  },
];

export const toolkitSteps = [
  {
    n: '01', title: 'Understand the mess',
    body: 'What’s here, what’s missing, and what can actually be compared?',
    examples: ['13F filings', 'survey responses', 'customer queries', 'marketplace data'],
    icon: 'mess',
  },
  {
    n: '02', title: 'Give it structure',
    body: 'Clean it, standardise it, join sources, categorise it, and make assumptions explicit.',
    examples: ['DRHP data (10+ years)', 'research databases', 'multilingual content', 'competitor data'],
    icon: 'structure',
  },
  {
    n: '03', title: 'Test what matters',
    body: 'Use the right analysis to separate signal from noise and understand what is driving the outcome.',
    examples: ['regression + correlation', 'time-series analysis', 'pattern analysis', 'benchmarks'],
    icon: 'test',
  },
  {
    n: '04', title: 'Build the answer',
    body: 'Turn it into a dashboard, automation, database, framework or clearer workflow.',
    examples: ['newsletter automation', 'Power BI dashboards', 'Python workflows', 'SOPs + research repository'],
    icon: 'build',
  },
  {
    n: '05', title: 'Leave it better',
    body: 'Document it, make it repeatable, and reduce how much knowledge has to live in someone’s head.',
    examples: ['5 hrs → ~2 mins', '2–3 hrs → ~30 mins', 'onboarding 4 weeks → 2 weeks', 'reusable knowledge'],
    icon: 'better',
  },
];

export const practice = [
  { title: 'Automated research newsletters', where: 'D. E. Shaw', body: 'Python + Claude workflows for extraction, flagging, categorising and formatting.', metric: '~5 hrs → ~2 mins', viz: 'pipeline' },
  { title: 'Rider fairness analysis', where: '', body: 'Reverse-engineered scoring and analysed 15,000 records.', metric: '99.9% reconstructed fit', viz: 'fit', href: '/projects/rider-fairness/' },
  { title: 'Healthcare expenditure research', where: '', body: 'Regression analysis in Jamovi.', metric: '370 responses · 63.1% variance explained', viz: 'r2', href: '/projects/healthcare-expenditure/' },
  { title: 'Customer friction analysis', where: 'Groww', body: '5,000+ customer queries analysed.', metric: '5,000+ queries', viz: 'buckets' },
  { title: 'Marketplace / competitor research', where: 'Mensa', body: '300+ products studied.', metric: '300+ products', viz: 'grid' },
];

export const tools = ['Python', 'SQL / MySQL', 'Power BI', 'Excel', 'Jamovi', 'EViews', 'Tableau', 'Claude', 'Cursor'];
