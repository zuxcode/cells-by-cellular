function stringTransform(text?: string): string {
  if (!text) return "";

  return (
    text
      // Replace all hyphens (including consecutive ones) with single spaces
      .replace(/-+/g, " ")
      // Trim whitespace from both ends
      .trim()
      // Replace multiple spaces with single space
      .replace(/\s+/g, " ")
  );
}

export { stringTransform };
