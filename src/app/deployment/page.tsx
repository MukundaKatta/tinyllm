"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

type Target = {
  id: string;
  name: string;
  category: string;
  ram_gb: number;
  storage_gb: number;
  compute_type: string;
  tops: number;
  formats: string[];
  max_params_b: number;
  os: string;
  price_range: string;
  recommended_models: string[];
  notes: string;
};

const targets: Target[] = [
  { id: "1", name: "iPhone 15 Pro", category: "Mobile", ram_gb: 8, storage_gb: 256, compute_type: "ANE 17-core", tops: 35, formats: ["CoreML", "ONNX"], max_params_b: 4, os: "iOS 17+", price_range: "$999+", recommended_models: ["Phi-3 Mini Q4", "Gemma 2B Q4", "TinyLlama Q4"], notes: "Best-in-class mobile NPU, excellent CoreML support" },
  { id: "2", name: "Pixel 8 Pro", category: "Mobile", ram_gb: 12, storage_gb: 128, compute_type: "Tensor G3 + Edge TPU", tops: 11, formats: ["TFLite", "ONNX", "GGUF"], max_params_b: 3, os: "Android 14+", price_range: "$899+", recommended_models: ["Gemma 2B Q4", "TinyLlama Q4", "Phi-2 Q3"], notes: "Excellent ML integration with Google AI Edge" },
  { id: "3", name: "MacBook Air M3", category: "Laptop", ram_gb: 24, storage_gb: 512, compute_type: "Apple M3 + ANE", tops: 18, formats: ["CoreML", "MLX", "GGUF", "ONNX"], max_params_b: 8, os: "macOS 14+", price_range: "$1099+", recommended_models: ["Llama 3.2 3B", "Phi-3 Mini", "Gemma 7B Q4", "Mistral 7B Q4"], notes: "MLX framework offers exceptional performance" },
  { id: "4", name: "Jetson Orin Nano", category: "Edge", ram_gb: 8, storage_gb: 64, compute_type: "Ampere GPU + NVDLA", tops: 40, formats: ["TensorRT", "ONNX", "PyTorch"], max_params_b: 7, os: "JetPack 6", price_range: "$199+", recommended_models: ["Llama 3.2 3B", "Phi-3 Mini", "YOLOv8"], notes: "Best edge compute per dollar for AI workloads" },
  { id: "5", name: "Raspberry Pi 5", category: "IoT", ram_gb: 8, storage_gb: 32, compute_type: "Cortex-A76 CPU", tops: 0.5, formats: ["TFLite", "ONNX"], max_params_b: 1, os: "Raspberry Pi OS", price_range: "$80+", recommended_models: ["TinyLlama Q2", "OLMo 1B Q2", "MobileNet V3"], notes: "Limited to very small models, no dedicated AI accelerator" },
  { id: "6", name: "Google Coral Dev Board", category: "Edge", ram_gb: 4, storage_gb: 16, compute_type: "Edge TPU", tops: 4, formats: ["TFLite (INT8)"], max_params_b: 0.5, os: "Mendel Linux", price_range: "$129+", recommended_models: ["MobileNet V3", "EfficientNet-Lite", "YOLO Nano"], notes: "INT8 only, best for vision models" },
  { id: "7", name: "Browser (WebGPU)", category: "Web", ram_gb: 4, storage_gb: 2, compute_type: "WebGPU", tops: 2, formats: ["ONNX-Web", "WebLLM"], max_params_b: 2, os: "Chrome 120+", price_range: "Free", recommended_models: ["TinyLlama Q4", "Phi-2 Q2", "SmolLM 1.7B Q3"], notes: "WebGPU enables GPU-accelerated inference in browser" },
  { id: "8", name: "Hailo-8L", category: "Accelerator", ram_gb: 0, storage_gb: 0, compute_type: "Hailo AI Processor", tops: 13, formats: ["HEF (Hailo)"], max_params_b: 0.5, os: "Linux + HailoRT", price_range: "$70+", recommended_models: ["YOLOv8", "MobileNet V3", "ResNet-50"], notes: "Vision-focused, requires Hailo model compilation" },
];

export default function DeploymentPage() {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = ["all", ...new Set(targets.map((t) => t.category))];
  const filtered = targets.filter((t) => filterCategory === "all" || t.category === filterCategory);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deployment Target Selector</h1>
          <p className="text-gray-500 mt-1">Find the best hardware target for your small model deployment</p>
        </div>

        <div className="flex gap-2 mb-6">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilterCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${filterCategory === c ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {c === "all" ? "All Targets" : c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {filtered.map((t) => (
            <div key={t.id} onClick={() => setSelectedTarget(t)}
              className={`glass rounded-xl p-5 cursor-pointer card-hover ${selectedTarget?.id === t.id ? "ring-2 ring-purple-500" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-xs text-gray-500">{t.category} | {t.os} | {t.price_range}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">{t.tops} TOPS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">RAM</p>
                  <p className="text-sm font-bold">{t.ram_gb}GB</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Max Model</p>
                  <p className="text-sm font-bold">{t.max_params_b}B</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <p className="text-xs text-gray-500">Compute</p>
                  <p className="text-sm font-bold text-purple-600">{t.compute_type.split(" ")[0]}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {t.formats.map((f) => (
                  <span key={f} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{f}</span>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">{t.notes}</p>
            </div>
          ))}
        </div>

        {selectedTarget && (
          <div className="glass rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Models for {selectedTarget.name}</h2>
            <div className="flex flex-wrap gap-3 mb-4">
              {selectedTarget.recommended_models.map((m) => (
                <div key={m} className="px-4 py-3 bg-purple-50 text-purple-700 rounded-xl font-medium text-sm border border-purple-200">{m}</div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Compute</p><p className="font-medium text-sm">{selectedTarget.compute_type}</p></div>
              <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Storage</p><p className="font-medium text-sm">{selectedTarget.storage_gb}GB</p></div>
              <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Operating System</p><p className="font-medium text-sm">{selectedTarget.os}</p></div>
              <div className="p-3 bg-gray-50 rounded-lg"><p className="text-xs text-gray-500">Price Range</p><p className="font-medium text-sm">{selectedTarget.price_range}</p></div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
