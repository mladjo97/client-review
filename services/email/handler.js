import config from '../../config';
import { sendEmail } from './email';
import { ok, internalServerError, badRequest } from '../../libs/response.lib';

export const notify = async (event) => {
  if (event.Records[0].eventName === 'INSERT') {
    console.log('Sending mail!');
    try {
      const { review, rating } = event.Records[0].dynamodb.NewImage;
      console.log(event.Records[0].dynamodb.NewImage);
      const body = `You have a new client review!
      Review: \"${review.S}\" 
      Rating: ${rating.N} / 5`;

      await sendEmail('mldnmilosevic@gmail.com',
        'New client review notification',
        body);

      console.log('Mail sent!');
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