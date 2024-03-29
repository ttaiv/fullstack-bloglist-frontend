import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (newBlog) => {
  const url = `${baseUrl}/${newBlog.id}`;
  const response = await axios.put(url, newBlog);
  return response.data;
};

const deleteBlog = async (blogToDelete) => {
  const url = `${baseUrl}/${blogToDelete.id}`;
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(url, config);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, setToken, update, deleteBlog,
};
