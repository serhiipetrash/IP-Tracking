import { createApp } from 'vue';
import './tailwind.css';
import App from './App.vue';
import { routes } from './routes.js';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

app.use(router);
app.mount('#app');
