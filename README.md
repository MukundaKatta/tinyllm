# TinyLLM

Small language model evaluation platform for comparing sub-10B parameter models on benchmarks, efficiency, and deployment readiness.

## Features

- **Model Dashboard** -- Overview of tracked small language models with key metrics
- **Model Catalog** -- Browse and filter models by family, size, and performance
- **Scatter Analysis** -- Visualize parameter count vs. benchmark score tradeoffs
- **Quantization Explorer** -- Compare quantization methods and their impact on quality
- **Deployment Readiness** -- Assess models for edge and mobile deployment scenarios
- **Evaluation Suite** -- MMLU, HellaSwag, ARC benchmarks with efficiency metrics
- **Efficiency Rankings** -- Rank models by performance-per-parameter ratio

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd tinyllm
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
tinyllm/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── catalog/      # Model catalog
│   │   ├── scatter/      # Scatter analysis
│   │   ├── quantization/ # Quantization explorer
│   │   ├── deployment/   # Deployment readiness
│   │   ├── eval/         # Evaluation suite
│   │   └── efficiency/   # Efficiency rankings
│   ├── components/       # Shared UI components
│   └── lib/              # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

