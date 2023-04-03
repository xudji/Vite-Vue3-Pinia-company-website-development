<template>
  <div class="container">
    <section>
      <div class="login-box">
        <!-- 登录框左侧 -->
        <div class="login-left">
          <a href="/" title="小鹿线" class="logo">
            <img src="../assets/img/logo02.png" alt="小鹿线" title="小鹿线" />
          </a>
          <div class="left-qrcode">
            <div id="qrcode" title="小鹿线">
              <canvas width="180" height="180" style="display: none"></canvas
              ><img src="" style="display: block" />
            </div>
            <div class="qrcode-text">扫码登录</div>
          </div>
          <div class="quick-login">快捷登录</div>
          <div class="qq-wx-wb">
            <div class="wx-login">
              <a href="/oauth/login/WECHAT_OPEN" title="微信登录"
                ><i class="fa fa-weixin"></i
              ></a>
            </div>
            <div class="qq-login">
              <a href="/oauth/login/qq" title="QQ登录"
                ><i class="fa fa-qq"></i
              ></a>
            </div>
            <div class="weibo-login">
              <a href="/oauth/login/weibo" title="微博登录"
                ><i class="fa fa-weibo"></i
              ></a>
            </div>
          </div>
        </div>
        <!-- 登录框右侧 -->
        <div class="login-right">
          <div class="login-form">
            <ul class="nav nav-tabs">
              <li
                v-for="item in loginTxt"
                :key="item.id"
                class="nav-items"
                :class="current == item.id ? 'actives' : ''"
                @click="loginChange(item.id)"
              >
                <a :class="current == item.id ? 'activess' : ''">{{
                  item.text
                }}</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" v-if="current == 1">
                <!-- 账号登录 -->
                <div class="tab-main">
                  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                    <el-form-item class="login-user" prop="username">
                      <el-icon><avatar /></el-icon>
                      <el-input
                        v-model="ruleForm.username"
                        placeholder="请输入您的用户名"
                      />
                    </el-form-item>
                    <el-form-item class="login-password" prop="userpwd">
                      <el-icon><lock /></el-icon>
                      <el-input
                        type="password"
                        v-model="ruleForm.userpwd"
                        placeholder="请输入您的密码"
                      />
                    </el-form-item>
                    <el-form-item class="login-submit">
                      <el-button type="primary" @click="userBtn(ruleFormRef)"
                        >登录</el-button
                      >
                    </el-form-item>
                    <a class="forgetpwd">忘记密码？</a>
                    <div class="login-text">
                      登录即同意相关服务条款和隐私政策
                      <a>《用户服务协议》</a><a>《隐私政策》</a>
                      若您没有账号，系统将为您自动创建账号并登录。
                    </div>
                  </el-form>
                </div>
              </div>
              <div class="tab-pane fade" v-else>
                <!-- 短信登录 -->
                <div class="tab-main">
                  <el-form
                    ref="ruleFormRefPhone"
                    :model="ruleFormPhone"
                    :rules="rulesPhone"
                  >
                    <el-form-item class="login-user" prop="phone">
                      <el-icon><avatar /></el-icon>
                      <el-input
                        v-model="ruleFormPhone.phone"
                        placeholder="请输入您的手机号"
                      />
                    </el-form-item>

                    <el-form-item class="login-Verification" prop="captcha">
                      <el-input
                        v-model="ruleFormPhone.captcha"
                        placeholder="请输入您的验证码"
                      />
                      <el-button
                        @click="sendCode"
                        class="btn btn-primary sendcaptcha"
                        type="primary"
                        >{{ captcha }}</el-button
                      >
                    </el-form-item>
                    <div class="login-submit">
                      <el-button
                        @click="phoneBtn(ruleFormRefPhone)"
                        class="btn btn-primary sendcaptcha"
                        type="primary"
                        >登录</el-button
                      >
                    </div>
                    <div class="login-text">
                      登录即同意相关服务条款和隐私政策
                      <a>《用户服务协议》</a><a>《隐私政策》</a>
                      若您没有账号，系统将为您自动创建账号并登录。
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Verify
    ref="verify"
    :captcha-type="'blockPuzzle'"
    :img-size="{ width: '400px', height: '200px' }"
    @success="onSuccess"
  >
  </Verify>
