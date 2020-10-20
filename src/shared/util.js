export const entries = (obj, cb) => {
  console.log('obj', obj);
  Object.entries(obj).forEach(([key, val]) => {
    cb(key, val);
  });
};
