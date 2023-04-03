<template>
  <footer>
    <div class="footer-main">
      <div class="footer-xlx">
        <img src="../../assets/img/logo02.png" />
      </div>
      <div class="footer-factory">
        <img src="../../assets/img/foot-factory.png" />
      </div>
      <div class="copytight">
        <ul class="copy-top">
          <li>关于我们</li>
          <li>|</li>
          <li>联系我们</li>
          <li>|</li>
          <li>意见反馈</li>
          <li>|</li>
          <li>版权声明</li>
        </ul>
        <div class="copy-bottom">
          <span>{{copyright}}</span>
          <a
            data-v-d94f43e2=""
            href="https://beian.miit.gov.cn/"
            target="_blank"
            class="go"
            >{{icp}}</a
          >
          <p class="copy-user">
            <a href="">《用户服务协议》</a>
            <a href="">《隐私政策》</a>
          </p>
        </div>
      </div>
      <div class="wx">
        <div class="wx-bg">
          <img src="../../assets/img/guanfangwx.jpg" />
        </div>
        <div class="wx-dsc">官方微信</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { setting } from "../../utils/api/courseManage";

let copyright = ref('');
let icp = ref('');
onBeforeMount(() => {
  setting().then((res) => {
    copyright.value = res.data.data.copyright;
    icp.value = res.data.data.icp;
  });
});
</script>
<style scoped>
footer {
  width: 100%;
  min-width: 1200px;
  height: 150px;
  background: #3483ff;
  opacity: 1;
  border-radius: 0px;
}
.footer-main {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 1200px;
  height: 100%;
  color: #ffffff;
  margin: auto;
}
.footer-xlx {
  width: 110px;
  opacity: 1;
}
.footer-xlx img {
  width: 100%;
  height: 100%;
}
.footer-factory {
  width: 130px;
  margin: 0 20px;
}
.footer-factory img {
  width: 100%;
  height: 100%;
}
.copy-top {
  display: flex;
  font-size: 14px;
  margin: 0 10px 10px 50px;
}
.copy-top li {
  margin: 0 10px;
  color: #ffffff !important;
}
.copy-bottom {
  font-size: 12px;
}
.copy-bottom a {
  color: #ffffff;
  text-decoration: underline;
  padding-left: 10px;
}
.wx {
  margin-left: 20px;
  width: 80px;
  height: 100px;

  font-size: 12px;
}
.wx-bg {
  width: 80px;
  height: 80px;
}
.wx img {
  width: 100%;
  height: 100%;
}
.wx-dsc {
  padding-top: 5px;
  text-align: center;
}
.copy-user {
  margin-top: 10px;
  text-align: center;
}
.copy-user a {
  text-decoration: none;
  color: #ffffff;
}
</style>