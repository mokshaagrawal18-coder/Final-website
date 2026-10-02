import { useState } from 'react';
import { filters, specimens } from '../data/experiments.js';

/** A tiny live sample of each pattern, drawn in the same fake-UI style as the experiments. */
export function Sample({ id }) {
  switch (id) {
    case '001':
      return (
        <div className="s-row">
          <span className="s-card">Solo</span>
          <span className="s-card s-card-on">
            <span className="s-pill">Most popular</span>Plus
          </span>
          <span className="s-card">Max</span>
        </div>
      );
    case '002':
      return (
        <div className="s-stack">
          <span className="s-check is-on">Add travel protection · ₹399</span>
          <span className="s-check is-on">Email me deals and offers</span>
        </div>
      );
    case '003':
      return (
        <div className="s-stack">
          <span className="s-scarce">🔥 Only 2 left</span>
        </div>
      );
    case '004':
      return (
        <div className="s-stack s-prices">
          <span className="s-strike">₹3,999</span>
          <span className="s-price">₹2,499</span>
        </div>
      );
    case '005':
      return (
        <div className="s-row s-row-split">
          <span className="s-coupon">20% off</span>
          <span className="s-or mono">or</span>
          <span className="s-coupon">₹500 off</span>
          <span className="s-fine mono">on a ₹2,500 basket, both are the same</span>
        </div>
      );
    case '006':
      return (
        <div className="s-stack">
          <span className="s-rec">✦ Recommended for you</span>
        </div>
      );
    case '007':
      return (
        <div className="s-stack">
          <span className="s-viewing">
            <span className="s-dot" aria-hidden="true" /> 12 people are viewing this
          </span>
        </div>
      );
    case '008':
      return (
        <div className="s-stack s-progress-pair">
          <div className="s-progress">
            <span style={{ width: '60%' }} />
          </div>
          <p className="s-fine mono">3 of 5 complete · or · 2 steps left</p>
        </div>
      );
    case '009':
      return (
        <div className="s-stack">
          <span className="s-trial">
            Start free trial
          </span>
          <span className="s-fine">then ₹499/month, renews automatically</span>
        </div>
      );
    case '010':
      return (
        <div className="s-stack s-center">
          <span className="s-primary">Continue</span>
          <span className="s-skip">skip for now</span>
        </div>
      );
    case '011':
      return (
        <div className="s-dialog">
          <p>Are you sure?</p>
          <div className="s-row">
            <span className="s-btn">Cancel</span>
            <span className="s-btn s-btn-dark">Yes</span>
          </div>
        </div>
      );
    case '012':
      return (
        <div className="s-stack">
          <span className="s-rating">
            4.8 <span className="s-stars">★</span> <span className="s-fine">· 18,492 reviews</span>
          </span>
          <span className="s-rating s-rating-dim">
            4.8 <span className="s-stars">★</span> <span className="s-fine">· 6 reviews</span>
          </span>
        </div>
      );
    default:
      return null;
  }
}

export default function Library() {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? specimens : specimens.filter((s) => s.tags.includes(active));

  return (
    <section className="section library" id="library" aria-labelledby="library-title">
      <div className="wrap">
        <p className="mono kicker">03 — Tiny Decisions Library</p>
        <h2 className="section-title" id="library-title">
          The little things.
        </h2>
        <p className="section-lede">Once I started looking for them, they were everywhere.</p>

        <div className="filters" role="group" aria-label="Filter the library">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="filter mono"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="mono library-count" aria-live="polite">
          Showing {shown.length} of {specimens.length}
        </p>

        <ul className="specimens" role="list">
          {shown.map((s) => (
            <li key={s.id} className="specimen fade-in">
              <div className="specimen-top">
                <span className="mono specimen-no">{s.id}</span>
                <span className="mono specimen-label">{s.label}</span>
              </div>
              <div className="specimen-sample" aria-hidden="true">
                <Sample id={s.id} />
              </div>
              <h3 className="specimen-title">{s.title}</h3>
              <p className="specimen-body">{s.body}</p>
              <p className="specimen-look">
                <span className="mono">Look for</span> {s.lookFor}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
