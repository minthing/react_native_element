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

### flex box
* default direction > col

### scroll view
* 기본적으로 scrollview는 제공되지 않음 따로 import해야함
* scrollView를 사용할 시 기존 style은 먹히지 않음 -> ContentContainerStyle 로 변경해야 함
* 스크린보다 큰 scroll을 하고싶다면 flex를 사용하지 말아야 함

### dimensions
* 화면의 길이를 가져올 수 있음

### pagingenables
* 스크롤을 자유롭게 못하게 함

### showsHorizontalScrollIndicator
* 아래에 생기는 스크롤 표시를 삭제해줌

### indicator style
* ios만 됨... 이런 props가 여러개 있으니 doc 주의하여 사용

### location
해당 기능을 사용하기 위해선 `expo install expo-location`을 사용해야 함
아래 코드는 위치 추적 허가를 받아왔는지 확인하는 코드...

* 의도치 않은 이슈 : useState 자동완성이 2개 있는데 react용 useState를 써야 에러가 안남. 코드 컬러링 반응도 다름.

```javascript
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async() =>{
    const permission = await Location.requestForegroundPermissionsAsync();
    console.log(permission)
  }
  useEffect(()=> {
    ask();
  }, [])
```

* location 가져오기

* `latitude`, `longitude` : 위도와 경도
* `accuracy`는 정확도로 1~6 사이의 값을 가진다

```javascript
const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});

// 위도와 경도를 통해 현재 위치명을 역으로 가지고 옴

const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
```