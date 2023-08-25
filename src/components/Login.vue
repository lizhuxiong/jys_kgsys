<template>
	<!-- <div> -->
	<div class="login_container">
		<div class="login_box">
			<!-- 登录表单 -->
			<div>

				<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="100px" class="login_form">
					<div class="title-container">
						<!-- <img src="@/assets/login-logo.png" class="img" alt /> -->
						<h3 class="title">缙云山灭火知识图谱系统</h3>
					</div>
					<el-form-item label='账号' prop="userId" class='form-item'>
						<el-input  v-model="loginForm.userId" prefix-icon="iconfont icon-user"></el-input>
					</el-form-item>
					<el-form-item label='密码' prop="password">
						<el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
					</el-form-item>
					<el-form-item class="btns">
						<el-button type="primary" @click="login">登录</el-button>
						&nbsp;
						<el-button type="info" @click="resetLoginForm">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
    <div style='width: 100%;padding: 0;min-width: 1200px;position: fixed;bottom: 0'>
      <div style='background: #08284e; height: 60px; margin: 0 auto;'>
        <div style='width: 100%;margin: 0 auto;'>
          <p style='color: #ffffff;font:16px/25px 微软雅黑, 宋体, sans-serif;text-align: center;line-height: 30px;'>
            西南大学 邮编：*****
            <br>
            版权：*********** All Rights Reserved
          </p>
        </div>
      </div>
    </div>
	</div>

	<!-- </div> -->
</template>

<script>
	export default {
		data() {
			return {
				/**
				 * roleAll:后台返回用户的所有角色id
				 * roleList:可供选择的所有角色名
				 * roleone:用户选择的某一特定角色
				 * role:roleone存在session里的名字
				 */
				//角色选择框是否显示
				isShow1:false,
				// //登录白框多高
				// height1:'360px',
				loginForm: {
					userId: '',
					password: '',
				},
				// 表单验证
				loginFormRules: {
					userId: [{
						required: true,
						trigger: 'blur',
						// pattern: /^\d{12}$/,
						// message: '请输入12位学号',
						/*未按要求的提示信息*/
					}],
					password: [{
						required: true,
						min: 6,
						max: 18,
						trigger: 'blur',
						// message: '请输入6-18位用户密码',
					}],
				},
				//切换角色
				roleDialogVisible:false,
			}
		},
		methods: {
			// 表单重置按钮
			resetLoginForm() {
				this.loginForm.userId = '',
				this.loginForm.password = ''
			},
			login() {
				//只有一个角色的 手动存入角色
				// 表单预验证
				this.$refs.loginFormRef.validate(async valid => {
					if (!valid) return false
					const {
						data: res
					} = await this.$http.post('login', this.loginForm)
					if (res.code !== 200) return this.$message.error('登录失败')
					this.$message.success({duration:1000,message:'登录成功'})
					window.localStorage.setItem('Authorization', res.data.token)
          // 2,通过编程式导航跳转到后台主页, 路由地址为：/home
          this.$store.commit('resetTab')
          await this.$router.push('/home')
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	/* // lang="less" 支持less格式
// scoped vue的指令，只在当前组件生效 */
	.login_container {
		// background-color: #2b4b6b;
		height: 100%;
		width: 100%;
		background-image: url("../assets/login_bg_new.jpg");
		background-size: cover;
		background-position: center;
		position: absolute;
	}

	//输入白框
	.login_box {
		width: 450px;
		height: 360px;
		background-color: #fff;
		border-radius: 5px;
		position: relative;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);

    border: 1px solid #eaeaea;
    //box-shadow: 0 15px 0 0 #409EFF;
    box-shadow: 0 0 10px #9e9c9c;

		.avatar_box {
			width: 130px;
			height: 130px;
			border: 1px solid #eee;
			border-radius: 50%;
			padding: 10px;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;

			img {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background-color: #eee;
			}
		}
	}

	.login_form {
		position: absolute;
		// width: 100%;
		/*向左移出去60*/
		height: 100%;
		/*表示占满父级高度*/
		padding: 20px 20px;
		/*离父级上下左右各20px*/
		box-sizing: border-box;
	}

	.title-container {
		position: relative;

		img {
			width: 132px;
			height: 30px;
			padding-left: 130px;
		}

		.title {
			font-size: 26px;
			color: black;
			margin: 20px auto 40px auto;
			// text-align: center;
			font-weight: bold;
			padding-left: 80px;
		}
	}

	.btns {
    padding-top: 10px;
		display: flex;
		justify-content: center;
    padding-right: 28px;
	}

	.info {
		font-size: 13px;
	}
</style>
