import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type SmallModel = {
  id: string;
  name: string;
  family: string;
  parameters_b: number;
  size_mb: number;
  quantizations: string[];
  tasks: string[];
  mmlu_score: number;
  hellaswag_score: number;
  arc_score: number;
  humaneval_score: number;
  speed_tokens_s: number;
  memory_gb: number;
  license: string;
  release_date: string;
};

export type QuantizationConfig = {
  id: string;
  model_id: string;
  method: string;
  bits: number;
  size_mb: number;
  accuracy_loss_pct: number;
  speed_gain_pct: number;
  memory_reduction_pct: number;
};

export type DeploymentTarget = {
  id: string;
  name: string;
  type: string;
  ram_gb: number;
  compute_tops: number;
  max_model_size_mb: number;
  supported_formats: string[];
};
