import { useState } from 'react';
import { cancelReasons } from '../data/experiments.js';
import { BrowserFrame, ExperimentHeader, Explanation, NextRow, TinyQuestion, useRevealScroll } from './Experiment.jsx';

export const PATH_A = ['Account', 'Confirm', 'Cancelled'];
export const PATH_B = ['Account', 'Offer', 'Offer', 'Survey', 'Warning', 'Cancelled'];

function AccountCard() {
  return (
    <div className="ui-membership">
      <p className="ui-small reel-muted">Your plan</p>
      <p className="ui-film-title">Reelhouse Standard</p>
      <p className="ui-small reel-muted">₹499/month · renews 14 Oct</p>
    </div>
  );
}

/** Flow A: the straight path. */
export function FlowA({ onDone }) {
  const [step, setStep] = useState(0);
  const [actions, setActions] = useState(0);
  const act = (to) => {
    setActions((n) => n + 1);
    setStep(to);
  };

  return (
    <BrowserFrame url="reelhouse.tv/account" className="frame-dark">
      <div className="ui ui-cancel fade-in" key={step}>
        {step === 0 && (
          <>
            <p className="ui-h">Account</p>
            <AccountCard />
            <button type="button" className="ui-btn ui-btn-danger" onClick={() => act(1)}>
              Cancel membership
            </button>
          </>
        )}
        {step === 1 && (
          <>
            <p className="ui-h">Are you sure?</p>
            <p className="reel-muted">Your membership will end on 14 Oct.</p>
            <div className="ui-btn-row">
              <button type="button" className="ui-btn ui-btn-danger" onClick={() => act(2)}>
                Yes, cancel
              </button>
              <button type="button" className="ui-link" onClick={() => act(0)}>
                Go back
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <p className="ui-h">Membership cancelled.</p>
            <p className="reel-muted">That’s it. You can rejoin any time.</p>
            <p className="mono action-count">
              {actions} action{actions === 1 ? '' : 's'}
            </p>
            <button type="button" className="ui-btn ui-btn-light" onClick={() => onDone(actions)}>
              Now try another one →
            </button>
          </>
        )}
      </div>
    </BrowserFrame>
  );
}

