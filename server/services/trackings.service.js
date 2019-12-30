const mongodb = require("mongodb");

const getTracking = async date => {
  const trackings = await loadTrackingCollection();

  const tracking = await trackings.findOne({
    date: { $eq: date }
  });

  return tracking;
};

const getTrackings = async () => {
  const trackings = await loadTrackingCollection();
  const results = await trackings.find({}).toArray();

  return results;
};

const updateTracking = async (trackingId, tracking) => {
  const trackings = await loadTrackingCollection();

  await trackings.updateOne(
    {
      _id: new mongodb.ObjectId(trackingId)
    },
    {
      $set: tracking
    }
  );
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
  getTracking,
  getTrackings,
  updateTracking
};
