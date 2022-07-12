/* eslint-disable max-len */
import {
  getResource, createResource, updateResource, deleteResource,
} from './actions';

/**
 * @description This class handles all API calls.
 * @example
 * const todosApi = new API({endpoint: '/'})
 * const allTodos = todosApi.getResource() //returns all todos
 */
class API {
  constructor(options) {
    this.endpoint = options.endpoint;
    this.getResource = (args = {}) => getResource({ endpoint: this.endpoint, params: args?.params });
    this.createResource = (args) => createResource({ endpoint: this.endpoint, resource: args?.resource });
    this.updateResource = (args) => updateResource({ endpoint: `${this.endpoint}${args?.id}`, resource: args?.resource });
    this.deleteResource = (args) => deleteResource({ endpoint: `${this.endpoint}${args?.id}` });
  }
}

export default API;
