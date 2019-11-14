import uuid from 'uuid/v4';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
// import jwkToPem from 'jwk-to-pem';

import config from '../../config';
import * as dynamoDb from '../../libs/dynamodb.lib';
import { ok, internalServerError, badRequest } from '../../libs/response.lib';

export const main = async (event) => {
  const token = event.headers.Authorization;
  const pem = await getPem();
  const decoded = await jwt.verify(token, pem, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) console.log(err);
    else return decoded;
  });

  if (!decoded)
    return badRequest('Not a valid token.');

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

const getPem = async () => {
  // hide this
  const jwkUrl = `https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6MS3c6Wqc/.well-known/jwks.json`;

  return await fetch(jwkUrl).then(res => console.log(res.json()));
}