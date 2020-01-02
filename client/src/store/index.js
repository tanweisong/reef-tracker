import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      calcium: null,
      alkalinity: null,
      magnesiume: null
    },
    login: null,
    showLoader: false
  },
  mutations,
  actions,
  getters,
  modules: {}
});
