import { ADD_POST, DELETE_POST, EDIT_POST, VOTE_POST, GET_POST, RECEIVE_POSTS, GET_POSTS_BY_CATEGORY, SET_POST_SORTING } from '../Constants/posts';
import { factorObject } from '../Utils/objects';

export function postSorting(state = null, action) {
  switch (action.type) {
    case SET_POST_SORTING:
      return { ...state, sort: action.sortBy };
    default:
      return state;
  }
}

export function postsById(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case GET_POSTS_BY_CATEGORY:
      return { ...state, ...factorObject(action.posts) };

    case GET_POST:
    case VOTE_POST:
    case ADD_POST:
    case DELETE_POST:
    case EDIT_POST:
      return { ...state, ...factorObject([action.posts]) };

    default:
      return state;
  }
}
