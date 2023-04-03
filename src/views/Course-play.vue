<template>
  <div class="main">
    <div class="top">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>
    <div class="play">
      <div class="play-left">
        <vue3VideoPlay v-bind="options" @timeupdate="onTimeupdate" />
      </div>
      <div class="play-right">
        <el-tabs tab-position="right">
          <el-tab-pane>
            <template #label>
              <div class="tabpanel-title">
                <div class="icon">
                  <el-icon><Document /></el-icon>
                </div>
                <p class="text">课程</p>
              </div>
            </template>
            <div class="course-container">
              <div class="courseName">
                {{ chapterInfo.chapterName }}
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <template #label>
              <div class="tabpanel-title">
                <div class="icon">
                  <el-icon><Document /></el-icon>
                </div>
                <p class="text">章节</p>
              </div>
            </template>
            <div class="chapter-container">
              <dl class="list" v-for="item in bizCourseChapters" :key="item.id">
                <dt title="item.chapterName">{{ item.chapterName }}</dt>
                <dd class="active" v-for="k in item.children" :key="k.id">
                  <div class="video-itemIcon">
                    <i class="el-icon-video-camera"></i>
                  </div>
                  <div class="item-name">视频：{{ k.chapterName }}</div>
                </dd>
              </dl>
            </div>
          </el-tab-pane>
          <el-tab-pane class="note">
            <template #label>
              <div class="tabpanel-title">
                <div class="icon">
                  <el-icon><Document /></el-icon>
                </div>
                <p class="text">笔记</p>
              </div>
            </template>
            <el-empty description="无笔记" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
// 语法糖 预处理setup()函数，每个组件实例都执行 顶层绑定自动暴露给模板
import { useUserStore } from "../store/user.js";
import { ArrowLeftBold, Document } from "@element-plus/icons-vue";
import { reactive } from "vue";
import "vue3-video-play/dist/style.css";
import vue3VideoPlay from "vue3-video-play";
import { player, recordHistory } from "../utils/api/courseManage.js";
import { onBeforeMount } from "vue";
import { useUserStore } from "../store/user.js";
let route = useRoute();
let { courseId, chapterId } = route.params;
// 播放课程数据
let chapterInfo = ref({});
// 课程章节和小节数据
let bizCourseChapters = ref([]);

const options = reactive({
  width: "100%", //播放器高度
  height: "100%", //播放器高度
  color: "#409eff", //主题色
  title: "", //视频名称
  src: "/00-复习.mp4", //视频源
  muted: false, //静音
  webFullScreen: false,
  speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
  autoPlay: false, //自动播放
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ], //显示所有按钮,
});
// 生命周期发请求
onBeforeMount(() => {
  // 获取播放课程数据
  /*  player({ courseId, chapterId }).then((res) => {
    chapterInfo.value = res.data.chapterInfo;
    bizCourseChapters.value = res.data.courseInfo.bizCourseChapters;
    console.log(res.data);
  }); */
});
// 更新播放时间

const onTimeupdate = (ev) => {
  recordHistory({
    chapterId,
    courseId: "",
    memberId: useUserStore().userInfo.id, // 会员id
    lastTime: ev.target.currentTime,
  }).then((res) => {
    console.log(res);
  });
};
</script>
<style scoped>
.el-tabs__item {
  padding: unset !important;
  width: 80px !important;
  height: 100px !important;
}
.el-tabs__nav-wrap::after {
  background: unset !important;
}
.el-tabs__active-bar.is-right {
  width: 0 !important;
}
.el-tabs__item.is-active .tabpanel-title {
  background: #25282a !important;
}
.el-tabs__item.is-active .tabpanel-title .icon,
.el-tabs__item.is-active .tabpanel-title .text {
  color: #ffffff;
}
.el-tabs__nav.is-right {
  padding: 20px 0;
  background: #1c1f21 !important;
}
.el-tabs--right,
.el-tabs__content,
.el-tab-pane {
  height: 100%;
}

