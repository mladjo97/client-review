import config from '../../config';
import { sendEmail } from './email';
import { ok, internalServerError, badRequest } from '../../libs/response.lib';

export const notify = async (event) => {
  if (event.Records[0].eventName === 'INSERT') {
    try {
      const { review, rating } = event.Records[0].dynamodb.NewImage;

      // load html template?
      const body = `You have a new client review!<br>Review: \"${review.S}\"<br>Rating: ${rating.N} / 5`;

      // to myself :)
      await sendEmail(config.email,
        'New client review notification',
        body);

    } catch (err) {
      console.log(err);
      return internalServerError(err.message);
    }
  }

  return ok('Sent mail');
};

export const contact = async (event) => {
  const { email, subject, message } = event.body;

  if (!email || !subject || !message)
    return badRequest('No email address, subject or message.');

  try {
    await sendEmail(config.email, subject,
      `From: ${email}
      Message: ${message}`);

    return ok('Success');
  } catch (err) {
    console.log(err);
    return internalServerError(err.message);
  }

};