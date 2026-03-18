"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type QuantResult = {
  model: string;
  original_size_mb: number;
  params_b: number;
  configs: {
    method: string;
    bits: number;
    size_mb: number;
    accuracy_loss: number;
    speed_gain: number;
    memory_reduction: number;
    perplexity_delta: number;
  }[];
};

const quantResults: QuantResult[] = [
  {
    model: "Phi-3 Mini 3.8B", original_size_mb: 7600, params_b: 3.8,
    configs: [
      { method: "FP16", bits: 16, size_mb: 7600, accuracy_loss: 0, speed_gain: 0, memory_reduction: 0, perplexity_delta: 0 },
      { method: "Q8_0", bits: 8, size_mb: 4000, accuracy_loss: 0.2, speed_gain: 25, memory_reduction: 47, perplexity_delta: 0.02 },
      { method: "Q5_K_M", bits: 5, size_mb: 2800, accuracy_loss: 0.8, speed_gain: 40, memory_reduction: 63, perplexity_delta: 0.06 },
      { method: "Q4_K_M", bits: 4, size_mb: 2200, accuracy_loss: 1.5, speed_gain: 55, memory_reduction: 71, perplexity_delta: 0.12 },
      { method: "Q3_K_M", bits: 3, size_mb: 1700, accuracy_loss: 3.2, speed_gain: 62, memory_reduction: 78, perplexity_delta: 0.28 },
      { method: "Q2_K", bits: 2, size_mb: 1300, accuracy_loss: 8.5, speed_gain: 70, memory_reduction: 83, perplexity_delta: 0.85 },
    ],
  },
  {
    model: "Llama 3.2 3B", original_size_mb: 6400, params_b: 3.2,
    configs: [
      { method: "FP16", bits: 16, size_mb: 6400, accuracy_loss: 0, speed_gain: 0, memory_reduction: 0, perplexity_delta: 0 },
      { method: "Q8_0", bits: 8, size_mb: 3400, accuracy_loss: 0.3, speed_gain: 22, memory_reduction: 47, perplexity_delta: 0.03 },
      { method: "Q5_K_M", bits: 5, size_mb: 2400, accuracy_loss: 0.9, speed_gain: 38, memory_reduction: 62, perplexity_delta: 0.07 },
      { method: "Q4_K_M", bits: 4, size_mb: 1900, accuracy_loss: 1.8, speed_gain: 52, memory_reduction: 70, perplexity_delta: 0.15 },
      { method: "Q3_K_M", bits: 3, size_mb: 1500, accuracy_loss: 3.8, speed_gain: 58, memory_reduction: 77, perplexity_delta: 0.32 },
      { method: "Q2_K", bits: 2, size_mb: 1100, accuracy_loss: 10.2, speed_gain: 65, memory_reduction: 83, perplexity_delta: 1.05 },
    ],
  },
  {
    model: "Gemma 2 2B", original_size_mb: 4000, params_b: 2.0,
    configs: [
      { method: "FP16", bits: 16, size_mb: 4000, accuracy_loss: 0, speed_gain: 0, memory_reduction: 0, perplexity_delta: 0 },
      { method: "Q8_0", bits: 8, size_mb: 2100, accuracy_loss: 0.1, speed_gain: 28, memory_reduction: 48, perplexity_delta: 0.01 },
      { method: "Q5_K_M", bits: 5, size_mb: 1500, accuracy_loss: 0.6, speed_gain: 42, memory_reduction: 62, perplexity_delta: 0.05 },
      { method: "Q4_K_M", bits: 4, size_mb: 1200, accuracy_loss: 1.2, speed_gain: 58, memory_reduction: 70, perplexity_delta: 0.10 },
      { method: "Q3_K_M", bits: 3, size_mb: 950, accuracy_loss: 2.8, speed_gain: 65, memory_reduction: 76, perplexity_delta: 0.25 },
      { method: "Q2_K", bits: 2, size_mb: 720, accuracy_loss: 7.5, speed_gain: 72, memory_reduction: 82, perplexity_delta: 0.72 },
    ],
  },
];

