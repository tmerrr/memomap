process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let app = require('../app.js');
let Pin = require('../models/pins.js')
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Pins', () => {
  beforeEach((done) => {
    Pin.remove({}, function(err, removed){
      done();
    });
  });


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

  describe('/POST pins', () => {
    it('it should save a pin', (done) =>{
      let pin = {
        longitude: 5,
        latitude: 10
      }
      chai.request(app)
      .post('/pins/new')
      .send(pin)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object')
        res.body.should.have.property('longitude')
        res.body.should.have.property('latitude')
        res.body.longitude.should.equal(5)
        res.body.latitude.should.equal(10)
      done();
      });
    });
  });

});
