import { createAction } from 'redux-api-middleware';

export const getPosts = () =>
  createAction({
    endpoint: 'http://localhost:5000/posts',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: ['REQUEST', 'GET_POSTS', 'ERROR_POSTS'],
  });

export const postPost = (data) =>
  createAction({
    endpoint: 'http://localhost:5000/posts',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    types: ['REQUEST', 'POST_POST', 'ERROR_POSTS'],
  });

export const putPost = (id, data) =>
  createAction({
    endpoint: `http://localhost:5000/posts/${id}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    types: ['REQUEST', 'PUT_POST', 'ERROR_POSTS'],
  });

export const deletePost = (id) =>
  createAction({
    endpoint: `http://localhost:5000/posts/${id}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    types: ['REQUEST', 'DELETE_POST', 'ERROR_POSTS'],
  });
