import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tygukivmeoxpgkyzpmqt.supabase.co";
const supabaseAnonKey = "sb_publishable_RW7glaSYdvz4Nb6TEDYwvw_rtC2WsbI";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);