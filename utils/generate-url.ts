/**
 * Generates URL-safe slugs from titles with comprehensive character handling
 *
 * @param title - The input title to convert
 * @returns Formatted URL path with:
 *          - Lowercase letters
 *          - Diacritics removed
 *          - Special characters replaced
 *          - Multiple hyphens collapsed
 *          - Leading/trailing hyphens trimmed
 *
 * @example
 * generateNavUrl("User Profile")        // "user-profile"
 * generateNavUrl("Email & Password")    // "email-password"
 * generateNavUrl("  Hello_World!  ")    // "hello-world"
 * generateNavUrl("Café_au_lait")        // "cafe-au-lait"
 */
const generateUrl = (title: string) =>
  title
    // Convert to lowercase
    .toLowerCase()
    // Normalize and remove diacritics
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, "-")
    // Remove all non-word characters except hyphens
    .replace(/[^a-z0-9-]/g, "")
    // Collapse multiple hyphens to single
    .replace(/-+/g, "-")
    // Trim hyphens from start and end
    .replace(/^-+|-+$/g, "");

export { generateUrl };
