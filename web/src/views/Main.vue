<template>
  <div class="page-main">
    <div class="header">
      <headerinner :username="username" @signIn="signIn" @signUp="signUp" @loginOut="loginOut"></headerinner>
    </div>
    <div class="articles">
      <router-view></router-view>
    </div>
    <div class="footer"></div>
    <el-dialog :title="handle" :visible.sync="signUpHandle">
      <el-form @submit.native.prevent="save" label-width="120px">
        <el-form-item label="用户名称">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" v-if="handleType === 'signUp'">
          <el-input v-model="model.repassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">{{handle}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import headerinner from "./header";
export default {
  components: {
    headerinner
  },
  computed: {
    handle() {
      return this.handleType === "signIn" ? "登录" : "注册";
    }
  },
  data() {
    return {
      model: {},
      signUpHandle: false,
      handleType: "signIn",
      username: ""
    };
  },
  created() {
    this.username = sessionStorage.getItem("username");
  },
  methods: {
    signIn() {
      this.signUpHandle = true;
      this.handleType = "signIn";
    },
    signUp() {
      this.signUpHandle = true;
      this.handleType = "signUp";
    },
    async save() {
      if (this.model.hasOwnProperty("repassword")) {
        await this.$http.post(`user`, this.model);
        this.handleType = "signIn";
        delete this.model.repassword;
      } else {
        const res = await this.$http.post(`login`, this.model);
        sessionStorage.token = res.data.token;
        sessionStorage.setItem("username", this.model.username);
        this.username = this.model.username;
        this.signUpHandle = false;
      }
    },
    loginOut() {
      sessionStorage.clear();
      this.username = "";
    }
  }
};
</script>

<style lang="scss">
.header {
  background: #fff;
  padding: 0.55rem /* 15/12 */;
  position: sticky;
  top: 0;
}
</style>
