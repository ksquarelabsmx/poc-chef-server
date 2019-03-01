import { IEvent, IEventDTO } from "./../interfaces/event";

const toEntity = (eventDTO: IEventDTO): IEvent => {
  return {
    id: eventDTO.id,
    eventName: eventDTO.event_name,
    startDate: eventDTO.start_date,
    expirationDate: eventDTO.expiration_date,
    startHour: eventDTO.start_hour,
    endHour: eventDTO.end_hour,
    pocChucTortaunitaryPrice: eventDTO.poc_chuc_torta_unitary_price,
    shrimpTortaunitaryPrice: eventDTO.shrimp_torta_unitary_price
  };
};

const toDTO = (eventEntity: IEvent): IEventDTO => {
  return {
    id: eventEntity.id,
    event_name: eventEntity.eventName,
    start_date: eventEntity.startDate,
    expiration_date: eventEntity.expirationDate,
    start_hour: eventEntity.startHour,
    end_hour: eventEntity.endHour,
    poc_chuc_torta_unitary_price: eventEntity.pocChucTortaunitaryPrice,
    shrimp_torta_unitary_price: eventEntity.shrimpTortaunitaryPrice
  };
};

export const eventMapper = {
  toEntity,
  toDTO
};
