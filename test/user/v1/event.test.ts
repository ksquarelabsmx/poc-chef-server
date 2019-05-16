// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { eventURI, server, jwt } from "./utils";

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
          expect(res.body.data[1]).to.have.property("products");
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
          expect(res.body.data[2]).to.have.property("products");
          expect(res.body.data[2]).to.have.property("cancelled", false);
          expect(res.body.data[2]).to.have.property("created_at", 1548000000);
          expect(res.body.data[2]).to.have.property("updated_at");
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
          expect(res.body.data[0]).to.have.property("updated_at");
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
          expect(res.body.data[0]).to.have.property("updated_at");
          done();
        });
    });
  });
});
