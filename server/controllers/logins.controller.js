const loginsService = require("../services/logins.service");

const loginExists = async (req, res, next) => {
  const email = req.params.email;

  try {
    const count = await loginsService.getLogin(email, true);

    res.send(count);
  } catch (err) {
    res.send(err);
  }
};

const getLogin = async (req, res, next) => {
  const email = req.params.email;
  try {
    const login = await loginsService.getLogin(email);

    res.send(login);
  } catch (err) {
    res.send(err);
  }
};

const createLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    await loginsService.createLogin(email, password);

    const login = loginsService.getLogin(email);

    res.send(login);
  } catch (err) {
    res.send(err);
  }
};

const updateLogin = async (req, res, next) => {
  let login = req.body;
  const email = login.email;

  try {
    await loginsService.updateLogin(login);

    login = await loginsService.getLogin(email);

    res.send(login);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getLogin,
  createLogin,
  updateLogin,
  loginExists
};
