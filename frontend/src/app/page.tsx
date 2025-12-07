"use client";

import AboutPage from "@/components/About";
import BlogSection from "@/components/Blog";
import FAQSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PopularCourses from "@/components/PopularCourse";
import ServicesSection from "@/components/Services";
import TeamSection from "@/components/TeamSection";

import { useState, useEffect, useCallback, useMemo } from "react";

// --- Configuration ---
const JS_CODE = `// JavaScript (Client-side Sandbox)
function reverseString(str) {
  return str.split('').reverse().join('');
}
const input = "Data Structures and Algorithms";
const output = reverseString(input);
console.log("Original:", input);
console.log("Reversed:", output);`;

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body { font-family: 'Inter', sans-serif; background: #1f2937; color: #a1a1aa; padding: 20px; }
    .container { background: #374151; padding: 1.5rem; border-radius: 0.75rem; box-shadow: 0 4px 6px rgba(0,0,0,0.2); border-left: 4px solid #3b82f6; max-width: 400px; margin: 0 auto; }
    h2 { color: #3b82f6; margin-top: 0; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Multi-Language Demo</h2>
    <p>HTML & CSS rendered successfully in the output frame!</p>
  </div>
</body>
</html>`;

const PHP_CODE = `<?php
$name = "Gemini";
$items = ["Apple", "Banana", "Cherry"];
echo "Hello, " . $name . " from simulated PHP!";
?>`;

const PYTHON_CODE = `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a)
        a, b = b, a + b
print("First 5 Fibonacci numbers:")
fibonacci(5)`;

const JAVA_CODE = `class Main {
    public static void main(String[] args) {
        System.out.println("Java: Object-Oriented Programming Demo");
        Car myCar = new Car("Tesla");
        myCar.startEngine();
    }
}
class Car {
    String model;
    Car(String model) { this.model = model; }
    void startEngine() { System.out.println(model + " engine started."); }
}`;

const TYPING_DELAY = 15; // ms per character
const AUTORUN_DELAY = 1000; // ms debounce

const initialFiles = {
  "index.js": { language: "javascript", code: JS_CODE, label: "JS (DSA)" },
  "main.py": { language: "python", code: PYTHON_CODE, label: "Python" },
  "Main.java": { language: "java", code: JAVA_CODE, label: "Java" },
  "index.html": { language: "html", code: HTML_CODE, label: "HTML/CSS" },
  "index.php": { language: "php", code: PHP_CODE, label: "PHP" },
};

// --- Helpers ---
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const highlightCode = (code: string, language: string) => {
  let KEYWORDS, STRINGS;
  if (language === "javascript" || language === "java") {
    KEYWORDS =
      /\b(function|const|let|var|if|return|console|log|new|this|typeof|export|default|import|else|class|public|static|void|String|System|out)\b/g;
    STRINGS = /("|').*?(\1)/g;
  } else if (language === "python") {
    KEYWORDS =
      /\b(def|return|for|in|range|print|if|else|class|self|and|or|not)\b/g;
    STRINGS = /("|').*?(\1)/g;
  } else if (language === "html") {
    KEYWORDS = /(<[\/]{0,1}[^>]+>)/g;
    STRINGS = /(=".*?")/g;
  } else if (language === "php") {
    KEYWORDS = /\b(<?php|echo|public|private|function|return|if|else)\b/g;
    STRINGS = /("|').*?(\1)/g;
  } else {
    KEYWORDS = /\b(function|const|let|var|if|return|console|log)\b/g;
    STRINGS = /("|').*?(\1)/g;
  }

  const COMMENTS = /(\/\/.*|\/\*[\s\S]*?\*\/|#.*|<!--[\s\S]*?-->)/g;

  let highlightedCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  highlightedCode = highlightedCode.replace(
    COMMENTS,
    '<span class="text-gray-500 italic">$&</span>'
  );
  return highlightedCode;
};

// --- Component ---
export default function LandingPage() {
  const [files, setFiles] = useState(initialFiles);
  const [currentFile, setCurrentFile] = useState("index.js");
  const [output, setOutput] = useState("Output will appear here.");
  const [isTyping, setIsTyping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [autorun, setAutorun] = useState(false);

  const currentCode = (files as any)[currentFile].code;
  const currentLanguage = (files as any)[currentFile].language;

  // Typing Animation
  useEffect(() => {
    if (isTyping) {
      let idx = 0;
      const fullCode = files["index.js"].code;
      const interval = setInterval(() => {
        if (idx <= fullCode.length) {
          setFiles((prev) => ({
            ...prev,
            "index.js": {
              ...prev["index.js"],
              code: fullCode.substring(0, idx),
            },
          }));
          idx++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, TYPING_DELAY);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  // Run Code Logic
  const runCode = useCallback(() => {
    const codeToRun = (files as any)[currentFile].code;
    const language = (files as any)[currentFile].language;
    setIsProcessing(true);

    if (language === "javascript") {
      setOutput("Running JavaScript...");
      let capturedOutput = "";
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput += args.join(" ") + "\n";
      };

      try {
        new Function(codeToRun)();
        setOutput(capturedOutput || "Executed successfully.");
      } catch (e) {
        setOutput(`Error:\n${e}`);
      } finally {
        console.log = originalConsoleLog;
        setIsProcessing(false);
      }
    } else if (language === "html") {
      setOutput("HTML/CSS rendered below.");
      setIsProcessing(false);
    } else {
      setOutput(
        `Executing ${language.toUpperCase()} (Client-Side Simulation)...`
      );
      setTimeout(() => {
        setOutput(
          `${language.toUpperCase()} Execution Error: Server environment required.`
        );
        setIsProcessing(false);
      }, 500);
    }
  }, [files, currentFile]);

  const debouncedRunCode = useMemo(
    () => debounce(runCode, AUTORUN_DELAY),
    [runCode]
  );

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setFiles((prev: any) => ({
      ...prev,
      [currentFile]: { ...prev[currentFile], code: newCode },
    }));
    setIsTyping(false);
    if (autorun) debouncedRunCode();
  };

  useEffect(() => {
    if (autorun && currentLanguage === "html") runCode();
    else if (currentLanguage !== "html") setOutput("Output will appear here.");
  }, [currentFile, autorun, runCode, currentLanguage]);

  const PlayIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M4.5 5.653c0-1.426 1.529-2.38 2.831-1.664l.872.486c1.115.62 2.617.518 3.619-.228L18.77 8.513A1.98 1.98 0 0121 10.153v3.694c0 1.054-.836 1.9-1.936 1.9l-.025-.001-.884-.108a4.99 4.99 0 00-3.69 1.15l-1.92 1.432c-1.396 1.042-3.419.866-4.673-.418L4.5 15.653V5.653zM6 6v12l12-6-12-6z"
        clipRule="evenodd"
      />
    </svg>
  );
  const StopIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
        clipRule="evenodd"
      />
    </svg>
  );
  const SettingsIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M11.077 2.164a1.868 1.868 0 0 1 1.846 0l5.474 2.863A21.36 21.36 0 0 0 18.233 6.64L19.5 7.915a1.69 1.69 0 0 1 .494 1.758l-.666 3.031a1.888 1.888 0 0 1-.396.764l-2.001 2.45a1.95 1.95 0 0 1-1.745.576l-2.155-.38a1.69 1.69 0 0 0-1.761.272l-1.87 1.637a1.94 1.94 0 0 1-2.261.02l-1.849-1.282a1.826 1.826 0 0 0-2.315-.224l-1.897 1.258a1.766 1.766 0 0 1-2.073-.178l-1.076-1.075A1.888 1.888 0 0 1 3 13.064l-.666-3.031a1.69 1.69 0 0 1 .494-1.758L4.767 6.64A21.36 21.36 0 0 0 6.603 5.027l5.474-2.863zM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <hr className="border-gray-200" />
      <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-10 sm:py-16 gap-10 max-w-7xl mx-auto w-full">
        <div className="lg:w-1/2 space-y-6 order-2 lg:order-1 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Code. Compile. Conquer.{" "}
            <span className="text-blue-600">Any Language.</span>
          </h1>
          <p className="text-lg text-gray-600">
            Learn any programming language with an{" "}
            <strong>interactive code editor</strong>. Practice, experiment, and
            improve your skills instantly with real-time feedback. Includes
            support for <strong>DSA</strong> and live <strong>HTML/CSS</strong>{" "}
            previews.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg shadow-blue-500/50 transition duration-200">
            Start Coding Now
          </button>
        </div>
        <div className="lg:w-1/2 w-full order-1 lg:order-2">
          <div className="bg-gray-900 text-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex bg-gray-800 border-b border-gray-700 overflow-x-auto">
              {Object.keys(files).map((fileName) => (
                <button
                  key={fileName}
                  onClick={() => setCurrentFile(fileName)}
                  className={`px-4 py-2 text-xs font-medium transition duration-200 border-r border-gray-700 ${
                    currentFile === fileName
                      ? "bg-gray-900 text-white border-b-2 border-blue-500"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {(files as any)[fileName].label}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center p-3">
              <span className="text-xs text-gray-400 font-mono">
                {currentFile}
              </span>
              <div className="flex space-x-3 items-center">
                <div
                  className="flex items-center space-x-2 text-xs text-gray-400 cursor-pointer"
                  onClick={() => setAutorun(!autorun)}
                >
                  <div
                    className={`w-8 h-4 flex items-center rounded-full p-0.5 transition-colors duration-200 ${
                      autorun ? "bg-green-500" : "bg-gray-600"
                    }`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-200 ${
                        autorun ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span>Autorun</span>
                </div>
                {currentLanguage !== "html" && (
                  <button
                    onClick={runCode}
                    disabled={isProcessing}
                    className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded transition duration-200 ${
                      isProcessing
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white shadow-md"
                    }`}
                  >
                    {isProcessing ? <StopIcon /> : <PlayIcon />}
                    <span>{isProcessing ? "Processing..." : "Run Code"}</span>
                  </button>
                )}
              </div>
            </div>
            <div className="relative overflow-hidden min-h-[250px] max-h-[400px]">
              <pre
                className="absolute inset-0 p-4 text-sm font-mono whitespace-pre-wrap pointer-events-none"
                dangerouslySetInnerHTML={{
                  __html: highlightCode(currentCode, currentLanguage),
                }}
              />
              <textarea
                value={currentCode}
                onChange={handleCodeChange}
                spellCheck={false}
                className="absolute inset-0 w-full h-full p-4 text-sm font-mono bg-transparent text-gray-200 caret-white resize-none outline-none overflow-auto"
              />
            </div>
          </div>
          <div className="mt-4 bg-gray-800 p-3 rounded-xl shadow-inner border-t border-gray-700">
            <h3 className="text-sm font-semibold text-green-400 mb-2 flex items-center space-x-2">
              <SettingsIcon />
              <span>
                {currentLanguage === "html"
                  ? "RENDERED OUTPUT"
                  : "OUTPUT CONSOLE"}
              </span>
            </h3>
            {currentLanguage === "html" ? (
              <iframe
                title="Code Output"
                srcDoc={currentCode}
                className="w-full bg-white rounded-lg border border-gray-700"
                style={{ height: "200px" }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <pre className="text-xs text-gray-200 whitespace-pre-wrap overflow-auto max-h-32">
                {output}
              </pre>
            )}
          </div>
        </div>
      </div>
      <AboutPage />
      <PopularCourses />
      <TeamSection />
      <ServicesSection />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
