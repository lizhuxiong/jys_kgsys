<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入设备ID" v-model="equipid" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="selectById"></el-button>
          </el-input>
        </el-col>
        <el-col :span="40">
          <el-button type="primary" @click="addDialogVisible = true">添加设备</el-button>
          <el-button type="primary" @click="uploadDialogVisible = true">批量导入</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
      <el-table :data="list" border stripe  max-height="470">
        <!-- stripe: 斑马条纹
        border：边框-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="MonitorID" label="监控设备ID" sortable></el-table-column>
        <el-table-column prop="MonitorName" label="监控设备名称" sortable></el-table-column>
        <el-table-column prop="LongitudeCoordinates" label="经度坐标" sortable></el-table-column>
        <el-table-column prop="LatitudeCoordinates" label="纬度坐标" sortable></el-table-column>
        <el-table-column prop="MonitorZoneID" label="监控区域代码" sortable></el-table-column>
        <el-table-column prop="MonitorZoneName" label="监控区域名称" sortable></el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showEditDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeById(scope.row.MonitorID)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum" :page-sizes="[2, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
                     :total="totle"></el-pagination>

    </el-card>

    <!-- 添加用户的对话框 -->
    <el-dialog title="添加防火人员信息" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="auto">
        <el-form-item label="队伍ID"  prop="fireProtectionTeamID">
          <el-input v-model="addForm.fireProtectionTeamID"></el-input>
        </el-form-item>
        <el-form-item label="人员姓名" prop="fireProtectionTeamMember">
          <el-input v-model="addForm.fireProtectionTeamMember"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="fireProtectionTeamContact">
          <el-input v-model="addForm.fireProtectionTeamContact"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="add">确 定</el-button>
				<el-button @click="addDialogVisible = false">取 消</el-button>
			</span>
    </el-dialog>

    <!-- 批量导入用户信息 -->
    <el-dialog title="批量导入用户信息" :visible.sync="uploadDialogVisible" width="40%" @close="uploadDialogClosed">
      请先下载批量导入的excel模板，并仔细阅读模板里的说明文字：
      <el-button type="success" icon="el-icon-download" size="mini" @click="downloadresults">下载模板</el-button>
      <hr><br>
      <div class="con" :model="uploadForm">
        <div class="tip">选择上传文件(最大上传10M)：</div>
        <input class="file" type="file" accept=".xls,.xlsx" title="请选择文件" value="请选择文件">
        <el-button type='primary' icon="el-icon-load" class="submit" @click="submit">提交</el-button>
        <br><br>
        <span>当前文件上传进度:</span>
        <br>
        <el-progress :percentage="progressPercent" :text-inside="true" :stroke-width="24"></el-progress>
      </div>

    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改信息" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" label-width="auto">

        <el-form-item label="队伍ID" prop="fProtectionTeamID">
          <el-input v-model="editForm.fireProtectionTeamID" disabled></el-input>
        </el-form-item>
        <el-form-item label="人员姓名" prop="fireProtectionTeamMember">
          <el-input v-model="editForm.fireProtectionTeamMember"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="fireProtectionTeamContact">
          <el-input v-model="editForm.fireProtectionTeamContact"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="edit">确 定</el-button>
				<el-button @click="editDialogVisible = false">取 消</el-button>
			</span>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
var formData = new window.FormData()
export default {
  data() {
    return {
      // 上传
      uploadForm: {},
      uploadDialogVisible: false,
      //上传进度百分比
      progressPercent: 0,

      queryInfo: {
        // 当前页数
        pagenum: 1,
        // 每页显示多少数据
        pagesize: 10
      },
      list: [
        {
          "MonitorID":'2011233',
          "MonitorName":'设备1',
          "LongitudeCoordinates":'119.507544',
          "LatitudeCoordinates":'27.63512',
          "MonitorZoneID":'202',
          "MonitorZoneName":'区域A'
        }


      ],
      equipid: '',
      /*搜索框按学号*/
      totle: 0,
      // 添加用户对话框
      addDialogVisible: false,
      // 用户添加
      addForm: {
        fireProtectionTeamID: '',
        fireProtectionTeamMember: '',
        fireProtectionTeamContact: ''
      },
      // 用户添加表单验证规则
      addFormRules: {
        fireProtectionTeamID: [{
          required: true,
          message: '请输入防火队伍ID',
          min: 1,
          max: 50,
          trigger: 'blur'
        },],
        fireProtectionTeamMember: [{
          required: true,
          message: '请输入人员姓名',
          min: 1,
          max: 100,
          trigger: 'blur'
        },],
        fireProtectionTeamContact: [{
          required: true,
          min: 1,
          max: 50,
          message: '请输入联系方式',
          trigger: 'blur'
        },]
      },
      isShow: true,
      /*专业是否显示*/
      // 修改用户
      editDialogVisible: false,
      editForm: {
      },
      // // 编辑用户表单验证
      deleteFrom: {},
      // 删除用户表单
      editFormRules: {
        fireProtectionTeamID: [{
          required: true,
          message: '请输入防火队伍ID',
          min: 1,
          max: 50,
          trigger: 'blur'
        },],
        fireProtectionTeamMember: [{
          required: true,
          message: '请输入人员姓名',
          min: 1,
          max: 100,
          trigger: 'blur'
        },],
        fireProtectionTeamContact: [{
          required: true,
          min: 1,
          max: 50,
          message: '请输入联系方式',
          trigger: 'blur'
        },]
      },
    }
  },
  created() {
    // this.getList()
  },
  methods: {


    //查所有
    async getList() {
      const {
        data: res
      } = await this.$http.get('firePro/selectAll', {
        params: this.queryInfo
      })
      if (res.code !== 200) {
        return this.$message.error('获取信息失败')
      }
      this.list = res.data.data
      this.totle = res.data.totle
    },


    //查单个
    async selectById() {
      if (this.equipid.length < 1) return this.$message.error('请输入ID')
      const {
        data: res
      } = await this.$http.get('firePro/selectTeam/' + this.equipid)
      if (res.code !== 200) {
        return this.$message.error('查询失败')
      }
      this.list = res.data
    },

    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getList()
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize
      this.getList()
    },
    showAddDialog(){
      this.addDialogVisible = true
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加
    add() {
      // 提交请求前，表单预验证
      if(this.addForm.fireProtectionTeamID=='' ||
          this.addForm.fireProtectionTeamMember==''  ||
          this.addForm.fireProtectionTeamContact=='' )
        return this.$message.error("输入信息不能为空")
      console.log(this.addForm)
      this.$refs.addFormRef.validate(async valid => {
        // 表单预校验失败
        if (!valid)
        {
          return this.$message.error("输入信息不能为空")
          return
        }
        const {
          data: res
        } = await this.$http.post('firePro/insert', this.addForm)
        if (res.code !== 201) {
          return this.$message.error('添加信息失败')
        }
        this.$message.success('添加信息成功')
        // 隐藏添加用户对话框
        this.addDialogVisible = false
        this.getList()
      })
    },
    // 打开编辑对话框
    async showEditDialog(row) {
      this.editForm = row
      //字符串转数组
      this.editDialogVisible = true
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },


    // 修改用户信息
    edit() {

      if(this.editForm.fireProtectionTeamID=='' ||
          this.editForm.fireProtectionTeamMember==''  ||
          this.editForm.fireProtectionTeamContact=='' )
        return this.$message.error("输入信息不能为空")
      // 提交请求前，表单预验证
      this.$refs.editFormRef.validate(async valid => {
        // 表单预校验失败
        if (!valid) return
        const {
          data: res
        } = await this.$http.post('firePro/update', this.editForm)
        if (res.code !== 200) {
          return this.$message.error('更新用户信息失败')
        }
        // 隐藏添加用户对话框
        this.editDialogVisible = false
        this.$message.success('更新用户信息成功')
        this.getList()
      })
    },

    // 删除用户
    async removeById(id) {
      const confirmResult = await this.$confirm(
          '此操作将永久删除该用户, 是否继续?',
          '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
      ).catch(err => err)
      // 点击确定 返回值为：confirm
      // 点击取消 返回值为： cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const {
        data: res
      } = await this.$http.delete('firePro/delete/' + id)
      if (res.code !== 200) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功')
      this.getList()
    },

    // 上传对话框关闭事件
    uploadDialogClosed() {
      this.uploadDialogVisible = false;
    },


    //下载模板
    async downloadresults() {
      await this.$http({
        method: 'get',
        url: 'firePro/Download/',
        responseType: 'blob',
      }).then(res => {
        const href = URL.createObjectURL(res.data) //根据二进制对象创造新的链接
        const a = document.createElement('a')
        a.setAttribute('href', href)
        a.setAttribute('download', 'fireProTemplate.xls') /**/
        a.click()
        URL.revokeObjectURL(href) /*移除href*/
      })
    },


    //批量导入
    async submit() {
      // 上传新文件时，将进度条值置为零
      this.progressPercent = 0
      this.progressFlag = true
      // 'file' 这个名字要和后台获取文件的名字一样;
      formData.append('file', document.querySelector('input[type=file]').files[0])
      const {
        data: res
      } = await this.$http({
        url: 'firePro/Upload',
        data: formData,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        },
        onUploadProgress: progressEvent => {
          //progressEvent.loaded:已上传文件大小
          //progressEvent.total:被上传文件的总大小
          this.progressPercent = parseInt(progressEvent.loaded / progressEvent.total * 100)
          //parseInt 将进度条数字转换为整型
        }
      })
      if (res.code !== 200) {
        if(res.code == 202){
          this.progressPercent = 0
          return this.$message.error(res.data)
        }
        // return this.$message.error("本次导入失败，请删除已存在用户"
        // +res.data+"重新导入");
      }
      formData.delete('file')
      //清空进度条
      this.progressPercent = 0
      this.$message.success("批量导入成功");
      this.uploadDialogVisible = false;
      this.getList();
    },
  }
}
</script>
