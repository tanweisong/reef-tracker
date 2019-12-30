const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const logins = require("./routes/api/logins");
const settings = require("./routes/api/settings");
const trackings = require("./routes/api/trackings");

app.use("/api/logins", logins);
app.use("/api/settings", settings);
app.use("/api/trackings", trackings);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
