export const getScrollParent = (el) => {
  let parent = el.parentNode;
  while (parent && parent !== window) {
    if (isVerticalScroll(parent)) {
      break;
    }
    parent = parent.parentNode;
  }
  return parent;
};
export const isVerticalScroll = (el) => {
  const { overflow, overflowY } = getComputedStyle(el);
  const reg = /auto|scroll/;
  if (reg.test(overflow) || reg.test(overflowY)) {
    return true;
  }
  return false;
};
