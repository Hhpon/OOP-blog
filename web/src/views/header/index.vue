<template>
  <div class="header-inner">
    <div class="header-left">
      <div class="logo">
        <a href>
          <img src="../../assets/images/logo.png" alt />
        </a>
      </div>
    </div>
    <div class="search" v-if="!username">
      <button @click="signUp()">注册</button>
      <button @click="signIn()">登录</button>
    </div>
    <div v-else>
      <span class="el-icon-s-custom" style="margin:0  20px;"></span>
      <span>{{ username }}</span>
      <el-dropdown @command="loginOut()">
        <span>
          <i class="el-icon-arrow-down el-icon--right" style="color:#409eff"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      active: 0
    };
  },
  props: {
    username: String
  },
  methods: {
    signIn() {
      this.$emit("signIn");
    },
    signUp() {
      this.$emit("signUp");
    },
    loginOut() {
      this.$emit("loginOut");
    }
  }
};
</script>
<style lang="scss">
.header-inner {
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-between;
  .logo {
    img {
      width: 12rem; /* 90/12 */
    }
  }
  .header-left {
    font-size: 1.166667rem /* 14/12 */;
    display: flex;
    align-items: center; /*垂直*/
    justify-content: center; /*水平*/
    vertical-align: middle;
    line-height: 1.75rem /* 21/12 */;
    a {
      margin-right: 3rem /* 30/12 */;
      text-decoration: none;
      color: #777;
    }
    .router-link-exact-active {
      color: #409eff;
    }
  }
  .search {
    .ivu-input {
      width: 16.666667rem; /* 200/12 */
      border: 1px solid #dcdee2;
      border-radius: 4px;
      padding: 4px 7px;
      font-size: 1.166667rem /* 14/12 */;
      line-height: 1.5rem;
      margin-right: 0.5rem;
    }
    input::placeholder {
      color: #c5c8ce;
    }
    button {
      padding: 6px 9px;
      background: #fff;
      border: 1px solid #dcdee2;
      border-radius: 5px;
      font-weight: 600;
    }
  }
}
</style>