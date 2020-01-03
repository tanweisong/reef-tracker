const mongodb = require("mongodb");
const _ = require("../../functions/index");

const createTracking = async tracking => {
  const trackings = await loadTrackingCollection();

  if (!_.isNil(tracking)) tracking["_id"] = new mongodb.ObjectID();

  const result = await trackings.insertOne(tracking);

  return _.get(result, "result.ok") === 1;
};

const trackingExists = async date => {
  const trackings = await loadTrackingCollection();

  const tracking = await trackings
    .find({
      date: { $eq: date }
    })
    .toArray();

  return tracking.length > 0;
};

const getTrackings = async (startDate, endDate) => {
  const trackings = await loadTrackingCollection();
  let results = null;

  if (_.isNullOrEmpty(startDate) && _.isNullOrEmpty(endDate))
    results = await trackings.find({}).toArray();
  else
    results = await trackings
      .find({
        date: {
          $gte: startDate,
          $lt: endDate
        }
      })
      .toArray();

  return results;
};

const updateTracking = async tracking => {
  const trackings = await loadTrackingCollection();
  const date = tracking.date;

  const result = await trackings.updateOne(
    {
      date: date
    },
    {
      $set: tracking
    }
  );

  return _.get(result, "result.ok") === 1;
};

async function loadTrackingCollection() {
  const dbconnection = process.env.dbconnection;

  const client = await mongodb.MongoClient.connect(
    // "mongodb://127.0.0.1:27017",
    dbconnection,
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("trackings");
}

module.exports = {
  createTracking,
  trackingExists,
  getTrackings,
  updateTracking
};
