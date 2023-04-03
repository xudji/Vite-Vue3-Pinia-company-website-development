import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from "./router";
import store from './store'
const pinia = createPinia()

import piniaPersist from 'pinia-plugin-persist'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
pinia.use(piniaPersist)



createApp(App).use(router).use(store).use(pinia).use(ElementPlus).mount('#app')