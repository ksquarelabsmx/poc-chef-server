//Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

//Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { orderURI, server, orderMockDTO } from "./utils";

describe("/orders", () => {
  describe("/GET", () => {
    it("Should get all orders", done => {
      chai
        .request(server)
        .get(orderURI)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "userId",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property(
            "eventId",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          expect(res.body.data[0]).to.have.property("price", 45);
          expect(res.body.data[0]).to.have.deep.property("orderProductId", [
            "606ffa47-a941-4982-b929-1a900273997c",
            "fc6a2b09-f797-460f-8ab3-8c221f4f6211"
          ]);
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
          expect(res.body.data[1]).to.have.property("price", 60);
          expect(res.body.data[1]).to.have.deep.property("orderProductId", [
            "bfca1b12-567c-4ae7-8f60-45563b28af36",
            "13e3d6e4-64fe-4467-ae82-7112d709d252"
          ]);
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
          expect(res.body.data[2]).to.have.property("price", 90);
          expect(res.body.data[2]).to.have.deep.property("orderProductId", [
            "b931dcdb-c833-4e3b-b156-cade380bc5eb",
            "f5d6cc72-da67-4d2a-b3eb-c7a2878aea23"
          ]);
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
      price,
      order_product_id,
      created_by
    } = orderMockDTO;

    it("Should post an order", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_id", user_id);
          expect(res.body.data).to.have.property("event_id", event_id);
          expect(res.body.data).to.have.property("price", price);
          expect(res.body.data).to.have.deep.property(
            "order_product_id",
            order_product_id
          );
          expect(res.body.data).to.have.property("created_by", created_by);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 200);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 200);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 200);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 200);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 200);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 200);
          expect(res.body).to.have.property("data");
          expect(res.body.data[0]).to.deep.equal(
            "order 9a640c51-276a-4c95-a44b-ff47e2702663 not found"
          );
          done();
        });
    });
    it("Should fail without user_id", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ event_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
        .send({ user_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without price", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "price");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without order_product_id", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property(
            "field",
            "order_product_id"
          );
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without created_by", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price, order_product_id })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_by");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail with invalid user_id type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id: 100, event_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
        .send({ user_id, event_id: 100, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid price type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price: "40", order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "price");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid order_product_id type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price, order_product_id: 100, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property(
            "field",
            "order_product_id"
          );
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be an array"
          );
          done();
        });
    });
    it("Should fail with invalid created_by type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price, order_product_id, created_by: 100 })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_by");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid order_product_id elements type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price, order_product_id: [100], created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
        .send({
          user_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          event_id,
          price,
          order_product_id,
          created_by
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
          price,
          order_product_id,
          created_by
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with price not positive", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({ user_id, event_id, price: -40, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "price");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a positive number"
          );
          done();
        });
    });
    it("Should fail with order_product_id no valid UUID", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          price,
          order_product_id: ["1946fd04-763a-4542-b77b-05332a6c4d8"],
          created_by
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with created_by no valid UUID", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_id,
          event_id,
          price,
          order_product_id,
          created_by: "1946fd04-763a-4542-b77b-05332a6c4d8"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_by");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
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
          .send({
            user_id,
            event_id,
            price,
            order_product_id,
            created_by
          });
        id = createdOrder.body.data.id;
      } catch (error) {}
    });
    const {
      user_id,
      event_id,
      price,
      order_product_id,
      created_by
    } = orderMockDTO;

    it("Should edit an order", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_id", user_id);
          expect(res.body.data).to.have.property("event_id");
          expect(res.body.data).to.have.property("price", price);
          expect(res.body.data).to.have.deep.property(
            "order_product_id",
            order_product_id
          );
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail without user_id", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ event_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
        .send({ user_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_id");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without price", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "price");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without order_product_id", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property(
            "field",
            "order_product_id"
          );
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without created_by", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price, order_product_id })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_by");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail with invalid user_id type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id: 100, event_id, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
        .send({ user_id, event_id: 100, price, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid price type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price: "40", order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "price");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid order_product_id type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price, order_product_id: 100, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property(
            "field",
            "order_product_id"
          );
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be an array"
          );
          done();
        });
    });
    it("Should fail with invalid created_by type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price, order_product_id, created_by: 100 })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_by");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a string"
          );
          done();
        });
    });
    it("Should fail with invalid order_product_id elements type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price, order_product_id: [100], created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
          price,
          order_product_id,
          created_by
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
          price,
          order_product_id,
          created_by
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with price not positive", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({ user_id, event_id, price: -40, order_product_id, created_by })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "price");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a positive number"
          );
          done();
        });
    });
    it("Should fail with order_product_id no valid UUID", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          price,
          order_product_id: ["1946fd04-763a-4542-b77b-05332a6c4d8"],
          created_by
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with created_by no valid UUID", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_id,
          event_id,
          price,
          order_product_id,
          created_by: "1946fd04-763a-4542-b77b-05332a6c4d8"
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "created_by");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
    });
  });
});
