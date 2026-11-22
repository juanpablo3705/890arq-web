const DEFAULT_SUPABASE_URL = "https://placeholder.supabase.co";

// construye url publica del bucket sin arrastrar el sdk al cliente
export function getStorageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const baseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL
  ).replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${baseUrl}/storage/v1/object/public/proyectos-media/${cleanPath}`;
}
