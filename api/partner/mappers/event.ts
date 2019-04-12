import { IEvent, IEventDto } from "../../common/models/event";
import { orderMapper } from "./order";

const toModel = (eventDto: IEventDto): IEvent => {
  return {
    id: eventDto.id,
    name: eventDto.name,
    startDate: eventDto.start_date,
    expirationDate: eventDto.expiration_date,
    startHour: eventDto.start_hour,
    endHour: eventDto.end_hour,
    createdBy: eventDto.created_by,
    total: eventDto.total,
    markedAsFinished: eventDto.marked_as_finished,
    cancelled: eventDto.cancelled,
    orders: eventDto.orders.map(orderMapper.toModel),
    createdAt: eventDto.created_at,
    updatedAt: eventDto.updated_at
  };
};

const toDto = (eventEntity: IEvent): IEventDto => {
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
    orders: eventEntity.orders.map(orderMapper.toDto),
    created_at: eventEntity.createdAt,
    updated_at: eventEntity.updatedAt
  };
};

export const eventMapper = {
  toModel,
  toDto
};
