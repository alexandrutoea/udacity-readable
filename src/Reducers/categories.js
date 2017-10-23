import { RECEIVE_CATEGORIES } from '../Constants/sorting';

export function categories(state = null, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
