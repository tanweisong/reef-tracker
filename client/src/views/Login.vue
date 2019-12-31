<template>
  <div class="login flex-grow-1 d-flex flex-column align-center">
    <div class="d-flex flex-row align-center flex-grow-1">
      <v-card class="px-4 py-8" width="350px">
        <v-form>
          <v-row>
            <v-col cols="12"
              ><v-text-field
                label="Username"
                autocomplete="new-password"
                dense
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12"
              ><v-text-field
                type="password"
                label="Password"
                autocomplete="new-password"
                dense
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                class="float-right"
                color="teal darken-1"
                @click="handleLogin"
                small
                outlined
                >Login</v-btn
              >
              <v-btn
                class="float-right mr-2"
                @click="handleRegister"
                small
                outlined
                >Register</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLogin() {},
    handleRegister() {
      const self = this;

      self.$router.push({
        path: '/register'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  height: calc(100vh - 48px);
}
</style>
