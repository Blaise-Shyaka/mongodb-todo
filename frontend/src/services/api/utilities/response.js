import errorMessages from '../../../constants/errorMessages';

/**
 * @description It handles the response object from an API Call
 * @param {object} response Response object
 * @returns {object} An object with data and status as properties
 */

export function handleResponse(response) {
  if (response.data) {
    const { status, data } = response;
    return { data, status };
  }

  return response?.status;
}

/**
 * @description It handles errors resulting from an API Call
 * @param {object} error Error object from the API response
 * @returns throws an error
 */
export function handleError(error) {
  if (error.isAxiosError) {
    if (error.response?.data?.message) {
      const { status, data, statusText } = error.response;
      throw new Error(`Error ${status}: ${data?.message || statusText}`);
    }

    throw new Error(errorMessages.networkError);
  } else {
    // Deal with standard JS Errors
    throw error;
  }
}
