function stringTransform(text?: string): string {
  if (!text) return "";

  console.log(text);
  return (
    text
      .replace(/_+/g, " ")
      // Replace all hyphens (including consecutive ones) with single spaces
      .replace(/-+/g, " ")
      // Trim whitespace from both ends
      .trim()
      // Replace multiple spaces with single space
      .replace(/\s+/g, " ")
  );
}

export { stringTransform };
