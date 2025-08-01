// lib/supabaseAdmin.ts
import { createClient } from "@supabase/supabase-js";

require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default supabase;
