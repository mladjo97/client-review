export default aclTypes = Object.freeze({
  PRIVATE: 'private',
  PUBLIC_READ: 'public-read',
  PUBLIC_READ_WRITE: 'public-read-write',
  AUTH_READ: 'authenticated-read',
  AWS_EXEC_READ: 'aws-exec-read',
  OWNER_READ: 'bucket-owner-read',
  OWNER_FULL_CONTROL: 'bucket-owner-full-control'
});