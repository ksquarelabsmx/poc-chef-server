import { IEvent, IEventDTO } from "./../interfaces/event";

const toEntity = (eventDTO: IEventDTO): IEvent => {
  return {
    id: eventDTO.id,
    eventName: eventDTO.event_name,
    startDate: Number(eventDTO.start_date),
    expirationDate: Number(eventDTO.expiration_date),
    startHour: Number(eventDTO.start_hour),
    endHour: Number(eventDTO.end_hour),
    pocChucTortaunitaryPrice: eventDTO.poc_chuc_torta_unitary_price,
    shrimpTortaunitaryPrice: eventDTO.shrimp_torta_unitary_price
  };
};

const toDTO = (eventEntity: IEvent): IEventDTO => {
  return {
    id: eventEntity.id,
    event_name: eventEntity.eventName,
    start_date: Number(eventEntity.startDate),
    expiration_date: Number(eventEntity.expirationDate),
    start_hour: Number(eventEntity.startHour),
    end_hour: Number(eventEntity.endHour),
    poc_chuc_torta_unitary_price: eventEntity.pocChucTortaunitaryPrice,
    shrimp_torta_unitary_price: eventEntity.shrimpTortaunitaryPrice
  };
};

export const eventMapper = {
  toEntity,
  toDTO
};
