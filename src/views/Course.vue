<template>
  <Header></Header>
  <div class="coursemain">
    <div class="course-main">
      <section class="search-container">
        <div class="search-item">
          <div class="title-name">课程方向：</div>
          <div class="all-items">
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
              @click="handlerReset"
              >全部</el-tag
            >
            <el-tag
              v-for="item in firstCategorys"
              :key="item.id"
              :class="
                currentType['fcategory'].id == item.id
                  ? 'category-poniter'
                  : 'category-poniter-item'
              "
              effect="plain"
              type="info"
              @click="buildingCondition('fcategory', item.id)"
            >
              {{ item.categoryName }}
            </el-tag>
          </div>
        </div>
        <div class="search-item search-item-transition" style="top: 45px">
          <div class="title-name">课程分类：</div>
          <div class="all-items">
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
              @click="handlerReset"
              >全部</el-tag
            >
            <el-tag
              v-for="item in secondCategorys"
              :key="item.id"
              :class="
                currentType['scategory'].id == item.id
                  ? 'category-poniter'
                  : 'category-poniter-item'
              "
              effect="plain"
              type="info"
              @click="buildingCondition('scategory', item.id)"
            >
              {{ item.categoryName }}
            </el-tag>
          </div>
        </div>
        <div class="search-item" style="top: 90px">
          <div class="title-name">课程难度：</div>
          <div class="all-items">
            <el-tag
              class="category-poniter"
              effect="plain"
              type="info"
              @click="handlerReset"
              >全部</el-tag
            >
            <el-tag
              v-for="item in courseLevel"
              :key="item.id"
              :class="
                currentType['clevel'].id == item.code
                  ? 'category-poniter'
                  : 'category-poniter-item'
              "
              effect="plain"
              type="info"
              @click="buildingCondition('clevel', item.code)"
            >
              {{ item.text }}
            </el-tag>
          </div>
        </div>
      </section>
    </div>
    <div class="main-container">
      <div class="container-top">
        <ul class="all">
          <li
            class="item"
            @click="handleZonghe"
            :style="priceSortBy == '1' ? 'color:#2C80FF' : ''"
          >
            综合
          </li>
          <li class="item split">|</li>
          <li
            class="item"
            @click="handleNewCoures"
            :style="priceSortBy == '2' ? 'color:#2C80FF' : ''"
          >
            最新课程
          </li>
          <li class="item split">|</li>
          <li
            class="item"
            @click="mostbuy"
            :style="priceSortBy == '3' ? 'color:#2C80FF' : ''"
          >
            最多购买
          </li>
          <li class="item split">|</li>
          <li class="item-price" @click="handlePrice">
            <span :style="priceSortBy == '4' || '5' ? 'color:#2C80FF' : ''"
              >价格</span
            >
            <span class="arrow">
              <el-icon :style="priceSortBy == '4' ? 'color:#2C80FF' : ''">
                <caret-top />
              </el-icon>
              <el-icon :style="priceSortBy == '5' ? 'color:#2C80FF' : ''">
                <caret-bottom />
              </el-icon>
            </span>
          </li>
        </ul>
        <ul class="right">
          <li class="right-item">
            <el-radio-group v-model="radio">
              <el-radio label="1">免费课程</el-radio>
              <el-radio label="2">会员课程</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
      <div class="container-body">
        <div class="newCourseContent">
          <ul class="courseUl">
            <li class="courseItem" v-for="item in courseList" :key="item.id">
              <!-- 传id 根据对应id渲染数据 -->
              <router-link :to="{ path: '/course-info/' + item.id }">
                <div class="courseInfo">
                  <div class="courseBg">
                    <img />
                  </div>
                  <div class="courseName">{{ item.courseName }}</div>
                  <div class="courseDegree">
                    {{ item.courseLevel }} ·
                    {{ item.purchaseCounter + item.purchaseCnt }}人报名
                  </div>

                  <div class="coursePriceZero" v-if="item.discountPrice == 0">
                    <div class="pricefree">免费学习</div>
                    <img src="../assets/img/free.png" alt="" />
                  </div>

                  <div class="coursePrice" v-else-if="item.isMember == 1">
                    <div class="courseMemberbg">
                      <span class="courseMember">会员免费</span>
                    </div>
                    <div class="price">¥ {{ item.discountPrice }}</div>
                  </div>

                  <div class="coursePricePri" v-else>
                    <div class="pricePri">¥ {{ item.discountPrice }}</div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="pages">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="queryCourse"
          />
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
import mixin from "../mixins/courseType.js";

