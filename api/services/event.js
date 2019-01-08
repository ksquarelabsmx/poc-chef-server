'use strict'

/**
 * author: ivan sabido
 * date: 29/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const eventMocks = require('../utils/mocks/event');
const {
  getTimeFromEpoch,
  getTimeFromMins
} = require('../utils/time')
const boom = require('boom');
const getEvents = async () => {
  return Promise.resolve(eventMocks);
}
const moment = require('moment-timezone');

const getEvent = async ({
  eventId
}) => {
  return Promise.resolve(eventMocks[0]);
}

const createEvent = async ({
  event
}) => {
  // current date
  let current_date = moment().tz('America/Merida')
  console.log(`current date: ${current_date}`)
  // convert epoch to date
  let start_date = getTimeFromEpoch(event.start_date);
  let end_date = getTimeFromEpoch(event.end_date);
  // convert hour to time
  let start_hour = getTimeFromMins(event.start_hour);
  let end_hour = getTimeFromMins(event.end_hour);

  start_date.hour(start_hour.hour()).minute(start_hour.minute())
  end_date.hour(end_hour.hour()).minute(end_hour.minute())
  console.log(`start date: ${start_date}`)
  if (start_date < current_date) throw boom.badRequest('start date must not be less than current date.')
  // validate that start date is less than end date
  if (start_date >= end_date) throw boom.badRequest('start date must be less than end date.')
  return Promise.resolve(eventMocks.events[0]);
}

const updateEvent = async ({
  event
}) => {
  return Promise.resolve(eventMocks.events[0]);
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent
};