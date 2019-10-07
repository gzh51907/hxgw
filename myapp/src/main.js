import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$axios = axios;

import 'lib-flexible/flexible.js';
import './base.css';

import './comfig/remComfig.js'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
