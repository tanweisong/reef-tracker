import axios from 'axios';

const url = 'http://localhost:5000/api/trackings';

class TrackingsService {
  static getTrackings(range) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}/trackingsByRange`, range);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static createTracking(tracking) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url, tracking);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static trackingExists(date) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}/exists`, date);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static updateTracking(tracking) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(url, tracking);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default TrackingsService;
