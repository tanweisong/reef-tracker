<template>
  <div id="app" class="position-absolute">
    <div class="d-flex flex-column align-items-stretch h-100">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Reef Tracking & Calculation</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="./" @click="toggleActive(1)" :active="(activeLink === 1)">Home</b-nav-item>
            <b-nav-item
              to="./dosing-calculation"
              @click="toggleActive(2)"
              :active="(activeLink === 2)"
            >Dosing Calculations</b-nav-item>
            <b-nav-item
              to="./data-management"
              @click="toggleActive(3)"
              :active="(activeLink === 3)"
            >Data Management</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view class="flex-grow-1" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLink: 0
    };
  },
  mounted() {
    const self = this;

    self.activeLink = 1;
  },
  methods: {
    toggleActive(index) {
      const self = this;

      self.activeLink = index;
    }
  }
};
</script>

<style lang="scss">
#app {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  hr {
    border: 0;
    border-top: 1px solid #ced4da;
  }
  input[type="number"] {
    text-align: right;
  }
}
</style>
