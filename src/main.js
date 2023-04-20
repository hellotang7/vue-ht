import Vue from 'vue';
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router";
import store from "@/store";
import './api/mock'
import Cookie from "js-cookie";

Vue.config.productionTip = false


//全局引入
Vue.use(ElementUI);

//添加全局前置导航守卫
router.beforeEach((to, form, next) => {
        //判断toKen存不存在
        const toKen = Cookie.get('toKen')
        if (!toKen && to.name !== 'login') {
            next({name: 'login'})
        } else if (toKen && to.name === 'login') {
            //toKen存在，说明用户登录，此时跳转至首页
            next({name: 'home'})
        } else {
            next()
        }
    }
)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
