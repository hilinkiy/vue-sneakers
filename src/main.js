import { createApp } from 'vue';
import './style.css';
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import App from './App.vue';
import router from "./router.js";

const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app');