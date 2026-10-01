export type Item = { title: string; body: string };
export type Stat = { value: string; label: string; icon: string };
export type Company = {
  id: string;
  n: string;
  name: string;
  role: string;
  place: string;
  dates: string;
  intro: string;
  areas: string[];
  note: string;
  question: string;
  bullets: string[];
  items: Item[];
  outcomes: Stat[];
};

// 24×24 line icons used by the stat tiles
export const icons = {
  chart: 'M5 20V10h4v10M10 20V4h4v16M15 20v-7h4v7M3 20h18',
  stack: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  clock: 'M12 3a9 9 0 1 0 0.01 0M12 7v5l3.5 2',
  doc: 'M6 3h12v18H6zM9 8h6M9 12h6M9 16h4',
  chat: 'M4 5h16v11H9l-5 4zM9 10.5h.01M12 10.5h.01M15 10.5h.01',
  bolt: 'M13 2 5 13h6l-1 9 8-11h-6z',
  people: 'M9 11a3.5 3.5 0 1 0 0.01 0M2.5 20c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5M16.5 4.5a3 3 0 0 1 0 6M18 14.6c2 .7 3.3 2.6 3.6 5.4',
  bars: 'M4 20v-3M8 20v-6M12 20v-9M16 20v-12M20 20V4',
  cart: 'M3 4h2.5l2.2 11h10.6L20.5 7H7M9.5 19.5a1 1 0 1 0 0.01 0M17 19.5a1 1 0 1 0 0.01 0',
  layers: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5',
  tag: 'M3 12V4h8l10 10-8 8zM7.5 7.5h.01',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5c0 3 1.5 4.5 3.7 4.8M16 6h3.5c0 3-1.5 4.5-3.7 4.8M12 13v4M8.5 21h7M10 17h4v4h-4z',
};

export const companies: Company[] = [
  {
    id: 'de-shaw', n: '01', name: 'D. E. Shaw & Co',
    role: 'Research Associate — Data Analytics', place: 'Hyderabad, India', dates: 'June 2025 – Present',
    intro: 'Worked across investment research, financial datasets, and recurring workflows, with a focus on making complex information easier to compare, analyse, and reuse.',
    areas: ['Institutional holdings', 'Data analytics', 'Automation', 'Research infrastructure'],
    note: 'From complex data to clearer decisions.',
    question: 'How might we turn complex research workflows into simpler, scalable tools?',
    bullets: ['350+ institutional funds', '5 hrs → 2 mins', 'Internal adoption'],
    items: [
      { title: '13F holdings analysis', body: 'Structured and tracked holdings across 350+ institutional funds.' },
      { title: 'Research infrastructure', body: 'Standardised data across 150+ funds and benchmarks, 50+ papers, 20+ hedge funds, and 15 years of EM turnover data.' },
      { title: 'Workflow automation', body: 'Automated newsletter and research-monitoring workflows, reducing a 5-hour manual process to 2 minutes.' },
    ],
    outcomes: [
      { value: '350+', label: 'institutional funds', icon: 'chart' },
      { value: '150+', label: 'funds & benchmarks', icon: 'stack' },
      { value: '5\u00a0hrs → 2\u00a0mins', label: 'manual process to automated', icon: 'clock' },
      { value: '10–15', label: 'workflows documented', icon: 'doc' },
    ],
  },
  {
    id: 'groww', n: '02', name: 'Groww',
    role: 'Customer Analyst', place: 'Bengaluru, India', dates: 'May 2024 – Jul 2024',
    intro: 'Worked on customer onboarding, KYC, activation, and query-resolution workflows to understand where users got stuck and how support could be made smoother.',
    areas: ['Customer operations', 'User research', 'Support workflows'],
    note: 'Where were people getting stuck?',
    question: 'How might we help more people invest with confidence?',
    bullets: ['5,000+ queries', '25% faster activation', 'Smoother onboarding'],
    items: [
      { title: 'KYC and activation analysis', body: 'Analysed 5,000+ activation queries to identify recurring friction points.' },
      { title: 'Chatbot and escalation patterns', body: 'Studied interactions and support cases to identify drivers of escalations.' },
      { title: 'Resolution workflows', body: 'Helped structure templates and workflows to improve onboarding consistency.' },
    ],
    outcomes: [
      { value: '5,000+', label: 'queries analysed', icon: 'chat' },
      { value: '25%', label: 'faster activation', icon: 'bolt' },
      { value: '20%', label: 'fewer escalations', icon: 'people' },
      { value: '30%', label: 'better onboarding efficiency', icon: 'bars' },
    ],
  },
  {
    id: 'mensa', n: '03', name: 'Mensa Brands',
    role: 'Growth Analyst — TrustBasket', place: 'Bengaluru, India', dates: 'June 2023 – Aug 2023',
    intro: 'Worked on Amazon advertising, marketplace growth, competitor analysis, and listing optimisation for TrustBasket’s home and garden range.',
    areas: ['Growth', 'Marketplace strategy', 'Content & listings', 'Competitor analysis'],
    note: 'Understand the market. Find the gaps.',
    question: 'How might we grow presence and engagement in a highly competitive space?',
    bullets: ['300+ competitor products', '60% higher impressions', 'Ad spend ↓ 40%'],
    items: [
      { title: 'Marketplace analysis', body: 'Studied 300+ competitor products across 5–6 brands.' },
      { title: 'Listing and content strategy', body: 'Improved positioning, keywords, and listing performance.' },
      { title: 'Campaign optimisation', body: 'Refined advertising to improve sales while lowering ad spend.' },
    ],
    outcomes: [
      { value: '300+', label: 'products analysed', icon: 'cart' },
      { value: '5–6', label: 'brands studied', icon: 'layers' },
      { value: '60%', label: 'higher impressions', icon: 'bars' },
      { value: '↓ 40%', label: 'ad spend', icon: 'tag' },
      { value: 'Sales doubled', label: 'across 80% of products', icon: 'trophy' },
    ],
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
    examples: ['5 hrs → 2 mins', '2–3 hrs → 30 mins', 'onboarding 4 weeks → 2 weeks', 'reusable knowledge'],
    icon: 'better',
  },
];

