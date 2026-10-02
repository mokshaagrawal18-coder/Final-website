import { useState } from 'react';
import { experiments } from './data/experiments.js';
import { ABExperiment } from './components/Experiment.jsx';
import FrictionExperiment from './components/FrictionExperiment.jsx';
import Library from './components/Library.jsx';
import Strip from './components/Strip.jsx';
import { describeChoice, Ending, Footer, Hero, Results, Rule, TopBar } from './components/Sections.jsx';
import PlansUI from './components/interfaces/PlansUI.jsx';
import FlightUI from './components/interfaces/FlightUI.jsx';
import LampUI from './components/interfaces/LampUI.jsx';
import FilmsUI from './components/interfaces/FilmsUI.jsx';

const interfaces = { popular: PlansUI, default: FlightUI, scarcity: LampUI, recommend: FilmsUI };

const revealNotes = {
  recommend: 'The label went on a film you didn’t pick the first time. Otherwise it could never have changed your mind.',
};

const verdicts = {
  scarcity: { changedText: 'Your decision changed.', stayedText: 'You made the same call both times.' },
};

export default function App() {
  // Choices live only in memory: { [experimentId]: { a, b, ... } }
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
      ? { href: `#exp-${experiments[i + 1].id}`, label: 'Next decision' }
      : { href: '#results', label: 'See your five decisions' };

  return (
    <>
      <a className="skip" href="#exp-popular">
        Skip to the first experiment
      </a>
      <TopBar choices={choices} />
      <main>
        <Hero />
        <Rule />

        <div className="experiments" id="experiments">
          {experiments.map((exp, i) => {
            if (exp.id === 'friction') {
              return (
                <FrictionExperiment
                  key={exp.id}
                  exp={exp}
                  result={choices[exp.id]}
                  onRecord={record(exp.id)}
                  onReset={reset(exp.id)}
                  next={nextFor(i)}
                />
              );
            }
            const UI = interfaces[exp.id];
            return (
              <ABExperiment
                key={exp.id}
                exp={exp}
                result={choices[exp.id]}
                onRecord={record(exp.id)}
                onReset={reset(exp.id)}
                next={nextFor(i)}
                describe={(v) => describeChoice(exp.id, v)}
                revealNote={revealNotes[exp.id]}
                {...verdicts[exp.id]}
                renderInterface={(variant, opts) => <UI variant={variant} {...opts} />}
              />
            );
          })}
        </div>

        <Results choices={choices} />
        <Library />
        <Strip />
        <Ending />
      </main>
      <Footer />
    </>
  );
}
