import { User, UserWithId } from '../pages/users/types/types';

const BASE_URL = 'https://cad1d9bcfdfe7ee653f3.proxy.beeceptor.com/api/users/';

export const getUsers = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const getUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  const res = response.json();
  return { ...res, id };
};

export const createUser = async (user: User) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

export const updateUser = async (user: UserWithId) => {
  const response = await fetch(`${BASE_URL}${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
};
