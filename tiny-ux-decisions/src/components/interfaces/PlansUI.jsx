import { plans } from '../../data/experiments.js';
import { BrowserFrame } from '../Experiment.jsx';

/** 01 · A fictional music app's plan picker. Version B adds one badge. */
export default function PlansUI({ variant, interactive, onChoose, pending, picked }) {
  return (
    <BrowserFrame url="listen.app/plans">
      <div className="ui ui-plans">
        <div className="ui-plans-head">
          <span className="listen-logo" aria-hidden="true">
            <svg viewBox="0 0 20 20" width="18" height="18">
              <rect x="2" y="8" width="2.4" height="6" rx="1.2" />
              <rect x="6.4" y="4" width="2.4" height="12" rx="1.2" />
              <rect x="10.8" y="6" width="2.4" height="9" rx="1.2" />
              <rect x="15.2" y="9" width="2.4" height="4" rx="1.2" />
            </svg>
            Listen
          </span>
          <p className="ui-h">Choose your plan</p>
          <p className="ui-muted">Cancel anytime. Prices include GST.</p>
        </div>

        <div className="ui-plan-grid">
          {plans.map((p) => {
            const badge = variant === 'B' && p.id === 'plus';
            const isPending = pending === p.id;
            const isPicked = picked === p.id;
            return (
              <div key={p.id} className={`ui-plan ${isPending || isPicked ? 'is-chosen' : ''}`}>
                <div className="ui-badge-slot">
                  {badge && (
                    <span className="ui-badge delta" data-delta="added">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="ui-tier">{p.tier}</p>
                <p className="ui-plan-name">{p.name}</p>
                <p className="ui-price">
                  {p.price}
                  <span>/month</span>
                </p>
                <ul className="ui-features">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {interactive ? (
                  <button
                    type="button"
                    className="ui-btn ui-btn-outline"
                    aria-pressed={isPending}
                    onClick={() => onChoose(p.id)}
                  >
                    {isPending ? '✓ Selected' : `Choose ${p.name}`}
                  </button>
                ) : (
                  <span className={`ui-btn ui-btn-outline ${isPicked ? 'is-you' : ''}`}>
                    {isPicked ? '✓ You chose this' : `Choose ${p.name}`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </BrowserFrame>
  );
}
