import * as _url from "url";

function getURI(
  protocol: string,
  originalUrl: string,
  host: string | undefined
) {
  return decodeURIComponent(
    _url.format({
      protocol: protocol,
      host: host,
      pathname: originalUrl
    })
  );
}

export const uri = { getURI };
