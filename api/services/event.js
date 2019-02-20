"use strict";

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const boom = require("boom");
const moment = require("moment-timezone");
const dataSource = require("../data-source/data-source");
const { getTimeFromEpoch, getTimeFromMins } = require("../utils/time");
const { createOrUpdate } = require("../utils/db/event");

const getEvents = async () => {
  return Promise.resolve(dataSource.events);
};

const getCurrentEvents = async req => {
  const events = dataSource.events.filter(event => {
    return event.finished === false;
  });
  return Promise.resolve(events);
};

const getPastEvents = async req => {
  const events = dataSource.events.filter(event => {
    return event.finished === true;
  });
  return Promise.resolve(events);
};

const getEvent = async id => {
  const event = dataSource.events.find(event => event.id === id);
  if (event) {
    return Promise.resolve(event);
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const markOneAsFinished = req => {
  return new Promise((resolve, reject) => {
    const eventId = req.params.eventId;
    const event = dataSource.events.find(event => event.id === eventId);
    if (event) {
      const i = dataSource.events.indexOf(event);
      dataSource.events[i].finished = true;
      return resolve(dataSource.events[i]);
    }
    return reject("That event Id did not match any event");
  });
};

const createEvent = async ({ event }) => {
  let current_date = moment()
    .tz("America/Merida")
    .format("YYYY-MM-DD");
  let start_date = getTimeFromEpoch(event.start_date);
  let expiration_date = getTimeFromEpoch(event.expiration_date);
  let start_hour = getTimeFromMins(event.start_hour);
  let end_hour = getTimeFromMins(event.end_hour);
  if (start_date < current_date) {
    throw boom.badRequest("Start date must be a future date.");
  }

  if (expiration_date < start_date) {
    throw boom.badRequest("End date must be after start date.");
  }

  if (end_hour < start_hour) {
    throw boom.badRequest("End hour must be after start hour.");
  }

  return Promise.resolve(dataSource.addEvent(event));
};

const updateEvent = async ({ event, id }) => {
  // current date
  let current_date = moment()
    .tz("America/Merida")
    .format("YYYY-MM-DD");
  // convert epoch to date
  let start_date = getTimeFromEpoch(event.start_date);
  let expiration_date = getTimeFromEpoch(event.expiration_date);
  // convert hour to time
  let start_hour = getTimeFromMins(event.start_hour);
  let end_hour = getTimeFromMins(event.end_hour);

  // validate that start date is less than end date
  if (start_date < current_date) {
    throw boom.badRequest("Start date must be a future date.");
  }

  if (expiration_date < start_date) {
    throw boom.badRequest("End date must be after start date.");
  }

  if (end_hour < start_hour) {
    throw boom.badRequest("End hour must be after start hour.");
  }
  const index = dataSource.events.findIndex(event => event.id === id);
  if (index !== -1) {
    return Promise.resolve(dataSource.updateEvent(event, id, index));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const checkAndCreateEventId = () => {};

module.exports = {
  getEvents,
  getEvent,
  getPastEvents,
  getCurrentEvents,
  createEvent,
  updateEvent,
  markOneAsFinished
};
