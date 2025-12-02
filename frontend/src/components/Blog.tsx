"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: "Understanding Data Structures in Depth",
      description:
        "Learn arrays, linked lists, stacks, queues, and how they power efficient algorithms.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
      date: "Nov 20, 2025",
    },
    {
      id: 2,
      title: "JavaScript Tips & Tricks for Faster Coding",
      description:
        "Boost your JS productivity with smart tricks, shortcuts, and performance improvements.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      date: "Nov 18, 2025",
    },
    {
      id: 3,
      title: "Next.js Optimization Techniques",
      description:
        "Improve your Next.js app speed with caching, image optimization, dynamic imports & more.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
      date: "Nov 15, 2025",
    },
    {
      id: 4,
      title: "CSS Tricks Every Developer Must Know",
      description:
        "Learn modern CSS utilities, animations, layouts, and responsive techniques.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      date: "Nov 10, 2025",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50">
      {/* ------- SECTION HEADER -------- */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Latest Blog Posts
        </h2>

        <p className="text-gray-600 text-base mt-3">
          Stay updated with our latest tutorials, coding tips, and tech
          insights.
        </p>

        <div className="mt-4 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="
              bg-white 
              rounded-2xl 
              shadow-[0_4px_14px_rgba(0,0,0,0.06)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)]
              overflow-hidden 
              transition-all 
              duration-300 
              hover:-translate-y-2
            "
          >
            <div className="relative h-40 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">{blog.date}</span>

                <Link
                  href={`/blog/${blog.id}`}
                  className="flex items-center gap-1 text-indigo-600 text-sm font-medium hover:underline"
                >
                  Read More
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          href="/blogs"
          className="
            flex items-center gap-2 
            text-indigo-700 
            font-medium 
            hover:text-indigo-900 
            transition
          "
        >
          View All Blogs
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
