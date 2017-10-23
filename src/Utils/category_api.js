import { authHeaders } from './auth';

export const fetchCategories = () => fetch('http://localhost:3001/categories', { headers: { ...authHeaders } })
  .then(data => data.json())
  .then(data => data.categories);
