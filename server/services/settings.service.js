const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const _ = require("../../functions/index");

const getSettings = async () => {
  const settings = await loadSettingCollection();
  const setting = await settings.findOne({});

  return setting;
};

const createSettings = async setting => {
  const settings = await loadSettingCollection();

  if (!_.isNil(setting)) setting["_id"] = new mongodb.ObjectID();

  await settings.insertOne(setting);
};

const updateSettings = async (settingsId, setting) => {
  const settings = await loadSettingCollection();

  await settings.updateOne(
    {
      _id: new mongodb.ObjectId(settingsId)
    },
    {
      $set: setting
    }
  );
};

async function loadSettingCollection() {
  const dbconnection = process.env.dbconnection;

  const client = await mongodb.MongoClient.connect(
    // "mongodb://127.0.0.1:27017",
    dbconnection,
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("settings");
}

module.exports = {
  createSettings,
  getSettings,
  updateSettings
};
