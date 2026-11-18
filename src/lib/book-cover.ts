import coverMap from "@/data/book-covers.generated.json";
import type { Book } from "@/data/books";

const resolved = coverMap as Record<string, string>;

/**
 * Returns a direct Google-hosted image URL for the book cover.
 * The generated map resolves Google Drive thumbnail redirects to their final
 * lh3.googleusercontent.com URLs so the image is visible in previews.
 */
export function resolveBookCover(book: Book): string | undefined {
  const url = resolved[book.slug];
  if (url) return url;

  // Unresolved Google Drive thumbnails are broken links; show the fallback.
  const fallback = book.cover;
  return fallback && !fallback.includes("drive.google.com")
    ? fallback
    : undefined;
}
