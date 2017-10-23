import { ADD_COMMENT, RECEIVE_COMMENTS, COMMENT_VOTE, DELETE_COMMENT, SET_COMMENT_SORTING } from '../Constants/comments';
import { factorObject } from '../Utils/objects';

export function commentSorting(state = null, action) {
  switch (action.type) {
    case SET_COMMENT_SORTING:
      return { ...state, sort: action.sortCommentsBy };
    default:
      return state;
  }
}

export function receiveComments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...state, ...factorObject(action.comments) };

    case ADD_COMMENT:
    case COMMENT_VOTE:
    case DELETE_COMMENT:
      return { ...state, ...factorObject([action.comments]) };

    default:
      return state;
  }
}
