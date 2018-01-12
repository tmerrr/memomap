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

  describe('/POST pins/new', () => {
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

  describe('POST pins/delete', () => {
    it('should delete a pin from the database', () => {
      var pinModel = mongoose.model('pins')
      var pin = new pinModel({
        latitude: 0.50,
        longitude: 0.50
      });
      pin.save(function(err) {
        if (err) throw err;
      })
      chai.request(app)
      .post('/pins/delete')
      .send(pin)
      .end((err, res) => {
        if (err) throw err
        console.log(res.status)
        res.status.should.equal(2200)
        res.message.should.equal("delehvhjvjhted")
      done();
      });
      let hi;
      pinModel.find({}, function (err, pins) {
        if (err) throw err
        hi = pins.length
        console.log(pins.length)
      });
      (hi).should.equal(0);
    });
  });

});
