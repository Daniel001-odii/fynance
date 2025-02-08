import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// BOOTSTRAP ICONS
import 'bootstrap-icons/font/bootstrap-icons.css';


// CONFIGURE AXIOS
import axios from 'axios';
// axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL



const app = createApp(App)

app.use(router)

app.mount('#app')
