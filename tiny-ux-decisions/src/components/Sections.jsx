import { builtWith, experiments, films, methodology, plans, SOURCE_URL } from '../data/experiments.js';
import { outcomeLabel, outcomeOf, sessionTakeaway } from '../data/outcomes.js';
import { ShipChecklist } from './Wild.jsx';

const done = (choices, id) => choices[id]?.b !== undefined;

export function TopBar({ choices }) {
  const count = experiments.filter((e) => done(choices, e.id)).length;
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#top" className="topbar-title">
          Tiny UX Decisions
        </a>
        <nav aria-label="Experiments" className="topbar-dots">
          {experiments.map((e) => (
            <a
              key={e.id}
              href={`#exp-${e.id}`}
              className={`dot ${done(choices, e.id) ? 'is-done' : ''}`}
              title={`${e.number} · ${e.title}`}
            >
              <span className="sr-only">
                {e.number} {e.title} {done(choices, e.id) ? '(done)' : ''}
              </span>
            </a>
          ))}
          <span className="mono topbar-count">{count}/5</span>
        </nav>
        <nav aria-label="Sections" className="topbar-links">
          <a href="#library">Library</a>
          <a href="#strip">Strip it</a>
          <a href="#learned">Notes</a>
        </nav>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <p className="mono kicker">An interactive product experiment</p>
        <h1 className="hero-title">
          Tiny <span className="hero-ux">UX</span> Decisions
        </h1>
        <p className="hero-q">How much can one tiny interface change affect a decision?</p>
        <p className="hero-lede">
          A growing collection of defaults, framing, friction, recommendations, and other interface choices that quietly
          shape what people notice and choose.
        </p>
        <div className="hero-cta">
          <a className="btn btn-big" href="#rule">
            Start with a tiny decision <span aria-hidden="true">→</span>
          </a>
          <p className="hand-note">Try choosing before you overthink it.</p>
        </div>
        <p className="mono hero-meta">5 experiments · ~4 minutes · no right answers</p>
      </div>
      <HeroSketch />
    </section>
  );
}

/** Two near-identical cards, one with a badge: the whole project in one picture. */
function HeroSketch() {
  return (
    <div className="hero-sketch" aria-hidden="true">
      <div className="sketch-card">
        <span className="sketch-line w60" />
        <span className="sketch-line w40" />
        <span className="sketch-btn" />
      </div>
      <div className="sketch-card is-b">
        <span className="sketch-badge">Popular</span>
        <span className="sketch-line w60" />
        <span className="sketch-line w40" />
        <span className="sketch-btn" />
        <span className="sketch-ring" />
      </div>
    </div>
  );
}

export function Rule() {
  return (
    <section className="section rule" id="rule">
      <div className="wrap rule-inner">
        <p className="mono kicker">02 — Five experiments</p>
        <p className="rule-lines">
          Same choice.
          <br />
          Almost the same interface.
          <br />
          <mark>One small change.</mark>
        </p>
        <p className="rule-sub">Make your choice first. I’ll show you what changed afterward.</p>
        <a className="btn" href="#exp-popular">
          I’m ready <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

const label = {
  popular: (v) => plans.find((p) => p.id === v)?.name,
  default: (v) => (v === 'protect' ? 'Protection' : 'No protection'),
  scarcity: (v) => (v === 'buy' ? 'Buy it' : 'Keep looking'),
  recommend: (v) => films.find((f) => f.id === v)?.title,
};
export const describeChoice = (id, v) => label[id]?.(v) ?? '';

const resultName = {
  popular: 'Most Popular',
  default: 'Default',
  scarcity: 'Scarcity',
  friction: 'Friction',
  recommend: 'Recommendation',
};

function ResultRow({ id, r }) {
  if (!r || r.b === undefined) {
    return (
      <>
        <span className="res-status res-none">{r?.a !== undefined ? 'Halfway through' : 'Not tried yet'}</span>
        <span className="mono res-detail">
          <a href={`#exp-${id}`}>{r?.a !== undefined ? 'Finish it →' : 'Try it →'}</a>
        </span>
      </>
    );
  }
  if (id === 'friction') {
    return (
      <>
        <span className="res-status res-changed">{r.b} actions completed</span>
        <span className="mono res-detail">
          {r.a} → {r.b} actions{r.detours?.length ? ` · ${r.detours.length} detour${r.detours.length > 1 ? 's' : ''}` : ''}
        </span>
      </>
    );
  }
  const outcome = outcomeOf(id, r);
  return (
    <>
      <span className={`res-status ${outcome === 'toward' ? 'res-changed' : 'res-stayed'}`}>{outcomeLabel[outcome]}</span>
      <span className="mono res-detail">
        {describeChoice(id, r.a)} → {describeChoice(id, r.b)}
      </span>
    </>
  );
}

export function Results({ choices }) {
  const any = experiments.some((e) => done(choices, e.id));
  const takeaway = sessionTakeaway(choices);
  return (
    <section className="section results" id="results" aria-labelledby="results-title">
      <div className="wrap results-inner">
        <p className="mono kicker">Five tiny decisions later</p>
        <h2 className="section-title" id="results-title">
          Your choices
        </h2>
        <ul className="res-list" role="list">
          {experiments.map((e) => (
            <li key={e.id} className="res-row">
              <span className="mono res-no">{e.number}</span>
              <span className="res-name">{resultName[e.id]}</span>
              <ResultRow id={e.id} r={choices[e.id]} />
            </li>
          ))}
        </ul>
        <div className={`res-note ${any ? '' : 'is-quiet'}`}>
          {takeaway && <p className="res-takeaway">{takeaway}</p>}
          <p>This isn’t a psychological profile. Five choices can’t tell us that.</p>
          <p>
            But they do make something visible: interfaces don’t only present choices.{' '}
            <strong>They decide how those choices are presented.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Ending() {
  return (
    <section className="section ending" id="learned" aria-labelledby="learned-title">
      <div className="wrap ending-grid">
        <div>
          <p className="mono kicker">05 — What I learned</p>
          <h2 className="section-title" id="learned-title">
            So, what did I learn?
          </h2>
        </div>
        <div className="ending-body">
          <p>
            I started this project thinking about persuasive interfaces: defaults, urgency, recommendations, and the
            little decisions designers make around a choice.
          </p>
          <p>
            What became more interesting was that the same technique isn’t automatically helpful or manipulative. A
            default can save effort. A recommendation can narrow an overwhelming set of options. A progress bar can make a
            long process clearer.
          </p>
          <p>The question I kept returning to was simpler:</p>
          <blockquote className="ending-q">
            Does this design help someone make their decision, or does it quietly make more of the decision for them?
          </blockquote>

          <ShipChecklist />

          <div className="built">
            <p className="mono kicker">Built with</p>
            <ul className="chips" role="list">
              {builtWith.map((b) => (
                <li key={b} className="chip mono">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <details className="method" id="methodology">
            <summary>
              <span>View methodology</span>
              <span className="mono method-sub">How the experiments are set up, and their limits</span>
            </summary>
            <dl className="method-list">
              {methodology.map((m) => (
                <div key={m.title}>
                  <dt>{m.title}</dt>
                  <dd>{m.body}</dd>
                </div>
              ))}
            </dl>
          </details>

          {SOURCE_URL && (
            <a className="arrow-link" href={SOURCE_URL} target="_blank" rel="noreferrer">
              View source code <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="footer-line">
          Change one tiny thing. <em>Look again.</em>
        </p>
        <p className="mono footer-small">Tiny UX Decisions · all brands and products are fictional · nothing you choose leaves this page</p>
      </div>
    </footer>
  );
}
