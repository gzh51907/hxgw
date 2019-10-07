<template>

    <el-container id="myApp">
      <el-header style="height: auto;">
      <div class="top">
        <i class="fl">  
            <el-button type="text" @click="goto('/reg')" style="line-height:0px;">注册 </el-button>
           <el-button type="text" @click="goto('/login')" style="line-height:0px;margin:0;">登录</el-button>
        </i>
        <div class="searchbox">
          <i class="el-icon-search" ></i>
           <input type="text" class="search" placeholder="请输入内容">
        </div>
        <i class="el-icon-bell fr"></i>
      </div>
      <!-- 导航 -->
      <el-row>
       <el-col :span="18">
          <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
            <el-menu-item :index="item.path" v-for="item in menus" :key="item.name">
              {{item.text}}
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <router-view />
    </el-main>
</el-container>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      activeIndex: "/home",
      menus: [
        {
          name: "home",
          path: "/home",
          text: "首页"
        },
        {
          name: "discover",
          path: "/discover",
          text: "发现"
        },
        {
          name: "cart",
          path: "/cart",
          text: "购物车"
        },
        {
          name: "mine",
          path: "/mine",
          text: "我的"
        }
      ]
    };
  },
  methods: {
    handleSelect(index, indexpath) {
      this.activeIndex = index;
    },
    goto(path) {
      this.$router.push(path);
    }
  },
  created() {
    this.activeIndex = this.$route.path;
  },
  components: {},

};
</script>

<style  lang="scss" scoped>
* {
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
#myApp {
  width: 100%;
  height: 100%;
}

// 第一块
.top {
  height: 40px;
  padding-top: 5px;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

  .el-icon-s-unfold {
    font-size: 24px;
    color: orangered;
  }

  .el-button:hover {
    color: red;
    text-decoration: underline;
  }

  // 搜索盒
  .searchbox {
    flex: 5;
    height: 24px;
    position: relative;
    text-align: center;

    .el-icon-search {
      font-size: 20px;
      position: absolute;
      left: 20px;
      top: 5px;
    }
    .search {
      width: 95%;
      margin: 0 10px;
      height: 28px;
      border-radius: 20px;
      padding-left: 30px;
      border: 1px solid orangered;
    }
  }

  .el-icon-bell {
    font-size: 24px;
    color: orangered;
  }
}

// 第二块
.el-col {
  width: 100%;

  .el-menu {
    width: 100%;
    display: flex;
    justify-content: space-around;

    .el-menu-item {
      flex: 1;
      text-align: center;
    }
  }
}

.current {
  color: #f00;
  font-weight: bold;
}
.txt-right {
  text-align: right;
  margin-top: 10px;
}

.price del::before {
  content: "￥";
}

.price span {
  color: #f00;
  margin-left: 5px;
}
span::before {
  content: "￥";
}
</style>

