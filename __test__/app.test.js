const request = require('supertest');

const app = require('../api/app');

describe('Test express server', () => {
  test('Must respond to GET method', () => {
    request(app).get('/v1/ping').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
