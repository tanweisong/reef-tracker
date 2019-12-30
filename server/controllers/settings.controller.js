const settingsService = require("../services/settings.service");

const getSettings = async (req, res, next) => {
  try {
    const setting = await settingsService.getSettings();

    res.send(setting);
  } catch (err) {
    res.send(err);
  }
};

const createSettings = async (req, res, next) => {
  let setting = req.body;

  try {
    await settingsService.createSettings(setting);

    setting = await settingsService.getSettings();

    res.send(setting);
  } catch (err) {
    res.send(err);
  }
};

const updateSettings = async (req, res, next) => {
  const settingsId = req.params.id;
  const settings = req.body;

  try {
    await settingsService.updateSettings(settingsId, settings);

    let setting = await settingsService.getSettings();

    res.send(setting);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createSettings,
  getSettings
};
