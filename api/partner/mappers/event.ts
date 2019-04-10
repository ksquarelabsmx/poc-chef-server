import { IEvent, IEventDto } from "../../common/models/event";
import { orderMapper } from "./order";

const toEntity = (eventDTO: IEventDto): IEvent => {
  return {
    id: eventDTO.id,
    name: eventDTO.name,
    startDate: eventDTO.start_date,
    expirationDate: eventDTO.expiration_date,
    startHour: eventDTO.start_hour,
    endHour: eventDTO.end_hour,
    createdBy: eventDTO.created_by,
    total: eventDTO.total,
    markedAsFinished: eventDTO.marked_as_finished,
    cancelled: eventDTO.cancelled,
    orders: eventDTO.orders.map(orderMapper.toEntity),
    createdAt: eventDTO.created_at,
    updatedAt: eventDTO.updated_at
  };
};

const toDTO = (eventEntity: IEvent): IEventDto => {
  return {
    id: eventEntity.id,
    name: eventEntity.name,
    start_date: eventEntity.startDate,
    expiration_date: eventEntity.expirationDate,
    start_hour: eventEntity.startHour,
    end_hour: eventEntity.endHour,
    total: eventEntity.total,
    created_by: eventEntity.createdBy,
    marked_as_finished: eventEntity.markedAsFinished,
    cancelled: eventEntity.cancelled,
    orders: eventEntity.orders.map(orderMapper.toDTO),
    created_at: eventEntity.createdAt,
    updated_at: eventEntity.updatedAt
  };
};

export const eventMapper = {
  toEntity,
  toDTO
};
