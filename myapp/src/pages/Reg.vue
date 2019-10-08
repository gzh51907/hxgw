<template>
    <div>
        <h1 style="font-size:18px;font-weight:bold;margin-bottom:20px;">免费注册:</h1>
        <el-form 
        :model="ruleForm" 
        :rules="rules"
        ref="regForm" 
         status-icon
        label-width="100px" 
        >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"  @click="submitForm">提交</el-button>
                <el-button @click="resetForm('regForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        //   校验失败
        callback(new Error("两次输入密码不一致!"));
      } else {
        //   通过校验
        callback();
      }
    };
    // 验证用户名是否存在，请求数据库
      const checkUsername = async(rule, value, callback) => {
     
      let {data} = await this.$axios.get('http://localhost:1907/user/check',{
        params:{
          username:this.ruleForm.username
        }
      })
      if(data.code === 0){
        callback(new Error("用户名已存在"));
      }else{
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: ""
      },
      rules: {
        password: [
          // required设置是否是必填的
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度必须为 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        username: [
          { required: true, message: "亲，用户名必须填写哟", trigger: "blur" },
          { validator: checkUsername, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //   校验整个表单
      this.$refs.regForm.validate(async valid => {
        // valid： 所有校验规则都通过后，得到true，才能发起请求
        if (valid) {
          // 发起ajax请求，等待服务器返回结果
          // 根据服务器返回结果：注册成功->跳到“我的”
      let {username,password} = this.ruleForm;
      let {data} = await this.$axios.post('http://localhost:1907/user/reg',{
              username,
              password
            });
            console.log('data:',data);
            if(data.code===1){
              this.$router.replace({name:'mine',params:{username},query:{username}})
            }else{
              // alert('注册失败');
              window.console.log('注册失败!!');
            }
          } else {
            window.console.log('error submit!!');
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