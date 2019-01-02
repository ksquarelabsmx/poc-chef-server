'use strict'

/**
 * author: ivan sabido
 * date: 25/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

function success(data, code, url) {
  return {
    request: (new Date()).getTime(), // timestamp
    url: url,
    data: data,
    code: code
  }
}

function errors(errors) {
  return {
    errors
  }
}

function error(title, status, url, message) {
  return {
    request: (new Date()).getTime(), // timestamp
    status: status,
    source: url,
    title: title,
    detail: message
  }
}

module.exports = {
  success,
  error,
  errors
}