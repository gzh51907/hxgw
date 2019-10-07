<template>
      <div>
        <h1>请先登录</h1>
        <el-form 
        :model="loginForm" 
        :rules="rules"
        ref="loginForm" 
         status-icon
        label-width="100px" 
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"  @click="submitForm">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 引入cookie
import Cookies from "js-cookie";

export default {
  data() {
    //   判断用户名和密码是否和cookie一致
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (this.loginForm.password === Cookies.get("psw")) {
        callback();
      } else {
        callback(new Error("密码不正确"));
      }
    };
    // 验证用户名
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (this.loginForm.username === Cookies.get("name")) {
        callback();
      } else {
        callback(new Error("用户名不正确"));
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        password: [
          // required设置是否是必填的
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validatePass }
        ],
        username: [
          { required: true, message: "亲，用户名必须填写哟", trigger: "blur" },
           { validator: validateName }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // 校验整个表单
      this.$refs.loginForm.validate(valid => {
        // valid： 所有校验规则都通过后，得到true，只要有一个表单元素校验不通过则得到form
        if (valid) {
          // alert('submit!');
          // 发起ajax请求，等待服务器返回结果
          // 根据服务器返回结果：注册成功->跳到“我的”
          let { username } = this.loginForm;
          this.$router.replace({
            name: "mine",
            params: { username },
            query: { username }
          });
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>