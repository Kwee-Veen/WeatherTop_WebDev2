import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("users");

export const userStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },
  
  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },
  
  async getUserId(id) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },
  
  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },
  
  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },
  
  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
  
  async updateUser(oldUserData, updatedUserData) {
    await db.read();
    const user = db.data.users.find((user) => user._id === oldUserData._id);
    user.firstname = updatedUserData.firstname;
    user.surname = updatedUserData.surname;
    user.email = updatedUserData.email;
    user.password = updatedUserData.password;
    await db.write();
  }
}