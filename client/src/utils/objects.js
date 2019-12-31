const _ = require('../../../functions/index.js');

export default {
  methods: {
    isNullOrEmpty(oValue) {
      if (!_.isNil(oValue)) {
        if (!_.isEqual(_.trim(oValue.toString()), '')) return false;
        else return true;
      } else return true;
    }
  }
};
