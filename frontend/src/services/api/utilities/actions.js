import axios from 'axios';
import config from '../../../../config';
import { handleError, handleResponse } from './response';

/**
 * @description It handles get requests to the API
 * @param {string} endpoint an endpoint to make a request to
 * @param {object} params an object of query parameters
 * @returns {object} the response object or error object
 */
export const getResource = async ({ endpoint, params }) => {
  try {
    const response = await axios.get(`${config.app.APIDomain}/${endpoint}`, { params });
    const result = handleResponse(response);
    return result;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * @description It handles POST request to the API
 * @param {string} endpoint An endpoint to make a request to
 * @param {object} resource An object with items to POST
 * @returns {object} The response or error object
 */
export const createResource = async ({ endpoint, resource }) => {
  try {
    const response = await axios.post(`${config.app.APIDomain}/${endpoint}`, resource);
    const result = handleResponse(response);
    return result;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * @description It handles PUT request to the API
 * @param {string} endpoint An endpoint to make a request to
 * @param {object} resource An object with items to PUT
 * @returns {object} The response or error object
 */
export const updateResource = async ({ endpoint, resource }) => {
  try {
    const response = await axios.put(`${config.app.APIDomain}/${endpoint}`, resource);
    const result = handleResponse(response);
    return result;
  } catch (error) {
    return handleError(error);
  }
};

/**
 * @description It handles DELETE request to the API
 * @param {string} endpoint An endpoint to make a request to
 * @returns {object} The response or error object
 */
export const deleteResource = async ({ endpoint }) => {
  try {
    const response = await axios.delete(`${config.app.APIDomain}/${endpoint}`);
    const result = handleResponse(response);
    return result;
  } catch (error) {
    return handleError(error);
  }
};
