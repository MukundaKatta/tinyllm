import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinyLLM - Small Model Evaluation Platform",
  description: "Evaluate and compare sub-10B parameter language models for edge deployment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
