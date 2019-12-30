const mongodb = require("mongodb");

const createLogin = async (email, password) => {
  const logins = await loadLoginCollection();
  await logins.insertOne({
    email,
    password
  });

  await logins.findOne(
    {
      email: email
    },
    {
      _id: 1,
      email: 1,
      minPaxPerTable: 1,
      numOfTables: 1
    }
  );
};

const getLogin = async email => {
  const logins = await loadLoginCollection();
  let login = await logins
    .aggregate([
      { $match: { email } },
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

  if (login.length > 0) login = login[0];

  return login;
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
  createLogin,
  getLogin,
  updateLogin
};
