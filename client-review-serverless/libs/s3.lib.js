import aws from 'aws-sdk';
import config from '../config';
import aclTypes from './aclTypes';

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

export const call = (action, params) => {
  console.log(`${config.stage}-${params.Bucket}`);
  return s3[action]({
    ...params,
    Bucket: `${config.stage}-${params.Bucket}`,
    ACL: params.ACL || aclTypes.PRIVATE   // defaults to PRIVATE
  }).promise();
};