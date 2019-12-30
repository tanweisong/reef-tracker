<template>
  <div class="register flex-grow-1 d-flex flex-column align-center">
    <div class="d-flex flex-row align-center flex-grow-1">
      <v-card class="px-4 py-8" width="350px">
        <v-form>
          <v-text-field label="Email" dense></v-text-field>
          <v-text-field type="password" label="Password" dense></v-text-field>
          <v-text-field type="password" label="Confirm Password" dense></v-text-field>
          <v-row>
            <v-col cols="12">
              <v-btn class="float-right" small outlined @click="handleRegister">Register</v-btn>
              <v-btn class="float-right mr-2" small outlined @click="handleCancel">Cancel</v-btn>
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
    handleCancel() {
      const self = this;

      self.$router.push({
        path: '/login'
      });
    },
    handleRegister() {}
  }
};
</script>

<style lang="scss" scoped>
.register {
  height: calc(100vh - 48px);
}
</style>