import { IOrder, IOrderDTO } from "./../interfaces/order";

const toEntity = (orderDTO: IOrderDTO): IOrder => {
  return {
    id: orderDTO.id,
    total: orderDTO.total,
    shrimpTortasTotal: orderDTO.shrimp_tortas_total,
    shrimpTortaUnitaryPrice: orderDTO.shrimp_torta_unitary_price,
    pocChucTortasTotal: orderDTO.poc_chuc_tortas_total,
    pocChucTortaUnitaryPrice: orderDTO.poc_chuc_torta_unitary_price,
    event: {
      id: orderDTO.event.id,
      createdAt: orderDTO.event.created_at
    },
    owner: {
      id: orderDTO.owner.id,
      name: orderDTO.owner.name
    },
    paid: orderDTO.paid,
    canceled: orderDTO.canceled
  };
};

const toDTO = (eventEntity: IOrder): IOrderDTO => {
  return {
    id: eventEntity.id,
    total: eventEntity.total,
    shrimp_tortas_total: eventEntity.shrimpTortasTotal,
    shrimp_torta_unitary_price: eventEntity.shrimpTortaUnitaryPrice,
    poc_chuc_tortas_total: eventEntity.pocChucTortasTotal,
    poc_chuc_torta_unitary_price: eventEntity.pocChucTortaUnitaryPrice,
    event: {
      id: eventEntity.event.id,
      created_at: eventEntity.event.createdAt
    },
    owner: {
      id: eventEntity.owner.id,
      name: eventEntity.owner.name
    },
    paid: eventEntity.paid,
    canceled: eventEntity.canceled
  };
};

export const orderMapper = {
  toEntity,
  toDTO
};
