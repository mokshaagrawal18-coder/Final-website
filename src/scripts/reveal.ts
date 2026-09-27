/**
 * One observer for every "happens once" motion on the site:
 * `.reveal` fades + rises, `[data-reveal]` (diagrams, underlines) draws.
 * Elements get `.is-in` the first time they enter the viewport and stay that way.
 */
const targets = document.querySelectorAll<HTMLElement>('.reveal, [data-reveal]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduce || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  targets.forEach((el) => io.observe(el));
}
