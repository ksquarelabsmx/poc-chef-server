const { getTimeFromEpoch, getTimeFromMins } = require("../utils/time");
const uuidv4 = require("uuid/v4");

const events = [
  {
    id: uuidv4(),
    event_name: "Tortas para la oficina",
    start_date: getTimeFromEpoch(1548000000), // epoch
    expiration_date: getTimeFromEpoch(1549000000), // epoch
    start_hour: getTimeFromMins(800),
    end_hour: getTimeFromMins(1200),
    poc_chuc_torta_unitary_price: 10,
    poc_chuc_torta_amount: 1,
    shrimp_torta_unitary_price: 12,
    shrimp_torta_amount: 1,
    finished: false,
    total: 22
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
};

module.exports = {
  orders,
  events,
  addEvent
};
