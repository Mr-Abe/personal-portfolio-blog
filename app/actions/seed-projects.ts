'use server';

import { createClient } from '../lib/supabase/server';

const exampleProjects = [
  {
    title: 'Personal Portfolio & Blog',
    slug: 'personal-portfolio-blog',
    description:
      'A modern portfolio and blog built with Next.js, TypeScript, and Supabase. Features server-side rendering, dynamic content management, and a responsive design.',
    content: `# Personal Portfolio & Blog

A showcase of my work and thoughts, built with modern web technologies.

## Features
- Server-side rendering with Next.js
- Dynamic content management with Supabase
- Responsive design with Tailwind CSS
- Dark mode support
- Blog with markdown support
- Contact form with email notifications`,
    image_url: '/images/projects/portfolio.png',
    github_url: 'https://github.com/yourusername/personal-portfolio-blog',
    demo_url: 'https://your-portfolio-url.com',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'React'],
    featured: true,
    category: 'Web Development',
  },
  {
    title: 'Medical Data Analytics Dashboard',
    slug: 'medical-data-analytics',
    description:
      'A data visualization dashboard for medical professionals to analyze patient data and trends. Built with React and D3.js, featuring real-time updates and interactive charts.',
    content: `# Medical Data Analytics Dashboard

A powerful tool for medical professionals to visualize and analyze patient data.

## Features
- Interactive data visualization with D3.js
- Real-time data updates
- Customizable dashboards
- Export functionality
- Role-based access control`,
    image_url: '/images/projects/medical-dashboard.png',
    github_url: 'https://github.com/yourusername/medical-dashboard',
    demo_url: 'https://medical-dashboard-demo.com',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Material-UI'],
    featured: true,
    category: 'Healthcare Tech',
  },
  {
    title: 'AI-Powered Clinical Notes Assistant',
    slug: 'clinical-notes-assistant',
    description:
      'An AI-powered tool that helps healthcare providers write and analyze clinical notes more efficiently. Uses natural language processing to extract key information and suggest improvements.',
    content: `# AI-Powered Clinical Notes Assistant

Streamlining clinical documentation with artificial intelligence.

## Features
- Natural language processing
- Automated key information extraction
- Smart suggestions
- Template management
- Integration with EHR systems`,
    image_url: '/images/projects/clinical-notes.png',
    github_url: 'https://github.com/yourusername/clinical-notes-assistant',
    demo_url: 'https://clinical-notes-demo.com',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'],
    featured: true,
    category: 'Healthcare Tech',
  },
];

export async function seedProjects() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('projects').insert(exampleProjects).select();

    if (error) {
      console.error('Error seeding projects:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error seeding projects:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to seed projects',
    };
  }
} 