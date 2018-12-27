import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'



Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.directive('if-empty',{
  bind(el,binding,vnode){
    el.style.color = "#" + Math.random().toString().slice(2,8);
    if(el.textContent == 'NO TASKS ADDED YET') {
      el.style.color = "grey";
      el.style.fontStyle = 'italic' ;
    }
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
