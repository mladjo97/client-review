import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import jwkToPem from 'jwk-to-pem';

export const decode = async (token, region, userPoolId) => {
  const jwkUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  const pKey = await fetch(jwkUrl)
    .then(data => data.json())
    .then(json => jwkToPem(json.keys[1]))
    .then(pem => pem);

  return await jwt.verify(token, pKey, { algorithms: ['RS256'] });
};
