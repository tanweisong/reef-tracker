<template>
  <div class="login flex-grow-1 d-flex flex-column align-center">
    <div class="d-flex flex-row align-center flex-grow-1">
      <v-card class="px-4 py-8" width="350px">
        <v-form>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="username"
                label="Username"
                v-model="username"
                autocomplete="new-password"
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="password"
                type="password"
                label="Password"
                v-model="password"
                autocomplete="new-password"
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                id="login"
                class="float-right"
                color="teal darken-1"
                @click="handleLogin"
                small
                outlined
              >Login</v-btn>
              <v-btn
                id="register"
                class="float-right mr-2"
                @click="handleRegister"
                small
                outlined
              >Register</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
    <v-snackbar :color="snackbar.color" v-model="snackbar.visible" multi-line top right>
      {{ snackbar.text }}
      <v-btn text @click="snackbar.visible = false">Close</v-btn>
    </v-snackbar>
    <Loader />
  </div>
</template>

<script>
import LoginsService from '@/services/LoginsService';
import Loader from '@/components/Loader';

export default {
  components: {
    Loader
  },
  data() {
    return {
      username: '',
      password: '',
      snackbar: {
        color: 'success',
        text: '',
        visible: false
      }
    };
  },
  methods: {
    async getLogin() {
      const self = this;
      const username = self.username;

      const login = await LoginsService.getLogin(username);

      self.$store.dispatch('setShowLoader', false);
      self.$store.dispatch('setLogin', login);

      self.$emit('loggedIn');

      self.$router
        .push({
          path: '/'
        })
        .catch(err => {});
    },
    async handleLogin() {
      const self = this;
      const username = self.username;
      const password = self.password;

      self.$store.dispatch('setShowLoader', true);

      const result = await LoginsService.authorizeLogin({
        username,
        password
      });

      if (result) {
        self.getLogin();
      } else {
        self.$store.dispatch('setShowLoader', false);

        self.updateSnackbar('Invalid Login.', true, true);
      }
    },
    handleRegister() {
      const self = this;

      self.$router.push({
        path: '/register'
      });
      // .catch(err => {});
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
.login {
  height: calc(100vh - 48px);
}
</style>
