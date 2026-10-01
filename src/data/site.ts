/**
 * Site-wide links and settings. Every page, the nav and the footer read from here.
 * Leave a value empty ('') to hide that link everywhere rather than show a broken or generic one.
 */
import fs from 'node:fs';
import path from 'node:path';

const RESUME_PATH = '/resume/Moksha-Agrawal-Resume.pdf';
const hasFile = (p: string) => fs.existsSync(path.join(process.cwd(), 'public', p));

export const site = {
  name: 'Moksha Agrawal',
  description:
    'Moksha Agrawal: analytics, research and building things. Usually trying to make complicated things simpler.',

  email: 'mokshaagrawal18@gmail.com',

  // NEEDS INPUT for GitHub: paste your real profile URL, e.g. 'https://github.com/your-handle'
  linkedin: 'https://www.linkedin.com/in/mokshaagrawal/',
  github: '',

  // Résumé buttons appear only once the PDF exists at public/resume/Moksha-Agrawal-Resume.pdf
  resume: hasFile(RESUME_PATH) ? RESUME_PATH : '',

  // Link to the live Random Drift build (leave empty until it is hosted)
  randomDrift: '',

  // Optional: full healthcare research report (e.g. '/reports/healthcare-expenditure.pdf')
  healthcareReport: '/reports/Healthcare-Expenditure-Gender-Analysis.pdf',
};

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Work', href: '/work/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Notes', href: '/notes/' },
];
