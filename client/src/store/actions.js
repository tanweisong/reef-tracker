const _ = require('../../../functions/index');

export default {
  setLogin(context, payload) {
    context.commit('setLogin', payload);
  },
  setSettings(context, payload) {
    if (_.isNullOrEmpty(payload))
      payload = {
        alkalinity: [],
        calcium: [],
        magnesium: []
      };
    else {
      _.forOwn(payload, function(value, key, obj) {
        switch (key) {
          case 'alkalinity':
          case 'calcium':
          case 'magnesium':
            value = value.sort(function(a, b) {
              const brandA = _.get(a, 'brand');
              const brandB = _.get(b, 'brand');

              return brandA < brandB ? -1 : 1;
            });
            obj = value;
            break;
          default:
            break;
        }
      });
    }

    context.commit('setSettings', payload);
  },
  setShowLoader(context, payload) {
    context.commit('setShowLoader', payload);
  }
};
