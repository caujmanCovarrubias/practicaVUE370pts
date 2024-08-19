import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/styles/styles.scss'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);

app.mount('#app')