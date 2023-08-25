<template>
    <header>
        <div class="l-content">
          <div class="collapse-btn">
            <i v-show="!isCollapse" class="el-icon-s-fold" @click="collapseMenu"></i>
            <i v-show="isCollapse" class="el-icon-s-unfold" @click="collapseMenu"></i>
          </div>
          <div style="height: 15px;  overflow: hidden;white-space:nowrap;">
            <transition
              appear
              enter-active-class="animated bounceOutLeft">
              <div>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item>首页</el-breadcrumb-item>
                  <!--第二级菜单-->
                  <el-breadcrumb-item v-if="current.lable!==undefined" >{{current.lable}}</el-breadcrumb-item>
                  <el-breadcrumb-item v-if="current.lable!==undefined" >{{current.authName}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>

            </transition>

          </div>

        </div>
     <div class="r-content">
<!--       <span class="font2">{{username+"("+userid+")"}}: {{role}} </span>-->
<!--       		<i v-show="isShow1" style="color:#2c5066; font-weight: bold;" class='el-icon-refresh'>-->
<!--       		</i><el-button v-show="isShow1" type='text' class='font1' @click="roleDialogVisible = true"-->
<!--       		style='font-size: 15px;'>切换</el-button>-->
<!--       		&lt;!&ndash; 原图标颜色：#41b6ff &ndash;&gt;-->
       		<i style="color:#2c5066; font-weight: bold;" class='el-icon-switch-button'>
       		</i><el-button type='text' class='font1' @click.native="logOut"
       		style='font-size: 15px;'>退出</el-button>
      </div>

<!--      &lt;!&ndash; 切换角色的对话框 &ndash;&gt;-->
<!--      <el-dialog-->
<!--        title="切换角色"-->
<!--        :visible.sync="roleDialogVisible"-->
<!--        width="30%"-->

<!--      >-->
<!--        &lt;!&ndash; 内容主体 label-width每条前面标签长度&ndash;&gt;-->
<!--        <el-form-->
<!--          label-width="160px"-->
<!--        >-->
<!--          <el-form-item label="请输入需要切换的角色">-->
<!--      		&lt;!&ndash;下拉框&ndash;&gt;-->
<!--      		<el-select v-model="roleone">-->
<!--      			<el-option :key='index'-->
<!--      			:value="roleone"-->
<!--      			v-for="(roleone,index) in roleList">-->
<!--      			{{roleone}}</el-option>-->
<!--      		</el-select>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--         <span slot="footer" class="dialog-footer">-->
<!--           <el-button type="primary" @click="roleShift">确 定</el-button>-->
<!--      	 <el-button  @click="roleDialogVisible = false">取 消</el-button>-->
<!--        </span>-->
<!--      </el-dialog>-->
    </header>

</template>

<script>
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState({
              // 获取当前路由
                current: state => state.tab.currentMenu
            }),
          isCollapse() {
            // vuex获取
            return this.$store.state.tab.isCollapse
          }
        },
        data() {
        	return {
            //切换按钮
            isShow1:true,
        		//切换角色
        		roleDialogVisible:false,
        		roleAll:'',
        		roleList:[],
        		roleone:'',
        		token:'',
        		//用户信息
        		userid: '',
        		username: '',
        		role: '',
        	}
        },
        created() {
        	this.userid = window.sessionStorage.getItem('userid')
        	this.username = window.sessionStorage.getItem('username')
        	this.token = window.localStorage.getItem('Authorization')
        	this.role = window.sessionStorage.getItem('role')
        	this.roleList = window.sessionStorage.getItem('roleList')
        	this.roleList=this.roleList.split(",")
          if(this.roleList.length<=1) this.isShow1=false
        	this.roleone=this.role //切换角色时展示现有角色
        },
        methods: {
            //控制左侧菜单是否折叠
            collapseMenu() {
                this.$store.commit('collapseMenu')
            },
            welcome() {
              if(this.$route.path==='/welcome'){
                return;
              }
              this.$router.push('/welcome')
            },
            //退出登陆
            logOut() {
              // 清空token
              window.localStorage.clear()
              window.sessionStorage.clear()
              //清空标签
              this.$store.commit('resetTab')
              this.$router.push('/login')

            },
            //角色切换
            async roleShift() {
            	const {
            		data: res,
            		} =await this.$http.post('roleShift/menus',{
            			token:this.token,
            			roleone:this.roleone,
            		})
            	if (res.code !== 200) return this.$message.error("角色切换失败")
            	this.$message.success("角色切换成功")
            	this.menuList = res.data.list
            	this.roleDialogVisible = false
            	window.sessionStorage.setItem('role',this.roleone)
            	window.localStorage.setItem('Authorization', res.data.token)
            	window.sessionStorage.setItem('userid',res.data.userPo.userid)
            	window.sessionStorage.setItem('username',res.data.userPo.name)
            	window.sessionStorage.setItem('academy',res.data.userPo.academy)
            	window.sessionStorage.setItem('major_grade',res.data.userPo.major)
            	window.sessionStorage.setItem('sex_one',res.data.userPo.sex_one)
            	window.sessionStorage.setItem('rank',res.data.userPo.rank)
            	window.sessionStorage.setItem('phone',res.data.userPo.phone)
            	window.sessionStorage.setItem('qq',res.data.userPo.qq)
            	window.sessionStorage.setItem('email',res.data.userPo.email)
              this.$store.commit('resetTab')
              if('/welcome'!==this.$route.path){
                await this.$router.push('/welcome')
              }
              window.location.reload(true)
            },
        }
    }
</script>

<style lang="scss" scoped>
    header {
      position: relative;
      box-sizing: border-box;
      height: 55px;
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 22px;//控制图标大小
      justify-content: space-between;
    }
    .collapse-btn{
      margin-right: 26px;
      cursor: pointer;
    }
    .collapse-btn:hover{
      box-shadow:4px 15px 10px rgba(0, 0, 0, 0.7);
      transform:rotate(-3deg);
    }

    .l-content {
      display: flex;
      align-items: center;
      overflow: hidden;

    }
    .r-content {
      display: flex;
      align-items: center;
      float: right;
      padding-right: 18px;
      overflow: hidden;
      white-space:nowrap;
    }
    //身份信息 字体
    .font1{
    	font-size:16px;
    	color:#2c5066;
    	padding-right: 10px;
    }
    .font1:hover{
      //color: #41b6ff;
      color: #2d8cf0;
    }
    .font2{
    	font-size:16px;
    	color:#2c5066;
    	padding-right: 4%;
    }
</style>

<style lang="scss" scoped>
    .el-breadcrumb__item {
         white-space:nowrap;
        .el-breadcrumb__inner {
            color: #000000;
            font-weight: normal;
        }
    }
</style>
