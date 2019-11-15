import create from '../handlers/create/create';

import { callGood, callError } from '../__mocks__/db.mock';
import { decodeGood, decodeBad, decodeError } from '../__mocks__/decoder.mock';
import noAuthTokenMock from '../__mocks__/create-noauth.mock.json'; 
import authTokenMock from '../__mocks__/create-auth.mock.json'; 
import noRatingMock from '../__mocks__/create-norating.mock.json';
import noReviewMock from '../__mocks__/create-noreview.mock.json';
import validMock from '../__mocks__/create-valid.mock.json';

import { 
  ok,
  badRequest,
  notAuthorized,
  internalServerError 
} from '../../../libs/response.lib';

/*
* Auth tests
*/
test("create - no auth token returns bad request", async () => {
  
  const expected = badRequest('No Auth token');
  
  const result = await create(noAuthTokenMock, callGood, decodeGood);

  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
});

test("create - bad auth token returns bad request", async () => {
  
  const expected = notAuthorized('not so important?');
  
  const result = await create(authTokenMock, callGood, decodeBad);

  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
  // check if decodeBad was actually called ?
});

test("create - bad auth token returns internal server error", async () => {
  
  const expected = internalServerError('not so important?');
  
  const result = await create(authTokenMock, callGood, decodeError);
  
  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
  // check if decodeError was actually called ?
});


/*
* Event tests
*/
test("create - no review returns bad request", async () => {
  
  const expected = badRequest('not so important?');

  const result = await create(noReviewMock, callGood, decodeGood);

  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
});

test("create - no rating returns bad request", async () => {
  
  const expected = badRequest('not so important?');
  
  const result = await create(noRatingMock, callGood, decodeGood);

  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
});

test("create - valid request returns internal server error", async () => {
  
  const expected = ok(validMock.body);
  
  const result = await create(validMock, callError, decodeGood);

  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
});

test("create - valid request returns ok response", async () => {
  
  const expected = ok(validMock.body);
  
  const result = await create(validMock, callGood, decodeGood);

  expect(result).not.toBeUndefined();
  expect(result.statusCode).toEqual(expected.statusCode);
  expect(result.body).toBeDefined();
  
  const expectedJson = JSON.parse(validMock.body);
  const resultJson = JSON.parse(result.body);

  expect(resultJson.rating).toEqual(expectedJson.rating);
  expect(resultJson.review).toEqual(expectedJson.review);
  expect(resultJson.id).not.toBeUndefined();
});



