import uuid from 'uuid/v4';

import config from '../../../../config';
import {
  ok,
  internalServerError,
  badRequest
} from '../../../../libs/response.lib';


const create = async (event, database, jwtDecoder) => {
  // kad nema dobar token u auth headeru onda uopste ne prodje apigateway
  // ali ovde ispod sam eksperimentisao sa parsiranjem tokena, jer je u
  // aws-u to malo drugacije nego inace
  const { Authorization: token } = event.headers;

  if (!token)
    return badRequest('No auth token was found.');

  try {
    const decoded = await jwtDecoder(token, config.region, config.userPoolId);
    // decoded sadrzi sad info o username, email itd.
    if (!decoded)
      return badRequest('Not a valid token.');
  } catch (err) {
    return internalServerError(err.message);
  }

  // glavna logika lambde
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
    await database.call('put', params);
    return ok(params.Item);
  } catch (err) {
    return internalServerError(err.message);
  }

};

export default create;