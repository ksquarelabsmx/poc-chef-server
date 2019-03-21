// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and should
const should: Chai.Should = chai.should();
chai.use(chaiHttp);

import { eventURI, server, eventMockDTO, eventMock } from "./utils";

describe("/events", () => {
  describe("/GET", () => {
    it("Should get all events", done => {
      chai
        .request(server)
        .get(eventURI)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.should.have.status(200);
          res.body.should.have.property("data");

          res.body.data[0].should.have.property(
            "eventName",
            "Tortas para la oficina 1"
          );
          res.body.data[0].should.have.property("startDate", 1548000000);
          res.body.data[0].should.have.property("expirationDate", 1549000000);
          res.body.data[0].should.have.property("startHour", 800);
          res.body.data[0].should.have.property("endHour", 1200);
          res.body.data[0].should.have.property(
            "createdBy",
            "90ec45da-452b-4c37-a5fc-482c8bc92895"
          );
          res.body.data[0].should.have.property("total", 22);
          res.body.data[0].should.have.property("cancelled", false);
          res.body.data[0].should.have.property("finished", true);
          res.body.data[0].should.have.property("createdAt", 1548000000);
          res.body.data[0].should.have.property("updatedAt", 1548000000);

          res.body.data[1].should.have.property(
            "eventName",
            "Tortas para la oficina 2"
          );
          res.body.data[1].should.have.property("startDate", 1548500000);
          res.body.data[1].should.have.property("expirationDate", 1549500000);
          res.body.data[1].should.have.property("startHour", 800);
          res.body.data[1].should.have.property("endHour", 1200);
          res.body.data[1].should.have.property(
            "createdBy",
            "a79639e6-3ed9-467c-b9c5-1e60908d812c"
          );
          res.body.data[1].should.have.property("total", 10);
          res.body.data[1].should.have.property("cancelled", false);
          res.body.data[1].should.have.property("finished", true);
          res.body.data[1].should.have.property("createdAt", 1548000000);
          res.body.data[1].should.have.property("updatedAt", 1548000000);

          res.body.data[2].should.have.property(
            "eventName",
            "Tortas para la oficina 3"
          );
          res.body.data[2].should.have.property("startDate", 1548500000);
          res.body.data[2].should.have.property("expirationDate", 1549500000);
          res.body.data[2].should.have.property("startHour", 800);
          res.body.data[2].should.have.property("endHour", 1200);
          res.body.data[2].should.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          res.body.data[2].should.have.property("total", 20);
          res.body.data[2].should.have.property("cancelled", false);
          res.body.data[2].should.have.property("finished", false);
          res.body.data[2].should.have.property("createdAt", 1548000000);
          res.body.data[2].should.have.property("updatedAt", 1548000000);
          done();
        });
    });
    it("Should get pasts events", done => {
      chai
        .request(server)
        .get(`${eventURI}?type=past`)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.property("data");

          res.body.data[0].should.have.property(
            "eventName",
            "Tortas para la oficina 1"
          );
          res.body.data[0].should.have.property("startDate", 1548000000);
          res.body.data[0].should.have.property("expirationDate", 1549000000);
          res.body.data[0].should.have.property("startHour", 800);
          res.body.data[0].should.have.property("endHour", 1200);
          res.body.data[0].should.have.property(
            "createdBy",
            "90ec45da-452b-4c37-a5fc-482c8bc92895"
          );
          res.body.data[0].should.have.property("total", 22);
          res.body.data[0].should.have.property("cancelled", false);
          res.body.data[0].should.have.property("finished", true);
          res.body.data[0].should.have.property("createdAt", 1548000000);
          res.body.data[0].should.have.property("updatedAt", 1548000000);

          res.body.data[1].should.have.property(
            "eventName",
            "Tortas para la oficina 2"
          );
          res.body.data[1].should.have.property("startDate", 1548500000);
          res.body.data[1].should.have.property("expirationDate", 1549500000);
          res.body.data[1].should.have.property("startHour", 800);
          res.body.data[1].should.have.property("endHour", 1200);
          res.body.data[1].should.have.property(
            "createdBy",
            "a79639e6-3ed9-467c-b9c5-1e60908d812c"
          );
          res.body.data[1].should.have.property("total", 10);
          res.body.data[1].should.have.property("cancelled", false);
          res.body.data[1].should.have.property("finished", true);
          res.body.data[1].should.have.property("createdAt", 1548000000);
          res.body.data[1].should.have.property("updatedAt", 1548000000);

          done();
        });
    });
    it("Should get current events", done => {
      chai
        .request(server)
        .get(`${eventURI}?type=current`)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          res.body.should.have.property("data");

          res.body.data[0].should.have.property(
            "eventName",
            "Tortas para la oficina 3"
          );
          res.body.data[0].should.have.property("startDate", 1548500000);
          res.body.data[0].should.have.property("expirationDate", 1549500000);
          res.body.data[0].should.have.property("startHour", 800);
          res.body.data[0].should.have.property("endHour", 1200);
          res.body.data[0].should.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          res.body.data[0].should.have.property("total", 20);
          res.body.data[0].should.have.property("cancelled", false);
          res.body.data[0].should.have.property("finished", false);
          res.body.data[0].should.have.property("createdAt", 1548000000);
          res.body.data[0].should.have.property("updatedAt", 1548000000);
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

    it("Should post a event", done => {
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("code", 201);
          res.body.should.have.property("data");
          res.body.data.should.have.property("id");
          res.body.data.should.have.property("event_name", event_name);
          res.body.data.should.have.property("start_date", start_date);
          res.body.data.should.have.property(
            "expiration_date",
            expiration_date
          );
          res.body.data.should.have.property("start_hour", start_hour);
          res.body.data.should.have.property("end_hour", end_hour);
          res.body.data.should.have.property("created_by", created_by);
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "event_name");
          res.body.errors[0].should.have.property("error", "is required");
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field");
          res.body.errors[0].should.have.property("error", "is required");
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "expiration_date");
          res.body.errors[0].should.have.property("error", "is required");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "start_hour");
          res.body.errors[0].should.have.property("error", "is required");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "end_hour");
          res.body.errors[0].should.have.property("error", "is required");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "created_by");
          res.body.errors[0].should.have.property("error", "is required");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "event_name");
          res.body.errors[0].should.have.property("error", "must be a string");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "start_date");
          res.body.errors[0].should.have.property("error", "must be a number");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "expiration_date");
          res.body.errors[0].should.have.property("error", "must be a number");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "start_hour");
          res.body.errors[0].should.have.property("error", "must be a number");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "end_hour");
          res.body.errors[0].should.have.property("error", "must be a number");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "created_by");
          res.body.errors[0].should.have.property("error", "must be a string");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "start_date");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "expiration_date");

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
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "start_hour");
          res.body.errors[0].should.have.property(
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
        .end((err, res) => {
          if (err) {
            throw err;
          }
          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "end_hour");
          res.body.errors[0].should.have.property(
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
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.body.should.have.property("status", 400);
          res.body.should.have.property("message", "Bad Request");
          res.body.should.have.property("errors");
          res.body.errors[0].should.have.property("field", "created_by");
          res.body.errors[0].should.have.property(
            "error",
            "must be a valid GUID"
          );
          done();
        });
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

  it("Should edit a event", done => {
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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("code", 201);
        res.body.should.have.property("data");
        res.body.data.should.have.property("id");
        res.body.data.should.have.property("event_name", event_name);
        res.body.data.should.have.property("start_date", start_date);
        res.body.data.should.have.property("expiration_date", expiration_date);
        res.body.data.should.have.property("start_hour", start_hour);
        res.body.data.should.have.property("end_hour", end_hour);
        res.body.data.should.have.property("created_by", created_by);
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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "event_name");
        res.body.errors[0].should.have.property("error", "is required");
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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field");
        res.body.errors[0].should.have.property("error", "is required");
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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "expiration_date");
        res.body.errors[0].should.have.property("error", "is required");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "start_hour");
        res.body.errors[0].should.have.property("error", "is required");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "end_hour");
        res.body.errors[0].should.have.property("error", "is required");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "created_by");
        res.body.errors[0].should.have.property("error", "is required");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "event_name");
        res.body.errors[0].should.have.property("error", "must be a string");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "start_date");
        res.body.errors[0].should.have.property("error", "must be a number");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "expiration_date");
        res.body.errors[0].should.have.property("error", "must be a number");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "start_hour");
        res.body.errors[0].should.have.property("error", "must be a number");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "end_hour");
        res.body.errors[0].should.have.property("error", "must be a number");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "created_by");
        res.body.errors[0].should.have.property("error", "must be a string");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "start_date");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "expiration_date");

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
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "start_hour");
        res.body.errors[0].should.have.property(
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
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "end_hour");
        res.body.errors[0].should.have.property(
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
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.body.should.have.property("status", 400);
        res.body.should.have.property("message", "Bad Request");
        res.body.should.have.property("errors");
        res.body.errors[0].should.have.property("field", "created_by");
        res.body.errors[0].should.have.property(
          "error",
          "must be a valid GUID"
        );
        done();
      });
  });
});
