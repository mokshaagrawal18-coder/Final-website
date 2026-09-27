/**
 * Site-wide links and settings.
 * Fill in the TODO values before publishing — every page reads from here.
 */
export const site = {
  name: 'Moksha Agrawal',
  description:
    'Moksha Agrawal: analytics, research and building things. Usually trying to make complicated things simpler.',

  // TODO: replace with the real address, e.g. 'hello@yourdomain.com'
  email: 'hello@example.com',
  // TODO: replace with real profile URLs
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',

  // Drop the résumé PDF at public/resume/Moksha-Agrawal-Resume.pdf
  resume: '/resume/Moksha-Agrawal-Resume.pdf',

  // Link to the live Random Drift build (leave empty until it is hosted)
  randomDrift: '',
};

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Work', href: '/work/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Notes', href: '/notes/' },
];
