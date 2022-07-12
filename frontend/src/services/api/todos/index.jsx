import API from '../utilities/core';
import todosEndpoint from '../../../constants/endpoints';

const todosApi = new API({ endpoint: todosEndpoint });

export default todosApi;
