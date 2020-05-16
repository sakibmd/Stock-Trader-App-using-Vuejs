import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import { routes } from './routes.js';
import  store  from './store/store.js';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root='https://vuejs-stock-trader-b0798.firebaseio.com/';

Vue.filter('currency', (value)=> {
    return '$' + value.toLocaleString();
});

const router = new VueRouter({
    routes,
    mode: 'history',
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
