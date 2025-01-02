import React from 'react';

const timeline = [
  {
    year: '2020',
    title: 'Started Learning to Code',
    description: 'Began my journey into software development while working in medicine.',
  },
  {
    year: '2021',
    title: 'First Programming Projects',
    description: 'Built my first web applications and started contributing to open source.',
  },
  {
    year: '2022',
    title: 'Career Transition',
    description: 'Made the decision to transition from medicine to software engineering full-time.',
  },
  {
    year: '2023',
    title: 'Professional Development',
    description: 'Continued growing as a developer through projects and learning new technologies.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            About Me
          </h2>
          
          {/* Personal Story */}
          <div className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            <p>
              My journey from medicine to software engineering has been driven by a passion for
              problem-solving and a desire to create meaningful impact through technology.
            </p>
            <p className="mt-4">
              With a background in healthcare, I bring a unique perspective to software development,
              combining analytical thinking with a deep understanding of user needs and real-world
              applications.
            </p>
          </div>

          {/* Values Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Values & Approach
            </h3>
            <dl className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {[
                {
                  title: 'Problem-Solving',
                  description:
                    'Approaching challenges with analytical thinking and creative solutions.',
                },
                {
                  title: 'Continuous Learning',
                  description:
                    'Committed to staying current with technology and best practices.',
                },
                {
                  title: 'User-Centric Design',
                  description:
                    'Creating solutions that prioritize user experience and accessibility.',
                },
                {
                  title: 'Collaboration',
                  description:
                    'Working effectively with teams to achieve shared goals.',
                },
              ].map((value) => (
                <div key={value.title} className="relative pl-9">
                  <dt className="font-semibold text-gray-900 dark:text-white">
                    <svg
                      className="absolute left-0 top-1 h-5 w-5 text-indigo-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {value.title}
                  </dt>
                  <dd className="mt-2 text-gray-600 dark:text-gray-300">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Journey Timeline
            </h3>
            <div className="mt-6 space-y-8">
              {timeline.map((item, itemIdx) => (
                <div key={item.year} className="relative pb-8">
                  {itemIdx !== timeline.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative px-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 ring-8 ring-white dark:ring-gray-900">
                        <span className="text-sm text-white font-medium">{item.year.slice(2)}</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 