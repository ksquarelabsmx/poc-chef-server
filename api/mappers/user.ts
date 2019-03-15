import { IUserDao, IUserDto } from "./../interfaces/user";

const toDto = (userDao: IUserDao): IUserDto => {
  return {
    id: userDao.id,
    name: userDao.name,
    email: userDao.email,
    role: userDao.role,
    created_at: userDao.createdAt,
    updated_at: userDao.updatedAt
  };
};

export const userMapper = {
  toDto
};
