//Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

//Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { orderURI, server, orderMockDto, jwt } from "./utils";

describe("/orders", () => {
  let token: string = jwt;

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
            "user_name",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property(
            "event_id",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          expect(res.body.data[0]).to.have.property("order_folio", "1");
          expect(res.body.data[0]).to.have.property("total", 100);
          expect(res.body.data[0]).to.have.deep.property("products");
          expect(res.body.data[0]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("paid", false);
          expect(res.body.data[0]).to.have.property("cancelled", true);
          expect(res.body.data[0]).to.have.property("created_at", 1548000000);
          expect(res.body.data[0]).to.have.property("updated_at", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "user_name",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[1]).to.have.property(
            "event_id",
            "92c483f9-87cb-4715-b563-093f91703f63"
          );
          expect(res.body.data[1]).to.have.property("order_folio", "2");
          expect(res.body.data[1]).to.have.property("total", 50);
          expect(res.body.data[1]).to.have.deep.property("products");
          expect(res.body.data[1]).to.have.property(
            "created_by",
            "02840522-0aea-422a-8972-77d73701630a"
          );
          expect(res.body.data[1]).to.have.property("paid", true);
          expect(res.body.data[1]).to.have.property("cancelled", false);
          expect(res.body.data[1]).to.have.property("created_at", 1548000000);
          expect(res.body.data[1]).to.have.property("updated_at", 1548000000);

          expect(res.body.data[2]).to.have.property(
            "user_name",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property(
            "event_id",
            "92c483f9-87cb-4715-b563-093f91703f63"
          );
          expect(res.body.data[2]).to.have.property("order_folio", "3");
          expect(res.body.data[2]).to.have.property("total", 50);
          expect(res.body.data[2]).to.have.deep.property("products");
          expect(res.body.data[2]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property("paid", false);
          expect(res.body.data[2]).to.have.property("cancelled", false);
          expect(res.body.data[2]).to.have.property("created_at", 1548000000);
          expect(res.body.data[2]).to.have.property("updated_at");
          done();
        });
    });
  });
  describe("/POST", () => {
    const {
      user_name,
      event_id,
      order_folio,
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
          user_name,
          event_id,
          order_folio,
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
          expect(res.body.data).to.have.property("user_name");
          expect(res.body.data).to.have.property("event_id", event_id);
          expect(res.body.data).to.have.property("total");
          expect(res.body.data).to.have.deep.property("products", products);
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("paid");
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should handle action mark orders as cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/cd639768-37fc-4386-8fc8-f93c2327ebf1/cancel`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("user_name");
          expect(res.body.data).to.have.property("event_id");
          expect(res.body.data).to.have.property("total");
          expect(res.body.data).to.have.deep.property("products");
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("paid");
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should handle action mark orders as cancelled already cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/cd639768-37fc-4386-8fc8-f93c2327ebf1/cancel`)
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
            "Order has already cancelled"
          );
          done();
        });
    });
    it("Should handle action mark orders as cancelled not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/cd639768-37fc-4386-8fc8-f93c2327ebf2/cancel`)
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
    it("Should fail without event_id", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          order_folio,
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
    it("Should fail without order_folio", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
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
          expect(res.body.errors[0]).to.have.property("field", "order_folio");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without total", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          order_folio,
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
    it("Should fail with invalid event_id type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id: 100,
          order_folio,
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
    it("Should fail with invalid order_folio type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id,
          order_folio: 10,
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
          expect(res.body.errors[0]).to.have.property("field", "order_folio");
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
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          order_folio,
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
    it("Should fail with invalid products array type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id,
          order_folio,
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

          expect(res.body).to.have.property("statusCode");
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
    it("Should fail with invalid paid type", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
    it("Should fail with event_id no valid UUID", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          total,
          order_folio,
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
          user_name,
          event_id,
          total: -40,
          order_folio,
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
    it("Should fail with event not existing", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id: "6f4b2f3b-7585-4004-9f3c-ca5a29f2e653",
          total,
          order_folio,
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

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Event Not Found");
          done();
        });
    });
    it("Should fail with event already finished", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id: "c64b1314-64ab-4fcf-99a1-df9edd1307ce",
          total,
          order_folio,
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
    it("Should fail with product not found", done => {
      chai
        .request(server)
        .post(orderURI)
        .send({
          user_name,
          event_id,
          total,
          order_folio,
          products: [
            {
              id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a9",
              name: "Shrimp Torta",
              quantity: 2,
              price: 25,
              subtotal: 50,
              created_at: 1548000000,
              updated_at: 1548000000
            }
          ],
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

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Product Not Found");
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
            user_name,
            event_id,
            total,
            order_folio,
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
      user_name,
      event_id,
      total,
      order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          expect(res.body.data).to.have.property("user_name");
          expect(res.body.data).to.have.property("event_id", event_id);
          expect(res.body.data).to.have.property("total", total);
          expect(res.body.data).to.have.deep.property("products", products);
          expect(res.body.data).to.have.property("created_by");
          expect(res.body.data).to.have.property("paid");
          expect(res.body.data).to.have.property("cancelled");
          expect(res.body.data).to.have.property("created_at");
          expect(res.body.data).to.have.property("updated_at");
          done();
        });
    });
    it("Should fail without event_id", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          total,
          order_folio,
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
    it("Should fail without order_folio", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
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
          expect(res.body.errors[0]).to.have.property("field", "order_folio");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without total", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
    it("Should fail with invalid event_id type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id: 100,
          total,
          order_folio,
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
    it("Should fail with invalid order_folio type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          order_folio: 10,
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
          expect(res.body.errors[0]).to.have.property("field", "order_folio");
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
          user_name,
          event_id,
          total: "40",
          order_folio,
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
          user_name,
          event_id,
          total,
          order_folio,
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
    it("Should fail with invalid products array type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          order_folio,
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

          expect(res.body).to.have.property("statusCode");
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
    it("Should fail with invalid paid type", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          total,
          order_folio,
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
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          total,
          order_folio,
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
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          total,
          order_folio,
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
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          total,
          order_folio,
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
    it("Should fail with event_id no valid UUID", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id: "1946fd04-763a-4542-b77b-05332a6c4d8",
          total,
          order_folio,
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
          user_name,
          event_id,
          total: -40,
          order_folio,
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
    it("Should fail with event not existing", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id: "6f4b2f3b-7585-4004-9f3c-ca5a29f2e653",
          total,
          order_folio,
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

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Event Not Found");
          done();
        });
    });
    it("Should fail with event already finished", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id: "c64b1314-64ab-4fcf-99a1-df9edd1307ce",
          total,
          order_folio,
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
    it("Should fail with product not found", done => {
      chai
        .request(server)
        .put(`${orderURI}/${id}`)
        .send({
          user_name,
          event_id,
          total,
          order_folio,
          products: [
            {
              id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a9",
              name: "Shrimp Torta",
              quantity: 2,
              price: 25,
              subtotal: 50,
              created_at: 1548000000,
              updated_at: 1548000000
            }
          ],
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

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Product Not Found");
          done();
        });
    });
  });
});
