<template>
  <v-app>
    <div id="container" class="d-flex flex-column flex-grow-1">
      <v-toolbar short class="flex-grow-0">
        <v-toolbar-title>Reef Tracking & Calculation</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
            icon
            v-show="$vuetify.breakpoint.mdAndUp"
            @click="handleLinkClick('/')"
            ><v-icon>mdi-home</v-icon>
          </v-btn>
          <v-btn
            text
            v-show="$vuetify.breakpoint.mdAndUp"
            @click="handleLinkClick('/dosing-calculation')"
            ><v-icon>mdi-calculator</v-icon>
          </v-btn>
          <v-btn
            text
            v-show="$vuetify.breakpoint.mdAndUp"
            @click="handleLinkClick('/data-management')"
            ><v-icon>mdi-settings</v-icon>
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
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-toolbar>

      <router-view class="flex-grow-1" />

      <!-- <v-bottom-navigation value="1" grow color="teal">
        <v-btn>
          <span>Recents</span>
          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn>
          <span>Favorites</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn>
          <span>Nearby</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation> -->
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    handleLinkClick(path) {
      const self = this;

      self.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="scss">
.v-item-group.v-bottom-navigation .v-btn {
  height: inherit !important;
}
</style>
