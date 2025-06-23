/**
 * Utility functions for handling fetch operations with improved error handling
 */

/**
 * Fetch with timeout and retry capabilities
 * @param {string} url - URL to fetch
 * @param {Object} options - fetch options
 * @param {number} timeout - timeout in milliseconds
 * @param {number} retries - number of retries
 * @returns {Promise<Response>} - fetch response
 */
export const fetchWithTimeout = async (url, options = {}, timeout = 8000, retries = 1) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);

        if (retries > 0) {
            console.log(`Retry attempt for ${url}. Retries left: ${retries}`);
            // Wait 1 second before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithTimeout(url, options, timeout, retries - 1);
        }

        throw error;
    }
};

/**
 * Fetch data from API with improved error handling
 * @param {string} url - URL to fetch
 * @param {Object} options - fetch options
 * @returns {Promise<Object>} - parsed JSON response
 */
export const fetchData = async (url, options = {}) => {
    try {
        // Try first URL
        const response = await fetchWithTimeout(url, options);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error (${response.status}): ${errorText}`);
            throw new Error(`Server returned ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);

        // Try alternative URL format if it looks like a localhost URL
        if (url.includes('localhost') && !url.includes('127.0.0.1')) {
            const alternativeUrl = url.replace('localhost', '127.0.0.1');
            console.log(`Trying alternative URL: ${alternativeUrl}`);

            try {
                const altResponse = await fetchWithTimeout(alternativeUrl, options);

                if (!altResponse.ok) {
                    throw new Error(`Alternative server returned ${altResponse.status}`);
                }

                return await altResponse.json();
            } catch (altError) {
                console.error('Alternative URL fetch failed:', altError);
            }
        }

        // Both attempts failed or wasn't a localhost URL
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
};

/**
 * Check if backend server is reachable
 * @param {string} baseUrl - Base URL of the backend
 * @returns {Promise<boolean>} - true if reachable, false otherwise
 */
export const checkServerConnectivity = async (baseUrl = 'http://localhost:5000') => {
    try {
        const response = await fetchWithTimeout(`${baseUrl}/ping`, {}, 3000);
        return response.ok;
    } catch (error) {
        console.error('Server connectivity check failed:', error);
        return false;
    }
};
