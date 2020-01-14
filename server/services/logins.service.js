const mongodb = require("mongodb");
const dotenv = require("dotenv").config();
const _ = require("../../functions/index");

const authLogin = async (email, password) => {
  const logins = await loadLoginCollection();
  const login = await logins.findOne({
    email: email,
    password: password
  });

  return !_.isNullOrEmpty(login);
};

const createLogin = async (email, password) => {
  const logins = await loadLoginCollection();
  await logins.insertOne({
    email,
    password
  });
};

const getLogin = async (email, bCount = false) => {
  const logins = await loadLoginCollection();
  let login = await logins
    .aggregate([
      { $match: { email } },
      {
        $lookup: {
          from: "trackings",
          localField: "email",
          foreignField: "email",
          as: "trackings"
        }
      },
      {
        $project: {
          _id: 1,
          email: 1,
          trackings: 1
        }
      }
    ])
    .toArray();

  if (!_.isNullOrEmpty(bCount) && bCount) {
    return login.length > 0;
  } else {
    if (login.length > 0) login = login[0];

    if (email === "admin") {
      login["role"] = "admin";
    } else {
      login["role"] = "user";
    }

    return login;
  }
};

const updateLogin = async login => {
  const logins = await loadLoginCollection();
  let oParams = new Object();
  let email = null;

  for (var sKey in login) {
    if (sKey !== "email") oParams[sKey] = login[sKey];
    else email = login[sKey];
  }

  if (!_.isEmpty(oParams))
    await logins.updateOne(
      {
        email
      },
      {
        $set: oParams
      }
    );
};

async function loadLoginCollection() {
  const dbconnection = process.env.dbconnection;

  const client = await mongodb.MongoClient.connect(
    //   "mongodb://127.0.0.1:27017",
    dbconnection,
    {
      useNewUrlParser: true
    }
  );

  return client.db("reef-tracker").collection("logins");
}

module.exports = {
  authLogin,
  createLogin,
  getLogin,
  updateLogin
};
