
<template>
  <div class="tabs">
    <!--closable这里说明home是不能关闭的-->
    <el-tag
      :key="tag.path"
      size="medium"
      v-for="(tag, index) in tags"
      :closable="tag.path !== 'welcome'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.path === ('/'+tag.path) ? 'dark' : 'plain'"
    >
      {{ tag.authName }}
    </el-tag>
    <div class="tags-close-box">
      <el-dropdown @command="handleTags">
        <el-button size="small" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="medium" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {

  computed: {
    ...mapState({
      tags: state => state.tab.tabsList,
      currentTag :state => state.tab.currentMenu
    })
  },
  methods: {
    ...mapMutations({
      close: 'closeTab'
    }),
    //关闭标签
    handleClose(tag, index) {
      let length = this.tags.length - 1
      //vuex调方法的另一种写法
      this.close(tag)
      // 如果关闭的标签不是当前路由的话，就不跳转
      if ('/'+tag.path !== this.$route.path) {
        return
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        this.$router.push('/'+this.tags[index - 1].path )
      } else {
        // 否则往右边跳转
        this.$router.push('/'+ this.tags[index].path )
      }
    },

    //选择标签跳转路由
    changeMenu(item) {
      if('/'+item.path===this.$route.path){
        return;
      }
      this.$router.push('/'+item.path)
      this.$store.commit('selectMenu', item)
    },
    // 关闭全部标签
    closeAll(){
      if (this.tags.length===1){
        return;
      }
      const item= [
          {
            path: 'welcome',
            authName: '首页',
            icon: 's-home'
          }
        ]
      this.$store.state.tab.tabsList=item
      this.$store.state.tab.currentMenu=item
      this.$router.push('/welcome')
    },
    // 关闭其他标签
    closeOther(){
      for (let i = this.tags.length - 1; i >= 0; i--) {
        if (this.$store.state.tab.tabsList[i].path !== 'welcome' & '/'+this.$store.state.tab.tabsList[i].path !== this.$route.path) {
          this.$store.state.tab.tabsList.splice(i, 1);
        }
      }
    },
    handleTags(command){
      command === 'other' ? this.closeOther() : this.closeAll();
    }
  }
}



</script>

<style lang="scss" scoped>
.tabs {
  font-size: 22px;
  height: 38px;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  white-space:nowrap;//强制不随窗口改变换行
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 6px 20px 6px 20px;
  margin-bottom: 1%;
  box-shadow:5px 1px 5px #CDCDCD;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
  .tags-close-box {
    position: absolute;
    right: 30px;
    float: right;
    text-align: center;
    box-shadow: -2px -1px 5px 3px rgba(0, 0, 0, .1);
  }
}


</style>
