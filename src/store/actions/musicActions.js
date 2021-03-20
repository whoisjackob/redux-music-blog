import { createAction } from 'redux-api-middleware';

export const getSongs = () =>
  createAction({
    endpoint: 'http://localhost:5000/songs',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: ['REQUEST', 'GET_SONGS', 'ERROR_MUSIC'],
  });

export const postSong = (data) =>
  createAction({
    endpoint: 'http://localhost:5000/songs',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    types: ['REQUEST', 'POST_SONG', 'ERROR_MUSIC'],
  });

export const putSong = (id, data) =>
  createAction({
    endpoint: `http://localhost:5000/songs/${id}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    types: ['REQUEST', 'PUT_SONG', 'ERROR_MUSIC'],
  });

export const deleteSong = (id) =>
  createAction({
    endpoint: `http://localhost:5000/songs/${id}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    types: ['REQUEST', 'DELETE_SONG', 'ERROR_MUSIC'],
  });
