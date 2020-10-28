export const entries = (obj, cb) => {
  Object.entries(obj).forEach(([key, val]) => {
    cb(key, val);
  });
};

export const noop = () => {};

export const createMatrix = (array, columnLength) => {
  const newArray = [];
  let temp = [];
  array.forEach((item, i) => {
    temp.push(item);
    if ((i + 1) % columnLength === 0) {
      newArray.push(temp);
      temp = [];
    }
  });
  if (temp.length) {newArray.push(temp);}
  return newArray;
};
