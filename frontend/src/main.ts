import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import VueGtag from 'vue-gtag-next'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(VueGtag, {
  property: { id: "G-Q8NQSMH4S8" } // 请替换为您真实的 GA4 衡量 ID
})

app.mount('#app')
