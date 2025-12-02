"use client";

export default function AboutSection() {
  return (
    <section className="w-full bg-[#eef4ff] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About Our Platform
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Learn, Create & Grow with our interactive courses and community.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT TEXT */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Learn, Create & Grow Online
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our platform empowers learners and creators alike. Access
              top-quality courses, interactive coding editors, and real-time
              projects to enhance your skills and advance your career.
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Join thousands of learners worldwide and become part of our
              vibrant community. Whether you're starting or upgrading your
              skills, we’ve got the right courses for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                Explore Courses
              </button>
              <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Join Community
              </button>
            </div>
          </div>

          {/* RIGHT EDITOR FRAME (No image) */}
          <div className="w-full flex justify-center">
            <div className="w-full bg-[#0f172a] text-white rounded-xl shadow-2xl overflow-hidden">
              {/* Top Bar */}
              <div className="flex items-center gap-3 px-4 py-2 bg-[#1e293b]">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <p className="ml-4 text-sm text-gray-300">index.js</p>
              </div>

              {/* Editor Code */}
              <pre className="p-4 text-sm whitespace-pre-wrap leading-relaxed">
                {`function reverseString(str) {
  return str.split('').reverse().join('');
}

const input = "Data Structures & Algorithms";
const output = reverseString(input);

console.log("Reversed:", output);`}
              </pre>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20">
          <h3 className="text-center text-xl font-semibold text-gray-900 mb-8">
            Explore Key Platform Areas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl shadow">
              <p className="font-medium">Interactive Editor</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <p className="font-medium">Expert-Led Courses</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <p className="font-medium">Vibrant Community</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow">
              <p className="font-medium">Certified Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
