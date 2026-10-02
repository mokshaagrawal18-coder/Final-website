import { useEffect, useRef, useState } from 'react';
import { FlowA, FlowB, PATH_A, PATH_B } from '../components/FrictionExperiment.jsx';

/** Scroll the canvas back into view when the board moves to a new step. */
function useFollow(step) {
  const ref = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 60 || r.top > window.innerHeight * 0.55) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }, [step]);
  return ref;
}

/** Left column of every board: what this test is, and what it holds constant. */
function Spec({ exp, n, revealed, steps, current }) {
  return (
    <div className="spec">
      <p className="spec-no">Test {n} of 5</p>
      <h2 className="spec-title" id={`exp-${exp.id}-title`}>
        {exp.title}
      </h2>
      <p className="spec-scenario">{exp.scenario}</p>
      <dl className="spec-list">
        <div>
          <dt>Pattern</dt>
          <dd>{exp.category}</dd>
        </div>
        <div>
          <dt>Changed</dt>
          <dd className={revealed ? 'is-red' : 'is-hidden'}>{revealed ? exp.variable : 'Hidden until you’ve chosen'}</dd>
        </div>
        <div>
          <dt>Held constant</dt>
          <dd>
            <ul>
              {exp.constant.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <ol className="spec-steps">
        {steps.map((s, i) => (
          <li key={s} className={i === current ? 'is-now' : i < current ? 'is-done' : ''}>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Notes({ exp }) {
  return (
    <div className="notes">
      <div className="notes-body">
        {exp.explanation.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="question">
        <span className="q-mark" aria-hidden="true">
          ?
        </span>
        {exp.question}
      </p>
    </div>
  );
}

function Actions({ next, onReset }) {
  return (
    <div className="board-actions">
      <button type="button" className="link" onClick={onReset}>
        Run this test again
      </button>
      <a className="button" href={next.href}>
        {next.label}
      </a>
    </div>
  );
}

const AB_STEPS = ['Choose', 'Choose again', 'Spot the change', 'Compare'];

/** Tests 1, 2, 3 and 5: choose → choose again → find the change → compare. */
export function Board({ exp, n, result = {}, onRecord, onReset, renderInterface, describe, next, revealNote }) {
  const phase =
    result.a === undefined ? 'a' : result.b === undefined ? 'b' : result.spot === undefined ? 'spot' : 'reveal';
  const stepIndex = { a: 0, b: 1, spot: 2, reveal: 3 }[phase];

  const [interlude, setInterlude] = useState(false);
  const [pending, setPending] = useState(null);
  const [misses, setMisses] = useState([]);
  const [found, setFound] = useState(false);
  const timers = useRef([]);
  const canvasRef = useFollow(phase);

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
        later(() => setInterlude(false), 1200);
      } else {
        onRecord({ b: value });
      }
    }, 420);
  };

  const spot = (e) => {
    if (found) return;
    if (e.target.closest('.delta')) {
      setFound(true);
      const tries = misses.length;
      later(() => {
        onRecord({ spot: tries });
        setFound(false);
        setMisses([]);
      }, 1000);
      return;
    }
    const box = e.currentTarget.getBoundingClientRect();
    setMisses((m) => [...m, { x: e.clientX - box.left, y: e.clientY - box.top }]);
  };

  const showMe = () => {
    onRecord({ spot: -1 });
    setMisses([]);
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setPending(null);
    setInterlude(false);
    setMisses([]);
    setFound(false);
    onReset();
  };

  const changed = result.a !== result.b;
  const spotText =
    result.spot === -1
      ? 'You asked to be shown'
      : result.spot === 0
        ? 'Found on the first tap'
        : `Found after ${result.spot} wrong tap${result.spot === 1 ? '' : 's'}`;

  return (
    <section className="board" id={`exp-${exp.id}`} aria-labelledby={`exp-${exp.id}-title`}>
      <div className="wrap board-grid">
        <Spec exp={exp} n={n} revealed={phase === 'reveal'} steps={AB_STEPS} current={stepIndex} />

        <div className="board-main" ref={canvasRef}>
          {(phase === 'a' || phase === 'b') && (
            <>
              <p className="ask">
                {phase === 'b' && <span className="ask-again">Again. </span>}
                {exp.prompt}
              </p>
              <div className="canvas">
                <p className="frame-label" aria-live="polite">
                  {interlude ? '' : phase === 'a' ? 'Frame A' : 'Frame B'}
                </p>
                {interlude ? (
                  <div className="interlude">
                    <p>Same question.</p>
                    <p className="interlude-sub">Look again.</p>
                  </div>
                ) : (
                  <div className="appear" key={phase}>
                    {renderInterface(phase === 'a' ? 'A' : 'B', { interactive: true, onChoose: choose, pending, result })}
                  </div>
                )}
              </div>
            </>
          )}

          {phase === 'spot' && (
            <>
              <p className="ask">
                One thing in frame B was different from frame A. <span className="ask-soft">Tap it.</span>
              </p>
              <div className="canvas">
                <p className="frame-label">Frame B</p>
                <div className={`spot-area ${found ? 'is-found' : ''}`} onClick={spot}>
                  {renderInterface('B', { interactive: false, result })}
                  {misses.map((m, i) => (
                    <span key={i} className="miss" style={{ left: m.x, top: m.y }} aria-hidden="true" />
                  ))}
                </div>
                <div className="spot-foot" aria-live="polite">
                  <span className="spot-status">
                    {found ? 'That’s the one.' : misses.length === 0 ? 'No hints yet.' : `Not that. ${misses.length} miss${misses.length === 1 ? '' : 'es'}.`}
                  </span>
                  {!found && (
                    <button type="button" className={misses.length >= 2 ? 'button button-small' : 'link'} onClick={showMe}>
                      Show me what changed
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {phase === 'reveal' && (
            <div className="appear">
              <p className="ask">{exp.changeNote}</p>
              <div className="canvas canvas-pair">
                <figure className="pair">
                  <figcaption className="frame-label">Frame A · you chose {describe(result.a)}</figcaption>
                  <div className="shrink" inert="">
                    {renderInterface('A', { interactive: false, picked: result.a, result })}
                  </div>
                </figure>
                <figure className="pair is-b">
                  <figcaption className="frame-label">Frame B · you chose {describe(result.b)}</figcaption>
                  <div className="shrink redline" inert="">
                    {renderInterface('B', { interactive: false, picked: result.b, result })}
                  </div>
                </figure>
              </div>
              {revealNote && <p className="aside-note">{revealNote}</p>}

              <dl className="readout">
                <div>
                  <dt>Your choice</dt>
                  <dd>
                    {describe(result.a)} <span className="arrow">→</span> {describe(result.b)}
                  </dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd className={changed ? 'is-red' : ''}>{changed ? 'Changed' : 'Stayed the same'}</dd>
                </div>
                <div>
                  <dt>Spotting</dt>
                  <dd>{spotText}</dd>
                </div>
              </dl>

              <Notes exp={exp} />
              <Actions next={next} onReset={reset} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Trail({ label, steps, count }) {
  return (
    <div className="trail">
      <p className="trail-head">
        <span>{label}</span>
        <span className="trail-count">{count} actions</span>
      </p>
      <ol className="trail-steps">
        {steps.map((s, i) => (
          <li key={`${s}-${i}`} className={i > 0 && i < steps.length - 1 && steps.length > 3 ? 'is-extra' : ''}>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const FRICTION_STEPS = ['Cancel, flow A', 'Cancel, flow B', 'Compare'];

/** Test 4: two real cancellation flows, then the click trails side by side. */
export function FrictionBoard({ exp, n, result = {}, onRecord, onReset, next }) {
  const phase = result.a === undefined ? 'a' : result.b === undefined ? 'b' : 'reveal';
  const canvasRef = useFollow(phase);
  const diff = (result.b ?? 0) - (result.a ?? 0);

  return (
    <section className="board" id={`exp-${exp.id}`} aria-labelledby={`exp-${exp.id}-title`}>
      <div className="wrap board-grid">
        <Spec
          exp={exp}
          n={n}
          revealed={phase === 'reveal'}
          steps={FRICTION_STEPS}
          current={{ a: 0, b: 1, reveal: 2 }[phase]}
        />
        <div className="board-main" ref={canvasRef}>
          {phase !== 'reveal' && (
            <>
              <p className="ask">
                {phase === 'a' ? (
                  'Cancel your membership.'
                ) : (
                  <>
                    <span className="ask-again">Now this one. </span>Same service, same membership.
                  </>
                )}
              </p>
              <div className="canvas canvas-centre">
                <p className="frame-label">{phase === 'a' ? 'Flow A' : 'Flow B'}</p>
                <div className="flow-box appear" key={phase}>
                  {phase === 'a' ? (
                    <FlowA onDone={(c) => onRecord({ a: c })} />
                  ) : (
                    <FlowB onDone={(c, detours) => onRecord({ b: c, detours })} />
                  )}
                </div>
              </div>
            </>
          )}

          {phase === 'reveal' && (
            <div className="appear">
              <p className="ask">{exp.changeNote}</p>
              <div className="canvas canvas-trails">
                <Trail label="Flow A" steps={PATH_A} count={result.a} />
                <Trail label="Flow B" steps={PATH_B} count={result.b} />
              </div>
              {result.detours?.length > 0 && (
                <p className="aside-note">
                  You took a detour on the way: {result.detours.join(', ').toLowerCase()}. The offers were the biggest
                  buttons on each screen, and “continue cancelling” the faintest.
                </p>
              )}
              <dl className="readout">
                <div>
                  <dt>Flow A</dt>
                  <dd>{result.a} actions</dd>
                </div>
                <div>
                  <dt>Flow B</dt>
                  <dd className="is-red">{result.b} actions</dd>
                </div>
                <div>
                  <dt>Difference</dt>
                  <dd>{diff > 0 ? `${diff} more to leave the long way` : 'About the same this time'}</dd>
                </div>
              </dl>
              <Notes exp={exp} />
              <Actions next={next} onReset={onReset} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
