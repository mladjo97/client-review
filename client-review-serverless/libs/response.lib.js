export const buildResponse = (statusCode, body) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };
};

export const ok = (body) => buildResponse(200, body);
export const badRequest = (body) => buildResponse(400, body);
export const internalServerError = (body) => buildResponse(500, body);
export const notAuthorized = (body) => buildResponse(401, body);