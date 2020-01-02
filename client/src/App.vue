<template>
  <v-app>
    <div id="container" class="d-flex flex-column flex-grow-1">
      <v-toolbar dense class="flex-grow-0">
        <v-toolbar-title>Reef Tracking & Calculation</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn text v-show="$vuetify.breakpoint.mdAndUp" small @click="handleLinkClick('/')">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn
            text
            v-show="$vuetify.breakpoint.mdAndUp"
            small
            @click="handleLinkClick('/dosing-calculation')"
          >
            <v-icon>mdi-calculator</v-icon>
          </v-btn>
          <v-btn
            text
            v-show="$vuetify.breakpoint.mdAndUp"
            @click="handleLinkClick('/data-management')"
            small
          >
            <v-icon>mdi-settings</v-icon>
          </v-btn>
          <v-btn text v-show="$vuetify.breakpoint.mdAndUp" @click="handleLogout" small>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" v-show="$vuetify.breakpoint.smAndDown">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="handleLinkClick('/')">
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>
              <v-list-item @click="handleLinkClick('/dosing-calculation')">
                <v-list-item-title>Dosing Calculation</v-list-item-title>
              </v-list-item>
              <v-list-item @click="handleLinkClick('/data-management')">
                <v-list-item-title>Data Management</v-list-item-title>
              </v-list-item>
              <v-list-item @click="handleLogout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>

      <router-view />
    </div>
  </v-app>
</template>

<script>
const _ = require('../../functions/index.js');

export default {
  // mounted() {
  //   const self = this;
  //   const login = self.$store.getters.getLogin;

  //   if (_.isNil(login))
  //     self.$router.push({
  //       path: '/login'
  //     });
  // },
  methods: {
    handleLinkClick(path) {
      const self = this;

      self.$router
        .push({
          path
        })
        .catch(err => {});
    },
    handleLogout() {}
  }
};
</script>

<style lang="scss">
html {
  overflow-y: hidden !important;
  .v-item-group.v-bottom-navigation .v-btn {
    height: inherit !important;
  }
  input[type='number'] {
    text-align: end;
  }
  .v-input {
    font-size: 1rem;
  }
}
</style>
