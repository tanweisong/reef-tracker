const trackingsService = require("../services/trackings.service");

const getTracking = async (req, res, next) => {
  try {
    const date = req.body.date;
    const tracking = trackingsService.getTracking(date);

    res.send(tracking);
  } catch (err) {
    res.send(err);
  }
};

const getTrackings = async (req, res, next) => {
  try {
    const trackings = trackingsService.getTrackings();

    res.send(trackings);
  } catch (err) {
    res.send(err);
  }
};

const updateTracking = async (req, res, next) => {
  try {
    const trackingId = req.params.id;
    const tracking = req.body;

    await trackingsService.updateTracking(trackingId, tracking);

    const trackings = trackingsService.getTrackings();

    res.send(trackings);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getTracking,
  getTrackings,
  updateTracking
};
