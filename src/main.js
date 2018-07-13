// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App'
const home = () => import('./page/home/home.vue')
const login = () => import('./page/login/login.vue')
const register = () => import('./page/register/register.vue')
const resetPwd = () => import('./page/resetPwd/resetPwd.vue')
const pwdsuc = () => import('./page/pwdsuc/pwdsuc.vue')
const detail = () => import('./page/detail/detail.vue')
const center = () => import('./page/center.vue')
/*import home from './page/home/home.vue'
import login from './page/login/login.vue'
import register from './page/register/register.vue'
import resetPwd from './page/resetPwd/resetPwd.vue'
import pwdsuc from './page/pwdsuc/pwdsuc.vue'
import detail from './page/detail/detail.vue'
import center from './page/center.vue'*/
import util from './common/js/index.js'
import vuescroll from 'vue-scroll'
import 'babel-polyfill'
Vue.prototype.$util = util
Vue.prototype.goLogin = function (code) {
  let box =document.getElementsByClassName('el-message-box__wrapper');
  let flag = false;
  if (box && box.length>0){
    for (let j = 0;j<box.length;j++){
      if(box[j].style.display!='none'){
        flag = true;
        return false;
      }
    }
  }
  if(flag){
    return;
  }
  let me = this;
  let str = '会话失效,请重新登录';
  if(code == '10000005'){
    str = '您的账号已被禁用';
  }
  if(code == '10000011'){
    str = '您的权限已调整,请重新登录';
  }
  sessionStorage.removeItem('INFO');
  sessionStorage.removeItem('productList');
  this.$message({message:str,type:'error',duration:2000});
  this.$router.push('login');
}
Vue.use(vuescroll)
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.getCursorPos = function(obj){
  var CaretPos = 0;
  // IE Support
  if (document.selection) {
      obj.focus (); //获取光标位置函数
      var Sel = document.selection.createRange ();
      Sel.moveStart ('character', -obj.value.length);
      CaretPos = Sel.text.length;
  }
  // Firefox/Safari/Chrome/Opera support
  else if (obj.selectionStart || obj.selectionStart == '0')
      CaretPos = obj.selectionEnd;
  return (CaretPos);
}
Vue.prototype.setCursorPos = function(obj,pos){
  if(obj.setSelectionRange) { //Firefox/Safari/Chrome/Opera
    obj.focus(); //
    obj.setSelectionRange(pos,pos);
  } else if (obj.createTextRange) { // IE
    var range = obj.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}
Vue.prototype.replaceAndSetPos = function(obj,pattern,text){
  var pos=this.getCursorPos(obj);
  var temp=obj.value;
  obj.value=temp.replace(pattern,text);
  var max_length = obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : "";
  if( obj.value.length > max_length){
      var str1 = obj.value.substring( 0,pos-1 );
      var str2 = obj.value.substring( pos,max_length+1 );
      obj.value = str1 + str2;
  }
  pos=pos-(temp.length-obj.value.length);//当前光标位置
  this.setCursorPos(obj,pos);//设置光标
}
let bus = new Vue()
Vue.prototype.bus = bus

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

/* eslint-disable no-new */

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/resetPwd',
    name: 'resetPwd',
    component: resetPwd
  },
  {
    path: '/pwdsuc',
    name: 'pwdsuc',
    component: pwdsuc
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail
  },{
    path: '/center',
    name: 'center',
    component: center
  }
];

const router = new VueRouter({
  linkActiveClass: '',
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// const app = new Vue({
//   router: router,
//   render: h => h(App)
// }).$mount('#app');
//
// router.push('/home');
