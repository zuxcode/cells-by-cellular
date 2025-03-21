type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Enhanced logger with multiple levels and development-only logging
 * @param level Importance level of the log message
 * @param location Context identifier for the log source
 * @param args Data to log (preserves original types and formatting)
 */
export function logger(
  level: LogLevel,
  location: string,
  ...args: unknown[]
): void {
  if (process.env.NODE_ENV === "development") {
    console[level](`[${level.toUpperCase()}][${location}]`, ...args);
  }
}

/**
 * Production-ready error logger with reporting service integration
 * @param error Error object to log
 * @param context Additional context for the error
 */
export function productionErrorLogger(error: Error, context?: string): void {
  const errorMessage = context ? `[ERROR][${context}]` : "[ERROR]";
  
  // Always log to console
  console.error(errorMessage, error);

  // Report to error tracking service in production
  if (process.env.NODE_ENV === "production") {
    try {
      // Example integration with error reporting service
      // Sentry.captureException(error, { tags: { context } });
    } catch (reportingError) {
      console.error("[ERROR REPORTING FAILED]", reportingError);
    }
  }
}

/**
 * Performance profiler that returns a cleanup function to log duration
 * @param location Context identifier for the performance measurement
 * @returns Function to call when operation completes
 */
export function profileLogger(location: string): () => void {
  if (process.env.NODE_ENV === "development") {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      console.debug(
        `[PERF][${location}] Duration: ${duration.toFixed(2)}ms`
      );
    };
  }
  
  // No-op function for production
  return () => {};
}