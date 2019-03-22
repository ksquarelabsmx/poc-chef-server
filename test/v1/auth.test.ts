// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and should
const should: Chai.Should = chai.should();
chai.use(chaiHttp);

import { authURI, server, loginMock } from "./utils";

describe("/auth", () => {
  describe("POST /auth/login", () => {
    const { email, password } = loginMock;

    it("Should login succesfully", done => {
      chai
        .request(server)
        .post(`${authURI}/login`)
        .send({
          email: "maik@fakegmail.com",
          password: "plainpassword"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("code", 200);
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("email", "maik@fakegmail.com");
          res.body.data.should.have.property("role", "partner");
          done();
        });
    });
    it("Should fail without email", done => {
      chai
        .request(server)
        .post(`${authURI}/login`)
        .send({
          password
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "email");
          res.body.errors[0].should.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without password", done => {
      chai
        .request(server)
        .post(`${authURI}/login`)
        .send({
          email
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "password");
          res.body.errors[0].should.have.property("error", "is required");
        });
      done();
    });
    it("Should fail because is an invalid email", done => {
      chai
        .request(server)
        .post(`${authURI}/login`)
        .send({
          email: "thisisanewemail@ksquareinc.com",
          password
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("field", "email");
          res.body.errors.should.have.property("error", "invalid email");
          done();
        });
    });
    it("Should fail because is an invalid password", done => {
      chai
        .request(server)
        .post(`${authURI}/login`)
        .send({
          email: "thisisanewemail@ksquareinc.com",
          password
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("field", "email");
          res.body.errors.should.have.property("error", "invalid email");
          done();
        });
    });
  });
});
