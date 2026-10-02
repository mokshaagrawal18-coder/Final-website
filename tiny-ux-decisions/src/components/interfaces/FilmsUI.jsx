import { films, recommendedFor } from '../../data/experiments.js';
import { BrowserFrame } from '../Experiment.jsx';

/** Simple poster art: each film gets a palette and one shape. */
function Poster({ art, title }) {
  const scenes = {
    train: (
      <>
        <rect width="120" height="160" fill="#1B2440" />
        <circle cx="88" cy="38" r="14" fill="#F2E3B3" />
        <circle cx="82" cy="34" r="12" fill="#1B2440" />
        <rect x="0" y="112" width="120" height="3" fill="#3A4670" />
        <rect x="14" y="94" width="78" height="18" rx="4" fill="#C9483B" />
        {[22, 38, 54, 70].map((x) => (
          <rect key={x} x={x} y="99" width="10" height="6" rx="1" fill="#F7D774" />
        ))}
        <circle cx="26" cy="114" r="3" fill="#0E1428" />
        <circle cx="80" cy="114" r="3" fill="#0E1428" />
      </>
    ),
    planets: (
      <>
        <rect width="120" height="160" fill="#F4C9A8" />
        <circle cx="42" cy="58" r="22" fill="#2F5FB3" />
        <ellipse cx="42" cy="58" rx="34" ry="7" fill="none" stroke="#1B1B1F" strokeWidth="2" />
        <circle cx="88" cy="104" r="12" fill="#E2574C" />
        <path d="M70 30 L96 42 L74 48 Z" fill="#fff" stroke="#1B1B1F" strokeWidth="1.5" />
        <circle cx="24" cy="120" r="5" fill="#F7E7A1" />
      </>
    ),
    harbour: (
      <>
        <rect width="120" height="160" fill="#C9D9D3" />
        <rect y="96" width="120" height="64" fill="#5F8A8B" />
        <path d="M0 104 Q30 98 60 104 T120 104" stroke="#9FC1BF" strokeWidth="2" fill="none" />
        <path d="M46 92 L76 92 L70 100 L52 100 Z" fill="#2B2A28" />
        <path d="M60 60 L60 92 L80 88 Z" fill="#F6F1E7" />
        <circle cx="30" cy="40" r="9" fill="#F6F1E7" />
      </>
    ),
    orchard: (
      <>
        <rect width="120" height="160" fill="#141414" />
        {[
          [30, 60],
          [64, 48],
          [94, 70],
          [46, 96],
          [82, 104],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="12" fill="none" stroke="#7CF0B9" strokeWidth="2" />
            <circle cx={x} cy={y} r="4" fill="#FF6FB5" />
          </g>
        ))}
      </>
    ),
  };
  return (
    <svg viewBox="0 0 120 160" className="poster" role="img" aria-label={`Poster for ${title}`} preserveAspectRatio="xMidYMid slice">
      {scenes[art]}
    </svg>
  );
}

/** 05 · A fictional streaming row. Version B labels one film "Recommended for you". */
export default function FilmsUI({ variant, interactive, onChoose, pending, picked, result }) {
  const rec = variant === 'B' && result?.a ? recommendedFor(result.a) : null;

  return (
    <BrowserFrame url="reelhouse.tv/browse" className="frame-dark">
      <div className="ui ui-films">
        <div className="ui-films-top">
          <span className="reel-logo">reelhouse</span>
          <span className="ui-small reel-muted">Tonight · Films</span>
        </div>
        <div className="ui-film-grid">
          {films.map((f) => {
            const isRec = rec === f.id;
            const isOn = pending === f.id || picked === f.id;
            const inner = (
              <>
                <div className="poster-wrap">
                  <Poster art={f.art} title={f.title} />
                  <div className="ui-rec-slot">
                    {isRec && (
                      <span className="ui-rec delta" data-delta="added">
                        ✦ Recommended for you
                      </span>
                    )}
                  </div>
                </div>
                <p className="ui-film-title">{f.title}</p>
                <p className="ui-small reel-muted">
                  {f.genre} · {f.duration}
                </p>
                <p className="ui-small reel-star">★ {f.rating}</p>
                {!interactive && picked === f.id && <span className="you-tag you-tag-dark">you chose</span>}
              </>
            );
            return interactive ? (
              <button
                key={f.id}
                type="button"
                className={`ui-film ${isOn ? 'is-chosen' : ''}`}
                aria-pressed={pending === f.id}
                onClick={() => onChoose(f.id)}
              >
                {inner}
              </button>
            ) : (
              <div key={f.id} className={`ui-film ${isOn ? 'is-chosen' : ''}`}>
                {inner}
              </div>
            );
          })}
        </div>
        {interactive && <p className="ui-hint reel-muted">Tap a film to watch it.</p>}
      </div>
    </BrowserFrame>
  );
}
