export type Note = {
  n: string;
  title: string;
  kicker: string;
  body: string[];
  closing: string;
  paper: 'plain' | 'lined' | 'graph' | 'yellow' | 'card';
  icon: string; // 24x24 line path
  rotate: number;
  pullout?: 'shape' | 'list' | 'counts';
};

export const notes: Note[] = [
  {
    n: '01', title: 'I notice people.', kicker: 'a quiet sort of radar',
    body: [
      'If someone’s gone quiet, looks a little lost, or hasn’t found their way into the conversation yet, I usually notice.',
      'I like people to feel included. Just without making it a whole production.',
    ],
    closing: 'no production required.',
    paper: 'plain', rotate: -1.6,
    icon: 'M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12zM12 9.5a2.5 2.5 0 1 0 0.01 0',
  },
  {
    n: '02', title: 'Story behind the story.', kicker: 'the version before the final version',
    body: [
      'A good ad is never just a good ad to me.',
      'I want to know who came up with it, what the original idea was, what got changed, and why this version made it out into the world.',
      'Movies do the same thing to me. I’m usually just as interested in what happened behind the scenes.',
    ],
    closing: 'yes, I watch the extras.',
    paper: 'lined', rotate: 1.2,
    icon: 'M4 5h16v11H4zM8 20h8M12 16v4M9 9l5 2.5L9 14z',
  },
  {
    n: '03', title: 'Leading from rehearsals.', kicker: 'less spotlight, more logistics',
    body: [
      'Running a dance team sounded much more glamorous before there were auditions to organise, formations to fix, and twelve people learning at twelve different speeds.',
      'Somewhere in all that, I realised I actually like being the person who helps things come together.',
    ],
    closing: 'twelve speeds, one formation.',
    paper: 'card', rotate: -0.8,
    icon: 'M6 6a1.5 1.5 0 1 0 0.01 0M18 6a1.5 1.5 0 1 0 0.01 0M12 12a1.5 1.5 0 1 0 0.01 0M6 18a1.5 1.5 0 1 0 0.01 0M18 18a1.5 1.5 0 1 0 0.01 0',
  },
  {
    n: '04', title: 'I give problems a shape.', kicker: 'name it, then fix it',
    body: [
      '“Everything is going wrong” is not very helpful.',
      '“What are the three things actually going wrong?” — much better.',
      'Once I know what I’m dealing with, I can usually figure out where to start.',
    ],
    closing: 'start with three.',
    paper: 'graph', rotate: 1.8, pullout: 'shape',
    icon: 'M4 4h7v7H4zM13 13h7v7h-7zM11 7.5h4.5V13',
  },
  {
    n: '05', title: 'Very bad at being bored.', kicker: 'free afternoons are risky',
    body: [
      'Give me a free afternoon and I will somehow find a new thing to get into.',
      'A recipe. A design idea. Something to learn. Something to make.',
      'Some stick around. Some disappear by next Tuesday.',
    ],
    closing: 'see you next Tuesday, maybe.',
    paper: 'yellow', rotate: -1.4, pullout: 'list',
    icon: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1',
  },
  {
    n: '06', title: 'I care about the last 10%.', kicker: 'the part nobody asked for',
    body: [
      'The sentence that is almost right.',
      'The spacing that feels slightly off.',
      'The tiny detail no one asked me to notice.',
      'I like things to work, obviously. But I also really care about how they feel.',
    ],
    closing: 'you may have noticed on this site.',
    paper: 'plain', rotate: 0.9,
    icon: 'M3 20h18M6 20V10M10 20V6M14 20v-8M18 20v-3',
  },
  {
    n: '07', title: 'Dance taught me when to stop thinking.', kicker: '5, 6, 7, 8',
    body: [
      'You practise. You count. You fix. You repeat.',
      'Then you walk on stage and trust that all of it is in there somewhere.',
      'Sixteen years later, I still like that balance: prepare properly, then let yourself do the thing.',
    ],
    closing: 'prepare, then trust it.',
    paper: 'lined', rotate: -1.1, pullout: 'counts',
    icon: 'M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-0.01 0M19 16a2.5 2.5 0 1 1-0.01 0',
  },
  {
    n: '08', title: 'I like a good reason to change my mind.', kicker: 'open to a better argument',
    body: [
      'I can have strong opinions.',
      'But if someone gives me a better way to look at something, I’m happy to reconsider.',
      'Being right is nice. Seeing something differently is usually more interesting.',
    ],
    closing: 'pasta opinions excluded.',
    paper: 'card', rotate: 1.4,
    icon: 'M4 9h13l-3-3M20 15H7l3 3',
  },
];
