/* ===== SUPABASE CLIENT CONFIGURATION ===== */
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase credentials loaded from environment variables.
 * Create a .env file in the project root with:
 *   VITE_SUPABASE_URL=https://your-project.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 */
const SUPABASE_URL     = import.meta.env.VITE_SUPABASE_URL     || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn(
        '⚠️  SMEFlow: Missing Supabase credentials.\n' +
        'UI will render but API calls will fail.\n' +
        'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