export default function QuantizationPage() {
  const [selectedModel, setSelectedModel] = useState(quantResults[0]);
  const [compareMethod, setCompareMethod] = useState<string>("Q4_K_M");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quantization Lab</h1>
          <p className="text-gray-500 mt-1">Explore the impact of different quantization methods on model quality and performance</p>
        </div>

        <div className="flex gap-3 mb-6">
          {quantResults.map((qr) => (
            <button key={qr.model} onClick={() => setSelectedModel(qr)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedModel.model === qr.model ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {qr.model}
            </button>
          ))}
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quantization Comparison - {selectedModel.model}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Method</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Bits</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Size</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Compression</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Accuracy Loss</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Speed Gain</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Memory Saved</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Perplexity Delta</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-500">Grade</th>
                </tr>
              </thead>
              <tbody>
                {selectedModel.configs.map((c) => {
                  const grade = c.accuracy_loss === 0 ? "Baseline" : c.accuracy_loss < 1 ? "Excellent" : c.accuracy_loss < 3 ? "Good" : c.accuracy_loss < 8 ? "Fair" : "Poor";
                  const gradeColor = grade === "Baseline" ? "text-blue-600" : grade === "Excellent" ? "text-green-600" : grade === "Good" ? "text-teal-600" : grade === "Fair" ? "text-amber-600" : "text-red-600";
                  return (
                    <tr key={c.method} className={`border-b border-gray-100 hover:bg-gray-50 ${c.method === compareMethod ? "bg-purple-50" : ""}`}
                      onClick={() => setCompareMethod(c.method)}>
                      <td className="py-3 px-3 font-medium text-gray-900 cursor-pointer">{c.method}</td>
                      <td className="py-3 px-3">{c.bits}</td>
                      <td className="py-3 px-3">{c.size_mb > 1000 ? `${(c.size_mb/1000).toFixed(1)}GB` : `${c.size_mb}MB`}</td>
                      <td className="py-3 px-3">{c.memory_reduction > 0 ? `${c.memory_reduction}%` : "-"}</td>
                      <td className="py-3 px-3">
                        <span className={c.accuracy_loss > 5 ? "text-red-600 font-medium" : c.accuracy_loss > 2 ? "text-amber-600" : "text-green-600"}>
                          {c.accuracy_loss > 0 ? `-${c.accuracy_loss}%` : "0%"}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-green-600">+{c.speed_gain}%</td>
                      <td className="py-3 px-3">{c.memory_reduction}%</td>
                      <td className="py-3 px-3">+{c.perplexity_delta.toFixed(2)}</td>
                      <td className={`py-3 px-3 font-medium ${gradeColor}`}>{grade}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Size Reduction Waterfall</h2>
            <div className="space-y-3">
              {selectedModel.configs.map((c) => (
                <div key={c.method} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-mono text-gray-600">{c.method}</span>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ width: `${(c.size_mb / selectedModel.original_size_mb) * 100}%` }} />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                      {c.size_mb > 1000 ? `${(c.size_mb/1000).toFixed(1)}GB` : `${c.size_mb}MB`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Configurations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-800">Best Quality: Q5_K_M</p>
                <p className="text-sm text-green-700 mt-1">Minimal quality loss with 60%+ size reduction. Ideal for production use where accuracy matters.</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-800">Best Balance: Q4_K_M</p>
                <p className="text-sm text-blue-700 mt-1">Good trade-off between size and quality. Best for mobile and edge devices with limited RAM.</p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="font-medium text-amber-800">Smallest: Q2_K</p>
                <p className="text-sm text-amber-700 mt-1">Maximum compression. Use only when storage is extremely limited. Noticeable quality degradation.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
