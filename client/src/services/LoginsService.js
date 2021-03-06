import axios from 'axios';

const url = 'http://localhost:5000/api/logins';

class LoginsService {
  static authorizeLogin(login) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}/auth`, login);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static createLogin(login) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url, login);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
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
      try {
        const res = await axios.get(`${url}/exists/${email}`);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default LoginsService;
