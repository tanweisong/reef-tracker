const _ = require('../../../functions/index.js');

export default {
  methods: {
    getState(inProperty) {
      const self = this;
      const rules = self.rules;

      if (!self.hasOwnProperty('rules'))
        console.error("no rules defined in component's data");

      if (!_.isEmpty(rules) && !self.isNullOrEmpty(inProperty)) {
        const rule = _.get(rules, inProperty);
        let state = null;
        let message = null;
        var validations = _.get(rule, 'rules');
        const value = self[inProperty];

        if (!_.isEmpty(validations)) {
          _.forEach(validations, function(validation) {
            const required = _.get(validation, 'required');
            const validator = _.get(validation, 'validator');

            if (required && self.isNullOrEmpty(value)) {
              state = false;
              message = _.get(validation, 'message');

              return false;
            } else if (
              !self.isNullOrEmpty(validator) &&
              typeof validator === 'function'
            ) {
              if (!validator(value)) {
                state = false;
                message = _.get(validation, 'message');

                return false;
              }
            }
          });
        }

        self.$set(rule, 'state', state);
        self.$set(rule, 'message', message);

        return state;
      }
    },
    validateRules() {
      const self = this;
      const rules = self.rules;
      var valid = true;

      if (!self.hasOwnProperty('rules'))
        console.error("no rules defined in component's data");

      if (!_.isEmpty(rules)) {
        _.forOwn(rules, function(value, key) {
          var state = self.getState(key);

          if (!self.isNullOrEmpty(state) && !state) {
            valid = false;
            return false;
          }
        });
      }

      return valid;
    }
  }
};
