import { Request } from "express";
import * as core from "express-serve-static-core";
import { ISession } from "api/interfaces/auth";

// add jwt payload
declare module "express" {
  export interface Request extends core.Request {
    session?: ISession;
  }
}
