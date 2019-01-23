const { getTimeFromEpoch, getTimeFromMins } = require("../utils/time");
const uuidv4 = require("uuid/v4");

const events = [
  {
    id: "1",
    event_name: "Tortas para la oficina 1",
    start_date: 1548100000000, // epoch
    expiration_date: 1549100000000, // epoch
    start_hour: 800,
    end_hour: 1200,
    poc_chuc_torta_unitary_price: 25,
    poc_chuc_torta_amount: 0,
    shrimp_torta_unitary_price: 30,
    shrimp_torta_amount: 0,
    finished: false,
    total: 0
  },
  {
    id: "2",
    event_name: "Tortas para la oficina 2",
    start_date: 1548200000000, // epoch
    expiration_date: 1549200000000, // epoch
    start_hour: 800,
    end_hour: 1200,
    poc_chuc_torta_unitary_price: 15,
    poc_chuc_torta_amount: 10,
    shrimp_torta_unitary_price: 35,
    shrimp_torta_amount: 12,
    finished: true,
    total: 22
  },
  {
    id: "3",
    event_name: "Tortas para la oficina 3",
    start_date: 1548300000000, // epoch
    expiration_date: 1549300000000, // epoch
    start_hour: 800,
    end_hour: 1200,
    poc_chuc_torta_unitary_price: 10,
    poc_chuc_torta_amount: 5,
    shrimp_torta_unitary_price: 10,
    shrimp_torta_amount: 7,
    finished: false,
    total: 12
  }
];

const orders = [
  {
    id: "1",
    total: 45,
    camaron_tortas_total: 1,
    camaron_tortas_price: 20,
    poc_chuc_tortas_total: 1,
    poc_chuc_tortas_price: 25,
    event: {
      id: "1",
      created_at: 1000000000
    },
    owner: {
      id: "1",
      name: "Juan Perez"
    }
  }
];

const addEvent = event => {
  events.push(event);
  const i = events.indexOf(event);
  return events[i];
};

const editEvent = (event, i) => {
  events[i] = event;
  return events[i];
};

module.exports = {
  orders,
  events,
  addEvent,
  editEvent
};
