"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is DSABody?",
    answer:
      "DSABody is an online platform where you can learn coding through courses and practice coding using our online editor.",
  },
  {
    question: "Can I use the online editor for free?",
    answer:
      "Yes! DSABody provides an online code editor to practice coding directly from your browser without installation.",
  },
  {
    question: "Which courses are available?",
    answer:
      "We offer courses on Next.js, React, Tailwind CSS, JavaScript, Python, and more, suitable for beginners to advanced learners.",
  },
  {
    question: "How do I track my course progress?",
    answer:
      "Once you enroll in a course, DSABody tracks your progress and shows completed lessons, so you can easily continue learning.",
  },
  {
    question: "Is DSABody suitable for beginners?",
    answer:
      "Absolutely! DSABody provides structured courses and an interactive online editor, making it easy for beginners to start coding.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-3">
            Quick answers to the most common questions about DSABody.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl bg-white shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full text-left px-4 py-3 flex justify-between items-center text-gray-900 font-medium focus:outline-none"
              >
                {faq.question}
                <span
                  className={`transition-transform duration-300 text-xl ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
