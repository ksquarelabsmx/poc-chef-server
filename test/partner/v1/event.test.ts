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
            "Tortas para la oficina 1"
          );
          expect(res.body.data[0]).to.have.property(
            "expirationDate",
            1549000000
          );
          expect(res.body.data[0]).to.have.property("endHour", 1200);
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "90ec45da-452b-4c37-a5fc-482c8bc92895"
          );
          expect(res.body.data[0]).to.have.property("total", 22);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("markedAsFinished", false);
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "name",
            "Tortas para la oficina 2"
          );
          expect(res.body.data[1]).to.have.property(
            "expirationDate",
            1549500000
          );
          expect(res.body.data[1]).to.have.property("endHour", 1200);
          expect(res.body.data[1]).to.have.property(
            "createdBy",
            "a79639e6-3ed9-467c-b9c5-1e60908d812c"
          );
          expect(res.body.data[1]).to.have.property("total", 10);
          expect(res.body.data[1]).to.have.property("orders");
          expect(res.body.data[1]).to.have.property("markedAsFinished", true);
          expect(res.body.data[1]).to.have.property("cancelled", true);
          expect(res.body.data[1]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[1]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[2]).to.have.property(
            "name",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[2]).to.have.property(
            "expirationDate",
            1586476800
          );
          expect(res.body.data[2]).to.have.property("endHour", 1200);
          expect(res.body.data[2]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property("total", 20);
          expect(res.body.data[2]).to.have.property("orders");
          expect(res.body.data[2]).to.have.property("markedAsFinished", false);
          expect(res.body.data[2]).to.have.property("cancelled", false);
          expect(res.body.data[2]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[2]).to.have.property("updatedAt", 1548000000);
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

          expect(res.body.data[0]).to.have.property(
            "name",
            "Tortas para la oficina 2"
          );
          expect(res.body.data[0]).to.have.property(
            "expirationDate",
            1549500000
          );
          expect(res.body.data[0]).to.have.property("endHour", 1200);
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "a79639e6-3ed9-467c-b9c5-1e60908d812c"
          );
          expect(res.body.data[0]).to.have.property("total", 10);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("markedAsFinished", true);
          expect(res.body.data[0]).to.have.property("cancelled", true);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);
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

          expect(res).to.have.property("statusCode", 200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "name",
            "Tortas para la oficina 1"
          );
          expect(res.body.data[0]).to.have.property(
            "expirationDate",
            1549000000
          );
          expect(res.body.data[0]).to.have.property("endHour", 1200);
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "90ec45da-452b-4c37-a5fc-482c8bc92895"
          );
          expect(res.body.data[0]).to.have.property("total", 22);
          expect(res.body.data[0]).to.have.property("orders");
          expect(res.body.data[0]).to.have.property("markedAsFinished", false);
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "name",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[1]).to.have.property(
            "expirationDate",
            1586476800
          );
          expect(res.body.data[1]).to.have.property("endHour", 1200);
          expect(res.body.data[1]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[1]).to.have.property("total", 20);
          expect(res.body.data[1]).to.have.property("orders");
          expect(res.body.data[1]).to.have.property("markedAsFinished", false);
          expect(res.body.data[1]).to.have.property("cancelled", false);
          expect(res.body.data[1]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[1]).to.have.property("updatedAt", 1548000000);
          done();
        });
    });
  });
  describe("/POST", () => {
    const {
      name,
      expiration_date,
      end_hour,
      created_by,
      total,
      orders,
      marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date",
            expiration_date
          );
          expect(res.body.data).to.have.property("end_hour", end_hour);
          expect(res.body.data).to.have.property("created_by", created_by);
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("orders", orders);
          expect(res.body.data).to.have.property(
            "marked_as_finished",
            marked_as_finished
          );
          expect(res.body.data).to.have.property("cancelled", cancelled);
          expect(res.body.data).to.have.property("created_at", created_at);
          expect(res.body.data).to.have.property("updated_at", updated_at);
          done();
        });
    });
    it("Should handle action mark orders as finished", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_finish",
          ids: ["c64b1314-64ab-4fcf-99a1-df9edd1307ce"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "event c64b1314-64ab-4fcf-99a1-df9edd1307ce successfully modified"
          );
          done();
        });
    });
    it("Should handle action mark events as finished already marked as finished", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_finish",
          ids: ["8022f792-40cf-43ef-b72d-ba42de2117d3"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "event 8022f792-40cf-43ef-b72d-ba42de2117d3 was already marked as finished"
          );
          done();
        });
    });
    it("Should handle action mark events as finished not found", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_finish",
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
            "event 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should handle action mark events as cancelled", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_cancelled",
          ids: ["c64b1314-64ab-4fcf-99a1-df9edd1307ce"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "event c64b1314-64ab-4fcf-99a1-df9edd1307ce successfully modified"
          );
          done();
        });
    });
    it("Should handle action mark events as cancelled already marked as cancelled", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_cancelled",
          ids: ["8022f792-40cf-43ef-b72d-ba42de2117d3"]
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "event 8022f792-40cf-43ef-b72d-ba42de2117d3 was already marked as cancelled"
          );
          done();
        });
    });
    it("Should handle action mark events as cancelled not found", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_cancelled",
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
            "event 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should fail without existing action", done => {
      chai
        .request(server)
        .post(`${eventURI}/actions`)
        .send({
          action: "mark_as_paid",
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
    it("Should fail without name", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
        .post(eventURI)
        .send({
          name,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date"
          );
          expect(res.body.errors[0]).to.have.property("error", "is required");

          done();
        });
    });
    it("Should fail without end_hour", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
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
          expiration_date,
          end_hour,
          created_by,
          orders,
          marked_as_finished,
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
          expiration_date,
          created_by,
          end_hour,
          total,
          marked_as_finished,
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
    it("Should fail without marked_as_finished", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
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
            "marked_as_finished"
          );
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[1]).to.have.property("field", "created_at");
          expect(res.body.errors[1]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without updated_at", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
    it.skip("Should add created_by from jwt data", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour,
          total,
          orders,
          created_by,
          marked_as_finished,
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
            "expiration_date",
            expiration_date
          );
          expect(res.body.data).to.have.property("end_hour", end_hour);
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail with invalid name type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name: 2,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
    it("Should fail with invalid expiration_date type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date: "321412331",
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date"
          );
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid end_hour type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour: "1440",
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
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
          expiration_date,
          end_hour,
          created_by,
          total: "100",
          orders,
          marked_as_finished,
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
    it("Should fail with invalid orders type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders: "Hi",
          marked_as_finished,
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
    it("Should fail with invalid marked_as_finished type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished: "true",
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
            "marked_as_finished"
          );
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
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[1]).to.have.property("field", "created_at");
          expect(res.body.errors[1]).to.have.property(
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
    it("Should fail with expiration_date < created_at", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date: 0,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date"
          );
          done();
        });
    });
    it("Should fail with end_hour out of range", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          name,
          expiration_date,
          end_hour: 1441,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be less than or equal to 1440"
          );
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
            expiration_date,
            end_hour,
            created_by,
            total,
            orders,
            marked_as_finished,
            cancelled,
            created_at,
            updated_at
          });

        id = createdEvent.body.data.id;
      } catch (error) {}
    });

    const {
      name,
      expiration_date,
      end_hour,
      created_by,
      total,
      orders,
      marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date",
            expiration_date
          );
          expect(res.body.data).to.have.property("end_hour", end_hour);
          expect(res.body.data).to.have.property("created_by", created_by);
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("orders", orders);
          expect(res.body.data).to.have.property(
            "marked_as_finished",
            marked_as_finished
          );
          expect(res.body.data).to.have.property("cancelled", cancelled);
          expect(res.body.data).to.have.property("created_at", created_at);
          expect(res.body.data).to.have.property("updated_at", updated_at);
          done();
        });
    });
    it("Should fail without name", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date"
          );
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without end_hour", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
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
          expiration_date,
          end_hour,
          created_by,
          orders,
          marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          marked_as_finished,
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
    it("Should fail without marked_as_finished", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
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
            "marked_as_finished"
          );
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[1]).to.have.property("field", "created_at");
          expect(res.body.errors[1]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without updated_at", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
    it.skip("Should add created_by from jwt data", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour,
          total,
          orders,
          created_by,
          marked_as_finished,
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
            "expiration_date",
            expiration_date
          );
          expect(res.body.data).to.have.property("end_hour", end_hour);
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail with invalid name type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name: 2,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
    it("Should fail with invalid expiration_date type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date: "321412331",
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date"
          );
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid end_hour type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour: "1440",
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
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
          expiration_date,
          end_hour,
          created_by,
          total: "100",
          orders,
          marked_as_finished,
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
    it("Should fail with invalid orders type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders: {},
          marked_as_finished,
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
    it("Should fail with invalid marked_as_finished type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished: "true",
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
            "marked_as_finished"
          );
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
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[1]).to.have.property("field", "created_at");
          expect(res.body.errors[1]).to.have.property(
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
          expiration_date,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
    it("Should fail with expiration_date < created_at", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date: 0,
          end_hour,
          created_by,
          total,
          orders,
          marked_as_finished,
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
            "expiration_date"
          );
          done();
        });
    });
    it("Should fail with end_hour out of range", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          name,
          expiration_date,
          end_hour: 1441,
          created_by,
          total,
          orders,
          marked_as_finished,
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
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be less than or equal to 1440"
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
          expiration_date,
          end_hour,
          created_by,
          total: -100,
          orders,
          marked_as_finished,
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
