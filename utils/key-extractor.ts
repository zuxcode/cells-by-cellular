/**
 * Generates unique keys combining a prefix and index
 * 
 * @param prefix - Unique identifier for the key scope (item ID, resource name, etc.)
 * @param index - Position in the array
 * @returns Composite key string
 * 
 * @example
 * // Basic usage
 * keyExtractor("user-list", 0) // "user-list-0"
 * 
 * @example
 * // With numeric prefix
 * keyExtractor(123, 1) // "123-1"
 * 
 * @remarks
 * While this provides basic key generation, consider these recommendations:
 * - Use unique IDs from your data when available
 * - For React lists, use `key={item.id}` directly if possible
 * - Add context-specific prefixes for duplicate indexes across lists
 */
function keyExtractor(prefix: string | number, index: number): string {
  if (typeof prefix !== 'string' && typeof prefix !== 'number') {
    throw new Error('Prefix must be string or number');
  }
  
  return `${String(prefix)}-${index}`;
}

export { keyExtractor };