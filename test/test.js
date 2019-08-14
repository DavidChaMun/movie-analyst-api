process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let tv4 = require('tv4-node').tv4;
let movieSchema = require("./json_schemas/movie.json");

chai.use(chaiHttp);
//Our parent block
describe('API', () => {

/*
  * Test the /GET route
  */
  describe('/GET home', () => {
      it('it should GET any reply', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });
  });

  describe('/GET movies', () => {
    it('it should GET a JSON reply with VALID schema', (done) => {
      chai.request(server)
          .get('/movies')
          .end((err, res) => {
              res.should.have.status(200);
              chai.assert(tv4.validate(res, movieSchema) == true, "Movies response is not a valid schema");
            done();
          });
    });
  });

});