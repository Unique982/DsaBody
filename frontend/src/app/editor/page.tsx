"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Film } from "lucide-react";
import Editor from "@monaco-editor/react";

export default function DynamicOnlineEditor() {
  const [question, setQuestion] = useState(
    "Write a function that prints Hello World"
  );
  const [code, setCode] = useState(`function hello() {
  console.log("Hello World");
}
hello();`);
  const [output, setOutput] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Run Code and capture console.log
  const runCode = () => {
    setOutput("");
    const logs: string[] = [];
    const consoleCapture = {
      log: (...args: any[]) => logs.push(args.map(String).join(" ")),
    };

    try {
      const userFunc = new Function("console", code);
      userFunc(consoleCapture);
      setOutput(
        logs.length ? logs.join("\n") : "Code executed successfully ✅"
      );
      generateVideo(); // generate video after code run
      suggestAI(); // update AI suggestion after run
    } catch (err: any) {
      setOutput("Runtime Error: " + err.message);
      generateVideo();
      suggestAI();
    }
  };

  // Dynamic question-code matching
  const checkMatch = () => {
    if (
      question.toLowerCase().includes("hello world") &&
      !code.includes("Hello World")
    ) {
      return false;
    } else if (
      question.toLowerCase().includes("largest") &&
      !code.toLowerCase().includes("max")
    ) {
      return false;
    } else if (
      question.toLowerCase().includes("reverse") &&
      !code.toLowerCase().includes("reverse")
    ) {
      return false;
    }
    return true;
  };

  // AI Suggestion dynamically
  const suggestAI = () => {
    const match = checkMatch();

    if (!match) {
      let suggestedCode = "// Suggested code example\n";
      if (question.toLowerCase().includes("hello world")) {
        suggestedCode = `function hello() {
  console.log("Hello World");
}
hello();`;
      } else if (question.toLowerCase().includes("largest")) {
        suggestedCode = `function findLargest(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}`;
      } else if (question.toLowerCase().includes("reverse")) {
        suggestedCode = `function reverseString(str) {
  return str.split("").reverse().join("");
}`;
      }

      setAiMessage(
        `⚠️ Your code does NOT match the question: "${question}"\n\nSuggested Example:\n${suggestedCode}`
      );
      return;
    }

    let explanation = "";
    if (question.toLowerCase().includes("hello world")) {
      explanation =
        "This code prints 'Hello World' by defining a function and calling it.";
    } else if (question.toLowerCase().includes("largest")) {
      explanation =
        "This code loops through the array and finds the largest element.";
    } else if (question.toLowerCase().includes("reverse")) {
      explanation =
        "This code reverses a string using split, reverse, and join.";
    } else {
      explanation = "Your code looks correct for this question.";
    }

    setAiMessage(`✅ Correct!\n\nExplanation:\n${explanation}`);
  };

  // Dynamic workflow video (mock)
  const generateVideo = () => {
    setVideoUrl("https://samplelib.com/lib/preview/mp4/sample-5s.mp4");
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 p-4 gap-4">
      {/* Question Sidebar */}
      <div className="w-1/4 bg-white rounded-xl shadow p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-3">Question</h2>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full h-40 p-2 border rounded"
        />
        <Button onClick={suggestAI} className="w-full mt-3">
          AI Suggest & Check
        </Button>
        {aiMessage && (
          <div className="mt-4 text-sm bg-slate-100 p-3 rounded whitespace-pre-wrap border">
            {aiMessage}
          </div>
        )}
      </div>

      {/* Editor + Output */}
      <div className="flex-1 flex flex-col gap-4">
        <Card className="flex-1">
          <CardContent className="p-4 flex flex-col h-full">
            <h2 className="font-semibold mb-2">Online Code Editor</h2>
            <div className="flex-1 border rounded overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  automaticLayout: true,
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                }}
              />
            </div>

            <div className="flex gap-3 mt-4">
              <Button onClick={runCode} className="flex gap-2">
                <Play size={18} /> Run Code
              </Button>
              <Button
                onClick={generateVideo}
                variant="secondary"
                className="flex gap-2"
              >
                <Film size={18} /> Explain with Video
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="h-48">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Output</h2>
            <div className="bg-black text-green-400 p-3 rounded h-32 overflow-auto font-mono text-sm">
              {output}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Panel */}
      <div className="w-1/4 bg-white rounded-xl shadow p-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">AI Workflow Video</h2>
        {videoUrl ? (
          <video src={videoUrl} controls className="rounded-lg w-full" />
        ) : (
          <p className="text-gray-500 text-center">No video generated yet</p>
        )}
      </div>
    </div>
  );
}
