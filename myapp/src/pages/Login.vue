<template>
      <div>
        <h1 style="font-size:18px;font-weight:bold;margin-bottom:20px;">请先登录</h1>
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
                  <el-checkbox label="下次免登陆" v-model="loginForm.mdl"></el-checkbox>
           </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="submitForm">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        mdl:true
      },
      rules: {
        password: [
          // required设置是否是必填的
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        username: [
          { required: true, message: "亲，用户名必须填写哟", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // 校验整个表单
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // 发起ajax请求，等待服务器返回结果
          // 根据服务器返回结果：成功->跳到“我的”
          let { username,password,mdl } = this.loginForm;
        
          let {data} = await this.$axios.get("http://localhost:1907/user/login",
          {
            params:{
              username,
              password,
              mdl
            }
            });
            console.log("data:", data);

            if(data.code === 1){
              let { targetUrl } = this.$route.query;
              console.log('targetUrl:',targetUrl);
              this.$router.replace({
                path: targetUrl || "/mine"
              });

              // 把token写入localstorage
              localStorage.setItem('Authorization',data.data);
            }else{
              alert('用户名或者密码不正确！')
            }
        }else{
          console.log("err");
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