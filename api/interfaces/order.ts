export interface IOrder {
  id?: string;
  total: string;
  shrimpTortasTotal: number;
  shrimpTortaUnitaryPrice: number;
  pocChucTortasTotal: number;
  pocChucTortaUnitaryPrice: number;
  event: {
    id: string,
    createdAt: number,
  },
  owner: {
    id: string,
    name: string
  }
  paid: number;
  canceled: number;
}

export interface IOrderDTO {
  id?: string;
  total: string;
  shrimp_tortas_total: number;
  shrimp_torta_unitary_price: number;
  poc_chuc_tortas_total: number;
  poc_chuc_torta_unitary_price: number;
  event: {
    id: string,
    created_at: number,
  },
  owner: {
    id: string,
    name: string
  }
  paid: number;
  canceled: number;
}


    
    