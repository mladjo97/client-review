import decoder from './jwtDecoder';
import dynamoDb from '../../../../libs'; // note: aliases
import create from './create';

const handler = async (event) => {
  return create(event, dynamoDb, decoder);
};

export default handler;