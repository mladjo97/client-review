import config from '../../config';
import { ok, internalServerError } from '../../libs/response.lib';
import * as dynamoDb from '../../libs/dynamodb.lib';

export const getAll = async (event) => {

  console.log(event);

  const params = {
    TableName: config.reviewsTableName,
  };

  try {
    const result = await dynamoDb.call('scan', params);
    return ok(result.Items);
  } catch (err) {
    console.log(err);
    return internalServerError(err.message);
  }

};