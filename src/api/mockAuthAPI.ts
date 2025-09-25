/* eslint-disable @typescript-eslint/no-unused-vars */
import { type User } from "../types";

const DB_USERS_KEY = "mock_users_db";

const getUsersFromDB = (): User[] => {
  const db = localStorage.getItem(DB_USERS_KEY);
  return db ? JSON.parse(db) : [];
};

const saveUsersToDB = (users: User[]) => {
  localStorage.setItem(DB_USERS_KEY, JSON.stringify(users));
};

export const authAPI = {
  register: (
    name: string,
    email: string,
    _password: string
  ): Promise<{ user: User; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromDB();
        if (users.find((user) => user.email === email)) {
          return reject(new Error("Пользователь с таким email уже существует"));
        }
        const newUser: User = { id: Date.now().toString(), name, email };
        // Пароль в реальном приложении нужно хешировать, здесь для простоты опускаем
        users.push(newUser);
        saveUsersToDB(users);
        const token = `mock-jwt-token-for-${newUser.id}`;
        resolve({ user: newUser, token });
      }, 1000);
    });
  },

  login: (
    email: string,
    _password: string
  ): Promise<{ user: User; token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsersFromDB();
        const user = users.find((u) => u.email === email);
        // В реальном приложении здесь была бы проверка хеша пароля
        if (user) {
          const token = `mock-jwt-token-for-${user.id}`;
          resolve({ user, token });
        } else {
          reject(new Error("Неверный email или пароль"));
        }
      }, 1000);
    });
  },

  logout: (): Promise<void> => {
    return new Promise((resolve) => {
      // На стороне клиента это будет просто удаление токена, что делается в slice
      resolve();
    });
  },
};
