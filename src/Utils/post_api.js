import { authHeaders } from './auth';

//  Get all posts
export const fetchPosts = () => fetch('http://localhost:3001/posts', { headers: { Authorization: 'whatever-you-want' } })
  .then(data => data.json());

// Get all posts in a category
export const fetchPostsByCategory = category =>
  fetch(`http://localhost:3001/${ category }/posts`, {
    headers: {
      ...authHeaders,
    },
  }).then(data => data.json());

// Get a single post based on id
export const fetchPost = id =>
  fetch(`http://localhost:3001/posts/${ id }`, {
    headers: {
      ...authHeaders,
    },
  }).then(data => data.json());

// Delete post
export const deletePost = id =>
  fetch(`http://localhost:3001/posts/${ id }`, {
    method: 'DELETE',
    headers: {
      ...authHeaders,
    },
  }).then((result) => result.json());

// Change voteScore for a post
export const vote = (id, voteObj) =>
  fetch(`http://localhost:3001/posts/${ id }`, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ option: voteObj }),
  }).then((result) => result.json());

// Add new post
export const addPost = data =>
  fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((result) => result.json());

// Edit post
export const editPost = (data, id) =>
  fetch(`http://localhost:3001/posts/${ id }`, {
    method: 'PUT',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((result) => result.json());
