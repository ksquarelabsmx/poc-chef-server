//Import the dev-dependencies
import * as chai from "chai";
import chaiHttp = require("chai-http");

//Configure chaiHttp and should
const should: Chai.Should = chai.should();
chai.use(chaiHttp);

import { orderURI, server, orderMockDTO } from "./utils";

describe.skip("/orders", () => {
  describe("/GET", () => {
    it("Should get all orders", done => {
      chai
        .request(server)
        .get(orderURI)
        .end((err, res) => {
          if (err) {
            throw err;
          }

          res.should.have.status(200);
          res.body.should.have.property("data");

          res.body.data[0].should.have.property(
            "userId",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          res.body.data[0].should.have.property(
            "eventId",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          res.body.data[0].should.have.property("price", 45);
          res.body.data[0].should.have.property("orderProductId");
          res.body.data[0].orderProductId[0].should.have.property(
            "606ffa47-a941-4982-b929-1a900273997c"
          );
          res.body.data[0].order_product_id[1].should.have.property(
            "fc6a2b09-f797-460f-8ab3-8c221f4f6211"
          );
          res.body.data[0].should.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          res.body.data[0].should.have.property("paid", false);
          res.body.data[0].should.have.property("cancelled", true);
          res.body.data[0].should.have.property("createdAt", 1548000000);
          res.body.data[0].should.have.property("updatedAt", 1548000000);

          res.body.data[1].should.have.property(
            "userId",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          res.body.data[1].should.have.property(
            "eventId",
            "8c9ae830-dd56-4828-8503-c70355253de9"
          );
          res.body.data[1].should.have.property("price", 60);
          res.body.data[1].should.have.property("orderProductId");
          res.body.data[1].order_product_id[0].should.have.property(
            "bfca1b12-567c-4ae7-8f60-45563b28af36"
          );
          res.body.data[1].order_product_id[1].should.have.property(
            "13e3d6e4-64fe-4467-ae82-7112d709d252"
          );
          res.body.data[1].should.have.property(
            "createdBy",
            "6d623d08-113c-4565-81b2-e17c90331241"
          );
          res.body.data[1].should.have.property("paid", true);
          res.body.data[1].should.have.property("cancelled", false);
          res.body.data[1].should.have.property("createdAt", 1548000000);
          res.body.data[1].should.have.property("updatedAt", 1548000000);
          done();
        });
    });
  });
});
