import axios from "axios";

const url = "http://localhost:5000/api/trackings";

class TrackingsService {
  static getTracking(inData) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}/exists`, inData);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTrackings(inData) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(url, inData);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static createTracking(inTracking) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}/tracking`, inTracking);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static updateTracking(inTrackingId, inTracking) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.put(`${url}/${inTrackingId}`, inTracking);
        const data = res.data;

        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default TrackingsService;
