export const callGood = (action, params) => {
  return {
    action,
    params
  };
};

export const callError = (action, params) => new Error('oopsy daisy')