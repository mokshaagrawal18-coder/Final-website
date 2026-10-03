// "In the wild": where each pattern shows up, one sourced number, when it helps or hurts,
// what regulators say, and how the visitor's own result compares with the research.
// Every figure here was checked against its source before being added. Keep it that way:
// if a number can't be traced to a study, a regulator or the company itself, leave it out.

const CCPA = {
  label: 'CCPA Guidelines for Prevention and Regulation of Dark Patterns (India, 2023)',
  url: 'https://trilegal.com/knowledge_repository/guidelines-for-prevention-and-regulation-of-dark-patterns-2023/',
};

export const wild = {
  popular: {
    where: 'Pricing pages for software, streaming and phone plans. “Bestseller” tags on shopping sites. “Guest favourite” on places to stay.',
    number:
      'In a hotel field study, a card saying most guests reuse their towels raised towel reuse from 35.1% to 44.1%, compared with a card that only asked guests to help the environment.',
    helps: 'The label is true, and it saves people comparing options they don’t much care about.',
    hurts: 'It’s invented, or “popular” really means “most profitable for us”.',
    rule: 'India’s 2023 dark-pattern guidelines give “showing false popularity of a product or service” as an example of false urgency.',
    check: 'Is the badge true, and would we still show it if a different plan were the most popular?',
    sources: [
      {
        label: 'Goldstein, Cialdini & Griskevicius (2008), Journal of Consumer Research',
        url: 'https://ideas.repec.org/a/oup/jconrs/v35y2008i3p472-482.html',
      },
      CCPA,
    ],
  },
  default: {
    where: 'Travel insurance at checkout, newsletter tick boxes, app permissions, privacy settings, pension schemes.',
    number:
      'When one US company switched its retirement plan from opt-in to opt-out, 86% of new hires took part, compared with about half or fewer under the old opt-in rule.',
    helps: 'It’s what most people would choose anyway, like saving for retirement or turning on accessibility features.',
    hurts: 'It spends money or shares data that the person never agreed to.',
    rule: 'The EU has banned pre-ticked boxes for paid extras since June 2014. India’s 2023 guidelines call adding paid items without consent “basket sneaking”.',
    check: 'Would most people pick this if we asked them?',
    sources: [
      { label: 'Madrian & Shea (2001), The Power of Suggestion, Quarterly Journal of Economics', url: 'https://www.nber.org/papers/w7682' },
      { label: 'EU Consumer Rights Directive 2011/83/EU, Article 22', url: 'https://www.legislation.gov.uk/eudr/2011/83/article/22' },
      CCPA,
    ],
  },
  scarcity: {
    where: 'Hotel and flight booking, flash sales, concert tickets, “selling fast” labels.',
    number:
      'A 2019 crawl of about 11,000 shopping sites found 1,818 dark-pattern instances, including low-stock and countdown messages. On 183 of those sites, the messages were outright deceptive.',
    helps: 'The stock count is real, and you’d genuinely be disappointed to miss out.',
    hurts: 'The number is invented, or the same warning is shown to everyone on a timer.',
    rule: 'In 2019 the UK competition regulator got Booking.com, Expedia, Agoda and Trivago to commit to dropping misleading pressure-selling claims. India’s 2023 guidelines list false scarcity under “false urgency”.',
    check: 'Is the number real, and would it say the same thing to everyone looking right now?',
    sources: [
      { label: 'Mathur et al. (2019), Dark Patterns at Scale, Princeton and University of Chicago', url: 'https://arxiv.org/abs/1907.07032' },
      {
        label: 'UK CMA commitments from hotel booking sites (2019)',
        url: 'https://cms.law/en/gbr/legal-updates/cma-secures-commitments-from-holiday-booking-sites-on-sales-practices',
      },
      { label: 'Worchel, Lee & Adewole (1975), the cookie-jar study', url: 'https://uni-muenster.de/imperia/md/content/psyifp/aeechterhoff/vorlesungkommunikation/worchelleeeta_suppdemanobjval_jpsp1975.pdf' },
    ],
  },
  friction: {
    where: 'Gym memberships, streaming, news and app subscriptions, deleting an account, unsubscribing from emails.',
    number:
      'In 2025 Amazon agreed to pay $2.5 billion to settle US Federal Trade Commission claims that it signed people up for Prime without clear consent and made cancelling deliberately hard.',
    helps: 'A pause option or a single confirmation genuinely helps someone who might regret leaving.',
    hurts: 'Each extra step exists mainly to wear people down.',
    rule: 'India’s 2023 guidelines call making a subscription hard to cancel a “subscription trap”.',
    check: 'Is leaving as easy as joining?',
    sources: [
      {
        label: 'Amazon’s $2.5 billion FTC settlement (September 2025)',
        url: 'https://abc7news.com/post/amazon-pay-25-billion-settle-ftc-allegations-duped-customers-enrolling-prime/17881451/',
      },
      CCPA,
    ],
  },
  recommend: {
    where: 'Streaming home screens, “customers also bought”, social feeds, food delivery, music playlists.',
    number:
      'Netflix’s own engineers reported that recommendations influence about 80% of the hours streamed on the service. The rest comes from search.',
    helps: 'It narrows a huge catalogue down to things you’re likely to enjoy.',
    hurts: 'You can’t tell why something is recommended, or it’s a paid placement dressed up as personal advice.',
    rule: 'Under the EU’s Digital Services Act, the largest platforms must offer at least one feed that isn’t based on profiling you. India’s 2023 guidelines list ads disguised as content as “disguised advertisement”.',
    check: 'Could we tell the person why we recommended this?',
    sources: [
      { label: 'Gomez-Uribe & Hunt (2015), The Netflix Recommender System, ACM TMIS', url: 'https://doi.org/10.1145/2843948' },
      { label: 'EU Digital Services Act, Article 38', url: 'https://eur-lex.europa.eu/eli/reg/2022/2065/oj' },
    ],
  },
};

