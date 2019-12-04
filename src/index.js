import NaverLogin from './NaverLogin.vue'
import Vue from 'vue'

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-naver-login', NaverLogin)
  },
  // build: {
  //   assetsPublicPath: '/',
  //   assetsSubDirectory: 'static'
  // }
};
