<template>
  <div>
    <v-overlay :value="showLoader">
      <v-progress-circular indeterminate size="70" width="7"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'loader',
  computed: {
    showLoader: {
      get() {
        const self = this;

        return self.$store.getters.getShowLoader;
      }
    }
  }
};
</script>
