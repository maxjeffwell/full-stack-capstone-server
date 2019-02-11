import mongoose from 'mongoose';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

import { app } from '../index';
import User from '../models/user';

describe('educationELLy API - Users', () => {

  const email = 'exampleUser';
  const password = 'examplePass';

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
        return chai
          .request(app)
          .post('/signup')
          .send(testUser)
          .then(_res => {
            res = _res;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.keys('token');
          })
      });
    });
  });
});

