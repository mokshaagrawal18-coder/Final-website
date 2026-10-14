import { useEffect, useRef, useState } from 'react';
import { FlowA, FlowB, PATH_A, PATH_B } from '../components/FrictionExperiment.jsx';
import { outcomeHeadline, outcomeLabel, outcomeOf, outcomeText } from '../data/outcomes.js';
import { versusResearch } from '../data/wild.js';
import { WildBody } from '../components/Wild.jsx';
import Tabs from './Tabs.jsx';

/**
 * When the board moves to a new step: scroll the canvas back into view if needed,
 * and move keyboard focus to the new question so it isn't lost to the top of the page.
 */
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
    el.querySelector('.ask')?.focus({ preventScroll: true });
  }, [step]);
  return ref;
}

/**
 * Left column of every board: what this test is, and what it holds constant.
 * Until the reveal it uses a neutral name and hides the pattern, so nothing primes the choice.
 */
function Spec({ exp, n, revealed, steps, current, wide = false }) {
  const [details, setDetails] = useState(false);
  return (
    <div className={`spec ${wide ? 'spec-wide' : ''}`}>
      <p className="spec-no">Test {n} of 5</p>
      <h2 className="spec-title" id={`exp-${exp.id}-title`}>
        {revealed ? exp.title : exp.neutral}
      </h2>
      <p className="spec-scenario">{exp.scenario}</p>
      <button
        type="button"
        className="link spec-toggle"
        aria-expanded={details}
        aria-controls={`exp-${exp.id}-spec`}
        onClick={() => setDetails((d) => !d)}
      >
        {details ? 'Hide test details' : 'Test details'}
      </button>
      <dl className={`spec-list ${details ? 'is-open' : ''}`} id={`exp-${exp.id}-spec`}>
        <div>
          <dt>Pattern</dt>
          <dd className={revealed ? '' : 'is-hidden'}>{revealed ? exp.category : 'Revealed after'}</dd>
        </div>
        <div>
          <dt>Changed</dt>
          <dd className={revealed ? 'is-red' : 'is-hidden'}>
            {revealed ? exp.variable : 'Hidden until you’ve chosen'}
          </dd>
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

/**
 * Frames A and B after the reveal. Side by side on wide screens; on phones, one frame at a
 * readable size with a switch to flip between them (which also makes the change jump out).
 */
function Compare({ renderInterface, describe, result }) {
  const [view, setView] = useState('B');
  const frames = [
    { v: 'A', label: `Frame A · you chose ${describe(result.a)}`, picked: result.a },
    { v: 'B', label: `Frame B · you chose ${describe(result.b)}`, picked: result.b },
  ];
  return (
    <div className="canvas canvas-pair">
      <div className="flip" role="group" aria-label="Show frame">
        {frames.map((f) => (
          <button key={f.v} type="button" className="flip-btn" aria-pressed={view === f.v} onClick={() => setView(f.v)}>
            Frame {f.v}
          </button>
        ))}
      </div>
      {frames.map((f) => (
        <figure key={f.v} className={`pair ${f.v === 'B' ? 'is-b' : ''} ${view === f.v ? 'is-shown' : ''}`}>
          <figcaption className="frame-label">{f.label}</figcaption>
          <div className={`shrink ${f.v === 'B' ? 'redline' : ''}`} inert="">
            {renderInterface(f.v, { interactive: false, picked: f.picked, result })}
          </div>
        </figure>
      ))}
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
    // The change itself, or something it directly caused (like a total that includes it).
    if (e.target.closest('.delta, .delta-echo')) {
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

  const outcome = outcomeOf(exp.id, result);
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
              <p className="ask" tabIndex={-1}>
                {phase === 'b' && <span className="ask-again">Again. </span>}
                {exp.prompt}
              </p>
              <div className="canvas">
                <p className="frame-label" aria-live="polite">
                  {interlude ? '' : phase === 'a' ? 'Frame A' : 'Frame B'}
                </p>
                {interlude ? (
                  <div className="interlude" role="status">
                    <p>Same question.</p>
                    <p className="interlude-sub">Answer as if it’s the first time.</p>
                  </div>
                ) : (
                  <div className="appear" key={phase}>
                    {renderInterface(phase === 'a' ? 'A' : 'B', {
                      interactive: true,
                      onChoose: choose,
                      pending,
                      result,
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {phase === 'spot' && (
            <>
              <p className="ask" tabIndex={-1}>
                One thing in frame B was different from frame A. <span className="ask-soft">Tap it.</span>
                <span className="sr-only"> Using a keyboard? Choose “Show me what changed”.</span>
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
                    {found
                      ? 'That’s the one.'
                      : misses.length === 0
                        ? 'No hints yet.'
                        : `Not that. ${misses.length} miss${misses.length === 1 ? '' : 'es'}.`}
                  </span>
                  {!found && (
                    <button
                      type="button"
                      className={misses.length >= 2 ? 'button button-small' : 'link'}
                      onClick={showMe}
                    >
                      Show me what changed
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {phase === 'reveal' && (
            <div className="appear">
              <p className="ask" tabIndex={-1}>
                {exp.changeNote}
              </p>
              <Compare renderInterface={renderInterface} describe={describe} result={result} />
              {revealNote && <p className="aside-note">{revealNote}</p>}

              <Tabs
                label="About this result"
                items={[
                  {
                    id: 'result',
                    label: 'Your result',
                    body: (
                      <>
                        <dl className="readout">
                          <div>
                            <dt>Your choice</dt>
                            <dd>
                              {describe(result.a)} <span className="arrow">→</span> {describe(result.b)}
                            </dd>
                          </div>
                          <div>
                            <dt>Result</dt>
                            <dd className={outcome === 'toward' ? 'is-red' : ''}>{outcomeLabel[outcome]}</dd>
                          </div>
                          <div>
                            <dt>Spotting</dt>
                            <dd>{spotText}</dd>
                          </div>
                        </dl>
                        {outcome && (
                          <div className="outcome">
                            <p className="outcome-head">{outcomeHeadline(exp.id, outcome)}</p>
                            <p className="outcome-why">{outcomeText[exp.id][outcome]}</p>
                            {versusResearch(exp.id, outcome, result) && (
                              <p className="outcome-research">{versusResearch(exp.id, outcome, result)}</p>
                            )}
                          </div>
                        )}
                      </>
                    ),
                  },
                  { id: 'why', label: 'Why it works', body: <Notes exp={exp} /> },
                  { id: 'wild', label: 'In the wild', body: <WildBody id={exp.id} /> },
                ]}
              />
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
/**
 * Test 4 deliberately breaks the layout of the other four: full width, a dark canvas that
 * matches the streaming app, and a live count of every action you take.
 */
export function FrictionBoard({ exp, n, result = {}, onRecord, onReset, next }) {
  const phase = result.a === undefined ? 'a' : result.b === undefined ? 'b' : 'reveal';
  const canvasRef = useFollow(phase);
  const diff = (result.b ?? 0) - (result.a ?? 0);
  const [live, setLive] = useState(0);

  return (
    <section className="board board-wide" id={`exp-${exp.id}`} aria-labelledby={`exp-${exp.id}-title`}>
      <div className="wrap board-grid">
        <Spec
          exp={exp}
          n={n}
          wide
          revealed={phase === 'reveal'}
          steps={FRICTION_STEPS}
          current={{ a: 0, b: 1, reveal: 2 }[phase]}
        />
        <div className="board-main" ref={canvasRef}>
          {phase !== 'reveal' && (
            <>
              <p className="ask" tabIndex={-1}>
                {phase === 'a' ? (
                  'Cancel your membership.'
                ) : (
                  <>
                    <span className="ask-again">Now this one. </span>Same service, same membership.
                  </>
                )}
              </p>
              <div className="canvas canvas-dark">
                <p className="frame-label">{phase === 'a' ? 'Flow A' : 'Flow B'}</p>
                <div className="flow-stage">
                  <div className="flow-box appear" key={phase}>
                    {phase === 'a' ? (
                      <FlowA onAction={setLive} onDone={(c) => onRecord({ a: c })} />
                    ) : (
                      <FlowB onAction={setLive} onDone={(c, detours) => onRecord({ b: c, detours })} />
                    )}
                  </div>
                  <div className="counter" aria-live="polite">
                    <p className="counter-num">{live}</p>
                    <p className="counter-label">action{live === 1 ? '' : 's'} so far</p>
                    {phase === 'b' && (
                      <p className="counter-prev">
                        Flow A took <strong>{result.a}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {phase === 'reveal' && (
            <div className="appear">
              <p className="ask" tabIndex={-1}>
                {exp.changeNote}
              </p>
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
              <Tabs
                label="About this result"
                items={[
                  {
                    id: 'result',
                    label: 'Your result',
                    body: (
                      <>
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
                        <div className="outcome">
                          <p className="outcome-research">{versusResearch('friction', null, result)}</p>
                        </div>
                      </>
                    ),
                  },
                  { id: 'why', label: 'Why it works', body: <Notes exp={exp} /> },
                  { id: 'wild', label: 'In the wild', body: <WildBody id={exp.id} /> },
                ]}
              />
              <Actions next={next} onReset={onReset} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
