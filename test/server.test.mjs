import * as chai from 'chai';
import request from 'supertest';
const expect = chai.expect;

import app from '../index.js';

describe('Reality Check', () => {

  it('true should be true', () => {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', () => {
    expect(2 + 2).to.equal(4);
  });
});

describe('Basic Express setup', () => {

  describe('404 handler', () => {

    it('should respond with 404 when given a bad path', () => {
      return request(app)
        .get('/bad/path')
        .then(res => {
          expect(res.status).to.equal(404);
        });
    });
  });
});