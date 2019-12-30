const loginsService = require("../services/logins.service");

const getLogin = async (req, res, next) => {
  const email = req.params.email;
  try {
    const logins = await loginService.getLogin(email);

    res.send(logins);
  } catch (err) {
    res.send(err);
  }
};

const createLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    await loginService.createLogin(email, password);

    const login = loginService.getLogin(email);

    res.send(login);
  } catch (err) {
    res.send(err);
  }
};

const updateLogin = async (req, res, next) => {
  let login = req.body;
  const email = login.email;

  try {
    await loginService.updateLogin(login);

    login = await loginService.getLogin(email);

    res.send(login);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getLogin,
  createLogin,
  updateLogin
};