</template>

<script setup>
//element-ui
import { Avatar, Lock, Iphone } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
//api
import { loginByJson, sendCaptcha, loginByMobile } from "../utils/api/login";
//加密
import { Encrypt } from "../utils/aes";
//pinia
import { useUserStore } from "../store/user";
import Verify from "../components/verifition/Verify.vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const router = useRouter();
//账号登录和短信登录切换
let current = ref(1);
//账号登录和短信登录
let loginTxt = ref([
  { id: 1, text: "账号登录" },
  { id: 2, text: "短信登录" },
]);
const loginChange = (id) => {
  current.value = id;
};
//账号密码登录
const ruleFormRef = ref("");
let ruleForm = reactive({
  username: "",
  userpwd: "",
});
let rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位用户名", trigger: "blur" },
  ],
  userpwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 11, message: "请输入3-11位密码", trigger: "blur" },
  ],
});
//账号密码点击登录
const userBtn = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      loginByJson({
        username: Encrypt(ruleForm.username),
        password: Encrypt(ruleForm.userpwd),
      }).then((res) => {
        //登录成功
        if (res.meta.code != "10006") {
          ElMessage({
            showClose: true,
            message: res.meta.msg,
            type: "error",
          });
          return;
        }
        userStore.setToken(res.data.accessToken);
        ElMessage({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
        router.go(-1);
      });
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确格式",
        type: "warning",
      });
    }
  });
};
//短信登录
let captcha = ref("发送验证码");
const ruleFormRefPhone = ref("");
let ruleFormPhone = reactive({
  phone: "",
  captcha: "",
});
let rulesPhone = reactive({
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3456789]\d{9}$/, message: "目前只支持中国大陆的手机号码" },
  ],
  captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
//引入滑块组件

let verify = ref();

let phoneTimer = null;
//验证码倒计时
const interCode = () => {
  let timer = 10;
  captcha.value = `重新发送10秒`;
  clearInterval(phoneTimer);
  phoneTimer = setInterval(() => {
    timer--;
    if (timer <= 0) {
      clearInterval(phoneTimer);
      captcha.value = "重新发送";
      timer = 10;
    } else {
      captcha.value = `重新发送${timer}秒`;
    }
  }, 1000);
};
//滑动成功
const onSuccess = () => {
  sendCaptcha({
    mobile: ruleFormPhone.phone,
  }).then((res) => {
    if (res.meta.code == "200") {
      //开始倒计时
      interCode();
    }
  });
};
//发送验证码
const sendCode = () => {
  //用户输入的手机号
  let phone = ruleFormPhone.phone;
  let regTel = /^1[3456789]\d{9}$/;
  if (!regTel.test(phone)) {
    ElMessage({
      showClose: true,
      message: "请输入正确手机号",
      type: "warning",
    });
    return;
  }
  verify.value.show();
};

//登录按钮
const phoneBtn = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      //用户输入的手机号
      let mobile = Encrypt(ruleFormPhone.phone);
      //用户输入的验证码
      let captcha = ruleFormPhone.captcha;
      loginByMobile({ mobile, captcha }).then((res) => {
        //登录成功
        if (res.meta.code != "10006") {
          ElMessage({
            showClose: true,
            message: res.meta.msg,
            type: "error",
          });
          return;
        }
        userStore.setToken(res.data.accessToken); // 存token
        ElMessage({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
        router.go(-1);
      });
    } else {
      ElMessage({
        showClose: true,
        message: "请输入正确格式",
        type: "warning",
      });
    }
  });
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url(../assets/img/loginbg.jpeg) no-repeat center;
}
section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  z-index: 10;
}
.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 950px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  box-shadow: 0px 0px 5px #777;
}
.login-left {
  width: 475px;
  height: 500px;
  background: #388fff;
}
.login-right {
  position: relative;
  width: 475px;
  height: 500px;
  background: url(../assets/img/ybbg.jpeg) no-repeat center center;
}

