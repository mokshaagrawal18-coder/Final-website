// All copy and content for Tiny UX Decisions lives here.
// Components decide how things look; this file decides what they say.

export const SOURCE_URL = ''; // Set to the repo URL to show "View source code". Empty hides the link.

/* ---------------------------------------------------------------
   The five experiments
   --------------------------------------------------------------- */

export const experiments = [
  {
    id: 'popular',
    number: '01',
    category: 'Social proof',
    title: 'The Popular One',
    scenario: "You're signing up for a new music app.",
    prompt: 'Which plan would you choose?',
    versionA: 'Three plans, no labels.',
    versionB: 'The same three plans. Plus carries a “Most popular” badge.',
    change: '+ Most popular',
    changeNote: 'Same plans. Same prices. Same features. One option was simply given an extra signal.',
    explanation: [
      '“Most popular” can do two things at once: make an option easier to notice, and provide information about what other people supposedly choose.',
      'That can reduce the work of comparing options. It can also make one choice feel more normal.',
    ],
    question: 'Was the badge useful information, or extra persuasion?',
  },
  {
    id: 'default',
    number: '02',
    category: 'Defaults',
    title: 'Already Checked',
    scenario: "You're booking a weekend trip.",
    prompt: 'Finish your booking.',
    versionA: 'Neither option selected.',
    versionB: 'The same two options. “Add travel protection” is already selected.',
    change: 'Pre-selected',
    changeNote: 'The choice was made before you arrived. Nothing about the insurance changed. Only its starting state.',
    explanation: [
      'Defaults reduce effort because doing nothing becomes a valid choice. That’s useful for things like language, accessibility, or sensible settings.',
      'But when a default costs money or affects privacy, who chooses the default starts to matter.',
    ],
    question: 'When is a default helpful, and when should choosing require a choice?',
  },
  {
    id: 'scarcity',
    number: '03',
    category: 'Scarcity',
    title: 'Only Two Left',
    scenario: "You've been looking for a desk lamp.",
    prompt: 'Would you buy it now, or keep looking?',
    versionA: 'A product page.',
    versionB: 'The same product page with “Only 2 left”.',
    change: '+ Only 2 left',
    changeNote: 'Nothing about the lamp changed. Same price. Same product. Same reviews. Same delivery.',
    explanation: [
      'Scarcity introduces a new possibility: if I wait, I might lose the option.',
      'That changes the decision from “Do I want this?” to “Do I want to risk missing this?” A subtle but important difference.',
    ],
    question: 'Did the product become more attractive, or did waiting become less attractive?',
  },
  {
    id: 'friction',
    number: '04',
    category: 'Friction',
    title: 'Leaving So Soon?',
    scenario: "You've decided to cancel your streaming subscription.",
    prompt: 'Cancel your membership.',
    versionA: 'A two-step cancellation.',
    versionB: 'The same cancellation, routed through offers, a survey and a warning.',
    change: '+ 4 extra screens',
    changeNote: 'Same membership. Same outcome. Same person who had already decided.',
    explanation: [
      'Friction isn’t always visual. Sometimes design shapes behaviour by making one action simply require more effort than another.',
      'An extra click seems tiny. Five extra decisions don’t.',
    ],
    question: 'If saying yes takes one click, how many clicks should saying no take?',
  },
  {
    id: 'recommend',
    number: '05',
    category: 'Recommendations',
    title: 'Picked For You',
    scenario: "You're choosing something to watch tonight.",
    prompt: 'Which would you watch?',
    versionA: 'Four films, no hierarchy.',
    versionB: 'The same four films. One is labelled “Recommended for you”.',
    change: '+ Recommended for you',
    changeNote: 'Same four films, same order, same ratings. One label, with no explanation of why.',
    explanation: [
      'A recommendation can save us from comparing every option ourselves.',
      'But the label also asks us to trust something we can’t see: why was this recommended to me? That matters more as recommendations become more personal.',
    ],
    question: 'Would the recommendation feel different if you knew why it was made?',
  },
];

