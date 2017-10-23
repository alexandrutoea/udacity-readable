import { authHeaders } from './auth';

export const fetchComments = (id) => fetch(`http://localhost:3001/posts/${ id }/comments`, { headers: { ...authHeaders } })
  .then(data => data.json())
  .then(data => data);

// Add comment
export const addComment = (data) =>
  fetch('http://localhost:3001/comments',
    {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((result) => result.json());

// Change voteScore for a comment
export const voteComment = (id, vote) =>
  fetch(`http://localhost:3001/comments/${ id }`,
    {
      method: 'POST',
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ option: vote }),
    })
    .then((result) => result.json());

// Delete post
export const deleteComment = (id) =>
  fetch(`http://localhost:3001/comments/${ id }`,
    {
      method: 'DELETE',
      headers: {
        ...authHeaders,
      },
    })
    .then((result) => result.json());
