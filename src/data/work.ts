export type Item = { title: string; body: string; evidence?: string[]; hand?: string; quote?: string };
export type Stat = { value: string; label: string; icon: string };
export type Company = {
  id: string;
  n: string;
  name: string;
  company?: string;
  role: string;
  place: string;
  dates: string;
  intro: string;
  areas: string[];
  note: string;
  question: string;
  keyword: string;
  bullets: string[];
  items: Item[];
  outcomes: Stat[];
  closing: string;
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
    role: 'Research Associate', place: 'Hyderabad, India', dates: 'June 2025 – Present',
    intro: 'A lot of my work here begins with information that is recurring, scattered, or difficult to compare. I work on turning it into structured analysis, reusable data, or a process that is easier to run the next time.',
    areas: ['Institutional holdings', 'Data analytics', 'Automation', 'Research infrastructure'],
    note: 'From complex data to clearer decisions.',
    question: 'How do you make recurring research easier to compare, update and use?',
    keyword: 'clarity',
    bullets: ['33–40 funds / quarter', '2 hrs → 30 mins'],
    items: [
      {
        title: 'Track what changed',
        body: 'I analyse quarterly SEC 13F filings across 33–40 institutional funds, structuring holdings in Power BI to track new positions, exits, and changes in position size across quarters.',
        evidence: ['33–40 funds', 'quarterly holdings analysis', 'Power BI'],
        hand: 'the number matters. the change usually matters more.',
      },
      {
        title: 'Make unlike markets comparable',
        body: 'I standardised 15 years of emerging-markets turnover data across countries and exchanges, creating a consistent benchmark for comparing liquidity and trading activity over time.',
        evidence: ['15 years', 'countries + exchanges', 'one comparable benchmark'],
        hand: 'same metric. different markets.',
      },
      {
        title: 'Turn filings into something you can actually screen',
        body: 'Using 10+ years of DRHP data across 60+ sub-$100M companies, I built a recurring analytics database and dashboard that standardised financial metrics and made companies easier to compare by industry and profitability.',
        evidence: ['10+ years', '60+ companies', 'database + dashboard'],
      },
      {
        title: 'Automate the repeatable part',
        body: 'I built automation for recurring intelligence and disclosure workflows rather than treating every update as a fresh manual task.',
        evidence: ['daily intelligence tracking: 2 hrs → 30 mins', 'shareholding disclosures: 30–40 mins → 2–3 mins'],
        hand: 'if it happens every day, I’m probably wondering why it still happens manually.',
      },
    ],
    outcomes: [
      { value: '33–40', label: 'institutional funds each quarter', icon: 'chart' },
      { value: '15 years', label: 'EM turnover data standardised', icon: 'stack' },
      { value: '60+', label: 'companies, 10+ years of DRHP data', icon: 'doc' },
      { value: '75%', label: 'less time on daily tracking', icon: 'clock' },
    ],
    closing: 'I started caring as much about the system around the analysis as the analysis itself.',
  },
  {
    id: 'groww', n: '02', name: 'Groww',
    role: 'Customer Analyst Intern', place: 'Bengaluru, India', dates: 'May 2024 – July 2024',
    intro: 'At Groww, the data was much closer to the customer. The interesting question was not just what people were asking, but why the same problems kept bringing them back.',
    areas: ['Customer operations', 'User research', 'Support workflows'],
    note: 'Where were people getting stuck?',
    question: 'Where are customers getting stuck — and why?',
    keyword: 'friction',
    bullets: ['5,000+ queries', 'activation time ↓20%'],
    items: [
      {
        title: 'Where activation slowed down',
        body: 'I analysed 5,000+ stock-trading and F&O activation queries to identify documentation and verification bottlenecks in the KYC journey.',
        evidence: ['activation time ↓20%'],
        hand: 'where exactly does “this is taking too long” begin?',
      },
      {
        title: 'Why self-service still became an escalation',
        body: 'I studied chatbot and customer-query patterns to identify what was driving support escalations, then helped standardise response templates and resolution steps.',
        evidence: ['customer escalations ↓20%'],
        quote: 'A customer rarely says “your process has a bottleneck.” They just tell you they’re stuck.',
      },
    ],
    outcomes: [
      { value: '5,000+', label: 'stock-trading and F&O activation queries', icon: 'chat' },
      { value: '20%', label: 'reduction in activation time', icon: 'bolt' },
      { value: '20%', label: 'reduction in customer escalations', icon: 'people' },
    ],
    closing: 'This was where customer friction stopped feeling abstract. Repeated patterns showed up clearly across thousands of individual conversations.',
  },
  {
    id: 'mensa', n: '03', name: 'Mensa Brands', company: 'Mensa Brands (now BRND.ME)',
    role: 'Growth Analyst Intern', place: 'Bengaluru, India', dates: 'June 2023 – August 2023',
    intro: 'Mensa was my first close look at how small marketplace decisions — a keyword, bid, listing, or positioning choice — could change what people noticed and bought.',
    areas: ['Growth', 'Marketplace strategy', 'Content & listings', 'Competitor analysis'],
    note: 'Understand the market. Find the gaps.',
    question: 'What makes one product easier to find and choose?',
    keyword: 'choice',
    bullets: ['300+ competitor products', 'ad spend ↓40%'],
    items: [
      {
        title: 'Make ad spend work harder',
        body: 'I worked across a 40–60 product Amazon portfolio, adjusting bids and reallocating spend using Amazon Ads and Helium 10.',
        evidence: ['sales doubled across 80% of products', 'ad spend ↓40%'],
      },
      {
        title: 'Understand the shelf around the product',
        body: 'I analysed 300+ competing products across 5–6 gardening brands to understand what competitors were ranking for, which high-search keywords they were underusing, and where positioning opportunities existed.',
        evidence: ['300+ products', '5–6 brands'],
        hand: 'what are they calling it? what are customers actually searching for? what’s missing from the shelf?',
      },
      {
        title: 'Turn the research into positioning',
        body: 'Those competitor and search insights fed into listing optimisation and new-product positioning rather than staying as a research exercise.',
        quote: 'The product is only part of the decision. First, someone has to notice it.',
      },
    ],
    outcomes: [
      { value: '40–60', label: 'product Amazon portfolio', icon: 'cart' },
      { value: 'Sales doubled', label: 'across 80% of products', icon: 'trophy' },
      { value: '↓40%', label: 'ad spend', icon: 'tag' },
      { value: '300+', label: 'competing products analysed', icon: 'bars' },
      { value: '5–6', label: 'gardening brands', icon: 'layers' },
    ],
    closing: 'This was probably where my curiosity about consumer choice became much more concrete.',
  },
];

