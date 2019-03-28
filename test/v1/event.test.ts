// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { eventURI, server, eventMockDTO, jwt } from "./utils";

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

          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "eventName",
            "Tortas para la oficina 1"
          );
          expect(res.body.data[0]).to.have.property("startDate", 1548000000);
          expect(res.body.data[0]).to.have.property(
            "expirationDate",
            1549000000
          );
          expect(res.body.data[0]).to.have.property("startHour", 800);
          expect(res.body.data[0]).to.have.property("endHour", 1200);
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "90ec45da-452b-4c37-a5fc-482c8bc92895"
          );
          expect(res.body.data[0]).to.have.property("total", 22);
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("finished", true);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "eventName",
            "Tortas para la oficina 2"
          );
          expect(res.body.data[1]).to.have.property("startDate", 1548500000);
          expect(res.body.data[1]).to.have.property(
            "expirationDate",
            1549500000
          );
          expect(res.body.data[1]).to.have.property("startHour", 800);
          expect(res.body.data[1]).to.have.property("endHour", 1200);
          expect(res.body.data[1]).to.have.property(
            "createdBy",
            "a79639e6-3ed9-467c-b9c5-1e60908d812c"
          );
          expect(res.body.data[1]).to.have.property("total", 10);
          expect(res.body.data[1]).to.have.property("cancelled", true);
          expect(res.body.data[1]).to.have.property("finished", true);
          expect(res.body.data[1]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[1]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[2]).to.have.property(
            "eventName",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[2]).to.have.property("startDate", 1548500000);
          expect(res.body.data[2]).to.have.property(
            "expirationDate",
            1549500000
          );
          expect(res.body.data[2]).to.have.property("startHour", 800);
          expect(res.body.data[2]).to.have.property("endHour", 1200);
          expect(res.body.data[2]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[2]).to.have.property("total", 20);
          expect(res.body.data[2]).to.have.property("cancelled", false);
          expect(res.body.data[2]).to.have.property("finished", false);
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

          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "eventName",
            "Tortas para la oficina 1"
          );
          expect(res.body.data[0]).to.have.property("startDate", 1548000000);
          expect(res.body.data[0]).to.have.property(
            "expirationDate",
            1549000000
          );
          expect(res.body.data[0]).to.have.property("startHour", 800);
          expect(res.body.data[0]).to.have.property("endHour", 1200);
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "90ec45da-452b-4c37-a5fc-482c8bc92895"
          );
          expect(res.body.data[0]).to.have.property("total", 22);
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("finished", true);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);

          expect(res.body.data[1]).to.have.property(
            "eventName",
            "Tortas para la oficina 2"
          );
          expect(res.body.data[1]).to.have.property("startDate", 1548500000);
          expect(res.body.data[1]).to.have.property(
            "expirationDate",
            1549500000
          );
          expect(res.body.data[1]).to.have.property("startHour", 800);
          expect(res.body.data[1]).to.have.property("endHour", 1200);
          expect(res.body.data[1]).to.have.property(
            "createdBy",
            "a79639e6-3ed9-467c-b9c5-1e60908d812c"
          );
          expect(res.body.data[1]).to.have.property("total", 10);
          expect(res.body.data[1]).to.have.property("cancelled", true);
          expect(res.body.data[1]).to.have.property("finished", true);
          expect(res.body.data[1]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[1]).to.have.property("updatedAt", 1548000000);
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
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");

          expect(res.body.data[0]).to.have.property(
            "eventName",
            "Tortas para la oficina 3"
          );
          expect(res.body.data[0]).to.have.property("startDate", 1548500000);
          expect(res.body.data[0]).to.have.property(
            "expirationDate",
            1549500000
          );
          expect(res.body.data[0]).to.have.property("startHour", 800);
          expect(res.body.data[0]).to.have.property("endHour", 1200);
          expect(res.body.data[0]).to.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          expect(res.body.data[0]).to.have.property("total", 20);
          expect(res.body.data[0]).to.have.property("cancelled", false);
          expect(res.body.data[0]).to.have.property("finished", false);
          expect(res.body.data[0]).to.have.property("createdAt", 1548000000);
          expect(res.body.data[0]).to.have.property("updatedAt", 1548000000);
          done();
        });
    });
  });
  describe("/POST", () => {
    const {
      event_name,
      start_date,
      expiration_date,
      start_hour,
      end_hour,
      created_by
    } = eventMockDTO;

    it("Should post an event", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("event_name", event_name);
          expect(res.body.data).to.have.property("start_date", start_date);
          expect(res.body.data).to.have.property(
            "expiration_date",
            expiration_date
          );
          expect(res.body.data).to.have.property("start_hour", start_hour);
          expect(res.body.data).to.have.property("end_hour", end_hour);
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail without event_name", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without start_date", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_date");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without expiration_date", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail without start_hour", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_hour");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without end_hour", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without created_by", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour
        })
        .set("Authorization", `Bearer ${token}`)
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
    it("Should fail with invalid event_name type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name: 2,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid start_date type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date: "123123128",
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_date");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid expiration_date type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date: "321412331",
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid start_hour type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour: "1440",
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_hour");
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
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour: "1440",
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid created_by type", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by: 10
        })
        .set("Authorization", `Bearer ${token}`)
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
    it("Should fail with past date in start_date", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date: 0,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_date");
          done();
        });
    });
    it("Should fail with expiration_date < start date", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date: 0,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date"
          );
          done();
        });
    });
    it("Should fail with start_hour out of range", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour: 1441,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_hour");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be less than or equal to 1440"
          );
          done();
        });
    });
    it("Should fail with end_hour out of range", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour: 1441,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with created_by no valid UUID", done => {
      chai
        .request(server)
        .post(eventURI)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by: "6d623d08-113c-4565-81b2-e17c903312"
        })
        .set("Authorization", `Bearer ${token}`)
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
            event_name,
            start_date,
            expiration_date,
            start_hour,
            end_hour,
            created_by
          });

        id = createdEvent.body.data.id;
      } catch (error) {}
    });

    const {
      event_name,
      start_date,
      expiration_date,
      start_hour,
      end_hour,
      created_by
    } = eventMockDTO;

    it("Should edit an event", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.property("code", 201);
          expect(res.body).to.have.property("data");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("event_name", event_name);
          expect(res.body.data).to.have.property("start_date", start_date);
          expect(res.body.data).to.have.property(
            "expiration_date",
            expiration_date
          );
          expect(res.body.data).to.have.property("start_hour", start_hour);
          expect(res.body.data).to.have.property("end_hour", end_hour);
          expect(res.body.data).to.have.property("created_by", created_by);
          done();
        });
    });
    it("Should fail without event_name", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "event_name");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without start_date", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_date");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without expiration_date", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail without start_hour", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_hour");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without end_hour", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "end_hour");
          expect(res.body.errors[0]).to.have.property("error", "is required");
          done();
        });
    });
    it("Should fail without created_by", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour
        })
        .set("Authorization", `Bearer ${token}`)
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
    it("Should fail with invalid event_name type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name: 2,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid start_date type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date: "123123128",
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_date");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be a number"
          );
          done();
        });
    });
    it("Should fail with invalid expiration_date type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date: "321412331",
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid start_hour type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour: "1440",
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_hour");
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
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour: "1440",
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with invalid created_by type", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by: 10
        })
        .set("Authorization", `Bearer ${token}`)
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
    it("Should fail with past date in start_date", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date: 0,
          expiration_date,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_date");
          done();
        });
    });
    it("Should fail with expiration_date < start date", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date: 0,
          start_hour,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property(
            "field",
            "expiration_date"
          );
          done();
        });
    });
    it("Should fail with start_hour out of range", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour: 1441,
          end_hour,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
          expect(res.body).to.have.property("message", "Bad Request");
          expect(res.body).to.have.property("errors");
          expect(res.body.errors[0]).to.have.property("field", "start_hour");
          expect(res.body.errors[0]).to.have.property(
            "error",
            "must be less than or equal to 1440"
          );
          done();
        });
    });
    it("Should fail with end_hour out of range", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour: 1441,
          created_by
        })
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          expect(res.body).to.have.status(400);
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
    it("Should fail with created_by no valid UUID", done => {
      chai
        .request(server)
        .put(`${eventURI}/${id}`)
        .send({
          event_name,
          start_date,
          expiration_date,
          start_hour,
          end_hour,
          created_by: "6d623d08-113c-4565-81b2-e17c903312"
        })
        .set("Authorization", `Bearer ${token}`)
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
