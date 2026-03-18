"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const models = [
  { name: "Phi-3 Mini 3.8B", params: 3.8, mmlu: 68.8, hellaswag: 76.7, arc: 56.2, humaneval: 38.2, size_mb: 2200, family: "Phi" },
  { name: "Gemma 2 2B", params: 2.0, mmlu: 52.1, hellaswag: 71.4, arc: 48.5, humaneval: 22.1, size_mb: 1400, family: "Gemma" },
  { name: "Llama 3.2 3B", params: 3.2, mmlu: 63.4, hellaswag: 74.2, arc: 53.8, humaneval: 32.5, size_mb: 1900, family: "Llama" },
  { name: "Qwen2.5 3B", params: 3.0, mmlu: 65.2, hellaswag: 73.9, arc: 52.1, humaneval: 41.2, size_mb: 1800, family: "Qwen" },
  { name: "TinyLlama 1.1B", params: 1.1, mmlu: 25.3, hellaswag: 59.2, arc: 33.8, humaneval: 5.2, size_mb: 640, family: "Llama" },
  { name: "Phi-2 2.7B", params: 2.7, mmlu: 56.7, hellaswag: 75.1, arc: 51.2, humaneval: 29.8, size_mb: 1600, family: "Phi" },
  { name: "StableLM 2 1.6B", params: 1.6, mmlu: 38.9, hellaswag: 68.2, arc: 43.1, humaneval: 12.4, size_mb: 960, family: "StableLM" },
  { name: "Qwen2 1.5B", params: 1.5, mmlu: 42.3, hellaswag: 66.5, arc: 40.9, humaneval: 18.5, size_mb: 890, family: "Qwen" },
  { name: "Gemma 7B", params: 7.0, mmlu: 64.3, hellaswag: 81.2, arc: 61.1, humaneval: 35.2, size_mb: 4200, family: "Gemma" },
  { name: "Mistral 7B", params: 7.0, mmlu: 62.5, hellaswag: 81.0, arc: 60.4, humaneval: 30.5, size_mb: 4100, family: "Mistral" },
  { name: "SmolLM2 1.7B", params: 1.7, mmlu: 35.2, hellaswag: 62.1, arc: 38.5, humaneval: 8.5, size_mb: 1020, family: "SmolLM" },
  { name: "OLMo 1B", params: 1.0, mmlu: 24.5, hellaswag: 58.8, arc: 32.1, humaneval: 4.1, size_mb: 600, family: "OLMo" },
];

const familyColors: Record<string, string> = {
  Phi: "bg-blue-500", Gemma: "bg-green-500", Llama: "bg-red-500", Qwen: "bg-purple-500",
  StableLM: "bg-amber-500", Mistral: "bg-teal-500", SmolLM: "bg-pink-500", OLMo: "bg-indigo-500",
};

type MetricKey = "mmlu" | "hellaswag" | "arc" | "humaneval";

export default function ScatterPage() {
  const [metric, setMetric] = useState<MetricKey>("mmlu");
  const [xAxis, setXAxis] = useState<"params" | "size">("params");

  const metricRanges: Record<MetricKey, [number, number]> = {
    mmlu: [20, 75], hellaswag: [55, 85], arc: [30, 65], humaneval: [0, 45],
  };
  const [minY, maxY] = metricRanges[metric];
  const maxX = xAxis === "params" ? 10 : 5000;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Accuracy vs Size Analysis</h1>
          <p className="text-gray-500 mt-1">Visualize the trade-off between model size and benchmark performance</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Y-Axis (Benchmark)</label>
            <select value={metric} onChange={(e) => setMetric(e.target.value as MetricKey)}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
              <option value="mmlu">MMLU</option>
              <option value="hellaswag">HellaSwag</option>
              <option value="arc">ARC Challenge</option>
              <option value="humaneval">HumanEval</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">X-Axis</label>
            <select value={xAxis} onChange={(e) => setXAxis(e.target.value as "params" | "size")}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
              <option value="params">Parameters (B)</option>
              <option value="size">Size Q4 (MB)</option>
            </select>
          </div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <div className="relative h-96 border border-gray-200 rounded-lg p-6">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <div key={pct} className="absolute left-6 right-6 border-t border-gray-100" style={{ top: `${pct}%` }} />
            ))}
            {/* Y axis labels */}
            {[0, 25, 50, 75, 100].map((pct) => {
              const val = maxY - (pct / 100) * (maxY - minY);
              return <span key={pct} className="absolute left-0 text-xs text-gray-400 -translate-y-1/2" style={{ top: `${pct}%` }}>{val.toFixed(0)}</span>;
            })}
            {/* X axis labels */}
            {[0, 25, 50, 75, 100].map((pct) => {
              const val = (pct / 100) * maxX;
              return <span key={pct} className="absolute bottom-0 text-xs text-gray-400 -translate-x-1/2" style={{ left: `${pct}%` }}>{xAxis === "params" ? `${val.toFixed(0)}B` : `${val.toFixed(0)}M`}</span>;
            })}
            {/* Data points */}
            {models.map((m, i) => {
              const xVal = xAxis === "params" ? m.params : m.size_mb;
              const yVal = m[metric];
              const x = (xVal / maxX) * 88 + 6;
              const y = ((maxY - yVal) / (maxY - minY)) * 88 + 6;
              return (
                <div key={i} className="absolute group" style={{ left: `${Math.min(Math.max(x, 2), 95)}%`, top: `${Math.min(Math.max(y, 2), 95)}%` }}>
                  <div className={`w-4 h-4 rounded-full ${familyColors[m.family] || "bg-gray-500"} opacity-80 hover:opacity-100 hover:scale-150 transition-all cursor-pointer border-2 border-white shadow`} />
                  <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-lg">
                    <p className="font-medium">{m.name}</p>
                    <p>{metric.toUpperCase()}: {yVal}% | {xAxis === "params" ? `${m.params}B` : `${m.size_mb}MB`}</p>
                  </div>
                </div>
              );
            })}
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-500">{xAxis === "params" ? "Parameters (Billions)" : "Q4 Size (MB)"}</p>
            <p className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-gray-500">{metric.toUpperCase()} Score (%)</p>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Model Families Legend</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(familyColors).map(([family, color]) => (
              <div key={family} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${color}`} />
                <span className="text-sm text-gray-700">{family}</span>
                <span className="text-xs text-gray-400">({models.filter((m) => m.family === family).length})</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
