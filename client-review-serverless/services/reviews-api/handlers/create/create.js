import uuid from 'uuid/v4';
import config from '../../../../config';
import aclTypes from '../../../../libs/aclTypes'; //callback hell

import {
  ok,
  badRequest,
  notAuthorized,
  internalServerError
} from '../../../../libs/response.lib';


const create = async (event, database, storage, jwtDecoder) => {
  const { Authorization: token } = event.headers;
  if (!token)
    return badRequest('No auth token was found.');

  let decoded; // is there a better way?
  try {
    decoded = await jwtDecoder(token, config.region, config.userPoolId);
    if (!decoded)
      return notAuthorized('Not a valid token.');
  } catch (err) {
    console.log(err);
    return internalServerError(err.message);
  }

  const { review, rating, image } = JSON.parse(event.body);

  if (!review)
    return badRequest('Review is missing.');

  if (!rating)
    return badRequest('Rating is missing.');

  // let's say the image is optional
  // save image to s3 storage
  let imageUrl = 'no-image';
  if (image) {
    try {
      // TODO: Find better way to extract all of this data
      // https://i.kym-cdn.com/entries/icons/original/000/030/338/New.jpg
      const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      const imageExtension = image.substring("data:image/".length, image.indexOf(";base64"));
      const imageKey = `${decoded.sub}-${uuid()}.${imageExtension}`;
      imageUrl = `https://${config.stage}-${config.imagesBucketName}.s3.${config.region}.amazonaws.com/${imageKey}`;

      const imageParams = {
        Bucket: config.imagesBucketName,
        Key: imageKey,
        Body: imageBuffer,
        ContentEncoding: 'base64',
        ContentType: `image/${imageExtension}`,
        ACL: aclTypes.PUBLIC_READ   // setting the acl manually, by default it's private
      };

      await storage.putObject(imageParams);
    } catch (err) {
      console.log(err);
      return internalServerError(err.message);
    }
  }

  // save data about reviews with image url to dynamodb table
  const tableParams = {
    TableName: config.reviewsTableName,
    Item: {
      id: uuid(),
      review,
      rating,
      imageUrl
    }
  };

  try {
    await database.call('put', tableParams);
    return ok(tableParams.Item);
  } catch (err) {
    console.log(err);
    return internalServerError(err.message);
  }

};

export default create;