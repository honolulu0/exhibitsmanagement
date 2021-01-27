import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)

//Vue.http.options.emulateJSON = true;
//跨域
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;

/******************拦截器设置请参考这部分(开始)******************/
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */

    document.title = "安徽创新馆展品管理系统"

  next()
})

Vue.http.interceptors.push((request, next) => {
  //登录成功后将后台返回的TOKEN在本地存下来,每次请求从sessionStorage中拿到存储的TOKEN值
 // //console.log("request.url"  )
 // //console.log(request.url  )

  let TOKEN = window.localStorage.getItem('Authorization-token');
  if (TOKEN) {
    //如果请求时TOKEN存在,就为每次请求的headers中设置好TOKEN,后台根据headers中的TOKEN判断是否放行
    request.headers.set('token', TOKEN);
  }
  next((response) => {
    // //console.log("response.status" )
     // //console.log(response.status )
     // //console.log(response.body.code )
    if (response.body.code === "6") { //退出登陆了
      // 无token处理，跳转到login界面


      router.push('/login');
    }
    return response;
  });
});
/******************拦截器设置请参考这部分(结束)******************/

new Vue({
  router:router,
  render: h => h(App)
}).$mount('#app')
