const _ = require('../../../functions/index');

export default {
  methods: {
    roundToDecimalPlaces(value, numOfDecimals) {
      if (!isNaN(value) && !isNaN(numOfDecimals))
        return parseFloat(parseFloat(value).toFixed(Number(numOfDecimals)));
      else return null;
    },
    greaterThanZero(value) {
      if (_.isNullOrEmpty(value)) {
        return false;
      } else {
        if (isNaN(value)) {
          return false;
        } else {
          if (parseFloat(value) <= 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    },
    notNegative(value) {
      if (_.isNullOrEmpty(value)) {
        return false;
      } else {
        if (isNaN(value)) return false;
        else {
          if (parseFloat(value) < 0) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
  }
};
