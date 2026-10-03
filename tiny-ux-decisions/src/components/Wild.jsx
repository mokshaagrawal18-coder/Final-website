import { experiments } from '../data/experiments.js';
import { shipChecklist, wild } from '../data/wild.js';

/** Where a pattern shows up, one sourced number, when it helps or hurts, and what regulators say. */
export function InTheWild({ id }) {
  const w = wild[id];
  return (
    <details className="wild" open>
      <summary>
        <span className="wild-title">In the wild</span>
        <span className="wild-sub">Where this shows up, and what the research says</span>
      </summary>
      <dl className="wild-list">
        <div>
          <dt>Where you’ll see it</dt>
          <dd>{w.where}</dd>
        </div>
        <div className="wild-number">
          <dt>The number</dt>
          <dd>{w.number}</dd>
        </div>
        <div>
          <dt>Helps when</dt>
          <dd>{w.helps}</dd>
        </div>
        <div>
          <dt>Hurts when</dt>
          <dd>{w.hurts}</dd>
        </div>
        <div className="wild-rule">
          <dt>The rules</dt>
          <dd>{w.rule}</dd>
        </div>
      </dl>
      <p className="wild-sources">
        <span>Sources</span>
        {w.sources.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </p>
    </details>
  );
}

/** One question per test, for whoever designs the next interface. */
export function ShipChecklist() {
  const title = (id) => experiments.find((e) => e.id === id).category;
  return (
    <div className="ship">
      <p className="ship-head">Before shipping one of these, ask</p>
      <ol className="ship-list">
        {shipChecklist.map((c) => (
          <li key={c.id}>
            <span className="ship-tag">{title(c.id)}</span>
            <span className="ship-q">{c.q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
