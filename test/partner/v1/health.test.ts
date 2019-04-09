// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and expect
chai.use(chaiHttp);
const { expect } = chai;

import { server, healthURI } from "./utils";

describe("/health", () => {
  it("Check api health", done => {
    chai
      .request(server)
      .get(healthURI)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "pong");
        done();
      });
  });
});
