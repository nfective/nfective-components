import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './defaults.css'

let app = createApp(App)
app.use(router)
app.mount("#app")
