const _ = require('../../../functions/index.js');

export default {
  methods: {
    getState(inProperty) {
      const self = this;
      const rules = self.rules;

      if (!self.hasOwnProperty('rules'))
        console.error("no rules defined in component's data");

      if (!_.isEmpty(rules) && !_.isNullOrEmpty(inProperty)) {
        const rule = _.get(rules, inProperty);
        let state = null;
        let message = null;
        var validations = _.get(rule, 'rules');
        const value = self[inProperty];

        if (!_.isEmpty(validations)) {
          for (let index = 0; index < validations.length; index++) {
            const validation = validations[index];
            const required = _.get(validation, 'required');
            const validator = _.get(validation, 'validator');

            if (required && _.isNullOrEmpty(value)) {
              state = false;
              message = _.get(validation, 'message');

              break;
            } else if (
              !_.isNullOrEmpty(validator) &&
              typeof validator === 'function'
            ) {
              if (!validator(value)) {
                state = false;
                message = _.get(validation, 'message');

                break;
              }
            }
          }
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

          if (!_.isNullOrEmpty(state) && !state) {
            valid = false;
            return false;
          }
        });
      }

      return valid;
    }
  }
};
