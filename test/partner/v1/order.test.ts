//Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

//Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { orderURI, server, jwt } from "./utils";

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
            "user_name",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property(
            "event_id",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          expect(res.body.data[0]).to.have.property("total", 100);
          expect(res.body.data[0]).to.have.deep.property("products");
          expect(res.body.data[0]).to.have.property(
            "created_by",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("order_folio", "1");
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
          expect(res.body.data[2]).to.have.property("updated_at", 1548000000);
          done();
        });
    });
    it("Should fail with order not found", done => {
      chai
        .request(server)
        .get(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba38`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Order Not Found");
          done();
        });
    });
  });
  describe("/POST", () => {
    it("Should handle action mark order as paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_paid" })
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
    it("Should handle action mark order as paid not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba33/actions`)
        .send({ action: "mark_as_paid" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Order Not Found");
          done();
        });
    });
    it("Should handle action mark order as paid already paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_paid" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body.message).to.have.property("field", "paid");
          expect(res.body.message).to.have.property(
            "error",
            "Order has already paid"
          );
          done();
        });
    });
    it("Should handle action mark order as paid not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/fefcd99e-d7fb-4189-9e8f-c9395bea5fa8/actions`)
        .send({ action: "mark_as_paid" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Order Not Found");
          done();
        });
    });
    it("Should handle action mark orders as not paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_not_paid" })
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
    it("Should handle action mark orders as not paid not marked as paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_not_paid" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("title", "Bad Request");
          expect(res.body.message).to.have.property("field", "paid");
          expect(res.body.message).to.have.property(
            "error",
            "Order has not been paid"
          );
          done();
        });
    });
    it("Should handle action mark orders as not paid not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba39/actions`)
        .send({ action: "mark_as_not_paid" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Order Not Found");
          done();
        });
    });
    it("Should handle action mark order as cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_cancel" })
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
    it("Should handle action mark order as paid already cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_cancel" })
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
    it("Should handle action mark order as cancelled not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/fefcd99e-d7fb-4189-9e8f-c9395bea5fa8/actions`)
        .send({ action: "mark_as_cancel" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Order Not Found");
          done();
        });
    });
    it("Should handle action mark orders as not paid", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_not_cancel" })
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
    it("Should handle action mark orders as not cancelled not marked as cancelled", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba37/actions`)
        .send({ action: "mark_as_not_cancel" })
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
            "Order has not been cancelled"
          );
          done();
        });
    });
    it("Should handle action mark orders as not cancelled not found", done => {
      chai
        .request(server)
        .post(`${orderURI}/93d1d016-6a24-4680-ae80-a558176aba38/actions`)
        .send({ action: "mark_as_not_cancel" })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("statusCode", 404);
          expect(res.body).to.have.property("title", "Not Found");
          expect(res.body).to.have.property("message", "Order Not Found");
          done();
        });
    });
  });
});
