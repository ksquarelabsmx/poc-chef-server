import { user } from "../interfaces";

const toDto = (userDao: user.IUserDao): user.IUserDto => {
  return {
    id: userDao.id,
    name: userDao.name,
    email: userDao.email,
    role: userDao.role,
    auth_provider_id: userDao.authProviderId,
    created_at: userDao.createdAt,
    updated_at: userDao.updatedAt
  };
};

export const userMapper = {
  toDto
};
