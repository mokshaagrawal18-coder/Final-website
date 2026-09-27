/**
 * Notes live here. Nothing is published yet, so the page shows its empty state.
 *
 * To add one: push an entry below. `featured: true` puts it in the top slots (up to 3).
 * `href` can point to an internal page (e.g. '/notes/tiny-ux-decisions/') or an external post.
 */
export type NoteEntry = {
  title: string;
  dek: string;
  date: string; // e.g. '2026-10-04'
  topic: string;
  href: string;
  featured?: boolean;
};

export const notesList: NoteEntry[] = [];

// Things on the list, shown as a quiet "coming up" line while the page is empty.
export const upcomingThemes = [
  'Tiny UX decisions',
  'consumer psychology',
  'persuasion',
  'skincare category conventions',
  'brand positioning',
  'ads, behind the scenes',
  'small behavioural observations',
];
