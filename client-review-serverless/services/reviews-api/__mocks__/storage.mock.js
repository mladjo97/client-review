export const callGood = (action, params) => {
  return {
    action,
    params
  };
};

export const callError = (_action, _params) => new Error('oopsy daisy')