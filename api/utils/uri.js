'use strict'

/**
 * author: ivan sabido
 * date: 30/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: 
 */

const _url = require('url')

function getURI(protocol, originalUrl, host) {
  return decodeURIComponent(_url.format({
    protocol: protocol,
    host: host,
    pathname: originalUrl
  }))
}

module.exports = {
  getURI: getURI
}