process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index').app;
let should = chai.should();

chai.use(chaiHttp);

exports.agent = chai.request.agent(app);