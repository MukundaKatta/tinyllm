"use client";

import Sidebar from "@/components/Sidebar";

const models = [
  { name: "Phi-3 Mini 3.8B", params: 3.8, mmlu: 68.8, hellaswag: 76.7, arc: 56.2, size_mb: 2200, speed: 42, family: "Phi" },
  { name: "Gemma 2 2B", params: 2.0, mmlu: 52.1, hellaswag: 71.4, arc: 48.5, size_mb: 1400, speed: 58, family: "Gemma" },
  { name: "Llama 3.2 3B", params: 3.2, mmlu: 63.4, hellaswag: 74.2, arc: 53.8, size_mb: 1900, speed: 38, family: "Llama" },
  { name: "Qwen2.5 3B", params: 3.0, mmlu: 65.2, hellaswag: 73.9, arc: 52.1, size_mb: 1800, speed: 40, family: "Qwen" },
  { name: "TinyLlama 1.1B", params: 1.1, mmlu: 25.3, hellaswag: 59.2, arc: 33.8, size_mb: 640, speed: 95, family: "Llama" },
  { name: "Phi-2 2.7B", params: 2.7, mmlu: 56.7, hellaswag: 75.1, arc: 51.2, size_mb: 1600, speed: 45, family: "Phi" },
  { name: "StableLM 2 1.6B", params: 1.6, mmlu: 38.9, hellaswag: 68.2, arc: 43.1, size_mb: 960, speed: 72, family: "StableLM" },
  { name: "Qwen2 1.5B", params: 1.5, mmlu: 42.3, hellaswag: 66.5, arc: 40.9, size_mb: 890, speed: 68, family: "Qwen" },
  { name: "Gemma 7B", params: 7.0, mmlu: 64.3, hellaswag: 81.2, arc: 61.1, size_mb: 4200, speed: 22, family: "Gemma" },
  { name: "Mistral 7B", params: 7.0, mmlu: 62.5, hellaswag: 81.0, arc: 60.4, size_mb: 4100, speed: 24, family: "Mistral" },
  { name: "SmolLM2 1.7B", params: 1.7, mmlu: 35.2, hellaswag: 62.1, arc: 38.5, size_mb: 1020, speed: 65, family: "SmolLM" },
  { name: "OLMo 1B", params: 1.0, mmlu: 24.5, hellaswag: 58.8, arc: 32.1, size_mb: 600, speed: 98, family: "OLMo" },
];

const topByMMLU = [...models].sort((a, b) => b.mmlu - a.mmlu).slice(0, 5);
const topByEfficiency = [...models].sort((a, b) => (b.mmlu / b.params) - (a.mmlu / a.params)).slice(0, 5);

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">TinyLLM Dashboard</h1>
          <p className="text-gray-500 mt-1">Evaluate and compare sub-10B parameter language models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Models Tracked</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">{models.length}</p>
            <p className="text-xs text-gray-400 mt-1">Sub-10B parameters</p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Best MMLU</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{topByMMLU[0].mmlu}%</p>
            <p className="text-xs text-gray-400 mt-1">{topByMMLU[0].name}</p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Most Efficient</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">{(topByEfficiency[0].mmlu / topByEfficiency[0].params).toFixed(1)}</p>
            <p className="text-xs text-gray-400 mt-1">{topByEfficiency[0].name} (MMLU/B)</p>
          </div>
          <div className="glass rounded-xl p-6">
            <p className="text-sm text-gray-500">Fastest</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{[...models].sort((a, b) => b.speed - a.speed)[0].speed}</p>
            <p className="text-xs text-gray-400 mt-1">tokens/s (TinyLlama)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Accuracy vs Size Scatter</h2>
            <div className="relative h-72 border border-gray-200 rounded-lg p-4">
              <div className="absolute bottom-4 left-4 right-4 h-px bg-gray-300" />
              <div className="absolute bottom-4 left-4 top-4 w-px bg-gray-300" />
              <span className="absolute bottom-0 left-1/2 text-xs text-gray-400">Parameters (B)</span>
              <span className="absolute left-0 top-1/2 -rotate-90 text-xs text-gray-400">MMLU Score</span>
              {models.map((m, i) => {
                const x = (m.params / 10) * 85 + 5;
                const y = 90 - ((m.mmlu - 20) / 55) * 80;
                const colors = ["bg-purple-500", "bg-orange-500", "bg-blue-500", "bg-green-500", "bg-pink-500", "bg-teal-500"];
                return (
                  <div key={i} className="absolute group" style={{ left: `${x}%`, top: `${y}%` }}>
                    <div className={`w-3 h-3 rounded-full ${colors[i % colors.length]} opacity-80 hover:opacity-100 hover:scale-150 transition-all cursor-pointer`} />
                    <div className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      {m.name}: {m.mmlu}% MMLU, {m.params}B
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 5 by MMLU Score</h2>
            <div className="space-y-3">
              {topByMMLU.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`text-lg font-bold w-6 ${i === 0 ? "text-amber-500" : "text-gray-400"}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{m.name}</span>
                      <span className="text-sm font-bold text-purple-600">{m.mmlu}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-orange-500 rounded-full" style={{ width: `${m.mmlu}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Full Model Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Model</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Params</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Size</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">MMLU</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">HellaSwag</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">ARC</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Speed</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium text-gray-900">{m.name}</td>
                    <td className="py-3 px-3 text-gray-600">{m.params}B</td>
                    <td className="py-3 px-3 text-gray-600">{m.size_mb > 1000 ? `${(m.size_mb/1000).toFixed(1)}GB` : `${m.size_mb}MB`}</td>
                    <td className="py-3 px-3"><span className={`font-medium ${m.mmlu >= 60 ? "text-green-600" : m.mmlu >= 40 ? "text-amber-600" : "text-red-600"}`}>{m.mmlu}%</span></td>
                    <td className="py-3 px-3 text-gray-600">{m.hellaswag}%</td>
                    <td className="py-3 px-3 text-gray-600">{m.arc}%</td>
                    <td className="py-3 px-3 text-gray-600">{m.speed} tok/s</td>
                    <td className="py-3 px-3 font-medium text-purple-600">{(m.mmlu / m.params).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
