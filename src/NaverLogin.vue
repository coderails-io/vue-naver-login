<template>
  <div id="naverIdLogin"></div>

</template>
<script>
const defaultErrorMessage = '현재 네이버 로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.'

export default {
  name: 'NaverLogin',
  props: {
    clientId: {
      type: String,
      required: true
    },
    callbackUrl: {
      required: true
    },
    callbackFunction: {
      required: true
    },
    isPopup: {
      type: Boolean,
      default: false
    },
    buttonColor: {
      type: String,
      default: 'green'
    },
    buttonType: {
      type: Number,
      default: 3
    },
    buttonHeight: {
      type: Number,
      default: 60
    },
    scriptUrl: {
      type: String,
      default: 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'
    },
    errorMessage: {
      default: defaultErrorMessage
    },

  },
  computed: {

  },
  mounted: function () {
    const scriptId = 'naver_login'
    const isExist = !!document.getElementById(scriptId)
    if (!isExist) {
      const script = document.createElement('script')
      script.src = this.scriptUrl
      script.onload = () => this.initiate(this)
      script.onerror = error => this.handleError(error)
      script.id = scriptId
      document.body.appendChild(script)
    } else this.initiate(this)
  },
  methods: {
    logOut () {
      this.naverLogin.logout()
      location.reload()
    },
  },
  data () {
    return {
      isLoggedIn: false,
      naverLogin: null,
      initiate: (comp) => {
        this.naverLogin = new naver.LoginWithNaverId({
          clientId: comp.clientId,
          callbackUrl: comp.callbackUrl,
          isPopup: comp.isPopup,
          loginButton: { color: comp.buttonColor, type: comp.buttonType, height: comp.buttonHeight },
          callbackHandle: true
        })
        this.naverLogin =
          this.naverLogin.init()
        window.addEventListener('load', function () {
          this.naverLogin.getLoginStatus(function (status) {
            this.isLoggedIn = status
            return comp.callbackFunction(status)
          })
        })
      },
      handleError: (err) => {
        console.warn(`This component threw an error (in '${err.target.outerHTML}'):`, this)
      },
    }
  }
}
</script>