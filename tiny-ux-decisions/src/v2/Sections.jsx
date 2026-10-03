import { useState } from 'react';
import { builtWith, experiments, filters, methodology, SOURCE_URL, specimens, stripLayers } from '../data/experiments.js';
import { describeChoice } from '../components/Sections.jsx';
import { outcomeLabel, outcomeOf, sessionTakeaway } from '../data/outcomes.js';
import { Sample } from '../components/Library.jsx';
import { HotelCard } from '../components/Strip.jsx';

const isDone = (choices, id) => (id === 'friction' ? choices[id]?.b !== undefined : choices[id]?.spot !== undefined);
const isStarted = (choices, id) => choices[id]?.a !== undefined;

export function Bar({ choices }) {
  const count = experiments.filter((e) => isDone(choices, e.id)).length;
  return (
    <header className="bar">
      <div className="wrap bar-inner">
        <a href="#top" className="bar-title">
          Tiny UX Decisions
        </a>
        <span className="bar-progress">
          {count} of 5 tests run
          <span className="bar-meter" aria-hidden="true">
            {experiments.map((e) => (
              <i key={e.id} className={isDone(choices, e.id) ? 'is-on' : ''} />
            ))}
          </span>
        </span>
        <nav className="bar-nav" aria-label="Sections">
          <a href="#tests">Tests</a>
          <a href="#index">Index</a>
          <a href="#layers">Layers</a>
          <a href="#notes">Notes</a>
        </nav>
      </div>
    </header>
  );
}

/** The thesis as a picture: the same checkbox twice, one already ticked. */
function MastFigure() {
  return (
    <figure className="mast-figure" aria-label="Two copies of the same sign-up form. In the second, the offers checkbox is already ticked.">
      <div className="mf-frames">
        {['A', 'B'].map((v) => (
          <div key={v} className="mf-frame">
            <p className="frame-label">Frame {v}</p>
            <div className="mf-card">
              <span className="mf-line" />
              <span className="mf-field" />
              <span className={`mf-check ${v === 'B' ? 'is-on' : ''}`}>
                <i />
                Email me offers
              </span>
              <span className="mf-btn">Create account</span>
            </div>
          </div>
        ))}
      </div>
      <figcaption>One tick box, already ticked. Everything else is identical.</figcaption>
    </figure>
  );
}

export function Masthead() {
  return (
    <section className="mast" id="top">
      <div className="wrap mast-grid">
        <div className="mast-text">
          <p className="eyebrow">An interactive product experiment</p>
          <h1 className="mast-title">
            Tiny UX
            <br />
            Decisions
          </h1>
          <p className="mast-q">How much can one tiny interface change affect a decision?</p>
          <p className="mast-lede">
            A growing collection of defaults, framing, friction, recommendations, and other interface choices that quietly
            shape what people notice and choose.
          </p>
          <div className="mast-cta">
            <a className="button" href="#exp-popular">
              Start test 1
            </a>
            <span className="mast-aside">Try choosing before you overthink it.</span>
          </div>
        </div>
        <MastFigure />
      </div>
    </section>
  );
}