/* ---------------------------------------------------------------
   Interface content for each experiment (all fictional)
   --------------------------------------------------------------- */

export const plans = [
  {
    id: 'solo',
    tier: 'Listen',
    name: 'Solo',
    price: '₹199',
    features: ['Ad-free listening', 'Offline downloads', '1 account'],
  },
  {
    id: 'plus',
    tier: 'Listen+',
    name: 'Plus',
    price: '₹299',
    features: ['Everything in Solo', 'High-quality audio', 'Unlimited skips', '2 accounts'],
  },
  {
    id: 'max',
    tier: 'Listen Max',
    name: 'Max',
    price: '₹449',
    features: ['Everything in Plus', 'Lossless audio', 'Early feature access', '5 accounts'],
  },
];

export const flight = {
  airline: 'Kestrel Air',
  code: 'KS 412',
  from: 'BLR',
  fromCity: 'Bengaluru',
  to: 'GOI',
  toCity: 'Goa',
  day: 'Saturday',
  depart: '08:20',
  arrive: '09:35',
  fare: 4890,
  protection: 399,
};

export const lamp = {
  brand: 'Milo',
  name: 'Milo Desk Lamp',
  rating: '4.7',
  reviews: '284 reviews',
  price: '₹2,499',
  delivery: 'Free delivery Thursday',
};

export const films = [
  { id: 'midnight', title: 'Midnight Train', genre: 'Thriller', duration: '1h 52m', rating: '4.2', art: 'train' },
  { id: 'planets', title: 'Paper Planets', genre: 'Animated drama', duration: '1h 38m', rating: '4.3', art: 'planets' },
  { id: 'harbour', title: 'The Quiet Harbour', genre: 'Drama', duration: '2h 04m', rating: '4.1', art: 'harbour' },
  { id: 'orchard', title: 'Neon Orchard', genre: 'Sci-fi comedy', duration: '1h 45m', rating: '4.2', art: 'orchard' },
];

// The badge goes on a film the visitor did NOT pick first time round,
// otherwise the label would have nothing it could change.
export const recommendedFor = (firstPick) => {
  const i = films.findIndex((f) => f.id === firstPick);
  return films[(i + 2) % films.length].id;
};

export const cancelReasons = [
  'Too expensive',
  'Not watching enough',
  'Can’t find what I want to watch',
  'Technical problems',
  'Something else',
];

/* ---------------------------------------------------------------
   The Tiny Decisions Library
   --------------------------------------------------------------- */

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'defaults', label: 'Defaults' },
  { id: 'framing', label: 'Framing' },
  { id: 'friction', label: 'Friction' },
  { id: 'urgency', label: 'Urgency' },
  { id: 'social', label: 'Social proof' },
  { id: 'recommendations', label: 'Recommendations' },
];

