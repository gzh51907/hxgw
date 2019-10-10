import Vue from "vue";
// 引入
import Vuex from "vuex";
import cart from "./cart"
import common from "./common"

// 使用
Vue.use(Vuex);

// 创建
const store = new Vuex.Store({
  modules:{
      cart,
      common    
  }
});

export default store;


