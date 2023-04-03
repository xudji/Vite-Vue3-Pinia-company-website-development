<template>
  <div class="about">
    <h1>组件</h1>
    <ul v-for="item in list" :key="item.id">
      <li></li>
    </ul>
  </div>
</template>
  
<script setup >
import { onBeforeMount } from "vue";
import { getSliders } from "../api/silder";
onBeforeMount(() => {
  getSliders().then((res) => {
    console.log(res.data.list);
  });
});
</script>
  
<style>
</style>