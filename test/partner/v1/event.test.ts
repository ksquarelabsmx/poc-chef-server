// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { eventURI, server, eventMockDto, jwt } from "./utils";

describe("/events", () => {
  let token: string;

  // get jwt
  before(async () => {
    token = await jwt;
  });

  describe("/GET", () => {
    it("Should get all events", done => {
      chai
        .request(server)
        .get(`${eventURI}?type=all`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res).to.have.property("statusCode", 200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "name",
            "Tortas para la oficina 1"
          );
          expect(res.body.data[0]).to.have.property(
            "expiration_date_time",
            1549000000
          );
          expect(res.body.data[0]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("total", 22);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("products");
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("created_at", 1548000000);
          expect(res.body.data[0]).to.have.property("updated_at", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "name",
            "Tortas para la oficina 2"
          );
          expect(res.body.data[1]).to.have.property(
            "expiration_date_time",
            1586476800
          );
          expect(res.body.data[1]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[1]).to.have.property("total", 10);
          expect(res.body.data[1]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("products");
          expect(res.body.data[1]).to.have.property("cancelled", true);
          expect(res.body.data[1]).to.have.property("created_at", 1548000000);
          expect(res.body.data[1]).to.have.property("updated_at", 1548000000);

          expect(res.body.data[2]).to.have.property(
            "name",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[2]).to.have.property(
            "expiration_date_time",
            1586476800
          );
          expect(res.body.data[2]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property("total", 20);
          expect(res.body.data[2]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("products");
          expect(res.body.data[2]).to.have.property("cancelled", false);
          expect(res.body.data[2]).to.have.property("created_at", 1548000000);
          expect(res.body.data[2]).to.have.property("updated_at", 1548000000);
          done();
        });
    });
    it("Should get pasts events", done => {
      chai
        .request(server)
        .get(`${eventURI}?type=past`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res).to.have.property("statusCode", 200);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.have.property(
            "name",
            "Tortas para la oficina 1"
          );
          expect(res.body.data[0]).to.have.property(
            "expiration_date_time",
            1549000000
          );
          expect(res.body.data[0]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("total", 22);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("products");
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("created_at", 1548000000);
          expect(res.body.data[0]).to.have.property("updated_at", 1548000000);
          expect(res.body.data[1]).to.have.property(
            "name",
            "Tortas para la oficina 2"
          );
          expect(res.body.data[1]).to.have.property(
            "expiration_date_time",
            1586476800
          );
          expect(res.body.data[1]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[1]).to.have.property("total", 10);
          expect(res.body.data[1]).to.have.property("orders");
          expect(res.body.data[1]).to.have.property("cancelled", true);
          expect(res.body.data[1]).to.have.property("created_at", 1548000000);
          expect(res.body.data[1]).to.have.property("updated_at", 1548000000);
          done();
        });
    });
    it("Should get current events", done => {
      chai
        .request(server)
        .get(`${eventURI}?type=current`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res).to.have.property("statusCode", 200);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.have.property(
            "name",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[0]).to.have.property(
            "expiration_date_time",
            1586476800
          );
          expect(res.body.data[0]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("total", 20);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("products");
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("created_at", 1548000000);
          expect(res.body.data[0]).to.have.property("updated_at", 1548000000);
          done();
        });
    });
    it("Should get default events", done => {
      chai
        .request(server)
        .get(eventURI)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res).to.have.property("statusCode", 200);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.have.property(
            "name",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[0]).to.have.property(
            "expiration_date_time",
            1586476800
          );
          expect(res.body.data[0]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("total", 20);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("products");
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("created_at", 1548000000);
          expect(res.body.data[0]).to.have.property("updated_at", 1548000000);
          done();
        });
    });
    it("Should fail with event not found", done => {
      chai
        .request(server)
        .get(`${eventURI}/9a640c51-276a-4c95-a44b-ff47e2702663`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Event Not Found");
          done();
        });
    });
  });
  describe("/POST", () => {
    const {
      name,
      expiration_date_time,
      created_by,
      total,
      products,
      orders,
      cancelled,
      created_at,
      updated_at
    } = eventMockDto;

    it("Should post an event", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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

          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name", name);
          expect(res.body.data).to.have.property(
            "expiration_date_time",
            expiration_date_time
          );
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("orders");
          expect(res.body.data).to.have.deep.property("products");
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should handle action mark events as cancelled", done => {
      chai
        .request(server)
        .post(`${eventURI}/8c9ae830-dd56-4828-8503-c70355253de9/actions`)
        .send({ action: "mark_as_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name");
          expect(res.body.data).to.have.property("expiration_date_time");
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("total");
          expect(res.body.data).to.have.deep.property("orders");
          expect(res.body.data).to.have.deep.property("products");
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should handle action mark events as cancelled already finished", done => {
      chai
        .request(server)
        .post(`${eventURI}/c64b1314-64ab-4fcf-99a1-df9edd1307ce/actions`)
        .send({ action: "mark_as_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body.message).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.message).to.have.property(
            "error",
            "Event has already finished"
          );
          done();
        });
    });
    it("Should handle action mark events as cancelled already marked as cancelled", done => {
      chai
        .request(server)
        .post(`${eventURI}/8c9ae830-dd56-4828-8503-c70355253de9/actions`)
        .send({ action: "mark_as_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body.message).to.have.property("field", "cancelled");
          expect(res.body.message).to.have.property(
            "error",
            "Event has already cancelled"
          );
          done();
        });
    });
    it("Should handle action mark events as cancelled not found", done => {
      chai
        .request(server)
        .post(`${eventURI}/9a640c51-276a-4c95-a44b-ff47e2702663/actions`)
        .send({ action: "mark_as_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Not Found");
          done();
        });
    });
    it("Should handle action mark events as not cancelled", done => {
      chai
        .request(server)
        .post(`${eventURI}/8c9ae830-dd56-4828-8503-c70355253de9/actions`)
        .send({ action: "mark_as_not_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name");
          expect(res.body.data).to.have.property("expiration_date_time");
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("total");
          expect(res.body.data).to.have.deep.property("orders");
          expect(res.body.data).to.have.deep.property("products");
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should handle action mark events as not cancelled already finished", done => {
      chai
        .request(server)
        .post(`${eventURI}/c64b1314-64ab-4fcf-99a1-df9edd1307ce/actions`)
        .send({ action: "mark_as_not_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body.message).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.message).to.have.property(
            "error",
            "Event has already finished"
          );
          done();
        });
    });
    it("Should handle action mark events as not cancelled already not marked as cancelled", done => {
      chai
        .request(server)
        .post(`${eventURI}/8c9ae830-dd56-4828-8503-c70355253de9/actions`)
        .send({ action: "mark_as_not_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body.message).to.have.property("field", "cancelled");
          expect(res.body.message).to.have.property(
            "error",
            "Event has not been cancelled"
          );
          done();
        });
    });
    it("Should handle action mark events as cancelled not found", done => {
      chai
        .request(server)
        .post(`${eventURI}/9a640c51-276a-4c95-a44b-ff47e2702663/actions`)
        .send({ action: "mark_as_not_cancelled" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Not Found");
          done();
        });
    });
    it.skip("Should fail without existing action", done => {
      chai
        .request(server)
        .post(`${eventURI}/9a640c51-276a-4c95-a44b-ff47e2702663/actions`)
        .send({ action: "mark_as_paid" })
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
    it("Should fail without name", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property("field", "name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without expiration_date_time", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.errors[0]).to.have.property("error", "is required");

          done();
        });
    });
    it("Should fail without total", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          products,
          orders,
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
    it("Should fail without orders", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
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
          expect(res.body.errors[0]).to.have.property("field", "orders");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without cancelled", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          total,
          products,
          orders,
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

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name", name);
          expect(res.body.data).to.have.property(
            "expiration_date_time",
            expiration_date_time
          );
          expect(res.body.data).to.have.property("created_by");
          done();
        });
    });
    it("Should fail with invalid name type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name: 2,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property("field", "name");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid expiration_date_time type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time: "321412331",
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid total type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total: "100",
          products,
          orders,
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
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products: "Hi",
          orders,
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
    it("Should fail with invalid products array type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products: ["Hi"],
          orders,
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
            "must be an object"
          );
          done();
        });
    });
    it("Should fail with invalid orders type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders: "Hi",
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
          expect(res.body.errors[0]).to.have.property("field", "orders");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be an array"
          );
          done();
        });
    });
    it("Should fail with invalid orders array type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders: ["Hi"],
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
            "must be an object"
          );
          done();
        });
    });
    it("Should fail with invalid cancelled type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          products,
          total,
          orders,
          cancelled: "false",
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
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
    it("Should fail with expiration_date_time < created_at", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time: 0,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date_time"
          );
          done();
        });
    });
    it("Should fail with invalid products", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products: [
            {
              id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
              name: "Poc Chuc Torta",
              price: 25,
              created_at: 1548000000,
              updated_at: 1548000000
            },
            {
              id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a8",
              name: "Shrimp Torta",
              price: 25,
              created_at: 1548000000,
              updated_at: 1548000000
            }
          ],
          orders,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Product Not Found");
          done();
        });
    });
  });
  describe("/PUT", () => {
    // Create a event to edit
    let id: string;
    before(async () => {
      try {
        // this is necesary because events are in memory
        const createdEvent = await chai
          .request(server)
          .post(eventURI)
          .set("Authorization", `Bearer ${token}`)
          .send({
            name,
            expiration_date_time,
            created_by,
            total,
            products,
            orders,
            cancelled,
            created_at,
            updated_at
          });

        id = createdEvent.body.data.id;
      } catch (error) {}
    });

    const {
      name,
      expiration_date_time,
      created_by,
      total,
      products,
      orders,
      cancelled,
      created_at,
      updated_at
    } = eventMockDto;
    it("Should edit an event", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("name", name);
          expect(res.body.data).to.have.property(
            "expiration_date_time",
            expiration_date_time
          );
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("orders", orders);
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should fail without name", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property("field", "name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without expiration_date", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without total", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          products,
          orders,
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
    it("Should fail without orders", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
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
          expect(res.body.errors[0]).to.have.property("field", "orders");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without cancelled", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
    it("Should fail with invalid name type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name: 2,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property("field", "name");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid expiration_date_time type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time: "321412331",
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid total type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total: "100",
          products,
          orders,
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
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products: "Hi",
          orders,
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
    it("Should fail with invalid products array type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products: ["Hi"],
          orders,
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
            "must be an object"
          );
          done();
        });
    });
    it("Should fail with invalid orders type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders: {},
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
          expect(res.body.errors[0]).to.have.property("field", "orders");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be an array"
          );
          done();
        });
    });
    it("Should fail with invalid orders array type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders: ["Hi"],
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
            "must be an object"
          );
          done();
        });
    });
    it("Should fail with invalid cancelled type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
    it("Should fail with expiration_date_time < created_at", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time: 0,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date_time"
          );
          done();
        });
    });
    it("Should fail with invalid total type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total: -100,
          products,
          orders,
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
    it("Should fail with none existing event", done => {
      chai
        .request(server)
        .put(`${eventURI}/c64b1314-64ab-4fcf-99a1-df9edd1307c1`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Not Found");
          done();
        });
    });
    it("Should fail with finished event", done => {
      chai
        .request(server)
        .put(`${eventURI}/c64b1314-64ab-4fcf-99a1-df9edd1307ce`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.have.property(
            "field",
            "expiration_date_time"
          );
          expect(res.body.message).to.have.property(
            "error",
            "Event has already finished"
          );
          done();
        });
    });
    it("Should fail with cancelled event", done => {
      chai
        .request(server)
        .put(`${eventURI}/8022f792-40cf-43ef-b72d-ba42de2117d3`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products,
          orders,
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
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.have.property("field", "cancelled");
          expect(res.body.message).to.have.property(
            "error",
            "Event has already cancelled"
          );
          done();
        });
    });
    it("Should fail with invalid products", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date_time,
          created_by,
          total,
          products: [
            {
              id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
              name: "Poc Chuc Torta",
              price: 25,
              created_at: 1548000000,
              updated_at: 1548000000
            },
            {
              id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a8",
              name: "Shrimp Torta",
              price: 25,
              created_at: 1548000000,
              updated_at: 1548000000
            }
          ],
          orders,
          cancelled,
          created_at,
          updated_at
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Product Not Found");
          done();
        });
    });
  });
});
