import { createClient } from '@supabase/supabase-js'

// ─────────────────────────────────────────────────────────────────────────────
// 🔑 CONNECT YOUR SUPABASE PROJECT
//
// Find these in the Supabase dashboard:
//   Settings (gear icon) → API → "Project URL" and "Project API keys" (anon/public)
//
// You can either:
//   (A) paste the values directly into the two strings below, OR
//   (B) create a `.env.local` file in the project root with:
//         VITE_SUPABASE_URL=https://your-project.supabase.co
//         VITE_SUPABASE_ANON_KEY=your-anon-key
//       (recommended — keeps keys out of git; see .env.example)
// ─────────────────────────────────────────────────────────────────────────────

const URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL'
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(URL, API_KEY)
