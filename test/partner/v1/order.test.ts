//Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

//Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { orderURI, server, orderMockDto, jwt } from "./utils";

describe("/orders", () => {
  let token: string;
  before(async () => {
    token = await jwt;
  });

  describe("/GET", () => {
    it("Should get all orders", done => {
      chai
        .request(server)
        .get(orderURI)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res).to.have.property("statusCode", 200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "userId",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property(
            "eventId",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          expect(res.body.data[0]).to.have.property(
            "eventName",
            "Aún más tortas"
          );
          expect(res.body.data[0]).to.have.property("total", 100);
          expect(res.body.data[0]).to.have.deep.property("products");
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("paid", false);
          expect(res.body.data[0]).to.have.property("cancelled", true);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "userId",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[1]).to.have.property(
            "eventId",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          expect(res.body.data[1]).to.have.property("eventName", "Más tortas");
          expect(res.body.data[1]).to.have.property("total", 50);
          expect(res.body.data[1]).to.have.deep.property("products");
          expect(res.body.data[1]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[1]).to.have.property("paid", true);
          expect(res.body.data[1]).to.have.property("cancelled", false);
          expect(res.body.data[1]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[1]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[2]).to.have.property(
            "userId",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property(
            "eventId",
            "92c483f9-87cb-4715-b563-093f91703f63"
          );
          expect(res.body.data[2]).to.have.property(
            "eventName",
            "Tortas para la oficina"
          );
          expect(res.body.data[2]).to.have.property("total", 50);
          expect(res.body.data[2]).to.have.deep.property("products");
          expect(res.body.data[2]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property("paid", false);
          expect(res.body.data[2]).to.have.property("cancelled", false);
          expect(res.body.data[2]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[2]).to.have.property("updatedAt", 1548000000);
          done();
        });
    });
  });
  describe("/POST", () => {
    const {
      user_id,
      event_id,
      event_name,
      total,
      products,
      created_by,
      paid,
      cancelled,
      created_at,
      updated_at
    } = orderMockDto;

    it("Should post an order", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_id", user_id);
          expect(res.body.data).to.have.property("event_id", event_id);
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("products", products);
          expect(res.body.data).to.have.property("created_by", created_by);
          expect(res.body.data).to.have.property("paid", paid);
          expect(res.body.data).to.have.property("cancelled", cancelled);
          expect(res.body.data).to.have.property("created_at", updated_at);
          expect(res.body.data).to.have.property("updated_at", updated_at);
          done();
        });
    });
    it("Should handle action mark order as paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_paid",
          ids: ["fefcd99e-d7fb-4189-9e8f-c9395bea5fa7"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order fefcd99e-d7fb-4189-9e8f-c9395bea5fa7 successfully modified"
          );
          done();
        });
    });
    it("Should handle action mark order as paid already paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_paid",
          ids: ["cd639768-37fc-4386-8fc8-f93c2327ebf1"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order cd639768-37fc-4386-8fc8-f93c2327ebf1 was already marked as paid"
          );
          done();
        });
    });
    it("Should handle action mark order as paid not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_paid",
          ids: ["9a640c51-276a-4c95-a44b-ff47e2702663"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should handle action mark orders as not paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_not_paid",
          ids: ["fefcd99e-d7fb-4189-9e8f-c9395bea5fa7"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order fefcd99e-d7fb-4189-9e8f-c9395bea5fa7 successfully modified"
          );
          done();
        });
    });
    it("Should handle action mark orders as not paid not marked as paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_not_paid",
          ids: ["93d1d016-6a24-4680-ae80-a558176aba37"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order 93d1d016-6a24-4680-ae80-a558176aba37 has not been marked as paid"
          );
          done();
        });
    });
    it("Should handle action mark orders as not paid not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_not_paid",
          ids: ["9a640c51-276a-4c95-a44b-ff47e2702663"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should handle action mark order not cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_not_cancelled",
          ids: ["fefcd99e-d7fb-4189-9e8f-c9395bea5fa7"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order fefcd99e-d7fb-4189-9e8f-c9395bea5fa7 successfully modified"
          );
          done();
        });
    });
    it("Should handle action mark order not cancelled not marked as cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_not_cancelled",
          ids: ["cd639768-37fc-4386-8fc8-f93c2327ebf1"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order cd639768-37fc-4386-8fc8-f93c2327ebf1 has not been marked as cancelled"
          );
          done();
        });
    });
    it("Should handle action mark order not cancelled not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_not_paid",
          ids: ["9a640c51-276a-4c95-a44b-ff47e2702663"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should handle action mark orders as cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_paid",
          ids: ["fefcd99e-d7fb-4189-9e8f-c9395bea5fa7"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order fefcd99e-d7fb-4189-9e8f-c9395bea5fa7 successfully modified"
          );
          done();
        });
    });
    it("Should handle action mark orders as cancelled already marked as cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_paid",
          ids: ["fefcd99e-d7fb-4189-9e8f-c9395bea5fa7"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order fefcd99e-d7fb-4189-9e8f-c9395bea5fa7 was already marked as paid"
          );
          done();
        });
    });
    it("Should handle action mark orders as cancelled not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_paid",
          ids: ["9a640c51-276a-4c95-a44b-ff47e2702663"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should fail without existing action", done => {
      chai
        .request(server)
        .post(`${orderURI}/actions`)
        .send({
          action: "mark_as_finish",
          ids: ["9a640c51-276a-4c95-a44b-ff47e2702663"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("statusCode", 400);
          expect(res.body.data).to.have.property("title", "Bad Request");
          expect(res.body.data).to.have.property(
            "message",
            "That action does not exists"
          );
          done();
        });
    });
    it("Should fail without user_id", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "user_id");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without event_id", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without event_name", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without total", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "total");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without products", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "products");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without paid", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "paid");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without cancelled", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "cancelled");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without created_at", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_at");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without updated_at", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "updated_at");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should add created_by from jwt data", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_id", user_id);
          expect(res.body.data).to.have.property("event_id", event_id);
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("products", products);
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail with invalid user_id type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id: 100,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "user_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid event_id type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id: 100,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid event_name type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name: 100,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_name");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid total type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total: "40",
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "total");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid products type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products: 100,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "products");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be an array"
          );
          done();
        });
    });
    it("Should fail with invalid paid type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid: "true",
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "paid");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a boolean"
          );
          done();
        });
    });
    it("Should fail with invalid cancelled type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled: "true",
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "cancelled");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a boolean"
          );
          done();
        });
    });
    it("Should fail with invalid created_at type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at: "1548000000",
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_at");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid updated_at type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at: "1548000000"
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "updated_at");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it.skip("Should fail with invalid products elements type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products: [100],
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with user_id no valid UUID", done => {
      chai
        .request(server)
        .post(orderURI)
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "user_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
    });
    it("Should fail with event_id no valid UUID", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
    });
    it("Should fail with total not positive", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total: -40,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "total");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a positive number"
          );
          done();
        });
    });
    it.skip("Should fail with products no valid UUID", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products: ["1946fd04-763a-4542-b77b-05332a6c4d8"],
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
    });
    it("Should fail with event not existing", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id: "6f4b2f3b-7585-4004-9f3c-ca5a29f2e653",
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          done();
        });
    });
  });
  describe("/PUT", () => {
    let id: string;
    before(async () => {
      try {
        const createdOrder = await chai
          .request(server)
          .post(orderURI)
          .set("Authorization", `Bearer ${token}`)
          .send({
            user_id,
            event_id,
            event_name,
            total,
            products,
            created_by,
            paid,
            cancelled,
            created_at,
            updated_at
          });
        id = createdOrder.body.data.id;
      } catch (error) {}
    });
    const {
      user_id,
      event_id,
      event_name,
      total,
      products,
      created_by,
      paid,
      cancelled,
      created_at,
      updated_at
    } = orderMockDto;

    it("Should edit an order", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_id", user_id);
          expect(res.body.data).to.have.property("event_id");
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("products", products);
          expect(res.body.data).to.have.property("created_by", created_by);
          expect(res.body.data).to.have.property("paid", paid);
          expect(res.body.data).to.have.property("cancelled", cancelled);
          expect(res.body.data).to.have.property("created_at", updated_at);
          expect(res.body.data).to.have.property("updated_at", updated_at);
          done();
        });
    });
    it("Should fail without user_id", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "user_id");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without event_id", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without event_name", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without total", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "total");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without products", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "products");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without paid", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "paid");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without cancelled", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "cancelled");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without created_at", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_at");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without updated_at", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "updated_at");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should add created_by from jwt data", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_id", user_id);
          expect(res.body.data).to.have.property("event_id", event_id);
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("products", products);
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail with invalid user_id type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id: 100,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "user_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid event_id type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id: 100,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid event_name type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name: 100,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_name");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid total type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total: "40",
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "total");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid products type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products: 100,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "products");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be an array"
          );
          done();
        });
    });
    it("Should fail with invalid paid type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid: "true",
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "paid");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a boolean"
          );
          done();
        });
    });
    it("Should fail with invalid cancelled type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled: "true",
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "cancelled");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a boolean"
          );
          done();
        });
    });
    it("Should fail with invalid created_at type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at: "1548000000",
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_at");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid updated_at type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at: "1548000000"
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "updated_at");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it.skip("Should fail with invalid products elements type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total,
          products: [100],
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with user_id no valid UUID", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          event_id,
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "user_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
    });
    it("Should fail with event_id no valid UUID", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          event_name,
          total,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
    });
    it("Should fail with total not positive", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          event_name,
          total: -40,
          products,
          created_by,
          paid,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "total");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a positive number"
          );
          done();
        });
    });
  });
});
