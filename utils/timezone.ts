// Optional: Client-side timezone detection
export const getClientTimezone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;
