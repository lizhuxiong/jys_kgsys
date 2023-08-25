<template>
  <!--collapse 是否水平折叠收起菜单-->
  <el-menu
      unique-opened
      :collapse="isCollapse"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#324157"
      text-color="#BFCBD9"
      active-text-color="#397DFB"
  >
    <!--是否水平折叠收起菜单 会影响这里字段的显示 -->
    <div class="logo">
      <div style="padding-top: 10px;">
        <img src="../../assets/home.png" width="23%"/>
      </div>
      <div style="margin-top: -14px;">
        <span v-show="isCollapse"></span>
        <span v-show="!isCollapse">缙云山森林灭火知识图谱系统</span>
      </div>

    </div>
    <el-menu-item :index="'/' + item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.authName }}</span>
    </el-menu-item>
    <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
      <!-- 一级菜单的模板区域 -->
      <template slot="title">
        <i :class="iconObj[item.id]"></i>
        <span>{{ item.authName}}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item class='el-menu-item-two' :index="'/' + subItem.path" v-for="subItem in item.children"
                    :key="subItem.id"
                    @click="clickMenu(subItem)">
        <!-- 导航开启路由模式：将index值作为导航路由 -->
        <!-- 二级菜单的模板区域 -->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{ subItem.authName}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  //计算属性
  computed: {
    //没有子菜单
    noChildren() {
      return this.menu.filter(item => !item.children)
    },
    isCollapse() {
      // 这里的数据就是从vuex取得
      return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      menu: [
        {
          path: 'welcome',
          authName: '首页',
          icon: 's-home',
        }
      ],
      //用户信息
      userid: '',
      username: '',
      role: '',
      // 左侧菜单数据
      menuList: [
        {
          "id": "123",
          "authName": "深林防火",
          "path": "",
          "lable": null,
          "children": [
            {
              "id": "111",
              "authName": "火灾信息",
              "path": "fireInfo",
              "lable": "深林防火",
              "children": null
            },
            {
              "id": "111",
              "authName": "防火队伍",
              "path": "firePreTeam",
              "lable": "深林防火",
              "children": null
            },
            {
              "id": "111",
              "authName": "防火设施",
              "path": "firePreResource",
              "lable": "深林防火",
              "children": null
            }
          ]
        },
        {
          "id": "111",
          "authName": "森林资源",
          "path": "",
          "lable": null,
          "children": [
            {
              "id": "114",
              "authName": "资源信息",
              "path": "forestResource",
              "lable": "森林资源",
              "children": null
            },
            {
              "id": "114",
              "authName": "保护区域",
              "path": "protecRegion",
              "lable": "森林资源",
              "children": null
            },
            {
              "id": "114",
              "authName": "监控设备",
              "path": "monitorEquip",
              "lable": "森林资源",
              "children": null
            }
          ]
        },
        {
          "id": "103",
          "authName": "护林巡查",
          "path": "",
          "lable": null,
          "children": [
            {
              "id": "124",
              "authName": "巡检人员信息",
              "path": "forestPatrol",
              "lable": "",
              "children": null
            }
          ]
        },
        {
          "id": "108",
          "authName": "居民点信息",
          "path": "",
          "lable": null,
          "children": [
            {
              "id": "124",
              "authName": "居民点信息",
              "path": "residentInfo",
              "lable": "",
              "children": null
            }
          ]
        },
        {
          "id": "113",
          "authName": "知识图谱",
          "path": "",
          "lable": null,
          "children": [
            {
              "id": "124",
              "authName": "图谱信息",
              "path": "kg",
              "lable": "",
              "children": null
            }
          ]
        }
      ],
      iconObj: {
        /**
         * 100 首页
         * 101 项目管理
         * 102 申报选题
         * 103 申请项目
         * 104 师生双选管理
         * 105 成绩管理
         * 106 成果管理
         * 107 资料导出
         * 108 账号管理
         * 123 答辩信息
		 * 125 学院管理
         * */
        '100': 'el-icon-s-home',
        '101': 'el-icon-s-cooperation',
        '102': 'el-icon-s-opportunity',
        '103': 'el-icon-s-order',
        '104': 'el-icon-s-check',
        '105': 'el-icon-document',
        '106': 'el-icon-upload',
        '107': 'el-icon-download',
        '108': 'el-icon-user-solid',
        '123': 'el-icon-message-solid',
		    '125': 'el-icon-office-building',
        '111':'el-icon-location-information',
        '113':'el-icon-edit-outline'
      },

    }
  },
  created() {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    this.userid = window.sessionStorage.getItem('userid')
    this.username = window.sessionStorage.getItem('username')
    this.role = window.sessionStorage.getItem('role')
  },
  methods: {
    //跳转路由 根据名称跳转
    clickMenu(item) {
      if('/'+item.path===this.$route.path){
        return;
      }
      this.$store.commit('selectMenu', item)
      // console.log(item.path)
      this.$router.push('/'+item.path)
    },
    //获取请求菜单
    //封装
    // async getMenuList() {
    //   const {
    //     data: res,
    //   } =await this.$http.get('menus')
    //   if (res.code !== 200) return this.$message.error(res.msg)
    //   // this.menuList = res.data
    // }
  }
}
</script>

<style lang="scss" scoped>
.el-menu {
  white-space:nowrap;
  position: relative;
  height: 100%;
  border: none;
  .logo {
    font-size: 15px;
    color: #ffffff;
    text-align: center;
    line-height: 48px;
  }
  .el-menu-item-two{
    background-color: #1F2D3D!important;
  }
  .el-menu-item-two:hover{
    background-color: #001528!important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 215px;
  min-height: 400px;
}
</style>
