/**
 * Common wrapper for SSR data fetching with retry logic and null failover
 * @param {Function} fn - The async function to execute
 * @param {Object} options - Configuration options
 * @param {number} options.retries - Number of retry attempts (default: 2)
 * @param {string} options.label - Label for logging purposes
 * @returns {Promise<any>} The result of the function or null on final failure
 */
export async function withSSRRetry(fn, { retries = 2, label = 'SSR Fetch' } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Error in ${label} (attempt ${attempt + 1}/${retries + 1}):`, error.message);

      if (attempt === retries) {
        return null; // Return null so client hydration can take over
      }

      // Exponential backoff (1s, 2s, 4s...)
      await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
  return null;
}
