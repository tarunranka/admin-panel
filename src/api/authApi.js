/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";

// Mock API: 2FA verification
export const verify2FAApi = (code) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === "123456") {
        resolve({
          token: "fake-token-2fa",
          email: "tarunranka.m@gmail.com",
          firstName: "Tarun",
          lastName: "Ranka",
        });
      } else {
        reject(new Error("Invalid 2FA code"));
      }
    }, 1000);
  });

// Mock API: login with password

export const loginApi = ({ email, password }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const token = "fake-token";
      if (password === "123456") {
        resolve({ requires2FA: true, email });
      } else {
        reject(new Error("User not found"));
      }
    }, 1500);
  });

// Mock API: logout
export const logoutApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      Cookies.remove("token");
      if (navigator.credentials && navigator.credentials.preventSilentAccess) {
        navigator.credentials.preventSilentAccess();
      }
      resolve();
    }, 1000);
  });
