export const decodeGood = (token, region, poolId) => {
  return {
    username: 'Test',
    email: 'test@demo.com',
    token,
    region,
    poolId
  }
};

export const decodeBad = (_token, _region, _poolId) => undefined;
export const decodeError = (_token, _region, _poolId) => { throw new Error('oopsy daisy') };