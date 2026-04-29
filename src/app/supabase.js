import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iukasubzadopzvrggtak.supabase.co";
const supabaseKey = "sb_publishable_MmzDOEpP9FZD55cyXfvhnA_DRFN9SEz";

export const supabase = createClient(supabaseUrl, supabaseKey);