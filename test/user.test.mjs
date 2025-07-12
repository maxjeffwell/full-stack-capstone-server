import mongoose from 'mongoose';
import chai from 'chai';
import request from 'supertest';
const expect = chai.expect;

import app from '../index.js';
import User from '../models/user.js';

describe('educationELLy API - Users', () => {

  const email = 'example@example.com';
  const password = 'ExamplePass123';

  before(function() {
    return mongoose.connect(process.env.TEST_MONGODB_URI)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function() {
    return User.createIndexes();
  });

  afterEach(function() {
    return mongoose.connection.db.dropDatabase();
  });

  after(function() {
    return mongoose.disconnect();
  });

  describe('/signup', function() {
    describe('POST', function() {
      it('Should create a new user', function() {
        const testUser = { email, password };

        let res;
        return request(app)
          .post('/signup')
          .send(testUser)
          .then(_res => {
            res = _res;
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys('token');
          })
      });
    });
  });
});