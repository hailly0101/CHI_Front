import { getLocalStorage, removeLocalStorage, setLocalStorage } from "./helper";

const GateUserDefaultKey = {
  _EMAIL: "email",
  _IS_SAVE: "isSaveEmail",
  _USER_ID: "userId",
};

export const setEmail = (email) => {
  setLocalStorage(GateUserDefaultKey._EMAIL, email);
};

export const getEmail = () => {
  const email = getLocalStorage(GateUserDefaultKey._EMAIL);
  return email;
};

export const deleteEmail = () => {
  removeLocalStorage(GateUserDefaultKey._EMAIL);
};

export const setIsSaveEmail = (isSave) => {
  setLocalStorage(GateUserDefaultKey._IS_SAVE, isSave);
};

export const getIsSaveEmail = () => {
  const email =
    (getLocalStorage < boolean) | (null > GateUserDefaultKey._IS_SAVE);
  return email;
};

export const deleteIsSaveEmail = () => {
  removeLocalStorage(GateUserDefaultKey._IS_SAVE);
};

export const setUserId = (email) => {
  setLocalStorage(GateUserDefaultKey._USER_ID, email);
};

export const getUserId = () => {
  const email =
    (getLocalStorage < string) | (null > GateUserDefaultKey._USER_ID);
  return email;
};

export const deleteUserId = () => {
  removeLocalStorage(GateUserDefaultKey._USER_ID);
};
