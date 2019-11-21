export default {
  setLogin(context, payload) {
    context.commit("setLogin", payload);
  },
  setSettings(context, payload) {
    // if (!_.isEmpty(payload)) {
    //   _.forOwn(payload, function(array, key) {
    //     if (_.indexOf(["calcium", "alkalinity", "magnesium"], key) >= 0) {
    //       if (_.isArray(array)) {
    //         array.push({
    //           brand: null,
    //           dosage: null
    //         });
    //       }
    //     }
    //   });
    // }

    context.commit("setSettings", payload);
  },
  setShowLoader(context, payload) {
    context.commit("setShowLoader", payload);
  }
};