export const toolkitSteps = [
  {
    n: '01', title: 'Understand the mess',
    body: 'What’s here, what’s missing, and what can actually be compared?',
    examples: ['13F filings', '5,000+ customer queries', '210 healthcare survey responses'],
    icon: 'mess',
  },
  {
    n: '02', title: 'Give it structure',
    body: 'Clean it, standardise it, join sources, categorise it, and make assumptions explicit.',
    examples: ['15 years of EM turnover data', '10+ years of DRHP data', '60+ companies'],
    icon: 'structure',
  },
  {
    n: '03', title: 'Test what matters',
    body: 'Use the right analysis to separate signal from noise and understand what is driving the outcome.',
    examples: ['15,000 rider records', 'regression', 'R² 0.631'],
    icon: 'test',
  },
  {
    n: '04', title: 'Build the answer',
    body: 'Turn it into a dashboard, automation, database, framework or clearer workflow.',
    examples: ['Power BI dashboards', 'Python + Claude automation', 'email-to-database pipeline'],
    icon: 'build',
  },
  {
    n: '05', title: 'Leave it easier than you found it',
    body: 'Document it, make it repeatable, and reduce how much knowledge has to live in someone’s head.',
    examples: ['2 hrs → 30 mins', '30–40 mins → 2–3 mins', 'reusable database + dashboard'],
    icon: 'better',
  },
];

export const practice = [
  { title: 'Daily intelligence tracking', where: 'D. E. Shaw', body: 'Python, Claude and Cursor automation across LinkedIn, Reddit and other sources.', metric: '2 hrs → 30 mins', viz: 'pipeline' },
  { title: 'Shareholding disclosure pipeline', where: 'D. E. Shaw', body: 'Event-driven email-to-database pipeline for 4%/5% shareholding disclosures.', metric: '30–40 mins → 2–3 mins', viz: 'grid' },
  { title: 'Rider fairness analysis', where: '', body: 'Reverse-engineered scoring across 15,000 delivery records.', metric: '99.9% model fit', viz: 'fit', href: '/projects/rider-fairness/' },
  { title: 'Healthcare expenditure research', where: '', body: 'Regression and statistical analysis in Jamovi.', metric: 'R² 0.631', viz: 'r2', href: '/projects/healthcare-expenditure/' },
  { title: 'Customer friction analysis', where: 'Groww', body: '5,000+ stock-trading and F&O activation queries.', metric: 'activation time ↓20%', viz: 'buckets' },
];

// logo: file in public/logos/ (official marks); mono: plain text tile where no official mark is available
export const toolGroups = [
  { name: 'Analysis & statistics', tools: [
    { name: 'Python', logo: 'python.svg' },
    { name: 'Advanced Excel', logo: 'excel.svg' },
    { name: 'Jamovi', mono: 'jmv' },
  ] },
  { name: 'Data & dashboards', tools: [
    { name: 'SQL', mono: 'SQL' },
    { name: 'MySQL', logo: 'mysql.svg' },
    { name: 'Power BI', logo: 'powerbi.svg' },
    { name: 'Tableau', logo: 'tableau.svg' },
  ] },
  { name: 'Building with AI', tools: [
    { name: 'Claude', logo: 'claude.svg' },
    { name: 'Cursor', logo: 'cursor.svg' },
  ] },
];
