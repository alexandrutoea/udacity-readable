// Transforming arrays into objects to allow refferencing
export function factorObject(items) {
  const newObj = {};
  items.map((item) => {
    const itemId = item.id;
    newObj[itemId] = item;
    return null;
  });
  return newObj;
}
