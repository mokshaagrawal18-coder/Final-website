import { useId, useRef, useState } from 'react';

/** Accessible tabs: arrow keys move between tabs, and only the open panel is in the page. */
export default function Tabs({ items, label, className = '' }) {
  const [open, setOpen] = useState(items[0].id);
  const base = useId();
  const refs = useRef({});

  const onKey = (e, i) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = items[(i + step + items.length) % items.length];
    setOpen(next.id);
    refs.current[next.id]?.focus();
  };

  const current = items.find((t) => t.id === open);
  return (
    <div className={`tabset ${className}`}>
      <div className="tabset-list" role="tablist" aria-label={label}>
        {items.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[t.id] = el)}
            type="button"
            role="tab"
            id={`${base}-${t.id}-tab`}
            aria-selected={open === t.id}
            aria-controls={`${base}-${t.id}-panel`}
            tabIndex={open === t.id ? 0 : -1}
            className="tabset-tab"
            onClick={() => setOpen(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        className="tabset-panel appear"
        key={open}
        role="tabpanel"
        id={`${base}-${open}-panel`}
        aria-labelledby={`${base}-${open}-tab`}
        tabIndex={0}
      >
        {current.body}
      </div>
    </div>
  );
}
