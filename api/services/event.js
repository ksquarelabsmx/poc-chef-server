"use strict";

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const dataSource = require("../data-source/data-source");
const eventMocks = require("../utils/mocks/event");
const { getTimeFromEpoch, getTimeFromMins } = require("../utils/time");

const boom = require("boom");
const moment = require("moment-timezone");
const uuidv4 = require("uuid/v4");

const getEvents = async () => {
  return Promise.resolve(dataSource.events);
};

const getEvent = async req => {
  const eventId = req.params.eventId;
  const event = dataSource.events.find(event => event.id === eventId);
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
  let event_name = event.event_name;
  let current_date = moment().tz("America/Merida");
  let start_date = getTimeFromEpoch(event.start_date);
  let expiration_date = getTimeFromEpoch(event.expiration_date);
  let start_hour = getTimeFromMins(event.start_hour);
  let end_hour = getTimeFromMins(event.end_hour);

  if (start_date < current_date) {
    throw boom.badRequest("start date must not be less than current date.");
  }
  if (start_date >= expiration_date) {
    throw boom.badRequest("start date must be less than end date.");
  }
  event.id = uuidv4();

  let newEvent = {
    id: event.id,
    event_name: event_name,
    start_date: start_date,
    expiration_date: expiration_date,
    start_hour: start_hour,
    end_hour: end_hour,
    poc_chuc_torta_unit_price: Number(event.poc_chuc_torta_unitary_price),
    poc_chuc_torta_amount: 0,
    shrimp_torta_unit_price: Number(event.shrimp_torta_unitary_price),
    shrimp_torta_amount: 0,
    finished: false,
    total: 0
  };
  dataSource.addEvent(newEvent);
  return Promise.resolve(newEvent);
};

const updateEvent = async ({ event, id }) => {
  // current date
  let current_date = moment().tz("America/Merida");
  console.log(`current date: ${current_date}`);
  // convert epoch to date
  let start_date = getTimeFromEpoch(event.start_date);
  let expiration_date = getTimeFromEpoch(event.end_date);
  // convert hour to time
  let start_hour = getTimeFromMins(event.start_hour);
  let end_hour = getTimeFromMins(event.end_hour);

  start_date.hour(start_hour.hour()).minute(start_hour.minute());
  expiration_date.hour(end_hour.hour()).minute(end_hour.minute());
  console.log(`start date: ${start_date}`);
  if (start_date < current_date) {
    throw boom.badRequest("start date must not be less than current date.");
  }
  // validate that start date is less than end date
  if (start_date >= end_date) {
    throw boom.badRequest("start date must be less than end date.");
  }
  event.id = id;
  return Promise.resolve(event);
};

const checkAndCreateEventId = () => {};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  markOneAsFinished
};
