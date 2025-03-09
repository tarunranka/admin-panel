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
    }, 1000);
  });
};

// Mock API: 2FA verification
export const verify2FAApi = async ({ email, code }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === "123456") {
        resolve({
          token: "fake-token-2fa",
          email: email,
          firstName: "Tarun",
          lastName: "Ranka",
        });
      } else {
        reject({ error: "Invalid 2FA code", email });
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
