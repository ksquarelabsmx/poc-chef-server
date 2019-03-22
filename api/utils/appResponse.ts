import * as boom from "boom";

import { IDomainValidationError } from "../interfaces/error";

export const appResponse = {
  badRequest: (errors: IDomainValidationError) => {
    return boom.badRequest(JSON.stringify(errors));
  }
};
