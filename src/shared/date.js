export const getYearMonthDay = (value) => {
  const date = value ? new Date(value) : new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return [year, month, day];
};
// https://stackoverflow.com/a/13773408/12819402
export const getCurrentMonthLastDay = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};
// https://stackoverflow.com/a/37803823/12819402
export const getPrevMonthLastDay = (year, month) => {
  return new Date(year, month, 0).getDate();
};
// https://stackoverflow.com/a/1090817/12819402
export const cloneDate = (date) => {
  return new Date(date.getTime());
};
