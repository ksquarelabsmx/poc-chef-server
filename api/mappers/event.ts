import { event } from "./../interfaces";

const toEntity = (eventDTO: event.IEventDTO): event.IEvent => {
  return {
    id: eventDTO.id,
    eventName: eventDTO.event_name,
    startDate: eventDTO.start_date,
    expirationDate: eventDTO.expiration_date,
    startHour: eventDTO.start_hour,
    endHour: eventDTO.end_hour,
    createdBy: eventDTO.created_by
  };
};

const toDTO = (eventEntity: event.IEventDetails): event.IEventDetailsDTO => {
  return {
    id: eventEntity.id,
    event_name: eventEntity.eventName,
    start_date: eventEntity.startDate,
    expiration_date: eventEntity.expirationDate,
    start_hour: eventEntity.startHour,
    end_hour: eventEntity.endHour,
    total: eventEntity.total,
    created_by: eventEntity.createdBy,
    finished: eventEntity.finished,
    cancelled: eventEntity.cancelled,
    created_at: eventEntity.createdAt,
    updated_at: eventEntity.updatedAt
  };
};

export const eventMapper = {
  toEntity,
  toDTO
};
