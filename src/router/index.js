import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home.vue";
import User from "@/views/User.vue";
import Main from "@/views/Main.vue";
import Mall from "@/views/Mall.vue";
import PageOne from "@/views/PageOne.vue";
import PageTwo from "@/views/PageTwo.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter)

// 1. 创建路由组件
// 2. 将路由与组件映射
// 3. 创建 router 实例，然后传 `routes` 配置

const routes = [
    //主路由
    { path: '/',
        component: Main,
        redirect:'/home', //当路径为/时重定向
        children:[
            //子路由
            { path: 'home', component: Home },//首页
            { path: 'user', component: User },//用户管理
            { path: 'mall', component: Mall },//商品管理
            { path: 'page1', component: PageOne },//其他1
            { path: 'page2', component: PageTwo },//其他2
        ]
    },
    {
        path: '/login',
        component: Login, //登录页面
        name: 'login'
    },

]


const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})


export default router


