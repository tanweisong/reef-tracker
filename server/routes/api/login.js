const express = require("express");
const mongodb = require("mongodb");
const _ = require("lodash");

const router = express.Router();

router.get("/:email", async (req, res) => {
  const logins = await loadLoginCollection();
  const login = await logins
    .aggregate([
      { $match: { email: req.params.email } },
      {
        $lookup: {
          from: "tables",
          localField: "email",
          foreignField: "email",
          as: "tables"
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          numOfTables: 1,
          minPaxPerTable: 1,
          tableConfigurations: 1,
          tables: 1,
          screens: 1,
          entrances: 1
        }
      }
    ])
    .toArray();
  res.send(login);
});

router.post("/", async (req, res) => {
  const logins = await loadLoginCollection();
  await logins.insertOne({
    email: req.body.email,
    password: req.body.password
  });

  const login = await logins.findOne(
    {
      email: req.body.email
    },
    {
      _id: 1,
      email: 1,
      minPaxPerTable: 1,
      numOfTables: 1
    }
  );

  res.send(login);
});

router.put("/", async (req, res) => {
  const logins = await loadLoginCollection();
  var oParams = new Object();

  for (var sKey in req.body) {
    if (sKey !== "email") oParams[sKey] = req.body[sKey];
  }

  if (!_.isEmpty(oParams))
    await logins.updateOne(
      {
        email: req.body.email
      },
      {
        $set: oParams
      }
    );

  const login = await logins
    .aggregate([
      { $match: { email: req.body.email } },
      {
        $lookup: {
          from: "tables",
          localField: "email",
          foreignField: "email",
          as: "tables"
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          numOfTables: 1,
          minPaxPerTable: 1,
          tableConfigurations: 1,
          tables: 1,
          screens: 1,
          entrances: 1
        }
      }
    ])
    .toArray();

  res.send(login);
});

async function loadLoginCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("logins");
}

module.exports = router;
