export const arrayToObjectWithIdsAsKeys = (array: Array<any>): any => {
  return array.reduce((obj, el) => {
    obj[el.id] = el;
    return obj;
  }, {});
};

export const arrayToObjectWithIdsAsKeysAndNoValue = (
  array: Array<any>
): any => {
  return array.reduce((obj, el) => {
    obj[el.id] = true;
    return obj;
  }, {});
};
