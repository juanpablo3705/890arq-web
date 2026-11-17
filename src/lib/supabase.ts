import { createClient } from "@supabase/supabase-js";

// lectura de variables publicas con respaldo seguro para compilacion
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// cliente base de supabase sin persistencia de sesion para compatibilidad edge
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

// helper para obtener url publica desde el bucket proyectos-media
export function getStorageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.replace(/^\/+/, "");
  const { data } = supabase.storage
    .from("proyectos-media")
    .getPublicUrl(cleanPath);
  return data.publicUrl;
}
