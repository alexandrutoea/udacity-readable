import * as CommentAPI from '../Utils/comment_api';

import { ADD_COMMENT, RECEIVE_COMMENTS, COMMENT_VOTE, DELETE_COMMENT, SET_COMMENT_SORTING } from '../Constants/comments';

export const setCommentSorting = sortCommentsBy => ({
  type: SET_COMMENT_SORTING,
  sortCommentsBy,
});

export const receiveComments = (comments, actionType) => ({
  type: actionType,
  comments,
});

// Load all comments
export const fetchComments = id => dispatch => CommentAPI.fetchComments(id)
  .then((comments) => dispatch(receiveComments(comments, RECEIVE_COMMENTS)));

// Vote for a comment
export const voteComment = (id, vote) => dispatch => CommentAPI.voteComment(id, vote)
  .then((comment) => dispatch(receiveComments(comment, COMMENT_VOTE)));

// Create new comment
export const addComment = data => dispatch => CommentAPI.addComment(data)
  .then(comment => dispatch(receiveComments(comment, ADD_COMMENT)));

// Delete new comment
export const deleteComment = id => dispatch => CommentAPI.deleteComment(id)
  .then(comment => dispatch(receiveComments(comment, DELETE_COMMENT)));
