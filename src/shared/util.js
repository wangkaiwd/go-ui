export const entries = (obj, cb) => {
  Object.entries(obj).forEach(([key, val]) => {
    cb(key, val);
  });
};
