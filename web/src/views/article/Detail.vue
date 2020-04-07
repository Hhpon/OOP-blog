<template>
  <div class="page-deatil" v-if="model">
    <div class="article-deatil">
      <mavon-editor
        v-model="model.body"
        :ishljs="true"
        :defaultOpen="'preview'"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      />
      <el-card class="comment">
        <div slot="header" class="clearfix">
          <span>评论列表</span>
        </div>
        <div class="comment-item" v-for="(item,index) in commentLists" :key="index">
          <div class="comment-header">
            <el-avatar icon="el-icon-user-solid" size="small"></el-avatar>
            <span class="author">{{item.author}}</span>
          </div>
          <div class="content">{{item.content}}</div>
          <div class="other">{{item.create_data.slice(0,10)}}</div>
        </div>
      </el-card>
      <el-card class="comment">
        <div slot="header" class="clearfix">
          <span>发表评论</span>
        </div>
        <div class="comment-item">
          <el-input type="textarea" :rows="2" placeholder="请发表评论" v-model="comment.content"></el-input>
          <div style="text-align:right;margin-top: 10px;">
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import sidebar from "../../components/Sidebar";

export default {
  components: {
    sidebar
  },
  props: {
    id: { require: true }
  },
  data() {
    return {
      model: {},
      comment: {
        author: sessionStorage.getItem("username"),
        article: this.id,
        content: ""
      },
      commentLists: [],
      textarea: ""
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`article/${this.id}`);
      this.model = res.data;
    },
    async submit() {
      if (!sessionStorage.getItem("username")) {
        this.$message({
          type: "error",
          message: "请先登录"
        });
        return;
      }
      const res = await this.$http.post(`comment`, this.comment);
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.getComments();
      this.comment.content = "";
    },
    async getComments() {
      const res = await this.$http.get(`comments/${this.id}`);
      this.commentLists = res.data;
    }
  },
  created() {
    this.fetch();
    this.getComments();
  }
};
</script>

<style lang="scss">
.page-deatil {
  width: 70%;
  min-height: 80vh;
  margin: 20px auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .article-deatil {
    padding: 20px;
    min-width: 80%;
    font-size: 1.333333rem /* 16/12 */;
    background: #fff;
    line-height: 2rem /* 24/12 */;
    // flex: 1;
    margin-right: 1.916667rem /* 23/12 */;
    border-radius: 15px;
    img {
      width: 50%;
      height: auto;
    }
    .comment {
      margin-top: 10px;
      .comment-item {
        padding-top: 10px;
      }
      .comment-header {
        display: flex;
        align-items: center;
        .author {
          margin-left: 10px;
        }
      }
      .content {
        padding: 10px 0;
        font-size: 14px;
      }
      .other {
        font-size: 14px;
        color: #ccc;
      }
    }
  }
}
</style>
