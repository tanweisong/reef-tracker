class SettingsService {
  static getSettings() {
    return new Promise(async (resolve, reject) => {
      resolve({
        calcium: [],
        alkalinity: [],
        magnesium: []
      });
    });
  }

  static createSettings(settings) {
    return new Promise(async (resolve, reject) => {
      resolve(true);
    });
  }

  static updateSettings(settingsId, settings) {
    return new Promise(async (resolve, reject) => {
      resolve([]);
    });
  }
}

export default SettingsService;
