<template>
  <div>
    <!-- 顶上公告 -->
<!--    <el-row :gutter="20">-->
<!--      <el-col>-->
<!--        <el-card class="info" shadow="hover">-->
<!--          <div @click="into">-->
<!--            <notice :message="message"></notice>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20" style='margin-top: 20px;'>-->
<!--      &lt;!&ndash; 项目时间 &ndash;&gt;-->
<!--      <el-col :span="12">-->
<!--        <el-card shadow="hover" style="height: 310px;padding-top: 20px">-->
<!--          <div slot="header" class="clearfix" style='font-size: 17px;height: 35px'>-->
<!--            <span>西南石油大学{{period}}({{year}})大学生课外开放实验项目相关时间</span>-->
<!--          </div>-->
<!--          <div class="text middle1">所有项目立项时间：{{startTime}}</div>-->
<!--          <el-popover placement="bottom" width="200" trigger="click" content="在此时间之前 需完成本学年所有项目的申报、立项审核及学生申请">-->
<!--            <el-button class="lookbtn1" type="text" slot="reference">详情</el-button>-->
<!--          </el-popover>-->
<!--          <br>-->
<!--          <div class="text middle2">普通项目截止时间：{{endTimeP}}</div>-->
<!--          <el-popover placement="bottom" width="200" trigger="click" content="在此时间之前 需完成本学年所有普通项目的相关操作">-->
<!--            <el-button class="lookbtn1" type="text" slot="reference">详情</el-button>-->
<!--          </el-popover>-->
<!--          <br>-->
<!--          <div class="text middle3">重点项目截止时间：{{endTimeZ}}</div>-->
<!--          <el-popover placement="bottom" width="200" trigger="click" content="在此时间之前 需完成本学年所有重点项目的相关操作">-->
<!--            <el-button class="lookbtn1" type="text" slot="reference">详情</el-button>-->
<!--          </el-popover>-->
<!--          <div class="bottom1" v-if="role=='校区管理员'" >-->
<!--            <el-button style="float: right; padding: 3px 0" type="text" @click="showEditDialog">修改按钮</el-button>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      &lt;!&ndash; 答辩信息 &ndash;&gt;-->
<!--      <el-col :span="12">-->
<!--        <el-card shadow="hover" style="height: 310px;padding-top: 20px">-->
<!--          <div slot="header" class="clearfix" style='font-size: 17px;height: 35px'>-->
<!--            <span v-if="role!=='校区管理员'">西南石油大学{{period}}({{year}})大学生课外开放实验<span class="academy">{{academy}}</span>答辩通知</span>-->
<!--            <span v-if="role=='校区管理员'">西南石油大学{{period}}({{year}})大学生课外开放实验答辩通知</span>-->
<!--          </div>-->
<!--          &lt;!&ndash; <div v-if="role!=='校区管理员'"> &ndash;&gt;-->
<!--          <div v-if="role!=='校区管理员'" class="text middle1">普通项目结题答辩：{{timeP}}</div>-->
<!--          <div v-if="role=='校区管理员'" class="text middle1">财经学院重点项目{{nameC}}：{{timeC}}</div>-->
<!--          <el-popover placement="bottom" width="200" trigger="click" :content="address1">-->
<!--            <el-button class="lookbtn1" type="text" slot="reference">详情</el-button>-->
<!--          </el-popover>-->
<!--          <br>-->
<!--          <div v-if="role!=='校区管理员'" class="text middle2">重点项目中期答辩：{{timeZM}}</div>-->
<!--          <div v-if="role=='校区管理员'" class="text middle2">信息学院重点项目{{nameX}}：{{timeX}}</div>-->
<!--          <el-popover placement="bottom" width="200" trigger="click" :content="address2">-->
<!--            <el-button class="lookbtn1" type="text" slot="reference">详情</el-button>-->
<!--          </el-popover>-->
<!--          <br>-->
<!--          <div v-if="role!=='校区管理员'" class="text middle3">重点项目结题答辩：{{timeZE}}</div>-->
<!--          <div v-if="role=='校区管理员'" class="text middle3">工程学院重点项目{{nameG}}：{{timeG}}</div>-->
<!--          <el-popover placement="bottom" width="200" trigger="click" :content="address3">-->
<!--            <el-button class="lookbtn1" type="text" slot="reference">详情</el-button>-->
<!--          </el-popover>-->
<!--          <div class="bottom2">-->
<!--            <el-button style="float: right; padding: 3px 0" type="text" @click="intoDefence">更多答辩信息</el-button>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    &lt;!&ndash; 项目日期设置对话框 &ndash;&gt;-->
<!--    <el-dialog title="设置项目时间" :visible.sync="editDialogVisible" width="35%">-->
<!--      &lt;!&ndash; 内容主体 &ndash;&gt;-->
<!--      <el-form :model="editForm" ref="editFormRef" :rules="FormRules" label-width="130px">-->
<!--        <el-form-item label="期数" prop="period">-->
<!--          <el-input style='width: 60%' v-model="editForm.period" placeholder="如：第十八期"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="学年" prop="year">-->
<!--          <el-input  style='width: 60%' v-model="editForm.year" placeholder="如：2018-2019年度"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="立项时间" prop="startTime">-->
<!--          <div class="block">-->
<!--            <el-date-picker v-model="startdate" value="yyyy-MM-dd" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="普通项目结题时间" prop="endTimeP">-->
<!--          <div class="block">-->
<!--            <el-date-picker v-model="endPdate" value="yyyy-MM-dd" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="重点项目结题时间" prop="endTimeZ">-->
<!--          <div class="block">-->
<!--            <el-date-picker v-model="endZdate" value="yyyy-MM-dd" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">-->
<!--            </el-date-picker>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--					<el-button type="primary" @click="edit">确 定</el-button>-->
<!--					<el-button @click="editDialogVisible = false">取 消</el-button>-->
<!--				</span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import notice from "./notice";
export default {
  components: {
    notice
  },
  name: "HelloWorld",
  data() {
    //获取当前时间
    var date = new Date()
    var curYear = date.getFullYear()
    var curMon = date.getMonth()
    var curDay = date.getDate()
    return {
      //left展示信息
      leftitle:'温馨提示',
      //项目展示时间
      period: '第十八期',
      year: 'xxxx-xxxx年度',
      startTime: '暂无本学年立项时间',
      endTimeP: '暂无本学年普通项目截止时间',
      endTimeZ: '暂无本学年重点项目截止时间',
      //时间操作列是否暂时
      isShow1: false,
      //所有时间
      timelist: [],
      //输入原时间
      yeardate: [new Date(curYear, curMon), new Date(curYear + 1, curMon)],
      y1: '',
      y2: '',
      startdate: new Date(curYear, curMon, curDay),
      endPdate: new Date(curYear + 1, curMon + 6 - 12, curDay),
      endZdate: new Date(curYear + 1, curMon, curDay),
      y: '',
      m: '',
      d: '',
      hh: '',
      mm: '',
      ss: '',
      //修改时间设置对话框
      editDialogVisible: false,
      editForm: {
        id:'1',
        period: '第x期',
        year: 'xxxx-xxxx年度',
        startTime: '',
        endTimeP: '',
        endTimeZ: '',
      },
      //表单验证
      FormRules: {
        period: [{
          required: true,
          message: "请输入项目期数",
          trigger: "blur"
        }, ],
        year: [
          { required: true, message: "请输入项目学年", trigger: "blur" },
        ],
      },
      list: [],
      teacnt: 0,
      message: "欢迎来到后台管理",
      totle: 0,
      roleid: '1',
      role: '校区管理员',
      username: '',
      name: '',
      queryInfo: {
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 5
      },
      //答辩时间
      timeP:'暂无答辩时间',
      timeZM:'暂无答辩时间',
      timeZE:'暂无答辩时间',
      academy:'',
      //管理员显示 答辩时间
      nameC:'',
      nameX:'',
      nameG:'',
      timeC:'暂无答辩时间',
      timeX:'暂无答辩时间',
      timeG:'暂无答辩时间',
      address1:'暂无',
      address2:'暂无',
      address3:'暂无',

    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='css' scoped>
/* 顶上公告card高宽 */
.info {
  /*margin-left: 10px;*/
  height: 100px;
  width: 100%;
}

.text {
  font-size: 14px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

/*		  .box-card {
		    width: 480px;
		  }*/
/*列表内容*/
.middle1{
  display:inline-block;
  /* margin-left: auto; */
  margin-bottom: 18px;
}
.middle2{
  display:inline-block;
  /* margin-left: auto;*/
  margin-bottom: 18px;
}
.middle3{
  display:inline-block;
  /* margin-left: auto;*/
  margin-bottom: 18px;
}
/*查看详情按钮位置*/
.lookbtn1{
  display:inline-block;
  margin-left: 40px;
}
/*修改按钮位置*/
.bottom1{
  margin-right: auto;
  margin-top: 18px;
  /* color:#409eff; */
}
.bottom2{
  /* margin-right: auto; */
  margin-top: 18px;
  /* color:#409eff; */
}
/*学院字体加粗*/
.academy{
  font-weight: bold;
}
</style>
