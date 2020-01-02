const _ = require('../../../functions/index');

export default {
  setLogin(context, payload) {
    context.commit('setLogin', payload);
  },
  setSettings(context, payload) {
    context.commit('setSettings', payload);
  },
  setShowLoader(context, payload) {
    context.commit('setShowLoader', payload);
  }
};
