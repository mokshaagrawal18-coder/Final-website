import { useEffect, useRef, useState } from 'react';
import { experiments } from '../data/experiments.js';
import { describeChoice } from '../components/Sections.jsx';
import PlansUI from '../components/interfaces/PlansUI.jsx';
import FlightUI from '../components/interfaces/FlightUI.jsx';
import LampUI from '../components/interfaces/LampUI.jsx';
import FilmsUI from '../components/interfaces/FilmsUI.jsx';
import { Board, FrictionBoard } from './Board.jsx';
import { Bar, EndNotes, Foot, Index, Layers, Masthead, PageNav, SessionLog, TestPlan } from './Sections.jsx';

const interfaces = { popular: PlansUI, default: FlightUI, scarcity: LampUI, recommend: FilmsUI };

const revealNotes = {
  recommend: 'The label went on a film you didn’t pick the first time. Otherwise it could never have changed your mind.',
};

// One page at a time, addressed by a plain #hash so the back button and shared links work.
const VIEWS = ['home', ...experiments.map((_, i) => `test-${i + 1}`), 'results', 'patterns', 'strip', 'notes'];
const readView = () => {
  const h = window.location.hash.replace('#', '');
  return VIEWS.includes(h) ? h : 'home';
};

const LABELS = {
  home: 'Introduction',
  results: 'Your results',
  patterns: 'Patterns',
  strip: 'Strip it back',
  notes: 'Notes',
  ...Object.fromEntries(experiments.map((e, i) => [`test-${i + 1}`, `Test ${i + 1}`])),
};
const link = (view) => (view ? { href: `#${view}`, label: LABELS[view] } : null);

export default function App() {
  const [view, setView] = useState(readView);
  // Choices live only in memory: { [testId]: { a, b, spot } }
  const [choices, setChoices] = useState({});

  useEffect(() => {
    const onHash = () => setView(readView());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Each new page starts at the top, with keyboard focus on its heading (not on first load).
  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const heading = document.querySelector('main h1, main h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }, [view]);

  const record = (id) => (patch) => setChoices((c) => ({ ...c, [id]: { ...c[id], ...patch } }));
  const reset = (id) => () =>
    setChoices((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const i = VIEWS.indexOf(view);
  const prev = link(VIEWS[i - 1]);
  const next = link(VIEWS[i + 1]);

  let page;
  if (view === 'home') {
    page = (
      <>
        <Masthead />
        <TestPlan choices={choices} />
      </>
    );
  } else if (view.startsWith('test-')) {
    const n = Number(view.slice(5));
    const exp = experiments[n - 1];
    const common = {
      exp,
      n,
      result: choices[exp.id],
      onRecord: record(exp.id),
      onReset: reset(exp.id),
      next: n < experiments.length ? { href: `#test-${n + 1}`, label: `Next: test ${n + 1}` } : { href: '#results', label: 'See your results' },
    };
    if (exp.id === 'friction') {
      page = <FrictionBoard {...common} />;
    } else {
      const UI = interfaces[exp.id];
      page = (
        <Board
          {...common}
          describe={(v) => describeChoice(exp.id, v)}
          revealNote={revealNotes[exp.id]}
          renderInterface={(variant, opts) => <UI variant={variant} {...opts} />}
        />
      );
    }
  } else if (view === 'results') {
    page = <SessionLog choices={choices} onResetAll={() => setChoices({})} />;
  } else if (view === 'patterns') {
    page = <Index />;
  } else if (view === 'strip') {
    page = <Layers />;
  } else {
    page = <EndNotes />;
  }

  return (
    <>
      <a className="skip" href="#test-1">
        Skip to test 1
      </a>
      <Bar choices={choices} view={view} />
      <main className="page" key={view}>
        {page}
      </main>
      <PageNav prev={prev} next={next} />
      <Foot />
    </>
  );
}