import { CaretTop, CaretBottom } from "@element-plus/icons-vue";
import {
  getFirstCategorys,
  getSecondCategorys,
  searchCourse,
} from "../utils/api/courseManage";
import { reactive } from "vue";
let { courseTypeFn } = mixin();

//课程方向的数据
let firstCategorys = ref([]);
//课程分类的数据
let secondCategorys = ref([]);
// 默认id为-1 对象形式
let secendCategorysParams = reactive({
  categoryId: -1,
});
const getSecondCategorysFn = (secendCategorysParams) => {
  getSecondCategorys(secendCategorysParams).then((res) => {
    secondCategorys.value = res.data.list;
  });
};
//课程难度的数据
let courseLevel = ref([
  { text: "初级", code: "1" },
  { text: "中级", code: "2" },
  { text: "高级", code: "3" },
]);
//所有课程的数据
let courseList = ref([]);

//查询课程的参数
let searchCourseParams = reactive({
  pageNum: 1,
  pageSize: 4,
  entity: {
    firstCategory: "",
    secondCategory: "",
    courseLevel: "",
    isFree: "",
    isMember: "",
  },
});

//查询所有课程
const queryCourseList = () => {
  //查询所有课程
  searchCourse(searchCourseParams).then((res) => {
    courseList.value = res.data.pageInfo.list;
    total.value = res.data.pageInfo.total;
  });
};
//分页的数据

let total = ref(0);
let radio = ref(1);

//生命周期
onBeforeMount(() => {
  //获取一级分类
  getFirstCategorys().then((res) => {
    firstCategorys.value = res.data.list;
  });
  //获取二级分类
  getSecondCategorysFn(secendCategorysParams);
  //查询所有课程
  queryCourseList();
});

//点击分页
const queryCourse = (val) => {
  console.log(val);
  // 根据点击结果动态的发送当前页码去查询
  searchCourseParams.pageNum = val; // 改变当前页面 val 切换页面时触发为当前页面
  queryCourseList(searchCourseParams);
};

let currentType = reactive({
  fcategory: { id: "" },
  scategory: { id: "" },
  clevel: { id: "" },
});

// 点击课程方向，分类，难度
const buildingCondition = (type, id) => {
  // 更新二级课程方向 // 传id查询
  if (type === "fcategory") {
    searchCourseParams.entity.isMember = "";
    searchCourseParams.entity.isFree = "";
    radio.value = "0";
    currentType[type].id = id;
    currentType["scategory"].id = "";
    currentType["clevel"].id = "";
    searchCourseParams.entity.secondCategory = "";
    searchCourseParams.entity.courseLevel = "";
    secendCategorysParams.categoryId = id;
    getSecondCategorysFn(secendCategorysParams);
    searchCourseParams.entity.firstCategory = id;
    queryCourseList(searchCourseParams.entity.firstCategory);
    return;
  }
  // 分类
  if (type === "scategory") {
    searchCourseParams.entity.isMember = "";
    searchCourseParams.entity.isFree = "";
    radio.value = "0";
    currentType[type].id = id;
    currentType["clevel"].id = "";
    searchCourseParams.entity.courseLevel = "";
    searchCourseParams.entity.secondCategory = id;
    queryCourseList();
    return;
  }
  // 课程难度
  if (type === "clevel") {
    searchCourseParams.entity.isMember = "";
    searchCourseParams.entity.isFree = "";
    radio.value = "0";
    currentType[type].id = id;
    searchCourseParams.entity.courseLevel = id;
    queryCourseList();
    return;
  }
};
const handlerReset = () => {
  currentType["fcategory"].id = "";
  currentType["scategory"].id = "";
  location.reload();
};

watch(radio, (newValue, oldValue) => {
  if (newValue == "1") {
    searchCourseParams.entity.isMember = "";
    searchCourseParams.entity.isFree = "1";
  } else if (newValue == "2") {
    searchCourseParams.entity.isFree = "";
    searchCourseParams.entity.isMember = "1";
  }
  queryCourseList();
});

// 根据排序判断变
let priceSortBy = ref("1");
const handleZonghe = () => {
  searchCourseParams.entity.sortBy = "";
  priceSortBy.value = "1";
  queryCourseList();
};
const handleNewCoures = () => {
  searchCourseParams.entity.sortBy = "time-desc";
  priceSortBy.value = "2";
  queryCourseList();
};

const mostbuy = () => {
  searchCourseParams.entity.sortBy = "purchase-desc";
  priceSortBy.value = "3";
  queryCourseList();
};
const handlePrice = () => {
  if (priceSortBy.value == "4" || priceSortBy.value != "5") {
    priceSortBy.value = "5";
    searchCourseParams.entity.sortBy = "price-desc";
  } else if (priceSortBy.value == "5") {
    priceSortBy.value = "4";
    searchCourseParams.entity.sortBy = "price-asc";
  }
  queryCourseList();
};
</script>



