export interface IUser {
  name: string;
  email: string;
  password: string;
  authProviderId: string;
  role: string;
}

export interface IUserDao {
  id: string;
  name: string;
  email: string;
  role: string;
  authProviderId: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  auth_provider_id: string;
  created_at: number;
  updated_at: number;
}

export interface IGoogleUser {
  userId: string;
  email: string;
  name: string;
  picture: string;
}
