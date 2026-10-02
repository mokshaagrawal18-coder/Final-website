import { useState } from 'react';
import { experiments } from '../data/experiments.js';
import { describeChoice } from '../components/Sections.jsx';
import PlansUI from '../components/interfaces/PlansUI.jsx';
import FlightUI from '../components/interfaces/FlightUI.jsx';
import LampUI from '../components/interfaces/LampUI.jsx';
import FilmsUI from '../components/interfaces/FilmsUI.jsx';
import { Board, FrictionBoard } from './Board.jsx';
import { Bar, EndNotes, Foot, Index, Layers, Masthead, SessionLog, TestPlan } from './Sections.jsx';

const interfaces = { popular: PlansUI, default: FlightUI, scarcity: LampUI, recommend: FilmsUI };

const revealNotes = {
  recommend: 'The label went on a film you didn’t pick the first time. Otherwise it could never have changed your mind.',
};

export default function App() {
  // Choices live only in memory: { [testId]: { a, b, spot } }
  const [choices, setChoices] = useState({});
  const record = (id) => (patch) => setChoices((c) => ({ ...c, [id]: { ...c[id], ...patch } }));
  const reset = (id) => () =>
    setChoices((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const nextFor = (i) =>
    i < experiments.length - 1
      ? { href: `#exp-${experiments[i + 1].id}`, label: `Next: test ${i + 2}` }
      : { href: '#log', label: 'See your session' };

  return (
    <>
      <a className="skip" href="#exp-popular">
        Skip to test 1
      </a>
      <Bar choices={choices} />
      <main>
        <Masthead />
        <TestPlan choices={choices} />
        {experiments.map((exp, i) => {
          const common = {
            key: exp.id,
            exp,
            n: i + 1,
            result: choices[exp.id],
            onRecord: record(exp.id),
            onReset: reset(exp.id),
            next: nextFor(i),
          };
          if (exp.id === 'friction') return <FrictionBoard {...common} />;
          const UI = interfaces[exp.id];
          return (
            <Board
              {...common}
              describe={(v) => describeChoice(exp.id, v)}
              revealNote={revealNotes[exp.id]}
              renderInterface={(variant, opts) => <UI variant={variant} {...opts} />}
            />
          );
        })}
        <SessionLog choices={choices} />
        <Index />
        <Layers />
        <EndNotes />
      </main>
      <Foot />
    </>
  );
}
