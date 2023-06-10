
import { createApp } from 'vue'
import pinia from '@/stores/index'
import App from './App.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import './index.css'
import './router/index'
import router from './router/index'

import i18n from './i18n/index'

import './utils/permission'
const app = createApp(App)

app.use(pinia)
    .use(router)
    .use(i18n)
    .use(ViewUIPlus)

app.mount('#app')

