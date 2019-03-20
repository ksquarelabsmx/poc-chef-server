// interface for partners, partners admin
export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthProviderDao {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}
