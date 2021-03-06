<template>
  <div class="register flex-grow-1 d-flex flex-column align-center">
    <div class="d-flex flex-row align-center flex-grow-1">
      <v-card class="px-4 py-8" width="350px">
        <v-form ref="form">
          <v-row>
            <v-col class="pb-0" cols="12">
              <v-text-field
                id="email"
                ref="email"
                label="Email"
                autocomplete="new-password"
                v-model="email"
                :error-messages="error.email"
                :rules="emailRules"
                @input="handleEmailInput"
                v-on:keydown.enter="handleEnter"
                autofocus
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0" cols="12">
              <v-text-field
                id="password"
                type="password"
                label="Password"
                autocomplete="new-password"
                v-model="password"
                :rules="passwordRules"
                :error-messages="error.password"
                @input="() => handlePasswordInput()"
                v-on:keydown.enter="handleEnter"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                autocomplete="new-password"
                v-model="confirmPassword"
                :rules="confirmPasswordRules"
                :error-messages="error.confirmPassword"
                @input="() => handlePasswordInput(true)"
                v-on:keydown.enter="handleEnter"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                id="register"
                class="float-right"
                color="teal darken-1"
                @click="handleRegister"
                small
                outlined
              >Register</v-btn>
              <v-btn
                id="cancel"
                class="float-right mr-2"
                @click="handleCancel"
                small
                outlined
              >Cancel</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
    <v-snackbar :color="snackbar.color" v-model="snackbar.visible" multi-line top right>
      {{ snackbar.text }}
      <!-- <v-btn text @click="snackbar = false">Close</v-btn> -->
    </v-snackbar>
  </div>
</template>

<script>
const _ = require('../../../functions/index.js');
import LoginsService from '@/services/LoginsService';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      timer: null,
      snackbar: {
        color: 'success',
        text: '',
        visible: false
      },
      error: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      confirmPasswordRules: [
        v => !_.isNullOrEmpty(v) || 'Confirm password is required'
      ],
      emailRules: [v => !_.isNullOrEmpty(v) || 'Email is required'],
      passwordRules: [
        v => !_.isNullOrEmpty(v) || 'Password is required',
        v =>
          (v && v.length >= 8) || 'Password must be at least 8 characters long',
        v =>
          this.specialCharCheck(v) ||
          'Password must contains at least one of the following special character (!@#$%^&)'
      ]
    };
  },
  methods: {
    clearTimer() {
      const self = this;

      clearInterval(self.timer);
      self.timer = null;
    },
    handleCancel() {
      const self = this;

      self.$router.push({
        path: '/login'
      });
    },
    handleEmailInput() {
      const self = this;
      const email = self.email;

      if (!_.isNil(self.timer)) {
        self.clearTimer();
      }

      if (!_.isNullOrEmpty(email)) {
        self.timer = setInterval(function() {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            self.loginExists();
          else self.error.email = 'Invalid email format';

          self.clearTimer();
        }, 300);
      } else {
        self.error.email = '';
      }
    },
    handlePasswordInput(bConfirmPassword = false) {
      const self = this;
      const password = self.password;
      const confirmPassword = self.confirmPassword;

      if (!_.isNullOrEmpty(self.timer)) {
        self.clearTimer();
      }

      self.timer = setInterval(function() {
        if (
          !_.isNullOrEmpty(password) &&
          !_.isNullOrEmpty(confirmPassword) &&
          password !== confirmPassword
        ) {
          self.error.password = 'Passwords do not match';
          self.error.confirmPassword = 'Passwords do not match';
        } else {
          self.error.password = '';
          self.error.confirmPassword = '';
        }

        self.clearTimer();
      }, 300);
    },
    handleEnter() {
      const self = this;

      self.handleRegister();
    },
    async handleRegister() {
      const self = this;

      if (
        self.$refs.form.validate() &&
        _.isNullOrEmpty(self.error.password) &&
        _.isNullOrEmpty(self.error.confirmPassword)
      ) {
        const email = self.email;
        const password = self.password;

        const result = await LoginsService.createLogin({ email, password });

        if (result) {
          self.updateSnackbar('Account created successfully!', false, true);

          self.$refs.form.reset();
          self.$refs.email.focus();
        } else {
          self.updateSnackbar('Error creating account', true, true);
        }
      }
    },
    async loginExists() {
      const self = this;
      const email = self.email;
      const exists = await LoginsService.loginExists(email);

      if (exists) self.error.email = 'Email is already taken.';
      else self.error.email = '';
    },
    specialCharCheck(value) {
      return /^(?=.*[!@#$%^&])/.test(value);
    },
    updateSnackbar(message, error, show = false) {
      const self = this;

      self.$set(self.snackbar, 'text', message);
      self.$set(self.snackbar, 'color', error ? 'error' : 'success');
      self.$set(self.snackbar, 'visible', show);
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  background-color: #e0f2f1;
  height: calc(100vh - 48px);
}
</style>
