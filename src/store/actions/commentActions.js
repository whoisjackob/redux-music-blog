import { createAction } from 'redux-api-middleware';

export const postComment = (id, comment) =>
  createAction({
    endpoint: `http://localhost:5000/posts/${id}/comments`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
    types: ['REQUEST', 'POST_COMMENT', 'ERROR_COMMENT'],
  });

export const putComment = (id, commentId, comment) =>
  createAction({
    endpoint: `http://localhost:5000/posts/${id}/comments/${commentId}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
    types: ['REQUEST', 'PUT_COMMENT', 'ERROR_COMMENT'],
  });

export const deleteComment = (id, commentId) =>
  createAction({
    endpoint: `http://localhost:5000/posts/${id}/comments/${commentId}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    types: ['REQUEST', 'DELETE_COMMENT', 'ERROR_COMMENT'],
  });
