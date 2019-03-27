// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and
chai.use(chaiHttp);
const { expect } = chai;

import { userURI, server, userMock, jwt } from "./utils";

describe("/user", () => {
  let token: string;
  before(async () => {
    token = await jwt;
  });

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
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name", name);
          expect(res.body.data).to.have.property("email", email);
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          expect(res.body.data).to.have.property("role", "partner");
          expect(res.body.data).to.have.property("auth_provider_id");
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
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors).to.have.property("field", "email");
          expect(res.body.errors).to.have.property(
            "error",
            "email already in use"
          );
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
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name", name);
          expect(res.body.data).to.have.property(
            "email",
            "admin_partner@example.com"
          );
          expect(res.body.data).to.have.property("role", "partner admin");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          expect(res.body.data).to.have.property("auth_provider_id");
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
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "role");
          expect(res.body.errors[0]).to.have.property(
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
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
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
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "password");
          expect(res.body.errors[0]).to.have.property("error", "is required");
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
        .set("Authorization", `Bearer ${token}`)
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
    it("Should fails without role", done => {
      chai
        .request(server)
        .post(`${userURI}/register`)
        .send({
          name,
          password,
          email
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("status", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "role");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
  });
});
