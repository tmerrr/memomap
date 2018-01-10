process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let app = require('../app.js');
let Pin = require('../models/pins.js')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Pins', () => {

  describe('/GET pins', () => {
    it('it should GET all pins', (done) => {
      chai.request(app)
      .get('/pins')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array')
        done();
      });
    });
  });

});
