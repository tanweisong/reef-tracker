import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import controlStates from "./utils/controlStates";
import numbers from "./utils/numbers";
import objects from "./utils/objects";
import lodash from "lodash";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faTrash);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.use(lodash);

Vue.config.productionTip = false;

Vue.mixin(controlStates);
Vue.mixin(numbers);
Vue.mixin(objects);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
