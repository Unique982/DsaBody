"use client";

import Image from "next/image";
import { useState } from "react";
import { Check } from "lucide-react"; // Make sure lucide-react is installed
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const courses = [
  {
    id: 1,
    title: "Next.js Full Stack",
    author: "Manish Basnet",
    level: "Intermediate",
    duration: "30 Days",
    technologies: ["Next.js", "React", "Tailwind CSS", "NextAuth"],
    whatYouLearn: [
      "Build a Blog Management System",
      "Authentication with NextAuth.js",
      "State Management with Redux Toolkit",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    price: "Rs. 999",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "A comprehensive deep dive into building modern full-stack applications using the Next.js framework.",
  },
  {
    id: 2,
    title: "UI/UX Design Essentials",
    author: "Amit Shrestha",
    level: "Beginner",
    duration: "45 Days",
    technologies: ["Figma", "Adobe XD"],
    whatYouLearn: [
      "Wireframing & Prototyping",
      "UX Strategy",
      "Figma Essentials",
    ],
    image:
      "https://images.unsplash.com/photo-1604147706283-d7111b901b03?w=800&q=80",
    price: "Rs. 499",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Learn the fundamentals of user interface and user experience design to create engaging digital products.",
  },
  {
    id: 3,
    title: "Python for Data Science",
    author: "Sita Sharma",
    level: "Beginner to Intermediate",
    duration: "60 Days",
    technologies: ["Python", "Pandas", "NumPy"],
    whatYouLearn: [
      "Data Analysis",
      "Visualization with Matplotlib",
      "Python Basics",
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981d?w=800&q=80",
    price: "Rs. 1200",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Start your journey in data science by mastering Python, essential libraries, and data analysis techniques.",
  },
  {
    id: 4,
    title: "JavaScript Mastery",
    author: "Ram Thapa",
    level: "Intermediate",
    duration: "40 Days",
    technologies: ["JavaScript", "ES6+", "DOM"],
    whatYouLearn: ["DOM Manipulation", "ES6 Features", "API Integration"],
    image:
      "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=800&q=80",
    price: "Rs. 799",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Gain a solid understanding of modern JavaScript, from core concepts to advanced features like asynchronous programming.",
  },
  {
    id: 5,
    title: "React Advanced",
    author: "Suman KC",
    level: "Advanced",
    duration: "35 Days",
    technologies: ["React", "Hooks", "Redux"],
    whatYouLearn: ["Advanced Hooks", "State Management", "React Patterns"],
    image:
      "https://images.unsplash.com/photo-1581091215363-1b0a6f3d9a4d?w=800&q=80",
    price: "Rs. 999",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Master complex React topics including custom hooks, performance optimization, and global state management with Redux.",
  },
  {
    id: 6,
    title: "Node.js Backend",
    author: "Anil Rana",
    level: "Intermediate",
    duration: "50 Days",
    technologies: ["Node.js", "Express", "MongoDB"],
    whatYouLearn: ["REST APIs", "Database Integration", "Backend Architecture"],
    image:
      "https://images.unsplash.com/photo-1581091012184-6d35e2c79b6b?w=800&q=80",
    price: "Rs. 1099",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Build scalable and secure RESTful APIs using Node.js, Express, and MongoDB, covering the entire backend architecture.",
  },
  {
    id: 7,
    title: "Tailwind CSS Design",
    author: "Manoj Shrestha",
    level: "Beginner",
    duration: "20 Days",
    technologies: ["Tailwind CSS", "Responsive Design"],
    whatYouLearn: [
      "Responsive Layouts",
      "Utility Classes",
      "Component Styling",
    ],
    image:
      "https://images.unsplash.com/photo-1591012911202-2b71fc6a56b0?w=800&q=80",
    price: "Rs. 399",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Learn how to use Tailwind CSS efficiently to create beautiful, responsive, and maintainable user interfaces.",
  },
  {
    id: 8,
    title: "Fullstack MERN",
    author: "Bikash KC",
    level: "Intermediate",
    duration: "60 Days",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    whatYouLearn: ["CRUD Operations", "Fullstack Apps", "Authentication"],
    image:
      "https://images.unsplash.com/photo-1604079629836-f9879b2d1d1c?w=800&q=80",
    price: "Rs. 1499",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "A complete MERN stack bootcamp covering everything from backend database setup to a robust React frontend.",
  },
  {
    id: 9,
    title: "Python Automation",
    author: "Ramesh Thapa",
    level: "Beginner",
    duration: "25 Days",
    technologies: ["Python", "Automation", "Selenium"],
    whatYouLearn: ["Automate Tasks", "Web Scraping", "Python Scripting"],
    image:
      "https://images.unsplash.com/photo-1558888409-3b20db1f84f8?w=800&q=80",
    price: "Rs. 699",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Automate repetitive tasks and learn practical web scraping techniques using Python and popular automation libraries.",
  },
  {
    id: 10,
    title: "Next.js Ecommerce",
    author: "Manish Basnet",
    level: "Advanced",
    duration: "45 Days",
    technologies: ["Next.js", "React", "Tailwind CSS", "Stripe"],
    whatYouLearn: ["Ecommerce Setup", "Stripe Integration", "SSG & SSR"],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    price: "Rs. 1299",
    // --- ADDED DESCRIPTION FIELD ---
    description:
      "Build a modern, performant e-commerce platform from scratch using Next.js and integrate Stripe for payments.",
  },
];

export default function CoursesSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 5;

  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  return (
    <>
      <Navbar />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
              Courses
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Explore Our Courses
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Learn coding, design, and development from scratch with our
              structured courses.
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {currentCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <div className="p-4 flex flex-col flex-grow gap-2">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {course.level} • {course.author}
                  </p>

                  {/* --- COURSE DESCRIPTION ADDED HERE --- */}
                  {course.description && (
                    <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                      {course.description}
                    </p>
                  )}
                  {/* ------------------------------------ */}

                  {/* Technologies */}
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      Technologies:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* What you'll learn */}
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      What you'll learn:
                    </h4>
                    <ul className="space-y-2">
                      {course.whatYouLearn.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </span>
                          <span className="text-gray-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-gray-500 text-sm mt-4">
                    ⏱ {course.duration}
                  </p>
                  <p className="font-semibold mt-2">{course.price}</p>
                  <button className="mt-auto w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
