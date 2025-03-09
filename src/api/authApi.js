/* eslint-disable no-unused-vars */

// Mock API: login with password

export const loginApi = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === "123456") {
        resolve({ requires2FA: true, email });
      } else {
        reject(new Error("User not found"));
      }
    }, 1500);
  });
};

// Mock API: 2FA verification
export const verify2FAApi = (code) => {
  return new Promise((resolve, reject) => {
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
};

// Mock API: logout
export const logoutApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
