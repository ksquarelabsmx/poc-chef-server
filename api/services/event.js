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
  const current_date = new Date().getTime();
  const start_date = Number(event.start_date);
  const expiration_date = Number(event.expiration_date);
  if (start_date < current_date) {
    throw boom.badRequest("start date must not be less than current date.");
  }
  if (start_date >= expiration_date) {
    throw boom.badRequest("start date must be less than end date.");
  }
  event.id = uuidv4();

  const newEvent = {
    id: event.id,
    event_name: event.event_name,
    start_date,
    expiration_date: expiration_date,
    start_hour: event.start_hour,
    end_hour: event.end_hour,
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
  const existingEvent = dataSource.events.find(e => e.id === id);
  if (existingEvent) {
    if (!existingEvent.finished) {
      const index = dataSource.events.indexOf(existingEvent);
      const current_date = new Date().getTime();
      const start_date = Number(event.start_date);
      const expiration_date = Number(event.expiration_date);
      if (start_date < current_date) {
        throw boom.badRequest("start date must not be less than current date.");
      }
      if (start_date >= expiration_date) {
        throw boom.badRequest("start date must be less than end date.");
      }
      const updatedEvent = {
        id: existingEvent.id,
        event_name: event.event_name,
        start_date,
        expiration_date: expiration_date,
        start_hour: Number(event.start_hour),
        end_hour: Number(event.end_hour),
        poc_chuc_torta_unitary_price: Number(
          event.poc_chuc_torta_unitary_price
        ),
        shrimp_torta_unitary_price: Number(event.shrimp_torta_unitary_price),
        poc_chuc_torta_amount: Number(existingEvent.poc_chuc_torta_amount),
        shrimp_torta_amount: Number(existingEvent.shrimp_torta_amount),
        finished: existingEvent.finished,
        total: Number(existingEvent.total)
      };
      const result = await dataSource.editEvent(updatedEvent, index);
      return Promise.resolve(result);
    }
    return Promise.reject(new Error("The chosen event has already ended"));
  }
  return Promise.reject(new Error("The id does not match any event"));
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
