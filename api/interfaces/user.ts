export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface IUserDao {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: number;
  updated_at: number;
}
