<template>
    <div style="margin:auto">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
         欢迎你  <span> {{username}}</span>
         <span @click="out" v-if="username?show:show!=show">退出</span>
          <span @click="denglu" v-show="username?show!=show:show">登录</span>
    </div>
</template>
<script>
// 引入cookie
import Cookies from "js-cookie";

export default {
  data() {
    return {
      username: "",
      show: true
    };
  },
  created() {
    // 要么拿请求头的，要么拿cookie的数据
    if (this.$route.query.username) {
      this.username = this.$route.query.username;
    } else if (Cookies.get("name")) {
      this.username = Cookies.get("name");
    }
  },
  methods: {
    out() {
      this.username = "";
      Cookies.set("name", "");
      Cookies.set("psw", "");
    },
    denglu() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="scss" scoped>

div {
  font-size: 16px;
  height: 100px;
   font-size: 14px;
  background-color: rgb(251, 206, 150);

  span {
    cursor: pointer;
    color: orangered;
    font-size: 14px;
  }
}
</style>
