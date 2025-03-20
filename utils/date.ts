/**
 * Validates if a user is at least 18 years old
 * @param birthDate - The user's birth date
 * @param useUTC - Whether to use UTC dates (default: false)
 * @returns True if user is 18+ years old, false otherwise
 */
export const isUser18Plus = (birthDate: Date, useUTC = false): boolean => {
    // Normalize input date
    const normalizeDate = (date: Date) => {
      const d = new Date(date);
      useUTC
        ? d.setUTCHours(0, 0, 0, 0)
        : d.setHours(0, 0, 0, 0);
      return d;
    };
  
    // Get current date components
    const now = new Date();
    const currentYear = useUTC ? now.getUTCFullYear() : now.getFullYear();
    const currentMonth = useUTC ? now.getUTCMonth() : now.getMonth();
    const currentDay = useUTC ? now.getUTCDate() : now.getDate();
  
    // Calculate cutoff date (18 years ago)
    const cutoffYear = currentYear - 18;
    let cutoffDate: Date;
  
    try {
      cutoffDate = useUTC
        ? new Date(Date.UTC(cutoffYear, currentMonth, currentDay))
        : new Date(cutoffYear, currentMonth, currentDay);
    } catch {
      // Handle invalid date (e.g., February 29 in non-leap year)
      cutoffDate = useUTC
        ? new Date(Date.UTC(cutoffYear, currentMonth + 1, 1))
        : new Date(cutoffYear, currentMonth + 1, 1);
    }
  
    // Normalize dates for comparison
    const normBirthDate = normalizeDate(birthDate);
    const normCutoffDate = normalizeDate(cutoffDate);
  
    return normBirthDate <= normCutoffDate;
  };