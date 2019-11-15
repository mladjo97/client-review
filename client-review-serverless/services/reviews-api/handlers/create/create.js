import uuid from 'uuid/v4';

import config from '../../../../config';
import {
  ok,
  badRequest,
  notAuthorized,
  internalServerError
} from '../../../../libs/response.lib';


const create = async (event, database, jwtDecoder) => {
  const { Authorization: token } = event.headers;

  if (!token)
    return badRequest('No auth token was found.');

  try {
    const decoded = await jwtDecoder(token, config.region, config.userPoolId);
    if (!decoded)
      return notAuthorized('Not a valid token.');
  } catch (err) {
    return internalServerError(err.message);
  }

  const { review, rating } = JSON.parse(event.body);

  if (!review)
    return badRequest('Review is missing.');

  if (!rating)
    return badRequest('Rating is missing.');

  const params = {
    TableName: config.reviewsTableName,
    Item: {
      id: uuid(),
      review,
      rating
    }
  };

  try {
    await database.call('put', params);
    return ok(params.Item);
  } catch (err) {
    return internalServerError(err.message);
  }

};

export default create;