/** How the visitor's own result compares with the research. */
export function versusResearch(id, outcome, result) {
  const notMoved = outcome === 'held' || outcome === 'away' || outcome === 'elsewhere';
  switch (id) {
    case 'popular':
      if (outcome === 'toward') return 'That matches the hotel study: telling people what others do moved towel reuse up by nine percentage points.';
      if (outcome === 'matched') return 'Hard to separate. In the hotel study, 35% of guests reused towels before any social message at all.';
      if (notMoved) return 'You’re in good company. Even with the “most guests do this” message, more than half of the hotel guests didn’t reuse their towels.';
      return null;
    case 'default':
      if (outcome === 'toward') return 'That’s the most common response. In the pension study, a large share of new hires also kept the pre-set contribution rate and fund.';
      if (outcome === 'matched') return 'This is when defaults work best: when they match what most people would choose anyway.';
      if (notMoved) return 'You’re in the minority. When joining the pension was the default, 86% of new hires stayed in. Only about 1 in 7 didn’t.';
      return null;
    case 'scarcity':
      if (outcome === 'toward') return 'In a 1975 study, people rated identical cookies as more desirable when they came from a jar of two rather than a jar of ten. You felt the same pull.';
      if (outcome === 'matched') return 'In a 1975 study, identical cookies seemed more desirable from a jar of two than a jar of ten. You’d already decided, so the jar didn’t matter.';
      if (notMoved) return 'In a 1975 study, people rated identical cookies as more desirable from a jar of two than a jar of ten. You held out against a pull that’s been measured for 50 years.';
      return null;
    case 'friction':
      return result?.detours?.length
        ? 'You still got out, after a detour. Each extra screen is another chance for someone to stop, which is the point of building them.'
        : 'You got through. The extra screens are there because some people don’t.';
    case 'recommend':
      if (outcome === 'toward') return 'That’s typical. At Netflix, recommendations steer about 80% of viewing hours.';
      if (notMoved) return 'You went against it. At Netflix, about 80% of viewing hours start from a recommendation, so ignoring one is the less common move.';
      return null;
    default:
      return null;
  }
}

/** The closing checklist: one question per test, for whoever designs the next interface. */
export const shipChecklist = ['popular', 'default', 'scarcity', 'friction', 'recommend'].map((id) => ({ id, q: wild[id].check }));