export const specimens = [
  {
    id: '001',
    title: 'Most Popular',
    label: 'Social proof',
    tags: ['social'],
    body: 'One option is presented as the choice other people make.',
    lookFor: 'Pricing pages.',
  },
  {
    id: '002',
    title: 'Pre-checked',
    label: 'Default',
    tags: ['defaults'],
    body: 'The interface has already selected an option before you interact with it.',
    lookFor: 'Insurance, newsletters, add-ons.',
  },
  {
    id: '003',
    title: 'Only 2 left',
    label: 'Scarcity',
    tags: ['urgency'],
    body: 'Waiting now appears to carry a cost.',
    lookFor: 'Travel and shopping.',
  },
  {
    id: '004',
    title: 'Was ₹3,999',
    label: 'Anchoring',
    tags: ['framing'],
    body: 'An earlier number gives the current price something to be compared against.',
    lookFor: 'Sale pages, hotel rates.',
  },
  {
    id: '005',
    title: '20% off / ₹500 off',
    label: 'Framing',
    tags: ['framing'],
    body: 'Equivalent savings can feel different depending on how they’re expressed.',
    lookFor: 'Coupons, checkout banners.',
  },
  {
    id: '006',
    title: 'Recommended for you',
    label: 'Personalization',
    tags: ['recommendations'],
    body: 'A choice is presented as particularly relevant to you.',
    lookFor: 'Streaming, shopping, feeds.',
  },
  {
    id: '007',
    title: '12 people are viewing this',
    label: 'Social proof + urgency',
    tags: ['social', 'urgency'],
    body: 'Other people’s attention becomes part of your decision.',
    lookFor: 'Hotel and ticket pages.',
  },
  {
    id: '008',
    title: '3 of 5 complete',
    label: 'Progress',
    tags: ['framing'],
    body: 'The same journey can emphasise what you’ve completed or what remains.',
    lookFor: 'Onboarding, profile setup.',
  },
  {
    id: '009',
    title: 'Free trial',
    label: 'Framing',
    tags: ['framing'],
    body: 'The immediate cost is emphasised differently from the future commitment.',
    lookFor: 'Subscriptions, apps.',
  },
  {
    id: '010',
    title: 'Skip for now',
    label: 'Choice architecture',
    tags: ['defaults'],
    body: 'Primary and secondary actions don’t always receive equal visual weight.',
    lookFor: 'Sign-ups, permission prompts.',
  },
  {
    id: '011',
    title: 'Are you sure?',
    label: 'Friction',
    tags: ['friction'],
    body: 'Some decisions receive confirmation screens. Others happen instantly.',
    lookFor: 'Cancelling, unsubscribing, deleting.',
  },
  {
    id: '012',
    title: '4.8 ★ · 18,492 reviews',
    label: 'Social proof',
    tags: ['social'],
    body: 'A rating tells you what people thought. Review volume tells you how many people contributed to that signal.',
    lookFor: 'Marketplaces, app stores.',
  },
];

/* ---------------------------------------------------------------
   Strip the Interface
   --------------------------------------------------------------- */

export const stripLayers = [
  { id: 'scarcity', label: 'Scarcity', shows: '“Only 1 room left”' },
  { id: 'social', label: 'Social proof', shows: 'Stars and review count' },
  { id: 'anchor', label: 'Price anchor', shows: 'The struck-out ₹14,200' },
  { id: 'discount', label: 'Discount framing', shows: '“Save 30%”' },
  { id: 'urgency', label: 'Urgency', shows: '“17 people are viewing this”, “now”' },
  { id: 'recommendation', label: 'Recommendation', shows: '“Guest favourite”' },
];

/* ---------------------------------------------------------------
   Ending
   --------------------------------------------------------------- */

export const builtWith = ['Behavioural research', 'Product thinking', 'Experimental design', 'React', 'JavaScript'];

export const methodology = [
  {
    title: 'One change per experiment',
    body: 'Each A/B pair keeps layout, copy, prices and order identical. The only difference is the element named in the reveal. Where the change needs room (a badge, a line of text), that space is reserved in both versions so nothing else moves.',
  },
  {
    title: 'You are both groups',
    body: 'A real A/B test shows different people different versions. Here you see both, one after the other, so you can feel the change yourself. That makes it a demonstration, not a study: seeing version A first, and knowing it is an experiment, both shape your second answer.',
  },
  {
    title: 'The badge goes somewhere it could matter',
    body: 'In “Picked For You”, the recommendation is placed on a film you didn’t choose the first time. Otherwise it could never change your mind. In the other experiments, the change sits where it would in a real product.',
  },
  {
    title: 'Nothing leaves your browser',
    body: 'Your choices are held in page memory and disappear when you close the tab. There is no backend, no tracking and no aggregated “visitor statistics”.',
  },
  {
    title: 'Everything is fictional',
    body: 'Listen, Kestrel Air, Milo, Reelhouse and The Palm House are invented, so the patterns can be looked at without pointing at any particular company.',
  },
];
