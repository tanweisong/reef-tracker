class LoginsService {
  static authorizeLogin(login) {
    return new Promise(async (resolve, reject) => {
      resolve(true);
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
      try {
        const res = await axios.get(`${url}/${email}`);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
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
