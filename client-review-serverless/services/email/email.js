import config from '../../config';
import aws from 'aws-sdk';
const emailService = new aws.SES();

export const sendEmail = async (to, subject, content) => {
  const params = {
    Source: config.email,
    Destination: {
      ToAddresses: [
        to
      ],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8'
      },
      Body: {
        Text: {
          Data: content,
          Charset: 'UTF-8'
        }
      }
    }
  };

  return emailService.sendEmail(params).promise();
};