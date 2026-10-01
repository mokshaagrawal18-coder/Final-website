export type Item = { title: string; body: string; evidence?: string[]; hand?: string; quote?: string };
export type Company = {
  id: string;
  n: string;
  name: string;
  company?: string;
  role: string;
  place: string;
  dates: string;
  intro: string;
  question: string;
  keyword: string;
  bullets: string[];
  items: Item[];
};

export const companies: Company[] = [
  {
    id: 'de-shaw', n: '01', name: 'D. E. Shaw & Co',
    role: 'Research Associate', place: 'Hyderabad, India', dates: 'June 2025 – Present',
    intro: 'A lot of my work here starts with information that is recurring, scattered, or difficult to compare. I turn it into structured analysis, reusable data, or a process that is easier to run the next time.',
    question: 'How do you make recurring research easier to compare and update?',
    keyword: 'clarity',
    bullets: ['33–40 funds / quarter', '2 hrs → 30 mins'],
    items: [
      {
        title: 'Track what changed',
        body: 'I analyse quarterly 13F filings across 33–40 institutional funds, using Power BI to track new positions, exits, and changes in position size.',
        evidence: ['33–40 funds', 'quarterly analysis', 'Power BI'],
        hand: 'the number matters. the change usually matters more.',
      },
      {
        title: 'Make messy financial data comparable',
        body: 'I standardised 15 years of emerging-market turnover data and built a database using 10+ years of DRHP data across 60+ companies to make financial comparisons easier.',
        evidence: ['15 years of market data', '60+ companies'],
        hand: 'same metric. different context.',
      },
      {
        title: 'Automate the repeatable part',
        body: 'I automated recurring research and disclosure workflows, cutting daily monitoring from 2 hours to 30 minutes and disclosure processing from 30–40 minutes to 2–3 minutes.',
        evidence: ['2 hrs → 30 mins', '30–40 mins → 2–3 mins'],
        hand: 'if it happens every day, I’m probably wondering why it still happens manually.',
      },
    ],
  },
  {
    id: 'groww', n: '02', name: 'Groww',
    role: 'Customer Analyst Intern', place: 'Bengaluru, India', dates: 'May 2024 – July 2024',
    intro: 'At Groww, the interesting question was not just what customers were asking, but why the same problems kept bringing them back.',
    question: 'Where are customers getting stuck — and why?',
    keyword: 'friction',
    bullets: ['5,000+ queries', 'activation time ↓20%'],
    items: [
      {
        title: 'Where activation slowed down',
        body: 'I analysed 5,000+ stock-trading and F&O activation queries to find document and verification bottlenecks in the KYC journey.',
        evidence: ['5,000+ queries', 'activation time ↓20%'],
        hand: 'where exactly does “this is taking too long” begin?',
      },
      {
        title: 'Why self-service still became an escalation',
        body: 'I studied chatbot and customer-query patterns, then helped standardise response templates and resolution steps.',
        evidence: ['customer escalations ↓20%'],
        quote: 'People rarely say “your process has a bottleneck.” They just tell you they’re stuck.',
      },
    ],
  },
  {
    id: 'mensa', n: '03', name: 'Mensa Brands', company: 'Mensa Brands (now BRND.ME)',
    role: 'Growth Analyst Intern', place: 'Bengaluru, India', dates: 'June 2023 – August 2023',
    intro: 'Mensa was my first close look at how small marketplace decisions — a keyword, bid, listing, or positioning choice — could change what people noticed and bought.',
    question: 'What makes one product easier to find and choose?',
    keyword: 'choice',
    bullets: ['300+ competitor products', 'ad spend ↓40%'],
    items: [
      {
        title: 'Make ad spend work harder',
        body: 'I worked across a 40–60 product Amazon portfolio, adjusting bids and reallocating spend using Amazon Ads and Helium 10.',
        evidence: ['sales 2× across 80% of products', 'ad spend ↓40%'],
      },
      {
        title: 'Understand the shelf around the product',
        body: 'I analysed 300+ competing products across 5–6 brands to understand keywords, positioning, and where competitors were leaving gaps.',
        evidence: ['300+ products', '5–6 brands'],
        hand: 'what are customers actually searching for?',
      },
    ],
  },
];

export const toolkitSteps = [
  { n: '01', title: 'Understand the mess', body: 'Start by figuring out what’s actually there.', examples: ['13F filings', 'customer queries', 'survey data', 'marketplace data'] },
  { n: '02', title: 'Give it structure', body: 'Clean it, standardise it, and make the pieces comparable.', examples: ['DRHP data', 'structured holdings', 'SQL / databases', 'market datasets'] },
  { n: '03', title: 'Test what matters', body: 'Use the right analysis to understand what is driving the outcome.', examples: ['regression', 'statistics', 'time series', 'patterns'] },
  { n: '04', title: 'Build the answer', body: 'Turn the analysis into something someone can actually use.', examples: ['dashboards', 'automation', 'databases', 'models'] },
  { n: '05', title: 'Make it repeatable', body: 'If it has to happen again, the second run should not start from zero.', examples: ['2 hrs → 30 mins', '30–40 mins → 2–3 mins', 'reusable workflows'] },
];

// logo: official mark in public/logos/; tools without one show as text only
export const tools = [
  { name: 'Python', logo: 'python.svg' },
  { name: 'SQL' },
  { name: 'MySQL', logo: 'mysql.svg' },
  { name: 'Power BI', logo: 'powerbi.svg' },
  { name: 'Tableau', logo: 'tableau.svg' },
  { name: 'Excel', logo: 'excel.svg' },
  { name: 'Jamovi' },
  { name: 'Claude', logo: 'claude.svg' },
  { name: 'Cursor', logo: 'cursor.svg' },
];
