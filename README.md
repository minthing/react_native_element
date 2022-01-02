### react native 기초

##### mac OS 설치하는 법

* expo cli 설치
```
npm install --global expo-cli
```

* watchman 설치
```
brew update
brew install watchman
```

##### make new app
```
expo init weather
cd weather
npm start
```

### rules of react native
* 리엑트 네이티브에서는 `<div>`를 대신해 `View`를 사용함
* Text는 Text에... 재는 재로 돌아가라...
* <StatusBar style="auto" /> -> 상단바와 소통할 수 있는 방법... 서드파티임

### Third Party Packages
* 컴포넌트 : `return`을 통해 화면에 랜더링 됨
* `API` : 자바스크립트를 통해 만들어진, 운영체제와 소통 가능한 것. (진동기능처럼...)
* 리엑트 네이티브에서 제공하는 컴포넌트 / 커뮤니티에서 자체적으로 만든 컴포넌트 / expo에서 제공하는 api를 적절히 사용하기
* https://docs.expo.dev/versions/latest/
* https://reactnative.dev/docs
* https://reactnative.directory/