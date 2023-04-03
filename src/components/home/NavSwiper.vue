<template>
  <div class="navSwiper">
    <div class="content">
      <div class="navigation">
        <ul @mouseleave="mourseOut">
          <li
            v-for="item in getFirstList"
            :key="item.id"
            @mouseenter="mourseHover(item.id)"
          >
            <router-link to="/">
              {{ item.categoryName }}
              <el-icon color="#ffffff" :size="16"><arrow-right /></el-icon>
            </router-link>
            <div class="category-detail" v-if="isFirst">
              <div class="detail-main">
                <div class="detail-desc">基础知识</div>
                <div class="detail-list">
                  <div class="list-know">知识点：</div>
                  <div class="list-ul">
                    <router-link
                      to="/"
                      v-for="item in tagsPageList"
                      :key="item.id"
                      class="list-item"
                    >
                      {{ item.tagName }}</router-link
                    >
                  </div>
                </div>
                <div class="detail-class">
                  <div
                    class="course-card"
                    v-for="item in searchCourseList"
                    :key="item.id"
                  >
                    <div class="course-image">
                      <img :src="item.courseCover" />
                    </div>
                    <div class="right">
                      <div class="courseName">{{ item.courseName }}</div>
                      <div class="courseDegree">
                        {{ item.courseLevel }} ·
                        {{ item.purchaseCounter + item.purchaseCnt }}人购买
                      </div>
                      <div class="buy">
                        <div class="buy-free">
                          <div class="coursePrice">
                            <div class="courseMemberbg">
                              <span class="courseMember">会员专享</span>
                            </div>
                            <div class="price">{{ item.discountPrice }}</div>
                          </div>
                          <div class="cart">
                            <div class="cart-image">
                              <img
                                src="http://localhost:8080/image/cart16.png"
                              />
                            </div>
                            <span class="addcart">加入购物车</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="sliders">
        <!-- 判断有没有，有数据才渲染 -->
        <el-carousel
          :interval="2000"
          arrow="always"
          height="460px"
          v-if="getSlidersList.length > 0"
        >
          <el-carousel-item v-for="item in getSlidersList" :key="item.id">
            <img :src="item.imageUrl" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="course-type">
      <div class="course-type-item">
        <router-link to="/">
          <div class="course-type-item-icon">
            <img src="../../assets/img/chuji.png" />
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">初级课程</div>
            <div class="course-type-item-desc">入门快、岗位多</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="/">
          <div class="course-type-item-icon">
            <img src="../../assets/img/zhongji.png" />
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">中级课程</div>
            <div class="course-type-item-desc">进阶与实战</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="/">
          <div class="course-type-item-icon">
            <img src="../../assets/img/gaoji.png" />
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">高级课程</div>
            <div class="course-type-item-desc">轻松掌握核心技能</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="/">
          <div class="course-type-item-icon">
            <img src="../../assets/img/xiangmu.png" />
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">项目实战</div>
            <div class="course-type-item-desc">手把手实践</div>
          </div>
        </router-link>
      </div>
      <div class="course-type-item">
        <router-link to="/">
          <div class="course-type-item-icon">
            <img src="../../assets/img/suanfa.png" />
          </div>
          <div class="course-type-item-text">
            <div class="course-type-item-title">前端算法</div>
            <div class="course-type-item-desc">笑傲前端技能</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { onBeforeMount } from "vue";
import {
  getFirstCategorys,
  tagsList,
  searchCourse,
  getSliders,
} from "../../utils/api/courseManage";

// 获取一级分类数据
let getFirstList = ref([]);
// 鼠标移入默认布尔值
let isFirst = ref(false);
let searchCourseList = ref([]);
let getSlidersList = ref([]);
// 生命周期
onBeforeMount(() => {
  //获取一级课程分类
  getFirstCategorys().then((res) => {
    getFirstList.value = res.data.list;
  });
  getSliders().then((res) => {
    getSlidersList.value = res.data.list;
  });
});
// 获取课程标签的数据
let tagsParams = {
  pageNum: 1,
  pageSize: 10,
  entity: {
    firstCategory: "",
  },
};

