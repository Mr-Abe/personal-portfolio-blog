import Image from 'next/image';
import Link from 'next/link';
import { getProjects } from './actions/projects';
import ProjectList from './components/projects/ProjectList';

const codePreview = `// Example from Medical Data Analytics Dashboard
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export function VitalSignsChart({ patientId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch patient's vital signs data
    async function fetchData() {
      const response = await fetch(\`/api/vitals/\${patientId}\`);
      const vitalSigns = await response.json();
      setData(vitalSigns);
    }
    fetchData();
  }, [patientId]);

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" />
    </LineChart>
  );
}`;

export default async function Home() {
  const result = await getProjects({ featured: true });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                  From Medicine to Code
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Welcome to my corner of the web! I'm a software engineer with a unique background in medicine,
                  bringing a fresh perspective to problem-solving in tech.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/portfolio"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View My Work
                  </Link>
                  <Link href="/blog" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    Read My Blog <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white/5 shadow-xl ring-1 ring-indigo-500 md:-mr-20 lg:-mr-36" />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                            Featured Project Preview
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-14 pt-6">
                        <div className="text-gray-300">
                          <pre className="text-sm">
                            <code>{codePreview}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Check out some of my recent work and experiments
          </p>
        </div>
        
        {/* Project Grid */}
        <div className="mx-auto mt-16">
          <ProjectList projects={result.success ? result.data || [] : []} />
        </div>
      </div>
    </div>
  );
}
