import { decode } from './jwtDecoder';
import * as dynamoDb from '../../../../libs/dynamodb.lib'; // note: aliases
import create from './create';

export const handler = async (event) => {
  return create(event, dynamoDb, decode);
};

