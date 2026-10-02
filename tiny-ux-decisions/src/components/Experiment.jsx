import { useEffect, useRef, useState } from 'react';

/** A light browser window around each fictional interface. */
export function BrowserFrame({ url, children, className = '' }) {
  return (
    <div className={`frame ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame-url">{url}</span>
      </div>
      <div className="frame-body">{children}</div>
    </div>
  );
}

export function ExperimentHeader({ exp }) {
  return (
    <header className="exp-head">
      <p className="mono kicker">
        {exp.number} / 05 · {exp.category}
      </p>
      <h2 className="exp-title">{exp.title}</h2>
      <p className="exp-scenario">{exp.scenario}</p>
    </header>
  );
}

export function ResultLine({ from, to, changed, changedText = 'Your choice changed.', stayedText = 'You stuck with your first choice.' }) {
  return (
    <div className={`result-line ${changed ? 'is-changed' : ''}`}>
      <p className="result-verdict">{changed ? changedText : stayedText}</p>
      <p className="mono result-path">
        <span>{from}</span>
        <span className="arrow" aria-hidden="true">→</span>
        <span className="sr-only">then</span>
        <span className={changed ? 'is-new' : ''}>{to}</span>
      </p>
    </div>
  );
}

export function Explanation({ exp }) {
  return (
    <div className="explain">
      <h3 className="mono kicker">What’s happening here?</h3>
      {exp.explanation.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export function TinyQuestion({ text }) {
  return (
    <aside className="tiny-q">
      <p className="mono kicker">Tiny question</p>
      <p className="tiny-q-text">{text}</p>
      <p className="tiny-q-note">No answer required.</p>
    </aside>
  );
}

export function NextRow({ next, onReset }) {
  return (
    <div className="exp-actions">
      <button type="button" className="text-btn" onClick={onReset}>
        ↺ Try it again
      </button>
      <a className="btn" href={next.href}>
        {next.label} <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

/** Scroll a freshly revealed block into view without jumping if it's already visible. */
export function useRevealScroll(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (r.top < 70 || r.top > window.innerHeight * 0.6) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      ref.current.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }, [active]);
  return ref;
}

/**
 * The shared shape of experiments 01, 02, 03 and 05:
 * round A → "one more time" → round B → reveal.
 *
 * renderInterface(variant, opts) draws the fictional interface.
 *   opts.interactive  — false inside the side-by-side reveal
 *   opts.onChoose(v)  — record a choice for this round
 *   opts.pending      — the value just chosen (for a brief confirmation state)
 *   opts.picked       — the visitor's choice for that round (reveal only)
 */
export function ABExperiment({ exp, result = {}, onRecord, onReset, next, renderInterface, describe, revealNote, changedText, stayedText }) {
  const phase = result.b !== undefined ? 'reveal' : result.a !== undefined ? 'b' : 'a';
  const [interlude, setInterlude] = useState(false);
  const [pending, setPending] = useState(null);
  const timers = useRef([]);
  const revealRef = useRevealScroll(phase === 'reveal');

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));

  const choose = (value) => {
    if (pending !== null || interlude) return;
    setPending(value);
    const round = phase;
    later(() => {
      setPending(null);
      if (round === 'a') {
        setInterlude(true);
        onRecord({ a: value });
        later(() => setInterlude(false), 1300);
      } else {
        onRecord({ b: value });
      }
    }, 450);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setPending(null);
    setInterlude(false);
    onReset();
  };

  return (
    <section className="experiment" id={`exp-${exp.id}`} aria-labelledby={`exp-${exp.id}-title`}>
      <div className="wrap">
        <ExperimentHeader exp={exp} />

        {phase !== 'reveal' && (
          <div className="stage">
            <div className="stage-top">
              <p className="prompt" id={`exp-${exp.id}-title`}>
                {phase === 'b' && <span className="again">One more time. </span>}
                {exp.prompt}
              </p>
              <p className="mono round" aria-live="polite">
                Round {phase === 'a' ? 1 : 2} of 2
              </p>
            </div>
            {interlude ? (
              <div className="interlude" aria-live="polite">
                <p className="interlude-text">One more time.</p>
                <p className="mono interlude-sub">Same question. Look again.</p>
              </div>
            ) : (
              <div className="fade-in" key={phase}>
                {renderInterface(phase === 'a' ? 'A' : 'B', { interactive: true, onChoose: choose, pending, result })}
              </div>
            )}
          </div>
        )}

        {phase === 'reveal' && (
          <div className="reveal fade-in" ref={revealRef} aria-live="polite">
            <h3 className="reveal-head" id={`exp-${exp.id}-title`}>
              <span className="mono kicker red">One thing changed</span>
              <span className="change-chip">{exp.change}</span>
            </h3>

            <div className="compare">
              <figure className="compare-pane">
                <figcaption className="mono">A · first look</figcaption>
                <div className="mini" inert="">
                  {renderInterface('A', { interactive: false, picked: result.a, result })}
                </div>
              </figure>
              <figure className="compare-pane is-b">
                <figcaption className="mono">B · second look</figcaption>
                <div className="mini" inert="">
                  {renderInterface('B', { interactive: false, picked: result.b, result })}
                </div>
              </figure>
            </div>

            <p className="change-note">{exp.changeNote}</p>
            {revealNote && <p className="reveal-note">{revealNote}</p>}

            <ResultLine
              from={describe(result.a)}
              to={describe(result.b)}
              changed={result.a !== result.b}
              changedText={changedText}
              stayedText={stayedText}
            />

            <div className="reveal-grid">
              <Explanation exp={exp} />
              <TinyQuestion text={exp.question} />
            </div>

            <NextRow next={next} onReset={reset} />
          </div>
        )}
      </div>
    </section>
  );
}
