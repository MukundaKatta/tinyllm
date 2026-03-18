"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type TaskEval = {
  task: string;
  category: string;
  models: { name: string; score: number; latency_ms: number; tokens_s: number }[];
  best_model: string;
  best_score: number;
};

const taskEvals: TaskEval[] = [
  { task: "Text Summarization", category: "NLP", best_model: "Phi-3 Mini", best_score: 72.5,
    models: [
      { name: "Phi-3 Mini 3.8B", score: 72.5, latency_ms: 120, tokens_s: 42 },
      { name: "Llama 3.2 3B", score: 68.2, latency_ms: 140, tokens_s: 38 },
      { name: "Qwen2.5 3B", score: 70.1, latency_ms: 130, tokens_s: 40 },
      { name: "Gemma 2 2B", score: 58.4, latency_ms: 85, tokens_s: 58 },
      { name: "TinyLlama 1.1B", score: 35.2, latency_ms: 45, tokens_s: 95 },
    ]},
  { task: "Code Generation", category: "Code", best_model: "Qwen2.5 3B", best_score: 41.2,
    models: [
      { name: "Qwen2.5 3B", score: 41.2, latency_ms: 130, tokens_s: 40 },
      { name: "Phi-3 Mini 3.8B", score: 38.2, latency_ms: 120, tokens_s: 42 },
      { name: "Llama 3.2 3B", score: 32.5, latency_ms: 140, tokens_s: 38 },
      { name: "Phi-2 2.7B", score: 29.8, latency_ms: 100, tokens_s: 45 },
      { name: "Gemma 2 2B", score: 22.1, latency_ms: 85, tokens_s: 58 },
    ]},
  { task: "Question Answering", category: "NLP", best_model: "Phi-3 Mini", best_score: 78.1,
    models: [
      { name: "Phi-3 Mini 3.8B", score: 78.1, latency_ms: 80, tokens_s: 42 },
      { name: "Llama 3.2 3B", score: 74.5, latency_ms: 95, tokens_s: 38 },
      { name: "Qwen2.5 3B", score: 72.8, latency_ms: 90, tokens_s: 40 },
      { name: "Gemma 7B", score: 80.2, latency_ms: 220, tokens_s: 22 },
      { name: "Mistral 7B", score: 76.3, latency_ms: 210, tokens_s: 24 },
    ]},
  { task: "Math Reasoning", category: "Reasoning", best_model: "Qwen2.5 3B", best_score: 52.4,
    models: [
      { name: "Qwen2.5 3B", score: 52.4, latency_ms: 200, tokens_s: 40 },
      { name: "Phi-3 Mini 3.8B", score: 48.5, latency_ms: 180, tokens_s: 42 },
      { name: "Llama 3.2 3B", score: 42.1, latency_ms: 195, tokens_s: 38 },
      { name: "Phi-2 2.7B", score: 38.7, latency_ms: 150, tokens_s: 45 },
      { name: "Gemma 2 2B", score: 28.9, latency_ms: 120, tokens_s: 58 },
    ]},
  { task: "Sentiment Analysis", category: "Classification", best_model: "Phi-3 Mini", best_score: 85.3,
    models: [
      { name: "Phi-3 Mini 3.8B", score: 85.3, latency_ms: 30, tokens_s: 42 },
      { name: "Llama 3.2 3B", score: 82.1, latency_ms: 35, tokens_s: 38 },
      { name: "Gemma 2 2B", score: 78.5, latency_ms: 25, tokens_s: 58 },
      { name: "TinyLlama 1.1B", score: 68.2, latency_ms: 15, tokens_s: 95 },
      { name: "SmolLM2 1.7B", score: 65.8, latency_ms: 20, tokens_s: 65 },
    ]},
  { task: "Translation (EN-FR)", category: "NLP", best_model: "Gemma 7B", best_score: 62.8,
    models: [
      { name: "Gemma 7B", score: 62.8, latency_ms: 250, tokens_s: 22 },
      { name: "Mistral 7B", score: 58.5, latency_ms: 240, tokens_s: 24 },
      { name: "Qwen2.5 3B", score: 45.2, latency_ms: 150, tokens_s: 40 },
      { name: "Phi-3 Mini 3.8B", score: 42.1, latency_ms: 140, tokens_s: 42 },
      { name: "Llama 3.2 3B", score: 40.8, latency_ms: 160, tokens_s: 38 },
    ]},
];

export default function EvalPage() {
  const [selectedTask, setSelectedTask] = useState(taskEvals[0]);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(taskEvals.map((t) => t.category))];
  const filtered = taskEvals.filter((t) => filterCategory === "all" || t.category === filterCategory);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task-Specific Evaluation</h1>
          <p className="text-gray-500 mt-1">Compare small models on specific tasks to find the best fit</p>
        </div>

        <div className="flex gap-2 mb-6">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilterCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${filterCategory === c ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {c === "all" ? "All Tasks" : c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((task) => (
            <div key={task.task} onClick={() => setSelectedTask(task)}
              className={`glass rounded-xl p-5 cursor-pointer card-hover ${selectedTask.task === task.task ? "ring-2 ring-purple-500" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{task.task}</h3>
                  <p className="text-xs text-gray-500">{task.category}</p>
                </div>
                <span className="text-lg font-bold text-purple-600">{task.best_score}%</span>
              </div>
              <p className="text-sm text-gray-600">Best: <span className="font-medium">{task.best_model}</span></p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" style={{ width: `${task.best_score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{selectedTask.task} - Model Comparison</h2>
          <div className="space-y-4">
            {selectedTask.models.map((m, i) => (
              <div key={m.name} className="flex items-center gap-4">
                <span className={`w-6 text-center font-bold ${i === 0 ? "text-amber-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-700" : "text-gray-300"}`}>{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{m.name}</span>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{m.latency_ms}ms</span>
                      <span>{m.tokens_s} tok/s</span>
                      <span className="font-bold text-purple-600 text-sm">{m.score}%</span>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${i === 0 ? "bg-gradient-to-r from-purple-500 to-purple-600" : "bg-purple-300"}`}
                      style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
