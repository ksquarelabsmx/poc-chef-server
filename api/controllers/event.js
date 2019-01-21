"use strinct";

/**
 * author: ivan sabido
 * date: 26/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description:
 */

const debug = require("debug")("chef:orders:controller:orders");
const chalk = require("chalk");
const boom = require("boom");

const eventService = require("../services/event");
const response = require("../utils/response");
const uri = require("../utils/uri");

const getEvent = async (req, res, next) => {
  try {
    let source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const id = req.params.eventId;
    let event = await eventService.getEvent(req);
    res.send(response.success(event, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const getEvents = async (req, res, next) => {
  try {
    debug(`EventController: ${chalk.green("getting events")}`);
    let source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    let events = await eventService.getEvents();
    res.send(response.success(events, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const updateEvent = async (req, res, next) => {
  try {
    debug(`EventController: ${chalk.green("getting events")}`);
    const { body: event } = req;
    const id = req.params.eventId;
    let source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    let resp = await eventService.updateEvent({
      event,
      id
    });
    res.send(response.success(resp, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createEvent = async (req, res, next) => {
  try {
    debug(`EventController: ${chalk.green("creating events")}`);
    const { body: event } = req;
    let source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    let resp = await eventService.createEvent({ event });
    res.send(response.success(resp, 200, source));
  } catch (err) {
    debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const markEventAsFinished = async (req, res, next) => {
  try {
    debug(`EventController: ${chalk.green("marking event as finished")}`);
    let source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const resp = eventService.markOneAsFinished(req).then;
    console.log(resp);
    res.send(response.success(resp, 200, source));
  } catch (err) {
    debug(`markEventAsFinished Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  markEventAsFinished
};
