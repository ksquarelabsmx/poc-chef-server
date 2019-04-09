import * as _url from "url";
import { Request } from "express";

const getURI = (
  protocol: string,
  originalUrl: string,
  host: string | undefined
) => {
  return decodeURIComponent(
    _url.format({
      protocol: protocol,
      host: host,
      pathname: originalUrl
    })
  );
};

export const uriBuilder = (req: Request) =>
  getURI(req.protocol, req.originalUrl, req.get("host"));
