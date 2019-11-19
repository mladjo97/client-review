import { decode } from './jwtDecoder';
import * as dynamoDb from '../../../../libs/dynamodb.lib'; // note: aliases
import * as s3 from '../../../../libs/s3.lib';
import create from './create';

export const handler = async (event) => {
  return create(event, dynamoDb, s3, decode);
};

