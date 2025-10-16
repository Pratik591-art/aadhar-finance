import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const addCookie = (key, value) => {
  setCookie(key, value);
};

export const getCookiee = (key) => {
  return getCookie(key);
};

export const removeCokkiee = (key) => {
  return deleteCookie(key)
}