export function TestPlan({ choices }) {
  return (
    <section className="plan" id="tests" aria-labelledby="plan-title">
      <div className="wrap">
        <div className="plan-head">
          <h2 className="h2" id="plan-title">
            Five tests
          </h2>
          <p className="plan-rule">
            Same choice, almost the same interface, one small change. You choose first. I show you what changed afterwards.
            About four minutes, and there are no right answers.
          </p>
        </div>
        <div className="table-scroll">
          <table className="plan-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Test</th>
                <th scope="col">You’ll be asked to</th>
                <th scope="col">What changes</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((e, i) => {
                const done = isDone(choices, e.id);
                return (
                  <tr key={e.id} className={done ? 'is-done' : ''}>
                    <td className="num">{i + 1}</td>
                    <td>
                      <a href={`#exp-${e.id}`}>{e.title}</a>
                    </td>
                    <td>{e.task}</td>
                    <td className={done ? 'is-red' : 'is-muted'}>{done ? e.variableShort : 'Revealed after'}</td>
                    <td>{done ? 'Done' : isStarted(choices, e.id) ? 'In progress' : 'Not run'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function logRow(id, r) {
  if (id === 'friction') {
    if (r?.b === undefined) return null;
    return { first: `${r.a} actions`, second: `${r.b} actions`, result: `+${r.b - r.a} actions`, red: true };
  }
  if (r?.spot === undefined) return null;
  const outcome = outcomeOf(id, r);
  return {
    first: describeChoice(id, r.a),
    second: describeChoice(id, r.b),
    result: outcomeLabel[outcome],
    red: outcome === 'toward',
  };
}

export function SessionLog({ choices }) {
  const takeaway = sessionTakeaway(choices);
  return (
    <section className="log" id="log" aria-labelledby="log-title">
      <div className="wrap log-grid">
        <div>
          <h2 className="h2" id="log-title">
            Your session
          </h2>
          {takeaway && <p className="log-takeaway">{takeaway}</p>}
          <p className="log-note">This isn’t a psychological profile. Five choices can’t tell us that.</p>
          <p className="log-note">
            But they do make something visible: interfaces don’t only present choices.{' '}
            <strong>They decide how those choices are presented.</strong>
          </p>
        </div>
        <div className="table-scroll">
          <table className="log-table">
            <thead>
              <tr>
                <th scope="col">Test</th>
                <th scope="col">Frame A</th>
                <th scope="col">Frame B</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((e) => {
                const row = logRow(e.id, choices[e.id]);
                return (
                  <tr key={e.id}>
                    <th scope="row">{e.category}</th>
                    {row ? (
                      <>
                        <td>{row.first}</td>
                        <td>{row.second}</td>
                        <td className={row.red ? 'is-red' : ''}>{row.result}</td>
                      </>
                    ) : (
                      <td colSpan={3} className="is-muted">
                        <a href={`#exp-${e.id}`}>{isStarted(choices, e.id) ? 'In progress' : 'Not run yet'}</a>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Index() {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? specimens : specimens.filter((s) => s.tags.includes(active));
  const countFor = (id) => (id === 'all' ? specimens.length : specimens.filter((s) => s.tags.includes(id)).length);

  return (
    <section className="index" id="index" aria-labelledby="index-title">
      <div className="wrap">
        <div className="index-head">
          <h2 className="h2" id="index-title">
            The little things
          </h2>
          <p className="index-lede">Once I started looking for them, they were everywhere.</p>
        </div>
        <div className="tabs" role="group" aria-label="Filter the index">
          {filters.map((f) => (
            <button key={f.id} type="button" className="tab" aria-pressed={active === f.id} onClick={() => setActive(f.id)}>
              {f.label} <span className="tab-count">{countFor(f.id)}</span>
            </button>
          ))}
        </div>
        <ol className="index-list">
          {shown.map((s) => (
            <li key={s.id} className="index-row appear">
              <span className="idx-no">{s.id}</span>
              <div className="idx-sample" aria-hidden="true">
                <Sample id={s.id} />
              </div>
              <div className="idx-text">
                <h3 className="idx-title">{s.title}</h3>
                <p className="idx-label">{s.label}</p>
                <p className="idx-body">{s.body}</p>
              </div>
              <p className="idx-look">
                <span>Look for</span>
                {s.lookFor}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Eye({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="eye">
      <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      {open ? (
        <circle cx="12" cy="12" r="2.8" fill="currentColor" />
      ) : (
        <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.6" />
      )}
    </svg>
  );
}

export function Layers() {
  const [on, setOn] = useState(() => Object.fromEntries(stripLayers.map((l) => [l.id, true])));
  const count = Object.values(on).filter(Boolean).length;
  const none = count === 0;
  const all = count === stripLayers.length;
  const setAll = (v) => setOn(Object.fromEntries(stripLayers.map((l) => [l.id, v])));

  return (
    <section className="layers" id="layers" aria-labelledby="layers-title">
      <div className="wrap">
        <div className="index-head">
          <h2 className="h2" id="layers-title">
            Strip it back
          </h2>
          <p className="index-lede">How much of a shopping interface is actually about the product?</p>
        </div>

        <div className="layers-grid">
          <div className="layers-panel">
            <p className="panel-head">
              <span>Layers</span>
              <span className="panel-count">
                {count} of {stripLayers.length} visible
              </span>
            </p>
            <ul className="layer-list">
              {stripLayers.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className={`layer-row ${on[l.id] ? '' : 'is-hidden'}`}
                    aria-pressed={on[l.id]}
                    onClick={() => setOn((s) => ({ ...s, [l.id]: !s[l.id] }))}
                  >
                    <Eye open={on[l.id]} />
                    <span className="layer-name">{l.label}</span>
                    <span className="layer-shows">{l.shows}</span>
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" className="link panel-all" onClick={() => setAll(!all)}>
              {all ? 'Hide every layer' : 'Show every layer'}
            </button>
          </div>

          <div className="canvas canvas-centre layers-canvas">
            <p className="frame-label">Listing · The Palm House</p>
            <HotelCard on={on} bare={none} />
          </div>
        </div>

        <div className="layers-outro" aria-live="polite">
          {none ? (
            <div className="appear">
              <p className="outro-big">Same room. Same price. Very different decision environment.</p>
              <p className="question">
                <span className="q-mark" aria-hidden="true">
                  ?
                </span>
                Which information helped you decide, and which information mainly made you decide faster?
              </p>
            </div>
          ) : (
            <p className="is-muted">Hide every layer to see what’s left.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function EndNotes() {
  return (
    <section className="end" id="notes" aria-labelledby="notes-title">
      <div className="wrap end-grid">
        <h2 className="h2" id="notes-title">
          What I learned
        </h2>
        <div className="end-body">
          <p>
            I started this project thinking about persuasive interfaces: defaults, urgency, recommendations, and the little
            decisions designers make around a choice.
          </p>
          <p>
            What became more interesting was that the same technique isn’t automatically helpful or manipulative. A default
            can save effort. A recommendation can narrow an overwhelming set of options. A progress bar can make a long
            process clearer.
          </p>
          <p>The question I kept returning to was simpler:</p>
          <p className="end-q">Does this design help someone make their decision, or does it quietly make more of the decision for them?</p>

          <h3 className="h3">How the tests are set up</h3>
          <dl className="method">
            {methodology.map((m) => (
              <div key={m.title}>
                <dt>{m.title}</dt>
                <dd>{m.body}</dd>
              </div>
            ))}
          </dl>

          <p className="built">
            Built with {builtWith.slice(0, -1).join(', ').toLowerCase().replace('react', 'React').replace('javascript', 'JavaScript')} and{' '}
            {builtWith[builtWith.length - 1]}.
          </p>
          {SOURCE_URL && (
            <a className="link" href={SOURCE_URL} target="_blank" rel="noreferrer">
              View the source code
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Foot() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <p className="foot-line">Change one tiny thing. Look again.</p>
        <p className="foot-small">All brands and products are fictional. Nothing you choose leaves this page.</p>
      </div>
    </footer>
  );
}
