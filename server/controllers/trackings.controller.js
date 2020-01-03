const trackingsService = require("../services/trackings.service");
const _ = require("../../functions/index");

var startDate = null;
var endDate = null;

const createTracking = async (req, res, next) => {
  try {
    const tracking = req.body;
    const result = await trackingsService.createTracking(tracking);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const trackingExists = async (req, res, next) => {
  try {
    const date = req.body.date;
    const result = await trackingsService.trackingExists(date);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

const getTrackingsByRange = async (req, res, next) => {
  try {
    if (_.has(req, "body.startDate")) startDate = req.body.startDate;

    if (_.has(req, "body.endDate")) endDate = req.body.endDate;

    const trackings = await trackingsService.getTrackings(startDate, endDate);

    res.send(trackings);
  } catch (err) {
    res.send(err);
  }
};

const updateTracking = async (req, res, next) => {
  try {
    const tracking = req.body;

    const result = await trackingsService.updateTracking(tracking);

    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createTracking,
  trackingExists,
  getTrackingsByRange,
  updateTracking
};
