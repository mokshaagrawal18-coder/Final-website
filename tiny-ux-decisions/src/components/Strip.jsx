import { useState } from 'react';
import { stripLayers } from '../data/experiments.js';

function HotelArt() {
  return (
    <svg viewBox="0 0 400 200" className="hotel-art" role="img" aria-label="Illustration of a small white villa by the sea with a palm tree">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7D9B5" />
          <stop offset="1" stopColor="#FBEBD6" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#sky)" />
      <circle cx="300" cy="70" r="26" fill="#F2B45B" opacity="0.8" />
      <rect y="128" width="400" height="72" fill="#5F9EA0" />
      <path d="M0 136 Q50 130 100 136 T200 136 T300 136 T400 136" stroke="#9CCBCB" strokeWidth="2" fill="none" />
      <rect y="150" width="400" height="50" fill="#E9D4AE" />
      <rect x="150" y="96" width="120" height="56" fill="#FCF9F2" />
      <path d="M140 98 L210 70 L280 98 Z" fill="#C9673F" />
      <rect x="168" y="112" width="18" height="18" fill="#7AA8B0" />
      <rect x="234" y="112" width="18" height="18" fill="#7AA8B0" />
      <rect x="202" y="118" width="16" height="34" fill="#8C5A3C" />
      <path d="M92 158 Q98 110 88 70" stroke="#6B4A2E" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M88 70 Q60 60 44 76 M88 70 Q110 52 132 62 M88 70 Q70 44 58 40 M88 70 Q104 40 120 38 M88 70 Q92 90 112 96" stroke="#2F6B4F" strokeWidth="9" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Wraps a layer so it can fold away smoothly when switched off. */
function Layer({ on, children, inline = false }) {
  const Tag = inline ? 'span' : 'div';
  return (
    <Tag className={`layer ${inline ? 'layer-inline' : ''} ${on ? '' : 'is-off'}`} aria-hidden={!on}>
      <Tag className="layer-inner">{children}</Tag>
    </Tag>
  );
}

export default function Strip() {
  const [on, setOn] = useState(() => Object.fromEntries(stripLayers.map((l) => [l.id, true])));
  const count = Object.values(on).filter(Boolean).length;
  const all = count === stripLayers.length;
  const none = count === 0;

  const toggle = (id) => setOn((s) => ({ ...s, [id]: !s[id] }));
  const setAll = (v) => setOn(Object.fromEntries(stripLayers.map((l) => [l.id, v])));

  return (
    <section className="section strip" id="strip" aria-labelledby="strip-title">
      <div className="wrap">
        <p className="mono kicker">04 — Strip the Interface</p>
        <h2 className="section-title" id="strip-title">
          Strip it back.
        </h2>
        <p className="section-lede">How much of a shopping interface is actually about the product?</p>

        <div className="strip-grid">
          <div className="strip-card-wrap">
            <article className={`hotel ${none ? 'is-bare' : ''}`} aria-label="Hotel listing">
              <div className="hotel-img">
                <HotelArt />
                <Layer on={on.recommendation}>
                  <span className="hotel-fav">🏆 Guest favourite</span>
                </Layer>
              </div>
              <div className="hotel-body">
                <p className="hotel-name">The Palm House</p>
                <p className="hotel-place">Goa</p>

                <Layer on={on.social}>
                  <p className="hotel-stars">
                    <span aria-hidden="true">★★★★★</span> <strong>4.8</strong> · 2,341 reviews
                  </p>
                </Layer>
                <Layer on={on.urgency}>
                  <p className="hotel-viewing">
                    <span className="s-dot" aria-hidden="true" /> 17 people are viewing this
                  </p>
                </Layer>

                <div className="hotel-price-row">
                  <Layer on={on.anchor} inline>
                    <span className="hotel-strike">₹14,200</span>
                  </Layer>
                  <span className="hotel-price">₹9,899</span>
                  <span className="hotel-night">/ night</span>
                  <Layer on={on.discount} inline>
                    <span className="hotel-save">Save 30%</span>
                  </Layer>
                </div>

                <Layer on={on.scarcity}>
                  <p className="hotel-scarce">🔥 Only 1 room left</p>
                </Layer>
                <p className="hotel-free">✓ Free cancellation</p>

                <span className={`hotel-btn ${on.urgency ? 'is-urgent' : ''}`}>{on.urgency ? 'Reserve now' : 'Reserve'}</span>
              </div>
            </article>
          </div>

          <div className="strip-controls">
            <p className="mono kicker">Remove a layer</p>
            <ul className="toggles" role="list">
              {stripLayers.map((l) => (
                <li key={l.id}>
                  <label className={`toggle ${on[l.id] ? 'is-on' : ''}`}>
                    <input type="checkbox" checked={on[l.id]} onChange={() => toggle(l.id)} />
                    <span className="toggle-box" aria-hidden="true" />
                    <span className="toggle-text">
                      <span className="toggle-label">{l.label}</span>
                      <span className="toggle-shows">{l.shows}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <div className="strip-actions">
              <p className="mono strip-count" aria-live="polite">
                {count} of {stripLayers.length} layers on
              </p>
              <button type="button" className="text-btn" onClick={() => setAll(!all)}>
                {all ? 'Strip everything' : 'Put it all back'}
              </button>
            </div>
          </div>
        </div>

        <div className={`strip-outro ${none ? 'is-shown' : ''}`} aria-live="polite">
          {none ? (
            <>
              <p className="strip-outro-lines">
                Same room.
                <br />
                Same price.
                <br />
                <em>Very different decision environment.</em>
              </p>
              <p className="strip-q">
                Which information helped you decide, and which information mainly made you decide faster?
              </p>
            </>
          ) : (
            <p className="mono strip-hint">Untick every layer to see what’s left.</p>
          )}
        </div>
      </div>
    </section>
  );
}
