import './assets/main.css'

import uiPlugin from '@nuxt/ui/vue-plugin'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { router } from './router'
import App from './App.vue'

const app = createApp(App)

app.use(uiPlugin)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