export const practice = [
  { title: 'Automated research newsletters', where: 'D. E. Shaw', body: 'Python + Claude workflows for extraction, flagging, categorising and formatting.', metric: '5 hrs → 2 mins', viz: 'pipeline' },
  { title: 'Rider fairness analysis', where: '', body: 'Reverse-engineered scoring and analysed 15,000 records.', metric: '99.9% reconstructed fit', viz: 'fit', href: '/projects/rider-fairness/' },
  { title: 'Healthcare expenditure research', where: '', body: 'Regression analysis in Jamovi.', metric: '370 responses · 63.1% variance explained', viz: 'r2', href: '/projects/healthcare-expenditure/' },
  { title: 'Customer friction analysis', where: 'Groww', body: '5,000+ customer queries analysed.', metric: '5,000+ queries', viz: 'buckets' },
  { title: 'Marketplace / competitor research', where: 'Mensa', body: '300+ products studied.', metric: '300+ products', viz: 'grid' },
];

// logo: file in public/logos/ (official marks); mono: plain text tile where no official mark is available
export const toolGroups = [
  { name: 'Analysis & statistics', tools: [
    { name: 'Python', logo: 'python.svg' },
    { name: 'Excel', logo: 'excel.svg' },
    { name: 'Jamovi', mono: 'jmv' },
    { name: 'EViews', mono: 'EV' },
  ] },
  { name: 'Data & dashboards', tools: [
    { name: 'SQL / MySQL', logo: 'mysql.svg' },
    { name: 'Power BI', logo: 'powerbi.svg' },
    { name: 'Tableau', logo: 'tableau.svg' },
  ] },
  { name: 'Building with AI', tools: [
    { name: 'Claude', logo: 'claude.svg' },
    { name: 'Cursor', logo: 'cursor.svg' },
  ] },
];
