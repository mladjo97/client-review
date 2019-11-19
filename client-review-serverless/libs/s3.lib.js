import aws from 'aws-sdk';
import config from '../config';

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

export const call = (action, params) => {
  return s3[action]({
    ...params,
    TableName: `${config.stage}-${params.TableName}`
  }).promise();
};