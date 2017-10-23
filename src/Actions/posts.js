import * as PostAPI from '../Utils/post_api';
import * as CommentAPI from '../Utils/comment_api';

import { ADD_POST, DELETE_POST, EDIT_POST, VOTE_POST, GET_POST, RECEIVE_POSTS, GET_POSTS_BY_CATEGORY, SET_POST_SORTING } from '../Constants/posts';

export const setPostSorting = sortBy => ({
  type: SET_POST_SORTING,
  sortBy,
});

export const getPostsById = (posts, actionType) => ({
  type: actionType,
  posts,
});

// All post functions perform an action then reload the data from api and add it into the reducer
// While this is not the most effective way of doing it from a number of requests perspective, it ensures the data displayed is always up to date

// All Posts
export const fetchPosts = () => dispatch => PostAPI.fetchPosts()
  .then((posts) => Promise.all((posts).map((post) => CommentAPI.fetchComments(post.id)
    .then(comments => ((post.comments = comments)))
    .then(() => post))))
  .then((posts) => dispatch(getPostsById(posts, RECEIVE_POSTS)));

// All Posts in a category
export const fetchPostsByCategory = category => dispatch => PostAPI.fetchPostsByCategory(category)
  .then((posts) => Promise.all(posts.map(post => CommentAPI.fetchComments(post.id)
    .then((comments) => ((post.comments = comments)))
    .then(() => post))))
  .then((posts) => dispatch(getPostsById(posts, GET_POSTS_BY_CATEGORY)));

// Posts with an ID
export const fetchPost = id => dispatch => PostAPI.fetchPost(id)
  .then(post => CommentAPI.fetchComments(post.id)
    .then((comments) => ((post.comments = comments)))
    .then(() => post))
  .then(post => dispatch(getPostsById(post, GET_POST)));

// Delete Post
export const deletePost = id => dispatch => PostAPI.deletePost(id)
  .then((post) => CommentAPI.fetchComments(post.id)
    .then((comments) => (post.comments = comments))
    .then(() => post))
  .then((post) => dispatch(getPostsById(post, DELETE_POST)));

// Vote for a post
export const vote = (id, voteObj) => dispatch => PostAPI.vote(id, voteObj)
  .then((post) => CommentAPI.fetchComments(post.id)
    .then((comments) => (post.comments = comments))
    .then(() => post))
  .then((post) => dispatch(getPostsById(post, VOTE_POST)));

// Create a new post
export const addPost = data => dispatch => PostAPI.addPost(data)
  .then((post) => CommentAPI.fetchComments(post.id)
    .then((comments) => (post.comments = comments))
    .then(() => post))
  .then((post) => dispatch(getPostsById(post, ADD_POST)));

// Edit existing post
export const editPost = (data, id) => dispatch => PostAPI.editPost(data, id)
  .then((post) => CommentAPI.fetchComments(post.id)
    .then(comments => (post.comments = comments))
    .then(() => post)
  )
  .then((post) => dispatch(getPostsById(post, EDIT_POST)));
