"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const models = [
  { id: "1", name: "Phi-3 Mini 3.8B", family: "Phi", org: "Microsoft", params: 3.8, size_q4: 2200, size_fp16: 7600, tasks: ["General", "Reasoning", "Code"], mmlu: 68.8, license: "MIT", released: "2024-04", architecture: "Transformer", context: 4096, vocab: 32064 },
  { id: "2", name: "Gemma 2 2B", family: "Gemma", org: "Google", params: 2.0, size_q4: 1400, size_fp16: 4000, tasks: ["General", "Chat"], mmlu: 52.1, license: "Gemma License", released: "2024-06", architecture: "Transformer", context: 8192, vocab: 256000 },
  { id: "3", name: "Llama 3.2 3B", family: "Llama", org: "Meta", params: 3.2, size_q4: 1900, size_fp16: 6400, tasks: ["General", "Chat", "Reasoning"], mmlu: 63.4, license: "Llama 3.2 Community", released: "2024-09", architecture: "Transformer", context: 128000, vocab: 128256 },
  { id: "4", name: "Qwen2.5 3B", family: "Qwen", org: "Alibaba", params: 3.0, size_q4: 1800, size_fp16: 6000, tasks: ["General", "Code", "Math"], mmlu: 65.2, license: "Apache 2.0", released: "2024-09", architecture: "Transformer", context: 32768, vocab: 151936 },
  { id: "5", name: "TinyLlama 1.1B", family: "Llama", org: "Community", params: 1.1, size_q4: 640, size_fp16: 2200, tasks: ["General", "Text Gen"], mmlu: 25.3, license: "Apache 2.0", released: "2024-01", architecture: "Transformer", context: 2048, vocab: 32000 },
  { id: "6", name: "Phi-2 2.7B", family: "Phi", org: "Microsoft", params: 2.7, size_q4: 1600, size_fp16: 5400, tasks: ["General", "Reasoning", "Code"], mmlu: 56.7, license: "MIT", released: "2023-12", architecture: "Transformer", context: 2048, vocab: 51200 },
  { id: "7", name: "StableLM 2 1.6B", family: "StableLM", org: "Stability AI", params: 1.6, size_q4: 960, size_fp16: 3200, tasks: ["General", "Chat"], mmlu: 38.9, license: "StabilityAI License", released: "2024-01", architecture: "Transformer", context: 4096, vocab: 100352 },
  { id: "8", name: "Qwen2 1.5B", family: "Qwen", org: "Alibaba", params: 1.5, size_q4: 890, size_fp16: 3000, tasks: ["General", "Chat"], mmlu: 42.3, license: "Apache 2.0", released: "2024-06", architecture: "Transformer", context: 32768, vocab: 151936 },
  { id: "9", name: "Gemma 7B", family: "Gemma", org: "Google", params: 7.0, size_q4: 4200, size_fp16: 14000, tasks: ["General", "Chat", "Code"], mmlu: 64.3, license: "Gemma License", released: "2024-02", architecture: "Transformer", context: 8192, vocab: 256000 },
  { id: "10", name: "Mistral 7B v0.3", family: "Mistral", org: "Mistral AI", params: 7.0, size_q4: 4100, size_fp16: 14000, tasks: ["General", "Chat", "Reasoning"], mmlu: 62.5, license: "Apache 2.0", released: "2024-05", architecture: "Transformer", context: 32768, vocab: 32768 },
  { id: "11", name: "SmolLM2 1.7B", family: "SmolLM", org: "Hugging Face", params: 1.7, size_q4: 1020, size_fp16: 3400, tasks: ["General"], mmlu: 35.2, license: "Apache 2.0", released: "2024-11", architecture: "Transformer", context: 8192, vocab: 49152 },
  { id: "12", name: "OLMo 1B", family: "OLMo", org: "AI2", params: 1.0, size_q4: 600, size_fp16: 2000, tasks: ["General", "Research"], mmlu: 24.5, license: "Apache 2.0", released: "2024-02", architecture: "Transformer", context: 2048, vocab: 50304 },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"params" | "mmlu" | "size" | "name">("mmlu");
  const [filterSize, setFilterSize] = useState<"all" | "under2" | "2to5" | "5to10">("all");
  const [selected, setSelected] = useState<typeof models[0] | null>(null);

  const filtered = models
    .filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.org.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterSize === "under2" && m.params >= 2) return false;
      if (filterSize === "2to5" && (m.params < 2 || m.params >= 5)) return false;
      if (filterSize === "5to10" && m.params < 5) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "mmlu") return b.mmlu - a.mmlu;
      if (sortBy === "params") return a.params - b.params;
      if (sortBy === "size") return a.size_q4 - b.size_q4;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sub-10B Model Catalog</h1>
          <p className="text-gray-500 mt-1">Browse and compare small language models for edge deployment</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <input type="text" placeholder="Search models..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-purple-500 outline-none" />
          <div className="flex gap-2">
            {([["all", "All"], ["under2", "<2B"], ["2to5", "2-5B"], ["5to10", "5-10B"]] as const).map(([val, label]) => (
              <button key={val} onClick={() => setFilterSize(val)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filterSize === val ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                {label}
              </button>
            ))}
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm">
            <option value="mmlu">Sort: MMLU Score</option>
            <option value="params">Sort: Parameters</option>
            <option value="size">Sort: Size</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filtered.map((m) => (
            <div key={m.id} onClick={() => setSelected(m)}
              className={`glass rounded-xl p-5 cursor-pointer card-hover ${selected?.id === m.id ? "ring-2 ring-purple-500" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{m.name}</h3>
                  <p className="text-xs text-gray-500">{m.org} | {m.license}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">{m.params}B</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">MMLU</p>
                  <p className={`text-sm font-bold ${m.mmlu >= 60 ? "text-green-600" : m.mmlu >= 40 ? "text-amber-600" : "text-red-600"}`}>{m.mmlu}%</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Q4 Size</p>
                  <p className="text-sm font-bold text-gray-700">{m.size_q4 > 1000 ? `${(m.size_q4/1000).toFixed(1)}G` : `${m.size_q4}M`}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Context</p>
                  <p className="text-sm font-bold text-gray-700">{m.context >= 1000 ? `${(m.context/1000).toFixed(0)}K` : m.context}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {m.tasks.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{selected.name} - Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                ["Organization", selected.org], ["Architecture", selected.architecture], ["Parameters", `${selected.params}B`],
                ["Q4 Size", `${selected.size_q4}MB`], ["FP16 Size", `${(selected.size_fp16/1000).toFixed(1)}GB`], ["MMLU", `${selected.mmlu}%`],
                ["Context Length", `${selected.context.toLocaleString()}`], ["Vocabulary", `${selected.vocab.toLocaleString()}`],
                ["License", selected.license], ["Released", selected.released],
              ].map(([label, value]) => (
                <div key={label} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="font-medium text-gray-900 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