.nav-tabs {
  border-bottom: none;
}
.login-form {
  padding: 10px 40px;
  width: 350px;
  height: 440px;
  background: #ffffff;
  box-shadow: 0 0 8px #cccccc;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.nav-tabs {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.nav-tabs li {
  width: 40%;
  padding: 0px 0;
  font-size: 17px;
  font-weight: bold;
}
.nav-tabs li a {
  color: #333;
  display: block;
  height: 45px;
  line-height: 45px;
}
.actives {
  color: #388eff;
  border-bottom: 4px solid #388eff;
}
.activess {
  color: #388eff !important;
}
.nav-tabs li a:hover {
  text-decoration: none;
}
.tab-main {
  height: 360px;
  padding: 1px 0 0 0;
}
.login-user {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #666;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-user i {
  font-size: 18px;
  color: #666;
  margin-left: 5px;
}
.login-user input {
  width: calc(100% - 30px);
  height: 35px;
  outline: none;
  color: #666666;
  border: 0;
  padding: 0 5px;
}
.login-password {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #666;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-password i {
  font-size: 18px;
  color: #666;
  margin-left: 5px;
}
.login-password input {
  width: calc(100% - 30px);
  height: 35px;
  outline: none;
  color: #666666;
  border: 0;
  padding: 0 5px;
}
.login-Verification {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  border-bottom: 1px solid #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-Verification .captcha {
  width: 130px;
  height: 35px;
  outline: none;
  color: #666666;
  border: none;
}
.login-Verification .sendcaptcha {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 20px;
}
.login-submit {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.login-submit button {
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  letter-spacing: 5px;
  border-radius: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.forgetpwd {
  float: right;
  color: #888;
}
.login-text {
  width: 100%;
  margin-top: 50px;
  color: #666;
  text-align: justify;
}
.login-left {
  padding: 20px;
}
.login-left .logo img {
  width: 120px;
}
.left-qrcode {
  width: 200px;
  margin: 30px auto 0 auto;
}
.left-qrcode #qrcode {
  width: 200px;
  height: 200px;
  padding: 10px;
  background: #ffffff;
}
.left-qrcode #qrcode img {
  width: 100% !important;
  height: 100% !important;
}
.login-left .qrcode-text {
  text-align: center;
  color: white;
  line-height: 35px;
  margin-top: 10px;
}
.quick-login {
  text-align: center;
  margin: 20px 0;
  color: #dddddd;
  position: relative;
}
.quick-login:before {
  content: "";
  width: 80px;
  height: 1px;
  background: #dddddd;
  position: absolute;
  left: 100px;
  top: 50%;
}
.quick-login:after {
  content: "";
  width: 80px;
  height: 1px;
  background: #dddddd;
  position: absolute;
  right: 100px;
  top: 50%;
}
.qq-wx-wb {
  width: 180px;
  height: 55px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.qq-wx-wb .qq-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #e5ffe1;
}
.qq-wx-wb .qq-login a {
  color: #368afe;
}
.qq-wx-wb .wx-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #e5ffe1;
}
.qq-wx-wb .wx-login a {
  color: #09bb07;
}
.qq-wx-wb .weibo-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #e5ffe1;
}
.qq-wx-wb .weibo-login a {
  color: #d81e06;
}
:deep .el-form-item__content {
  flex-wrap: nowrap;
}
:deep .el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
}
:deep .el-input__inner {
  border: none !important;
  box-shadow: none !important;
}
:deep .el-select {
  --el-select-input-focus-border-color: transparent;
}
:deep .el-form-item__error {
  top: 120%;
}
</style>