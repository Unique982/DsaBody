"use client";

import {
  BookOpen,
  Workflow,
  Code,
  LineChart,
  Cpu,
  Layers,
  Laptop,
  Brain,
} from "lucide-react";
interface ServiceCardProps {
  title: string;
  desc: string;
  Icon: React.ElementType;
}
export default function ServicesSection() {
  return (
    <section className="w-full bg-[#f7faff] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}

        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our DSA Services
          </h2>

          <p className="text-gray-600 text-base mt-3">
            Master Data Structures & Algorithms with structured learning paths.
          </p>

          <div className="mt-4 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <ServiceCard
            title="DSA Theory"
            desc="Structured notes & simplified explanations on every topic."
            Icon={BookOpen}
          />

          {/* Card 2 */}
          <ServiceCard
            title="Algorithms"
            desc="Learn sorting, searching, recursion, DP, graphs & more."
            Icon={Workflow}
          />

          {/* Card 3 */}
          <ServiceCard
            title="Problem Solving"
            desc="Practice 500+ curated DSA questions with solutions."
            Icon={Brain}
          />

          {/* Card 4 */}
          <ServiceCard
            title="Coding Challenges"
            desc="Timed coding contests to improve your logic & speed."
            Icon={Laptop}
          />

          {/* Card 5 */}
          <ServiceCard
            title="Time & Space Analysis"
            desc="Master Big-O Notation & algorithm optimization."
            Icon={LineChart}
          />

          {/* Card 6 */}
          <ServiceCard
            title="Data Structures"
            desc="Arrays, Linked Lists, Trees, Graphs, Tries & more."
            Icon={Layers}
          />

          {/* Card 7 */}
          <ServiceCard
            title="Competitive Programming"
            desc="Learn CP techniques, patterns & contest strategies."
            Icon={Cpu}
          />

          {/* Card 8 */}
          <ServiceCard
            title="Live Code Editor"
            desc="Solve DSA problems in our built-in interactive editor."
            Icon={Code}
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc, Icon }: ServiceCardProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
