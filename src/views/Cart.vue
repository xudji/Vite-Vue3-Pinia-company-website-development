<template>
  <Header></Header>
  <div class="fixed">
    <div class="bgColor">
      <h1 class="main-shopcart">购物车</h1>
    </div>
    <div class="container">
      <div class="main">
        <div class="nav">
          <span class="left">全部课程</span>
        </div>
        <ul class="head">
          <li class="item check">
            <el-checkbox @change="checkAll" v-model="isChecked"
              >全选</el-checkbox
            >
          </li>
          <li class="item classInfo">课程信息</li>
          <li class="item price">单价</li>
          <li class="item count">数量</li>
          <li class="item total">金额</li>
          <li class="item function">操作</li>
        </ul>
        <div v-if="cartList.length > 0">
          <ul
            class="haveorder"
            v-for="(item, index) in cartList"
            :key="item.id"
          >
            <li class="order-item">
              <el-checkbox
                @change="cartStore.itemChecked(index)"
                v-model="item.check"
              ></el-checkbox>
            </li>
            <li class="order-item info">
              <div class="courseimg">
                <img :src="item.courseCover" alt="" />
              </div>
              <div class="course-name">{{ item.courseName }}</div>
            </li>

            <li class="order-item">￥{{ item.discountPrice }}</li>
            <li class="order-item num">{{ item.counter }}</li>
            <li class="order-item totoalprice">
              ￥{{ item.counter * item.salePrice }}
            </li>
            <li class="order-item delete">
              <a href="javascript:;">
                <i class="el-icon-delete"></i>
                <span class="deletd-text">删除</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="noOrder" v-else>
          <img src="/image/norder365.png" alt="" />
          <div class="order-alert">哎呦！暂无订单</div>
        </div>
        <el-divider class="line"></el-divider>
        <ul class="foot">
          <li class="foot-item">
            已选课程<span class="unique">{{ total.number }}</span>
          </li>
          <li class="foot-item">
            合计<span class="unique">{{ total.price }}</span>
          </li>
          <li>
            <button class="btn">去结算</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>
  
  <script setup>
//组件
import Header from "../components/common/Header.vue";
import Footer from "../components/common/Footer.vue";
// api
import { getShopCarList } from "../utils/api/cart";
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../store/cart";
let cartStore = useCartStore();
let { cartList, isChecked, total } = storeToRefs(cartStore);
// pinia

// 生命周期
onBeforeMount(() => {
  getShopCarList().then((res) => {
    cartStore.addCart(res.data.list);
    console.log(res);
  });
});

// 点击选中
const checkAll = () => {
  if (isChecked.value) {
    // 不选
    cartStore.unAll();
  } else {
    // 全选
    cartStore.all();
  }
};
</script>
  <style scoped>
.fixed {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.bgColor {
  width: 100%;
  height: 200px;
  background-color: red;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.container {
  width: 1200px;
  margin: -100px auto 50px auto;
  background: #ebedf2;
  border-radius: 12px;
  box-shadow: 0px 2px 5px #888888;
}
.main {
  padding: 20px;
  border-radius: 5px;
}
.main-shop {
  position: relative;
  display: flex;
  align-content: center;
}
.main-shop i {
  font-size: 35px;
  padding: 20px 10px 0 0;
  color: #ff4400;
  font-weight: bold;
}
.main-shopcart {
  width: 1200px;
  margin: 0 auto;
  height: 42px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 35px;
  color: #ffffff;
  padding: 30px 0;
  opacity: 1;
}
.nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e6e6e6;
}
.nav .left {
  width: 80px;
  height: 26px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 0px;
  color: #ff4400;
  opacity: 1;
  border-bottom: 2px solid #ff4400;
}
.nav .right {
  width: 108px;
  height: 24px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #333333;
  opacity: 0.5;
}

/* 头部开始 */
.head {
  display: flex;
  padding: 0 10px;
  margin: 20px 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #fcfcfc;
  opacity: 1;
  border-radius: 0px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
}
.head .item {
  width: 150px;
  font-size: 14px;
  color: #333333;
}
.check .all {
  margin-right: 10px;
}
.check .text {
  width: 1487px;
  height: 40px;
}
.classInfo {
  width: 400px !important;
  color: #333333;
}
/* 头部结束 */

/* 订单开始 */
.haveorder {
  display: flex;
  width: 100%;
  height: 200px;
  background: #fcfcfc;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
}
.haveorder .order-item {
  height: 200px;
  line-height: 200px;
  margin: 5px;
}
.order-item:first-child {
  width: 30px;
}
.order-item {
  width: 150px;
  font-size: 16px;
  color: #333333;
}
.totoalprice {
  color: #e2231a;
}
.num {
  width: 120px !important;
  padding-left: 15px;
}
.info {
  display: flex;
  width: 470px !important;
  height: 200px;
  line-height: 200px;
}
.courseimg {
  margin: 40px 20px 40px 0;
  width: 200px;
  height: 120px;
}
.courseimg img {
  width: 100%;
  height: 100%;
}
.info .course-name {
  width: 300px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.delete {
  cursor: pointer;
}
.deletd-text {
  margin-left: 5px;
}

/* 订单结束 */

/* 暂无订单开始 */
.noOrder {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 200px 0;
}
.order-alert {
  height: 31px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #b5b9bc;
  opacity: 1;
  margin: 20px 120px;
}
/* 暂无订单结束 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #333333;
  margin-bottom: 10px;
}
.foot-item {
  width: 120px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #ff4400;
}
.btn {
  width: 120px;
  height: 40px;
  margin-left: 20px;
  border: none;
  color: #ffffff;
  font-size: 22px;
  border-radius: 5px;
  background: #ff4400;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
</style>