.vjs-custom-skin > .video-js .vjs-big-play-button {
  background-color: rgba(0, 0, 0, 0.45);
  position: absolute;
  bottom: 60px;
  left: 20px;
  font-size: 3.5em;
  line-height: 2em !important;
  margin-left: unset;
  top: unset;
}
.main {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.top {
  padding: 0 20px;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #25282a;
  opacity: 1;
}
.top .goBack {
  font-weight: bold;
  color: #545c63;
  cursor: pointer;
}

.top .name {
  padding: 0 10px;
}

.top .collect {
  cursor: pointer;
  font-size: 16px;
  color: #a8a9ab;
}
.play {
  flex: 1;
  display: flex;
  background: #25282a;
  padding: 20px;
  height: 600px;
  overflow: hidden;
}
/* 视频播放开始 */
.play-left {
  width: calc(100% - 400px);
  height: 100%;
  background: #000;
  position: relative;
  overflow: hidden;
}

.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}

/* 视频播放结束 */
/* 播放列表开始 */
.play-right {
  color: #ffffff;
  width: 400px;
  height: 100%;
  /* overflow: scroll;*/
}

.play-right .active {
  background: rgba(255, 255, 255, 0.3);
}

.tabpanel-title {
  padding: 17px 0 18px 0;
  width: 100%;
  text-align: center;
}

.tabpanel-title .icon {
  height: 40px;
  font-size: 30px;
  line-height: 40px;
  color: #a4a5a6;
}

.tabpanel-title .text {
  height: 25px;
  line-height: 25px;
  color: #a4a5a6;
}

.chapter-container {
  height: 100%;
  overflow-y: scroll;
  padding-left: 10px;
}

.chapter-container .list {
  width: 100%;
  margin-bottom: 20px;
}

.list dt {
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  color: #ffffff;
  opacity: 1;
  padding-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.list dd {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 2px 5px;
  margin: 0 0 5px 0;
  color: #a8a9ab;
  cursor: pointer;
}

.list dd:hover {
  color: #ffffff;
}

.list dd .video-itemIcon {
  height: 30px;
  margin-right: 10px;
  font-size: 18px;
  float: left;
}

.list dd .item-name {
  float: left;
  width: calc(100% - 35px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

/* 播放列表结束 */
.video-player {
  height: 100%;
}

.loading {
  color: #ffffff;
  font-size: 20px;
  margin: 200px auto;
  width: 100px;
  text-align: center;
}

.loading img {
  width: 100%;
}

.finished {
  margin-top: 250px;
}

.over {
  color: #ffffff;
  font-size: 20px;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
}

.over .nextCourse {
  font-size: 24px;
  padding: 10px 0;
  border: none;
}

.over .resetLearn {
  background: rgba(200, 200, 200, 0.3) !important;
}

.goHome,
.goCourse {
  background: rgba(200, 200, 200, 0.3) !important;
}

.over .over-btn {
  width: 120px;
  height: 30px;
  margin: 20px;
  line-height: 30px;
  border-radius: 8px;
  border: 0px;
  outline: none;
  color: #ffffff;
  background: #3585ff;
}

.over .over-btn:hover {
  border: 1px solid #fff;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: rgba(240, 240, 240, 1);
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, 0.5);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}

/* 课程开始 */
.course-container {
  height: 100%;
  overflow-y: scroll;
  margin-left: 10px;
  color: #a8a9ab;
}

.course-container .courseName {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  font-weight: bold;
}

.course-container .courseDesc {
  line-height: 25px;
  font-size: 13px;
  margin: 20px 0;
  letter-spacing: 1px;
  text-align: justify;
}

.course-container .courseImg {
  width: 100%;
  height: 150px;
  border-radius: 8px;
}

.course-container .courseImg img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.course-container .teacher {
  display: flex;
  text-align: center;
  justify-content: flex-start;
}

.course-container .teacher .teacherAvt {
  margin: 10px 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.course-container .teacher .teacherAvt img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.course-container .teacherRecommend {
  margin: 15px 0;
  font-size: 16px;
  font-weight: bold;
}

.course-container .teacher .teacherInfo {
  display: flex;
  flex-direction: column;
  margin: 15px 10px;
  text-align: left;
}

.course-container .teacher .teacherName {
  font-weight: bold;
  font-size: 16px;
}

.course-container .teacherTag {
  text-align: left;
  font-size: 13px;
}

.course-container .teacherReacher {
  width: 100%;
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 25px;
  text-align: justify;
}

/* 课程结束 */

.note {
  margin-top: 150px;
}
</style>



