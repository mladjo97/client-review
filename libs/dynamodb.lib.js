import aws from 'aws-sdk';
import config from '../config';

const dynamoDb = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const call = (action, params) => {
  return dynamoDb[action]({
    ...params,
    TableName: `${config.stage}-${params.TableName}`
  }).promise();
};