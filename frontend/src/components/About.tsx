"use client";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { useState } from "react";

export default function AboutSection() {
  const [code, setCode] = useState(`// Try editing this code!
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Student"));`);

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center py-16 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
        {/* LEFT: ABOUT TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn Smarter with Real-Time Coding
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            हाम्रो प्लेटफर्मले तपाईंलाई Modern Programming Courses र Real-time
            Online Editor को सहायताले Charmy तरिकाले सिक्न सजिलो बनाउँछ। कुनै
            installation बिना, तपाईं Browser बाटै Code लेख्न, बुझ्न र चलाउन
            सक्नुहुन्छ।
          </p>

          <p className="text-gray-600 text-lg">
            Beginner देखि Advanced लेभल सम्मका कोर्सहरू, Projects, Assignments,
            र Practical Example हरू सहित—सबै एकै ठाउँमा।
          </p>
        </div>

        {/* RIGHT: EDITOR FRAME */}
        <div className="bg-black rounded-xl shadow-xl overflow-hidden border border-gray-700">
          {/* Editor Top Bar */}
          <div className="bg-gray-900 text-gray-300 text-sm px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <p className="ml-3">Online Editor</p>
          </div>

          {/* Code Editor */}
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(newCode) => highlight(newCode, languages.js)}
            padding={15}
            className="text-sm font-mono h-[300px] md:h-[400px] overflow-auto"
            style={{ backgroundColor: "#1e1e1e", color: "#fff" }}
          />
        </div>
      </div>
    </section>
  );
}
