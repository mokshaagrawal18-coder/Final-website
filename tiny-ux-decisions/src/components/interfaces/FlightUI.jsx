import { useState } from 'react';
import { flight } from '../../data/experiments.js';
import { BrowserFrame } from '../Experiment.jsx';

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

/** 02 · A fictional flight checkout. Version B starts with protection already selected. */
export default function FlightUI({ variant, interactive, onChoose, pending, picked }) {
  const start = variant === 'B' ? 'protect' : null;
  // In the reveal, show the interface as it was first presented.
  const [sel, setSel] = useState(start);
  const current = interactive ? sel : start;
  const total = flight.fare + (current === 'protect' ? flight.protection : 0);

  const options = [
    { id: 'protect', label: `Add travel protection · ${inr(flight.protection)}` },
    { id: 'skip', label: 'Continue without protection' },
  ];

  return (
    <BrowserFrame url="kestrel.travel/checkout">
      <div className="ui ui-flight">
        <div className="ui-flight-top">
          <span className="kestrel-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M2 14 L22 6 L14 13 L16 20 L11 15 Z" />
            </svg>
            Kestrel Air
          </span>
          <span className="ui-muted ui-small">Step 3 of 4 · Extras</span>
        </div>

        <div className="ui-ticket">
          <div className="ui-ticket-row">
            <div>
              <p className="ui-code">{flight.from}</p>
              <p className="ui-muted ui-small">{flight.fromCity}</p>
            </div>
            <div className="ui-route" aria-hidden="true">
              <span />
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M2 14 L22 6 L14 13 L16 20 L11 15 Z" />
              </svg>
              <span />
            </div>
            <div className="ui-right">
              <p className="ui-code">{flight.to}</p>
              <p className="ui-muted ui-small">{flight.toCity}</p>
            </div>
          </div>
          <p className="ui-small ui-ticket-meta">
            {flight.day} · {flight.depart} → {flight.arrive} · Non-stop · {flight.code}
            <strong>{inr(flight.fare)}</strong>
          </p>
        </div>

        <fieldset className="ui-protect">
          <legend className="ui-h">Protect your trip?</legend>
          <p className="ui-muted ui-small">
            Travel protection · {inr(flight.protection)}. Covers eligible cancellations and medical emergencies.
          </p>
          <div className="ui-radios">
            {options.map((o) => {
              const isDelta = variant === 'B' && o.id === 'protect';
              const isPicked = !interactive && picked === o.id;
              return (
                <label
                  key={o.id}
                  className={`ui-radio ${current === o.id ? 'is-on' : ''} ${isDelta ? 'delta' : ''}`}
                  data-delta={isDelta ? 'pre-selected' : undefined}
                >
                  <input
                    type="radio"
                    name={`protect-${variant}-${interactive ? 'live' : 'mini'}`}
                    checked={current === o.id}
                    onChange={() => setSel(o.id)}
                    disabled={!interactive || pending !== null}
                  />
                  <span className="ui-radio-dot" aria-hidden="true" />
                  <span>{o.label}</span>
                  {isPicked && <span className="you-tag">you chose</span>}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="ui-flight-foot">
          <p className="ui-small ui-muted">
            Total <strong className="ui-total">{inr(total)}</strong>
          </p>
          {interactive ? (
            <button
              type="button"
              className="ui-btn ui-btn-solid ui-btn-teal"
              disabled={!sel || pending !== null}
              onClick={() => onChoose(sel)}
            >
              {pending ? '✓ Booked' : `Continue · ${inr(total)}`}
            </button>
          ) : (
            <span className="ui-btn ui-btn-solid ui-btn-teal">Continue · {inr(total)}</span>
          )}
        </div>
        {interactive && !sel && <p className="ui-hint">Pick one option to continue.</p>}
      </div>
    </BrowserFrame>
  );
}
