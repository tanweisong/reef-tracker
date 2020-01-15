class TrackingsService {
  static getTrackings(range) {
    return new Promise(async (resolve, reject) => {
      resolve([]);
    });
  }

  static createTracking(tracking) {
    return new Promise(async (resolve, reject) => {
      resolve(true);
    });
  }

  static trackingExists(date) {
    return new Promise(async (resolve, reject) => {
      resolve(true);
    });
  }

  static updateTracking(tracking) {
    return new Promise(async (resolve, reject) => {
      resolve(true);
    });
  }
}

export default TrackingsService;
