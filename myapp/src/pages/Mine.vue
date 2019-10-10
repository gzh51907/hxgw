<template>
    <div style="margin:auto">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
         欢迎你  <span> {{username}}</span>
         <span @click="logout" v-if="currentUser" style="color:blue;margin-left:10px;">退出</span>
          <span @click="denglu" v-else style="margin-left:10px;">登录</span>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      show: true
    };
  },
  created() {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log("user", user);
    this.username = user.username;
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.username = "";
    },
    denglu() {
      this.$router.push({ path: "/login" });
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.common.user;
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
