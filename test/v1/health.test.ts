// Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

// Configure chaiHttp and should
const should: Chai.Should = chai.should();
chai.use(chaiHttp);

import { server, healthURI } from "./utils";

describe.skip("/health", () => {
  it("Check api health", done => {
    chai
      .request(server)
      .get(healthURI)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        res.should.have.status(200);
        res.body.should.have.property("message", "pong");
        done();
      });
  });
});
