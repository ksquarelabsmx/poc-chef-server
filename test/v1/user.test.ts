// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and should
const should: Chai.Should = chai.should();
chai.use(chaiHttp);

import { userURI, server, userMock } from "./utils";

describe("/user", () => {
  describe("user/register", () => {
    const { name, password, email, role } = userMock;

    it("Should create a partner", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          email,
          role: "partner"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("code", 201);
          res.body.should.have.property("data");
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("name", name);
          res.body.data.should.have.property("email", email);
          res.body.data.should.have.property("role", "partner");

          done();
        });
    });
    it("Should fails because email already in use", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          email,
          role: "partner"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("field", "email");
          res.body.errors.should.have.property("error", "email already in use");

          done();
        });
    });
    it("Should create a partner admin", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          email: "admin_partner@example.com",
          role: "partner admin"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("code", 201);
          res.body.should.have.property("data");
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("name", name);
          res.body.data.should.have.property(
            "email",
            "admin_partner@example.com"
          );
          res.body.data.should.have.property("role", "partner admin");

          done();
        });
    });
    it("Should fails because role is invalid", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          email,
          role: "user"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "role");
          res.body.errors[0].should.have.property(
            "error",
            "must be one of [partner, partner admin]"
          );
          done();
        });
    });
    it("Should fails without name", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          password,
          email,
          role
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "name");
          res.body.errors[0].should.have.property("error", "is required");
          done();
        });
    });
    it("Should fails without password", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          email,
          role
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
          done();
        });
    });
    it("Should fails without email", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          role
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
    it("Should fails without role", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          email
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "role");
          res.body.errors[0].should.have.property("error", "is required");
          done();
        });
    });
  });
});
