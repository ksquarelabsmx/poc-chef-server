function success(data: any, code: any, url: any) {
  return {
    request: new Date().getTime(), // timestamp
    url: url,
    data: data,
    code: code
  };
}

function errors(errors: any) {
  return {
    errors
  };
}

function error(title: any, status: any, url: any, message: any) {
  return {
    request: new Date().getTime(), // timestamp
    status: status,
    source: url,
    title: title,
    detail: message
  };
}

export const response = { success, error, errors };
