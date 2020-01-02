import axios from 'axios';

const url = 'http://localhost:5000/api/settings';

class SettingsService {
  static getSettings() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static createSettings(settings) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url, settings);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static updateSettings(settingsId, settings) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(`${url}/${settingsId}`, settings);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default SettingsService;
