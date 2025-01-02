import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | From Medicine to Code',
  description:
    'Explore my journey from medicine to software engineering through a collection of projects showcasing my technical skills and problem-solving abilities.',
  openGraph: {
    title: 'Portfolio | From Medicine to Code',
    description:
      'Explore my journey from medicine to software engineering through a collection of projects showcasing my technical skills and problem-solving abilities.',
    type: 'website',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
} 