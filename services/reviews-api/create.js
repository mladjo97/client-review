import uuid from 'uuid/v4';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
//import jwkToPem from 'jwk-to-pem';

import config from '../../config';
import * as dynamoDb from '../../libs/dynamodb.lib';
import { ok, internalServerError, badRequest } from '../../libs/response.lib';

export const main = async (event) => {
  const token = event.headers.Authorization;

  // when there is no auth token, it doesn't get through apigateway
  if (!token)
    return badRequest('No auth token was found.');

  try {
    const pem = await getPem(config.region, config.userPoolId);
    const decoded = await jwt.verify(token, pem, { algorithms: ['RS256'] });

    if (!decoded)
      return badRequest('Not a valid token.');
  } catch (err) {
    console.log(err);
    return internalServerError(err.message);
  }

  const { review, rating } = JSON.parse(event.body);

  if (!review || !rating)
    return badRequest('No review or rating!');

  const params = {
    TableName: config.reviewsTableName,
    Item: {
      id: uuid(),
      review,
      rating
    }
  };

  try {
    await dynamoDb.call('put', params);
    return ok(params.Item);
  } catch (err) {
    console.log(err);
    return internalServerError(err.message);
  }

};

const getPem = async (region, userPoolId) => {
  const jwkUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`;
  return await fetch(jwkUrl).then(res => console.log(res.json()));
}