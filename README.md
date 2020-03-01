# vue-naver-login

VueJS 컴포넌트로 만든 네이버 로그인 서비스입니다.

## 설치

```shell
npm install --save vue-naver-login
```

## 사용

```javascript
<template>
  <div id="app">
    <NaverLogin
      client-id="<client-id>"
      callback-url="<callback-url>"
      is-popup="false"
      :callbackFunction=callbackFunction
      />
  </div>
</template>

<script>
import NaverLogin from 'vue-naver-login'

let callbackFunction = (status) => {
    if (status) {
    /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
    var email = naverLogin.user.getEmail();
    if( email == undefined || email == null) {
      alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
      /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
      naverLogin.reprompt();
      return;
    }

    window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/sample/main.html");
  } else {
    console.log("callback 처리에 실패하였습니다.");
  }
}

export default {
  name: 'App',
  components: {
    NaverLogin
  },
  methods: {
    callbackFunction
  }
}
</script>
```

## props

- `client-id` (필수) _[string]_ - 네이버 클라이언트 ID입니다.
- `callback-url`(필수) _[string]_ - 애플리케이션을 등록할 때 Callback URL에 설정한 URL입니다.
- `callback-function`(필수) _[function]_ - 로그인 결과에 대한 콜백 함수입니다.
- `is-popup` _[boolean]_ - 팝업을 통한 연동처리 여부 기본값: false
- `button-color` _[string]_ - color : 버튼 색상. white, green 기본값: green
- `button-type` _[number]_ - color : 버튼 타입 . 1(버튼형), 2(작은 배너), 3(큰 배너) 기본값: 3
- `button-color` _[height]_ - color : 버튼 배너 및 버튼 높이 (사용자 지정값 px) 기본값: 60
- `script-url` _[string]_ - 컴포넌트에서 사용할 네이버 API 주소입니다. 기본값: `'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js'`
- `error-message` _[string]_ - 로드되지 않을 때 나타낼 에러 메시지입니다. 기본값: `현재 네이버 로그인 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.`
