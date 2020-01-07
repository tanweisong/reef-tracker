class LoginsService {
  static authorizeLogin(login) {
    return new Promise(async (resolve, reject) => {
      if (login.username === 'valid@email.com') resolve(true);
      else resolve(false);
    });
  }

  static createLogin(login) {
    return new Promise(async (resolve, reject) => {
      if (login.email === 'valid@email.com') resolve(true);
      else resolve(false);
    });
  }

  static getLogin(email) {
    return new Promise(async (resolve, reject) => {
      resolve({
        email: 'valid@email.com',
        trackings: []
      });
    });
  }

  static loginExists(email) {
    return new Promise(async (resolve, reject) => {
      if (email === 'valid@email.com') resolve(false);
      else resolve(true);
    });
  }
}

export default LoginsService;
