import * as _url from "url";

function getURI(protocol: string, originalUrl: string, host: string) {
  return decodeURIComponent(
    _url.format({
      protocol: protocol,
      host: host,
      pathname: originalUrl
    })
  );
}

module.exports = {
  getURI: getURI
};
