"use client";

import Image from "next/image";
import {
  Check,
  Star,
  Clock,
  User,
  DollarSign,
  Zap,
  BookOpen,
} from "lucide-react";

// --- COURSE DATA (Only first course shown for brevity, use your full array) ---
const courses = [
  {
    id: 1,
    title: "Next.js Full Stack Mastery",
    author: "Unique Neupane",
    level: "Intermediate / Advanced",
    duration: "10 Weeks",
    technologies: [
      "Next.js 14",
      "React",
      "Tailwind CSS",
      "PostgreSQL",
      "NextAuth",
    ],
    whatYouLearn: [
      "Architect and deploy a full-scale SaaS application",
      "Master server actions, routing, and caching in Next.js 14 App Router",
      "Implement robust Authentication with NextAuth.js (Credentials/Google)",
      "Advanced database management and schema design with Prisma ORM",
      "State Management with Zustand/Redux Toolkit for complex UIs",
      "Payment gateway integration (Stripe) and webhook handling",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    price: "Rs. 9,999",
    description:
      "A project-based, deep dive into building modern, highly scalable, and high-performance full-stack applications using the latest Next.js framework features, covering everything from core logic to advanced deployment and security.",
  },
  {
    id: 2,
    title: "UI/UX Design Essentials",
    author: "Amit Shrestha",
    level: "Beginner",
    duration: "45 Days",
    technologies: ["Figma", "Adobe XD"],
    whatYouLearn: [
      "Master the process of Wireframing & Prototyping interactive designs",
      "Develop a deep understanding of UX Strategy and user-centered design principles",
      "Learn Figma Essentials for collaborative design work",
    ],
    image:
      "https://images.unsplash.com/photo-1604147706283-d7111b901b03?w=800&q=80",
    price: "Rs. 4,999",
    description:
      "Learn the fundamentals of user interface and user experience design to create engaging, intuitive, and effective digital products.",
  },
  // ... (rest of the courses array)
];

// Example: Displaying the first course
const selectedCourse = courses[0];

export default function CourseDetailsPage() {
  const course = selectedCourse;

  if (!course) {
    return (
      <div className="p-10 text-center text-red-500">Course not found.</div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* --- Hero Section: Image and Title --- */}
          <div className="relative h-72 md:h-96">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 90vw"
              priority
            />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-end p-6 md:p-10">
              <div className="p-3 bg-white rounded-lg shadow-xl inline-block">
                <p className="text-sm font-semibold text-green-600 uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-4 h-4 fill-green-500 text-green-500" />{" "}
                  {course.level}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            {/* --- Title, Price, and Enrollment --- */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-center pb-8 border-b-2 border-green-100 mb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 lg:mb-0">
                {course.title}
              </h1>

              <div className="flex flex-col items-start lg:items-end flex-shrink-0">
                <p className="text-5xl font-bold text-green-600 mb-2">
                  <span className="text-3xl">
                    <DollarSign className="w-6 h-6 inline-block mr-1 text-green-600" />
                  </span>
                  {course.price}
                </p>
                <button className="w-full lg:w-auto bg-green-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-green-600 transition shadow-lg shadow-green-200/50 flex items-center justify-center gap-3 transform hover:scale-[1.02]">
                  <Zap className="w-5 h-5" /> Enroll Now & Start Learning
                </button>
              </div>
            </div>

            {/* --- Key Metrics / Stats Bar --- */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center mb-10 bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="border-r border-green-300">
                <Clock className="w-7 h-7 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">
                  Total Duration
                </p>
                <p className="text-xl font-extrabold text-gray-900">
                  {course.duration}
                </p>
              </div>
              <div className="md:border-r border-green-300">
                <User className="w-7 h-7 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Instructor</p>
                <p className="text-xl font-extrabold text-gray-900">
                  {course.author}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <BookOpen className="w-7 h-7 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">
                  Certification
                </p>
                <p className="text-xl font-extrabold text-gray-900">Included</p>
              </div>
            </div>

            {/* --- Course Overview --- */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 border-b pb-2">
                📖 Course Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg italic p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-lg">
                {course.description}
              </p>
            </div>

            {/* --- Detailed Content Sections --- */}
            <div className="grid lg:grid-cols-2 gap-10">
              {/* What you'll learn */}
              <div className="p-6 bg-white border border-green-200 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2 text-green-600">
                  <Check className="w-6 h-6" /> What You'll Achieve
                </h3>
                <ul className="space-y-4">
                  {course.whatYouLearn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-1 w-5 h-5 text-green-500">
                        <Check className="w-full h-full stroke-2" />
                      </span>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="p-6 bg-white border border-indigo-200 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2 text-indigo-600">
                  <Zap className="w-6 h-6" /> Technologies & Tools
                </h3>
                <div className="flex flex-wrap gap-3">
                  {course.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-2 rounded-full border border-indigo-300 shadow-sm transition hover:bg-indigo-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
