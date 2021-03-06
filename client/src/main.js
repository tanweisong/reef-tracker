import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import controlStates from './utils/controlStates';
import numbers from './utils/numbers';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.mixin(controlStates);
Vue.mixin(numbers);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
