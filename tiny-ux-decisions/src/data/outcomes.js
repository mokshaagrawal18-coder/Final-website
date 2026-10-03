// What a pair of choices means, for the four A/B tests.
// "Changed" alone is not enough: a visitor can move toward the nudge, away from it,
// already agree with it, not be moved, or change to something the nudge never pointed at.

import { recommendedFor } from './experiments.js';

// The option each nudge points at, given the visitor's result.
const target = {
  popular: () => 'plus',
  default: () => 'protect',
  scarcity: () => 'buy',
  recommend: (r) => recommendedFor(r.a),
};

// What the nudge is called in a sentence.
const noun = {
  popular: 'the badge',
  default: 'the default',
  scarcity: 'the stock warning',
  recommend: 'the label',
};

export function outcomeOf(id, r) {
  if (!target[id] || r?.a === undefined || r?.b === undefined) return null;
  const t = target[id](r);
  if (r.a === r.b) return r.a === t ? 'matched' : 'held';
  if (r.b === t) return 'toward';
  if (r.a === t) return 'away';
  return 'elsewhere';
}

// Short labels for tables.
export const outcomeLabel = {
  toward: 'Moved by it',
  away: 'Moved away from it',
  matched: 'Already agreed',
  held: 'Not moved',
  elsewhere: 'Changed anyway',
};

// The headline in each reveal.
export function outcomeHeadline(id, outcome) {
  const n = noun[id];
  const N = n.charAt(0).toUpperCase() + n.slice(1);
  return {
    toward: `Your choice moved toward ${n}.`,
    away: `Your choice moved away from ${n}.`,
    matched: `${N} pointed at what you’d already picked.`,
    held: `${N} didn’t move you.`,
    elsewhere: `Your choice changed, but not toward ${n}.`,
  }[outcome];
}

const WOBBLE =
  'Choices wobble on a second look even when nothing changes. That is why a real experiment compares against a group who saw the same version twice.';

// One line per outcome, per test: what this particular result shows.
export const outcomeText = {
  popular: {
    toward: 'The badge made Plus easier to notice and suggested it was the normal pick, and you went with it.',
    away: 'Some people read “Most popular” as a sales push and steer around it. A badge can backfire.',
    matched:
      'You chose Plus both times, so the badge agreed with you. This test can’t tell whether it would have moved you. That’s a real limit of badging the plan most people already lean towards.',
    held: 'That’s common. Nudges shift some people some of the time, not everyone every time. A pricing team is looking for a few percent across thousands of sign-ups.',
    elsewhere: WOBBLE,
  },
  default: {
    toward:
      'When you chose freely, you skipped protection. When it was already selected, you kept it. Leaving a default in place is the easiest path, and that is exactly why defaults work.',
    away: 'You chose protection when asked, then removed it when it arrived pre-selected. A pre-ticked add-on can make people suspicious of it.',
    matched: 'You wanted protection both times, so the default matched what you’d choose anyway. That’s a default doing its job well.',
    held: 'The second time, saying no meant noticing the pre-selected option and undoing it. The default didn’t change your answer, but it made the same answer take more effort.',
    elsewhere: WOBBLE,
  },
  scarcity: {
    toward: 'You kept looking the first time and bought once stock looked low. Nothing about the lamp changed; waiting just started to feel risky.',
    away: 'You were ready to buy, then held back once the stock warning appeared. Scarcity can backfire when it feels like pressure.',
    matched: 'You were ready to buy both times, so the warning only agreed with a decision you’d already made.',
    held: '“Only 2 left” didn’t rush you. Scarcity works on some people some of the time, and noticing it is most of resisting it.',
    elsewhere: WOBBLE,
  },
  recommend: {
    toward: 'You switched to the film with the label. The label gave it a reason to stand out that the film itself didn’t have.',
    away: WOBBLE,
    matched: WOBBLE,
    held: 'You stayed with the film you chose when nothing was recommended. The label gave no reason, and you didn’t need one.',
    elsewhere: `You moved to a film nobody recommended. ${WOBBLE}`,
  },
};

/** One closing sentence for the whole session, based on how the four A/B tests went. */
export function sessionTakeaway(choices) {
  const outs = ['popular', 'default', 'scarcity', 'recommend'].map((id) => outcomeOf(id, choices[id])).filter(Boolean);
  if (outs.length === 0) return null;
  const moved = outs.filter((o) => o === 'toward').length;
  const steady = outs.filter((o) => o === 'held' || o === 'matched').length;
  if (moved === 0 && steady === outs.length) {
    const lead = outs.length < 4 ? 'So far, none of the nudges have moved you.' : 'None of the nudges moved you here.';
    return `${lead} That doesn’t make anyone immune: these patterns are tuned on thousands of people, where shifting a few percent is the goal. And after the first test, you knew to look for a change.`;
  }
  if (moved >= 2) {
    return 'Some of these moved you. That’s normal, and it’s why they’re used. Most people believe they decide on the merits, and most of the time a badge or a default isn’t what they’d name as the reason.';
  }
  return 'Your answers moved in different directions. One person’s choices can’t show an effect. What they can show is where the interface was doing some of the work.';
}
