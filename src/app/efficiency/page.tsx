"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const models = [
  { name: "Phi-3 Mini 3.8B", params: 3.8, mmlu: 68.8, tokens_s: 42, watts: 12, mem_gb: 3.2, size_gb: 2.2, mmlu_per_b: 18.1, tokens_per_watt: 3.5, mmlu_per_gb: 31.3 },
  { name: "Gemma 2 2B", params: 2.0, mmlu: 52.1, tokens_s: 58, watts: 8, mem_gb: 2.1, size_gb: 1.4, mmlu_per_b: 26.1, tokens_per_watt: 7.25, mmlu_per_gb: 37.2 },
  { name: "Llama 3.2 3B", params: 3.2, mmlu: 63.4, tokens_s: 38, watts: 11, mem_gb: 2.8, size_gb: 1.9, mmlu_per_b: 19.8, tokens_per_watt: 3.45, mmlu_per_gb: 33.4 },
  { name: "Qwen2.5 3B", params: 3.0, mmlu: 65.2, tokens_s: 40, watts: 10.5, mem_gb: 2.6, size_gb: 1.8, mmlu_per_b: 21.7, tokens_per_watt: 3.81, mmlu_per_gb: 36.2 },
  { name: "TinyLlama 1.1B", params: 1.1, mmlu: 25.3, tokens_s: 95, watts: 4, mem_gb: 1.2, size_gb: 0.64, mmlu_per_b: 23.0, tokens_per_watt: 23.75, mmlu_per_gb: 39.5 },
  { name: "Phi-2 2.7B", params: 2.7, mmlu: 56.7, tokens_s: 45, watts: 9.5, mem_gb: 2.4, size_gb: 1.6, mmlu_per_b: 21.0, tokens_per_watt: 4.74, mmlu_per_gb: 35.4 },
  { name: "StableLM 2 1.6B", params: 1.6, mmlu: 38.9, tokens_s: 72, watts: 5.5, mem_gb: 1.5, size_gb: 0.96, mmlu_per_b: 24.3, tokens_per_watt: 13.09, mmlu_per_gb: 40.5 },
  { name: "Qwen2 1.5B", params: 1.5, mmlu: 42.3, tokens_s: 68, watts: 5, mem_gb: 1.4, size_gb: 0.89, mmlu_per_b: 28.2, tokens_per_watt: 13.6, mmlu_per_gb: 47.5 },
  { name: "SmolLM2 1.7B", params: 1.7, mmlu: 35.2, tokens_s: 65, watts: 5.8, mem_gb: 1.5, size_gb: 1.02, mmlu_per_b: 20.7, tokens_per_watt: 11.21, mmlu_per_gb: 34.5 },
  { name: "OLMo 1B", params: 1.0, mmlu: 24.5, tokens_s: 98, watts: 3.5, mem_gb: 1.1, size_gb: 0.6, mmlu_per_b: 24.5, tokens_per_watt: 28.0, mmlu_per_gb: 40.8 },
];

type SortKey = "mmlu_per_b" | "tokens_per_watt" | "mmlu_per_gb" | "mmlu" | "tokens_s";

export default function EfficiencyPage() {
  const [sortBy, setSortBy] = useState<SortKey>("mmlu_per_b");

  const sorted = [...models].sort((a, b) => b[sortBy] - a[sortBy]);
  const sortLabels: Record<SortKey, string> = {
    mmlu_per_b: "MMLU per Billion Params",
    tokens_per_watt: "Tokens per Watt",
    mmlu_per_gb: "MMLU per GB (disk)",
    mmlu: "Raw MMLU Score",
    tokens_s: "Raw Speed (tok/s)",
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Efficiency Metrics</h1>
          <p className="text-gray-500 mt-1">Measure model quality relative to compute, power, and storage costs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Most Efficient (MMLU/B)</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{sorted.sort((a, b) => b.mmlu_per_b - a.mmlu_per_b)[0].name}</p>
            <p className="text-sm text-gray-400">{sorted[0].mmlu_per_b} MMLU per billion params</p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Best Power Efficiency</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{[...models].sort((a, b) => b.tokens_per_watt - a.tokens_per_watt)[0].name}</p>
            <p className="text-sm text-gray-400">{[...models].sort((a, b) => b.tokens_per_watt - a.tokens_per_watt)[0].tokens_per_watt} tok/watt</p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Best Storage Efficiency</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{[...models].sort((a, b) => b.mmlu_per_gb - a.mmlu_per_gb)[0].name}</p>
            <p className="text-sm text-gray-400">{[...models].sort((a, b) => b.mmlu_per_gb - a.mmlu_per_gb)[0].mmlu_per_gb} MMLU/GB</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setSortBy(key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${sortBy === key ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Rankings - {sortLabels[sortBy]}</h2>
          <div className="space-y-3">
            {sorted.map((m, i) => (
              <div key={m.name} className="flex items-center gap-4">
                <span className={`w-8 text-center text-lg font-bold ${i === 0 ? "text-amber-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-700" : "text-gray-300"}`}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <span className="font-medium text-gray-900">{m.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{m.params}B | {m.size_gb}GB | {m.watts}W</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-bold text-purple-600">{m[sortBy].toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full transition-all"
                      style={{ width: `${(m[sortBy] / Math.max(...models.map((x) => x[sortBy]))) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Params</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">MMLU</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">tok/s</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">Watts</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">RAM (GB)</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">MMLU/B</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">tok/W</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">MMLU/GB</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{m.name}</td>
                  <td className="py-3 px-4 text-right">{m.params}B</td>
                  <td className="py-3 px-4 text-right">{m.mmlu}%</td>
                  <td className="py-3 px-4 text-right">{m.tokens_s}</td>
                  <td className="py-3 px-4 text-right">{m.watts}W</td>
                  <td className="py-3 px-4 text-right">{m.mem_gb}</td>
                  <td className="py-3 px-4 text-right font-medium text-purple-600">{m.mmlu_per_b.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right font-medium text-green-600">{m.tokens_per_watt.toFixed(1)}</td>
                  <td className="py-3 px-4 text-right font-medium text-orange-600">{m.mmlu_per_gb.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