/** Flow B: the same cancellation, the long way round. */
export function FlowB({ onDone }) {
  const [step, setStep] = useState('account');
  const [actions, setActions] = useState(0);
  const [reason, setReason] = useState('');
  const [detour, setDetour] = useState(null); // { text, back }
  const [detours, setDetours] = useState([]);

  const act = (to) => {
    setActions((n) => n + 1);
    setStep(to);
  };
  const divert = (label, text, back) => {
    setActions((n) => n + 1);
    setDetours((d) => [...d, label]);
    setDetour({ text, back });
  };
  const leaveDetour = () => {
    setActions((n) => n + 1);
    setStep(detour.back);
    setDetour(null);
  };

  if (detour) {
    return (
      <BrowserFrame url="reelhouse.tv/account" className="frame-dark">
        <div className="ui ui-cancel fade-in" key="detour">
          <p className="ui-h">{detour.text}</p>
          <p className="reel-muted">Easy to do by accident when it’s the biggest button on the screen.</p>
          <button type="button" className="ui-link" onClick={leaveDetour}>
            That’s not what I wanted. Continue cancelling
          </button>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame url="reelhouse.tv/account" className="frame-dark">
      <div className="ui ui-cancel fade-in" key={step}>
        {step === 'account' && (
          <>
            <p className="ui-h">Account</p>
            <AccountCard />
            <ul className="ui-settings" role="list">
              <li>Profiles</li>
              <li>Playback settings</li>
              <li>Payment method</li>
              <li>
                <button type="button" className="ui-settings-link" onClick={() => act('pause')}>
                  Manage membership <span aria-hidden="true">›</span>
                </button>
              </li>
            </ul>
          </>
        )}
        {step === 'pause' && (
          <>
            <p className="ui-h">We’d hate to see you go.</p>
            <p className="reel-muted">Pause for one month instead? Your profiles and list stay exactly as they are.</p>
            <button
              type="button"
              className="ui-btn ui-btn-amber"
              onClick={() => divert('Paused instead', 'Membership paused until 2 Nov.', 'lite')}
            >
              Pause membership
            </button>
            <button type="button" className="ui-link ui-link-faint" onClick={() => act('lite')}>
              No, continue cancelling
            </button>
          </>
        )}
        {step === 'lite' && (
          <>
            <p className="ui-h">Before you go…</p>
            <p className="reel-muted">Switch to our ₹99 Lite plan? Keep watching on one screen, for a fifth of the price.</p>
            <button
              type="button"
              className="ui-btn ui-btn-amber"
              onClick={() => divert('Switched to Lite', 'You’re on Lite now. ₹99/month from 14 Oct.', 'survey')}
            >
              Switch plan
            </button>
            <button type="button" className="ui-link ui-link-faint" onClick={() => act('survey')}>
              Continue cancelling
            </button>
          </>
        )}
        {step === 'survey' && (
          <>
            <p className="ui-h">Tell us why you’re leaving.</p>
            <label className="ui-select-label">
              <span className="ui-small reel-muted">Reason (required)</span>
              <select
                value={reason}
                onChange={(e) => {
                  if (!reason) setActions((n) => n + 1);
                  setReason(e.target.value);
                }}
              >
                <option value="" disabled>
                  Choose a reason
                </option>
                {cancelReasons.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <button type="button" className="ui-btn ui-btn-light" disabled={!reason} onClick={() => act('warning')}>
              Continue
            </button>
          </>
        )}
        {step === 'warning' && (
          <>
            <p className="ui-h">Are you sure?</p>
            <p className="reel-muted">You’ll lose your saved preferences, your watch history and 3 profiles.</p>
            <button
              type="button"
              className="ui-btn ui-btn-amber"
              onClick={() => divert('Kept membership', 'Great, you’re staying with us!', 'warning')}
            >
              Keep membership
            </button>
            <button type="button" className="ui-link ui-link-faint" onClick={() => act('done')}>
              Cancel anyway
            </button>
          </>
        )}
        {step === 'done' && (
          <>
            <p className="ui-h">Membership cancelled.</p>
            <p className="reel-muted">We’ll miss you.</p>
            <p className="mono action-count">{actions} actions</p>
            <button type="button" className="ui-btn ui-btn-light" onClick={() => onDone(actions, detours)}>
              See what changed →
            </button>
          </>
        )}
      </div>
    </BrowserFrame>
  );
}

function PathTrack({ steps, label, count, tone }) {
  return (
    <div className={`path path-${tone}`}>
      <div className="path-head">
        <p className="mono kicker">{label}</p>
        <p className="path-count">
          {count}
          <span className="mono"> actions</span>
        </p>
      </div>
      <ol className="path-steps" role="list">
        {steps.map((s, i) => (
          <li key={`${s}-${i}`} style={{ '--i': i }}>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** 04 · Not an A/B picker: the visitor actually cancels, twice. */
export default function FrictionExperiment({ exp, result = {}, onRecord, onReset, next }) {
  const phase = result.b !== undefined ? 'reveal' : result.a !== undefined ? 'b' : 'a';
  const revealRef = useRevealScroll(phase === 'reveal');

  return (
    <section className="experiment" id={`exp-${exp.id}`} aria-labelledby={`exp-${exp.id}-title`}>
      <div className="wrap">
        <ExperimentHeader exp={exp} />

        {phase !== 'reveal' && (
          <div className="stage">
            <div className="stage-top">
              <p className="prompt" id={`exp-${exp.id}-title`}>
                {phase === 'a' ? 'Cancel your membership.' : <><span className="again">Now try another one. </span>Same service, same membership.</>}
              </p>
              <p className="mono round" aria-live="polite">
                Flow {phase === 'a' ? 'A' : 'B'} of 2
              </p>
            </div>
            <div className="cancel-stage">
              {phase === 'a' ? (
                <FlowA onDone={(n) => onRecord({ a: n })} />
              ) : (
                <FlowB onDone={(n, detours) => onRecord({ b: n, detours })} />
              )}
            </div>
          </div>
        )}

        {phase === 'reveal' && (
          <div className="reveal fade-in" ref={revealRef} aria-live="polite">
            <h3 className="reveal-head" id={`exp-${exp.id}-title`}>
              <span className="mono kicker red">One thing changed</span>
              <span className="change-chip">{exp.change}</span>
            </h3>

            <div className="paths">
              <PathTrack steps={PATH_A} label="Flow A · the straight path" count={result.a} tone="a" />
              <PathTrack steps={PATH_B} label="Flow B · the long way round" count={result.b} tone="b" />
            </div>

            <p className="change-note">{exp.changeNote}</p>
            {result.detours?.length > 0 && (
              <p className="reveal-note">
                Along the way you took a detour: <strong>{result.detours.join(', ').toLowerCase()}</strong>. That’s the flow
                working as designed. The offers are the biggest buttons on the screen; “continue cancelling” is the faintest.
              </p>
            )}

            <div className="result-line is-changed">
              <p className="result-verdict">
                {result.b > result.a
                  ? `The long way took ${result.b - result.a} more action${result.b - result.a === 1 ? '' : 's'}.`
                  : 'Both flows took you about the same effort this time.'}
              </p>
              <p className="mono result-path">
                <span>{result.a} actions</span>
                <span className="arrow" aria-hidden="true">→</span>
                <span className="is-new">{result.b} actions</span>
              </p>
            </div>

            <div className="reveal-grid">
              <Explanation exp={exp} />
              <TinyQuestion text={exp.question} />
            </div>

            <NextRow next={next} onReset={onReset} />
          </div>
        )}
      </div>
    </section>
  );
}
