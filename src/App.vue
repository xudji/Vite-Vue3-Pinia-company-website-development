<template>
  <router-view></router-view>
</template>

<script>
import Home from "./views/Home.vue";
import About from "./views/Home.vue";

export default {
  name: "",
  mixins: [],
  components: { Home, About },
  data() {
    return {};
  },

  computed: {},

  created() {},

  //mounted() {},

  methods: {},
};
</script>
<style >
@import "./assets/css/reset.css";
</style>


