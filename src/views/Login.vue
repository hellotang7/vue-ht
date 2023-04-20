<template>


      <el-form ref="form" label-width="70px" class="login-container" :model="form" :rules="rules">
        <h3 class="login_title">欢迎登录</h3>
        <el-form-item  label="账号" prop="username"  >
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit"  type="primary">登录</el-button>
        </el-form-item>
      </el-form>



</template>

<script>
// import Mock from "mockjs";
import Cookie from 'js-cookie'
import {getMenu} from "@/api";

export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '123'
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', messages: '请输入用户名'}
        ],
        password: [
          {required: true, trigger: 'blur', messages: '请输入密码'}
        ],
      }
    }
  },
  methods:{




    //登录
    submit(){

      // const toKen = Mock.Random.guid()
      //校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({data}) => {
            console.log(data)
            if (data.code === 20000) {
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              //toKen信息存入cookie用于不同页面间的通信
              Cookie.set('toKen', data.data.toKen)
              //跳转到页面
              this.$router.push('/home')
            }else {
              this.$message.error('密码错误');
            }
          })
        }
      })

    },

    keyDown(e){
      if(e.keyCode === 13){
        this.submit()
      }
    }
  },
  mounted() {
    window.addEventListener("keydown",this.keyDown)
  }
}
</script>

<style lang="less" scoped>
.login-container {
  width: 400px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;

  .el-input {
    width: 198px;
  }

  .login_title {
    text-align: center;
    margin: 0px auto 40px auto;
    color: #505458;
  }

  .el-button {
    margin-left:62px;
margin-top: 10px;

  }
}
</style>