let tagsPageList = ref([]);
const mourseHover = (id) => {
  isFirst.value = true;
  tagsParams.entity.firstCategory = id;
  tagsList(tagsParams).then((res) => {
    tagsPageList.value = res.data.pageInfo.list;
  });
  searchCourse(tagsParams).then((res) => {
    searchCourseList.value = res.data.pageInfo.list;
  });
};
const mourseOut = () => {
  isFirst.value = false;
};
</script>


<style scoped>
.navSwiper {
  padding-top: 1px;
  width: 100%;
  height: 640px;
  background: url("../../assets/img/transitionbg.png") no-repeat;
}
.content {
  position: relative;
  display: flex;
  width: 1200px;
  height: 460px;
  margin: 35px auto 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
}
.navigation {
  width: 240px;
  height: 460px;
  background: #2b283d;
}
.navigation ul {
  margin: 20px 0;
}
.navigation ul li {
  height: 40px;
  list-style: none;
  margin-bottom: 5px;
}
.navigation ul li a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: #ffffff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
}
.navigation ul li a:hover {
  background: linear-gradient(to right, #3fe5ff, transparent);
}
.sliders {
  width: 1060px;
  height: 460px;
}
.sliders img {
  width: 100%;
  height: 100%;
}
.category-detail {
  position: absolute;
  top: 0;
  left: 220px;
  background: rgba(255, 255, 255);
  z-index: 65535;
  min-width: 800px;
  height: 460px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
}
.detail-main {
  cursor: pointer;
  height: 100%;
  position: relative;
}
.detail-desc {
  padding-top: 20px;
  padding-left: 20px;
  height: 26px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  opacity: 1;
}
.detail-list {
  width: 100%;
  display: flex;
  margin-top: 10px;
  padding-left: 20px;
  color: #333333;
  font-weight: 400;
  font-size: 14px;
}
.list-know {
  width: 70px;
  height: 30px;
  line-height: 30px;
}
.list-ul {
  width: calc(100% - 70px);
  display: flex;
  flex-wrap: wrap;
}

.list-item {
  line-height: 30px !important;
  padding: 0 10px !important;
  color: #333333 !important;
  font-size: 14px !important;
  font-weight: unset !important;
  height: auto !important;
}
.list-item:hover {
  background: unset !important;
  color: #00ffff;
}
.detail-class {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 270px;
  padding: 20px 20px;
  background-color: #f3f5f6;
  box-sizing: border-box;
}

.course-card {
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  width: 370px;
  height: 110px;
  box-sizing: border-box;
}

.course-image {
  width: 100%;
  height: 90px;
  cursor: pointer;
}

.course-image img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
  padding: 5px;
  box-sizing: border-box;
}

.courseName {
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  color: #333333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.courseDegree {
  font-size: 12px;
  color: #808080;
}

.coursePrice {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.coursePriceZero {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pricePri {
  font-size: 12px;
}

.price {
  margin-left: 5px;
  color: red;
}

.courseMember {
  color: #ffffff;
  padding: 2px;
  box-sizing: border-box;
  background: red;
  border-radius: 6px;
}

.coursePricePri {
  font-size: 12px;
}

.buy {
  width: 200px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.buy-free {
  display: flex;
  align-items: center;
}

.buy-free img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}

.buy .learn {
  color: #3586ff;
  font-size: 12px;
}

.buy .cart {
  display: flex;
  margin-right: 5px;
  font-size: 12px;
}

.buy .addcart {
  margin-left: 2px;
  color: #ff3d17;
  font-size: 12px;
  cursor: pointer;
}

.course-type {
  display: flex;
  width: calc(1200px);
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 0.5px 6px #d2d2d2;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.course-type-item {
  width: 260px;
  height: 100px;
  flex: 1;
}
.course-type-item a {
  display: flex;
  justify-content: center;
  text-decoration: none;
}
.course-type-item-icon {
  font-size: 35px;
  border-radius: 50%;
  margin: 25px 10px 25px 0;
  width: 50px;
  height: 50px;
  background: #55ee8b;
  text-align: center;
  line-height: 50px;
  color: #ffffff;
}
.course-type-item-icon img {
  width: 100%;
  height: 100%;
}
.course-type-item-text {
  margin: 25px 0;
}
.course-type-item-title {
  font-size: 18px;
  line-height: 30px;
  font-weight: bold;
}
.course-type-item-desc {
  color: #808080;
  font-size: 14px;
}
</style>