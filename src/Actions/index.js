import * as CategoryAPI from '../Utils/category_api';

import { RECEIVE_CATEGORIES } from '../Constants/sorting';

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

// Load all categories
export const fetchCategories = () => dispatch => CategoryAPI.fetchCategories()
  .then((categories) => dispatch(receiveCategories(categories)));
