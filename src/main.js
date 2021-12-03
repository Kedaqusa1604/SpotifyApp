import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FontAwesomeIcon from './utils/fontAwesome.js'

createApp(App).component('fa',FontAwesomeIcon).use(store).use(router).mount('#app')
