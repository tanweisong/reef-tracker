export default {
  methods: {
    to2DecimalPlaces(value, event) {
      if (!isNaN(value)) {
        return parseFloat(parseFloat(value).toFixed(2));
      } else return null;
    },
    greaterThanZero(value) {
      if (this.isNullOrEmpty(value)) {
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
      if (this.isNullOrEmpty(value)) {
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
