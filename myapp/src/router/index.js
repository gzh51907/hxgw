import Vue from 'vue';

// 使用VueRouter步骤
// 1.引入vue-router
import VueRouter from 'vue-router';

// 2.使用(安装)vue-router（VueRouter是作为插件增强Vue的功能）
Vue.use(VueRouter);

// 引入页面组件
import Home from '../pages/Home.vue';
import Cart from '../pages/Cart.vue';
import Reg from '../pages/Reg.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';
import Discover from '../pages/Discover.vue';
import Mine from '../pages/Mine.vue';
import Goods from '../pages/Goods.vue';

// 3. 实例化router并配置参数
let router = new VueRouter({
    routes: [
        // 首页
        {
            name: 'home',
            path: '/home',  //当浏览器地址为/home时，显示Home组件的内容
            component: Home
        },
        {
            path: '/',  //当浏览器地址为/home时，显示Home组件的内容
            redirect: '/home'
        },
        // 购物车
        {
            name: 'cart',
            path: '/cart',
            component: Cart,
            meta: {
                requiresAuth: true
            }
        },
        {
            name: 'discover',
            path: '/discover',
            component: Discover
        },

        // 动态路由
        {
            name: 'goods',
            path: '/goods/:id',
            component: Goods
        },
        {
            name: 'mine',
            path: '/mine',
            component: Mine,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/reg',
            component: Reg
        }, {
            path: '/login',
            component: Login
        },
        {
            path: '/404',
            component: NotFound
        },
        {
            path: '*',
            // redirect：重定向
            redirect: '/404'
        }
    ]
});

// 设置全局路由守卫，不登录不能进入购物车和我的页面
router.beforeEach(function (to, from, next) {

    // 判断是否需要鉴权
    if (to.meta.requiresAuth) {
        let requiresAuth = localStorage.getItem('Authorization');
        // 有鉴权
        if (Authorization) {
            next()
        } else {
            // 需要鉴权但是没有，先跳登录页
            router.push({
                path: '/login',
                query: {
                    // 传入上一个历史页面，到时候登录后就能直接调回上个页面
                    targetUrl: to.fullPath
                }
            })
        }
    } else {
        next();
    }

})


// 5.在组件中使用VueRouter
export default router;