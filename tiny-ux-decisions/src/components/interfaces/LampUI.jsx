import { lamp } from '../../data/experiments.js';
import { BrowserFrame } from '../Experiment.jsx';

function LampArt() {
  return (
    <svg viewBox="0 0 220 220" className="lamp-art" role="img" aria-label="Illustration of a cream desk lamp">
      <ellipse cx="110" cy="196" rx="62" ry="7" fill="rgba(60,45,20,0.12)" />
      <rect x="70" y="182" width="80" height="12" rx="6" fill="#2b2a28" />
      <path d="M110 184 L92 112 L140 62" stroke="#2b2a28" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="92" cy="112" r="6" fill="#2b2a28" />
      <circle cx="140" cy="62" r="5" fill="#2b2a28" />
      <path d="M128 52 L176 44 L190 96 Z" fill="#EFD9A9" stroke="#2b2a28" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="183" cy="70" rx="6" ry="26" transform="rotate(-15 183 70)" fill="#FFF6DA" />
      <path d="M185 98 L196 150 L160 104 Z" fill="rgba(242,200,75,0.22)" />
    </svg>
  );
}

/** 03 · A fictional product page. Version B adds a scarcity line. */
export default function LampUI({ variant, interactive, onChoose, pending, picked }) {
  return (
    <div>
      <BrowserFrame url="milo.home/lamps/desk">
        <div className="ui ui-lamp">
          <div className="ui-lamp-img">
            <LampArt />
          </div>
          <div className="ui-lamp-info">
            <p className="milo-logo">milo</p>
            <p className="ui-plan-name">{lamp.name}</p>
            <p className="ui-stars">
              <span aria-hidden="true">★★★★★</span>
              <span className="ui-muted">
                {' '}
                {lamp.rating} · {lamp.reviews}
              </span>
            </p>
            <p className="ui-price ui-price-lg">{lamp.price}</p>
            <p className="ui-small ui-green">{lamp.delivery}</p>
            <div className="ui-scarce-slot">
              {variant === 'B' && (
                <p className="ui-scarce delta" data-delta="added">
                  <span aria-hidden="true">🔥</span> Only 2 left
                </p>
              )}
            </div>
            {interactive ? (
              <button
                type="button"
                className="ui-btn ui-btn-solid ui-btn-milo"
                onClick={() => onChoose('buy')}
                disabled={pending !== null}
              >
                {pending === 'buy' ? '✓ Added' : 'Add to cart'}
              </button>
            ) : (
              <span className={`ui-btn ui-btn-solid ui-btn-milo ${picked === 'buy' ? 'is-you' : ''}`}>
                {picked === 'buy' ? '✓ You bought it' : 'Add to cart'}
              </span>
            )}
            {!interactive && picked === 'wait' && <p className="you-tag you-tag-block">you kept looking</p>}
          </div>
        </div>
      </BrowserFrame>

      {interactive && (
        <div className="answer-row" role="group" aria-label="Your decision">
          <button type="button" className={`answer ${pending === 'buy' ? 'is-on' : ''}`} onClick={() => onChoose('buy')}>
            Buy it
          </button>
          <button type="button" className={`answer ${pending === 'wait' ? 'is-on' : ''}`} onClick={() => onChoose('wait')}>
            Keep looking
          </button>
        </div>
      )}
    </div>
  );
}
