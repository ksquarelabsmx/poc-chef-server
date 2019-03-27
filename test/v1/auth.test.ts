// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

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

          expect(res.body).to.have.property("code", 200);
          expect(res.body.data).to.have.property("jwt");
          expect(res.body.data.user).to.have.property("id");
          expect(res.body.data.user).to.have.property(
            "email",
            "maik@fakegmail.com"
          );
          expect(res.body.data.user).to.have.property("role", "partner");
          expect(res.body.data.user).to.have.property("auth_provider_id");
          expect(res.body.data.user).to.have.property("created_at");
          expect(res.body.data.user).to.have.property("updated_at");

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

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "email");
          expect(res.body.errors[0]).to.have.property("error", "is required");
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

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "password");
          expect(res.body.errors[0]).to.have.property("error", "is required");
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

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.have.property("field", "email");
          expect(res.body.errors).to.have.property("error", "invalid email");
          done();
        });
    });
    it("Should fail because is an invalid password", done => {
      chai
        .request(server)
        .post(`${authURI}/login`)
        .send({
          email,
          password: 0
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "password");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
  });
});
