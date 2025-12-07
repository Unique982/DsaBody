"use client";

import { Globe, Linkedin, Github, Twitter } from "lucide-react";
interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
}
// 1. Data Refactoring: Easier to manage content
const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Backend Lead",
    bio: "Architecting scalable systems and ensuring 99.9% uptime. Lover of coffee and clean code.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Sarah Williams",
    role: "Frontend Specialist",
    bio: "Turning complex designs into pixel-perfect, responsive interfaces with React and Tailwind.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    socials: { website: "#", linkedin: "#", github: "#" },
  },
  {
    name: "Michael Carter",
    role: "Full Stack Engineer",
    bio: "Bridging the gap between server logic and UI interaction. Passionate about UX performance.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    socials: { linkedin: "#", github: "#" },
  },
];

export default function TeamSection() {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden mt-6">
      {/* Decorative Background Elements (Optional for visual flair) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-wide text-blue-600 uppercase mb-3">
            Our Core Team
          </h2>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Meet the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Minds
            </span>{" "}
            Behind the Magic
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            We are a group of passionate developers and designers committed to
            building digital products that make a difference.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 ease-in-out hover:-translate-y-2"
            >
              {/* Card Header: Image & Badge */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <span className="inline-block mt-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold tracking-wide uppercase border border-blue-100">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-6 text-gray-500 text-center leading-relaxed">
                {member.bio}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-gray-100 my-6"></div>

              {/* Social Icons */}
              <div className="flex justify-center gap-4">
                {member.socials.website && (
                  <SocialLink href={member.socials.website} icon={Globe} />
                )}
                {member.socials.linkedin && (
                  <SocialLink href={member.socials.linkedin} icon={Linkedin} />
                )}
                {member.socials.twitter && (
                  <SocialLink href={member.socials.twitter} icon={Twitter} />
                )}
                {member.socials.github && (
                  <SocialLink href={member.socials.github} icon={Github} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-component for Social Links to keep code clean
function SocialLink({ href, icon: Icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:text-blue-600 transition-colors"
    >
      <Icon className="w-6 h-6" />
    </a>
  );
}
