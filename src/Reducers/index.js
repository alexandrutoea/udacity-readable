import { combineReducers } from 'redux';

import { postSorting, postsById } from './posts';
import { commentSorting, receiveComments } from './comments';
import { categories } from './categories';


export default combineReducers({
  categories,
  postSorting,
  commentSorting,
  postsById,
  receiveComments,
});
