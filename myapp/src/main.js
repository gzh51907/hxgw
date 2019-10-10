import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$axios = axios;

// import 'lib-flexible/flexible.js';
import './base.css';
import './router/rem'
// import './comfig/remComfig.js'

new Vue({
  // 4、将router注入vue实例
  router,
  store,
  render: h => h(App),
}).$mount('#app')
