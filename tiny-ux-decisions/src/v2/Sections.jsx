import { useState } from 'react';
import { experiments, filters, methodology, SOURCE_URL, specimens, stripLayers } from '../data/experiments.js';
import { describeChoice } from '../components/Sections.jsx';
import { outcomeLabel, outcomeOf, sessionTakeaway } from '../data/outcomes.js';
import { Sample } from '../components/Library.jsx';
import { HotelCard } from '../components/Strip.jsx';
import { ShipChecklist } from '../components/Wild.jsx';
import { author } from '../data/author.js';
import Tabs from './Tabs.jsx';
import v1Shot from './assets/version-1.jpg';
import v2Shot from './assets/version-2.jpg';

/** Each test has its own page: #test-1 … #test-5. */
export const testHref = (id) => `#test-${experiments.findIndex((e) => e.id === id) + 1}`;

export const isDone = (choices, id) => (id === 'friction' ? choices[id]?.b !== undefined : choices[id]?.spot !== undefined);
export const isStarted = (choices, id) => choices[id]?.a !== undefined;

const pages = [
  { view: 'results', label: 'Results' },
  { view: 'patterns', label: 'Patterns' },
  { view: 'strip', label: 'Strip it back' },
  { view: 'notes', label: 'Notes' },
];

/** Top bar: home, one numbered step per test, and the other pages. */
export function Bar({ choices, view }) {
  return (
    <header className="bar">
      <div className="wrap bar-inner">
        <a href="#home" className="bar-title" aria-current={view === 'home' ? 'page' : undefined}>
          Tiny UX Decisions
        </a>
        <nav className="bar-tests" aria-label="Tests">
          {experiments.map((e, i) => {
            const here = view === `test-${i + 1}`;
            const done = isDone(choices, e.id);
            return (
              <a
                key={e.id}
                href={`#test-${i + 1}`}
                className={`step ${done ? 'is-done' : ''} ${here ? 'is-here' : ''}`}
                aria-current={here ? 'page' : undefined}
                aria-label={`Test ${i + 1}${done ? ', done' : ''}`}
              >
                {i + 1}
              </a>
            );
          })}
        </nav>
        <nav className="bar-nav" aria-label="Pages">
          {pages.map((p) => (
            <a key={p.view} href={`#${p.view}`} aria-current={view === p.view ? 'page' : undefined}>
              {p.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Previous / next at the bottom of every page, so nobody has to scroll back up. */
export function PageNav({ prev, next }) {
  return (
    <nav className="wrap page-nav" aria-label="Previous and next">
      {prev ? (
        <a className="page-prev" href={prev.href}>
          <span>Previous</span>
          {prev.label}
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a className="page-next" href={next.href}>
          <span>Next</span>
          {next.label}
        </a>
      )}
    </nav>
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
          <p className="eyebrow">
            An interactive product experiment · {author.name}, {author.year}
          </p>
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
            <a className="button" href="#test-1">
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
            About five minutes, and there are no right answers.
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
                      <a href={testHref(e.id)}>{done ? e.title : e.neutral}</a>
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

export function SessionLog({ choices, onResetAll }) {
  const takeaway = sessionTakeaway(choices);
  const [confirming, setConfirming] = useState(false);
  const anyStarted = experiments.some((e) => isStarted(choices, e.id));
  return (
    <section className="log" id="log" aria-labelledby="log-title">
      <div className="wrap log-grid">
        <div>
          <h2 className="h2" id="log-title">
            Your results
          </h2>
          {takeaway ? (
            <p className="log-takeaway">{takeaway}</p>
          ) : (
            <p className="log-note">Run a test and your answers show up here.</p>
          )}
          {anyStarted && (
            <div className="log-reset" aria-live="polite">
              {confirming ? (
                <>
                  <span>Clear all your answers and start again?</span>
                  <button
                    type="button"
                    className="button button-small"
                    onClick={() => {
                      setConfirming(false);
                      onResetAll();
                      window.location.hash = 'home';
                    }}
                  >
                    Clear and start again
                  </button>
                  <button type="button" className="link" onClick={() => setConfirming(false)}>
                    Keep my answers
                  </button>
                </>
              ) : (
                <button type="button" className="link" onClick={() => setConfirming(true)}>
                  Start over
                </button>
              )}
            </div>
          )}
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
                        <a href={testHref(e.id)}>{isStarted(choices, e.id) ? 'In progress' : 'Not run yet'}</a>
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

// Library entries that are also one of the five tests.
const testFor = { '001': 'popular', '002': 'default', '003': 'scarcity', '006': 'recommend', '011': 'friction' };

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
                {testFor[s.id] && (
                  <a className="idx-try" href={testHref(testFor[s.id])}>
                    Try it in test {experiments.findIndex((e) => e.id === testFor[s.id]) + 1}
                  </a>
                )}
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
              <p className="outro-big">What’s left is a room, a price and a cancellation policy.</p>
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

const setupNotes = methodology.filter((m) => !['There is no control group', 'You are both groups'].includes(m.title));

export function EndNotes() {
  const learned = (
    <div className="end-body">
      <p>
        I started this wanting to know whether nudges work. They do, and there are decades of research saying so. I’ve put
        the parts I could check in each test’s “In the wild” tab.
      </p>
      <p>
        The more useful lessons came from building it. My first draft named every test after its trick. The lamp test was
        called “Only Two Left”, in big letters, right above the lamp. I had made a page about interfaces quietly steering
        people, and it was loudly steering them the other way. The tests now have plain names until you’ve chosen.
      </p>
      <p>
        Then I got stuck on a question: what does it mean if someone picks the same plan both times? My first version said
        “You stuck with your first choice” and moved on. But the badge might have agreed with them, or not moved them, or
        pushed them the other way, and those are different results. The same click can mean several things, and most
        interfaces only ever count one of them.
      </p>
      <p>The question I ask of any interface now, including this one:</p>
      <p className="end-q">Does this design help someone make their decision, or does it quietly make more of the decision for them?</p>
      <ShipChecklist />
    </div>
  );

  const made = (
    <div className="end-body">
      <p>
        The first version looked like a lot of AI-made portfolio pages: cream paper, a big serif headline, little uppercase
        labels, rounded cards and a yellow box for the key question. It worked. It also looked generated, which is an awkward
        look for a project about interfaces you shouldn’t take at face value.
      </p>
      <p>
        So I rebuilt it as a design review, the kind of document a product team marks up before shipping: a grey canvas, the
        interface in a frame, a column listing what’s held constant, and one magenta outline around the thing that changed. I
        also added a step I hadn’t planned, where you try to find the change before I show you. It’s the part I most want to
        test with real people, because noticing a nudge might matter more than resisting it.
      </p>
      <div className="versions">
        <figure>
          <img
            src={v1Shot}
            alt="Version 1: cream background with a faint grid, a large serif title with a yellow highlight, and small uppercase labels."
          />
          <figcaption>Version 1</figcaption>
        </figure>
        <figure>
          <img
            src={v2Shot}
            alt="Version 2: white page, wide bold sans-serif title, and a grey canvas showing the same sign-up form twice."
          />
          <figcaption>Version 2, this page</figcaption>
        </figure>
      </div>
      <p className="built">Built with React and plain CSS. There’s no backend; your answers stay in this tab.</p>
      <h3 className="h3">What this can’t tell you</h3>
      <p>
        One person seeing both versions isn’t an experiment. You saw frame A first, you knew something was coming, and by test
        three you were probably hunting for it. A real test would show different people different frames, plus a group who
        sees the same frame twice. That’s the next version.
      </p>
      <details className="setup">
        <summary>Setup notes</summary>
        <dl className="method">
          {setupNotes.map((m) => (
            <div key={m.title}>
              <dt>{m.title}</dt>
              <dd>{m.body}</dd>
            </div>
          ))}
        </dl>
      </details>
      {SOURCE_URL && (
        <a className="link" href={SOURCE_URL} target="_blank" rel="noreferrer">
          View the source code
        </a>
      )}
    </div>
  );

  return (
    <section className="end" id="notes-page" aria-labelledby="notes-title">
      <div className="wrap end-grid">
        <h2 className="h2" id="notes-title">
          Notes
        </h2>
        <Tabs
          label="Notes"
          className="end-tabs"
          items={[
            { id: 'learned', label: 'What I learned', body: learned },
            { id: 'made', label: 'How it was made', body: made },
          ]}
        />
      </div>
    </section>
  );
}

export function Foot() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <p className="foot-line">Change one tiny thing. Look again.</p>
        <p className="foot-small">
          Made by <a href={author.site}>{author.name}</a>, {author.year}. The brands are made up, and your answers never leave
          this tab.
        </p>
      </div>
    </footer>
  );
}
