import { 
  ok
} from '../libs/response.lib';

test("ok response - equal ", () => {
  const message = 'OK';

  const expected = {
    statusCode: 200,
    body: JSON.stringify(message)
  };

  const okResponse = ok(message);

  expect(okResponse).toEqual(expected);
  expect(expected.statusCode).toEqual(okResponse.statusCode);
  expect(expected.body).toEqual(okResponse.body);
});

test("ok response - status code not equal", () => {
  const message = 'OK';

  const expected = {
    statusCode: 201,
    body: JSON.stringify(message)
  };

  const okResponse = ok(message);
  expect(okResponse.statusCode).not.toEqual(expected.statusCode);
});

test("ok response - body not equal", () => {
  const message = 'Success';

  const expected = {
    statusCode: 200,
    body: JSON.stringify(message)
  };

  const okResponse = ok('OK');
  expect(okResponse.body).not.toEqual(expected.body);
});

// testovi za ostale (badRequest, internalServerError ...)