<style scoped>
.course-main {
  padding: 20px 0;
  width: 100%;
  height: 130px;
  background: #f3f5f9;
}
.search-container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 100%;
}
.search-item {
  display: flex;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  height: 45px;
  transition: all 0.5s;
}
.search-item-transition:hover {
  z-index: 777;
  height: auto;
  box-shadow: rgb(95 101 105 / 10%) 0px 12px 20px 0px;
  border-radius: 8px;
  background: rgba(255, 255, 255);
}
.search-item .title-name {
  width: 100px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 25px;
  text-align: justify;
  color: #333333;
  padding: 10px;
  opacity: 1;
}
.search-item .title-name:after {
  content: ".";
  width: 100%;
  display: inline-block;
  overflow: hidden;
  height: 0;
}

.search-item .all-items {
  width: calc(100% - 120px);
  min-height: 25px;
  display: flex;
  flex-wrap: wrap;
}
.title .all-list {
  width: 40px;
  height: 25px;
  line-height: 25px;
  border-radius: 4px;
  padding: 0 10px;
  align-items: center;
  text-align: center;
}

.title .all {
  opacity: 1;
  color: #2c80ff;
}

.title .item {
  height: 25px;
  line-height: 25px;
  margin: 0 15px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  opacity: 1;
}

.title .item .active {
  color: #2c80ff;
}

.category-poniter {
  height: 25px;
  line-height: 25px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  background: rgba(44, 128, 255, 0.1);
  color: #2c80ff;
}
.category-poniter-item {
  height: 25px;
  line-height: 25px;
  margin: 10px 5px;
  cursor: pointer;
  border: none;
  background: none;
  color: rgba(81, 87, 89, 1);
}

.main-container {
  width: 1200px;
  margin: 0 auto;
}

.container-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.all {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}

.all .item:first-child {
  margin-right: 20px;
}

.all .item {
  margin: 0 10px;
  cursor: pointer;
}

.right {
  display: flex;
  padding-top: 20px;
  font-size: 16px;
  color: #515759;
}

.right .right-item {
  margin-left: 10px;
}

.right .right-items {
  margin-right: 0px;
}

.arrow {
  position: relative;
}

.arrow i:first-child {
  position: absolute;
  top: -1px;
}

.arrow i:last-child {
  position: absolute;
  top: 7px;
}

.check {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.up {
  position: absolute;
  top: 5px;
  left: 2px;
}

.down {
  position: absolute;
  top: 15px;
  left: 2px;
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
  -o-transform: rotate(180deg); /* Opera */
}
.newCourseContent {
  width: 1200px;
  margin: 30px auto 0px auto;
}

.newCourseContent .courseUl {
  display: flex;
  flex-wrap: wrap;
}

.courseItem {
  width: 285px;
  height: 280px;
  margin: 0 20px 20px 0;
  transition: margin-top 0.2s;
}
.courseItem:hover {
  margin-top: -10px;
  cursor: pointer;
}
.courseItem:nth-child(4n + 0) {
  margin-right: 0 !important;
}
.courseInfo {
  position: relative;
  width: 100%;
  height: 270px;
  background: #ffffff;
  box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
  opacity: 1;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: hidden;
  text-decoration: none;
}
.courseBg {
  position: relative;
  width: 100%;
  height: 160px;
}
.courseBg img {
  width: 100%;
  height: 100%;
}
.courseName {
  margin: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333333;
  display: -webkit-box;
  overflow: hidden;
}
.courseDegree {
  margin-left: 10px;
  font-size: 12px;
  color: #808080;
}
.coursePrice {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 130px;
  font-size: 14px;
  margin-top: 15px;
  padding: 0 5px;
}
.coursePricePri {
  width: 75px;
  font-size: 14px;
  margin-top: 18px;
  padding: 0 13px;
  color: rgba(255, 114, 127, 1);
  font-weight: 700;
}
.coursePriceZero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75px;
  font-size: 14px;
  margin-top: 15px;
  padding: 0 10px;
  color: rgba(53, 134, 255, 1);
}
.courseMemberbg {
  position: relative;
  width: 80px;
  height: 20px;
  color: #ffffff;
  background: linear-gradient(90deg, #ff928e 0%, #fe7062 99%);
  border-radius: 24px 0px 24px 0px;
}
.courseMember {
  position: absolute;
  line-height: 20px;
  left: 13px;
  font-weight: 700;
}
.price {
  line-height: 25px;
  left: 100px;
  color: #ff727f;
  font-weight: 700;
}
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 50px auto !important;
}
</style>