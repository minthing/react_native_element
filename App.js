import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Feather } from '@expo/vector-icons';

const {width: screen_width} = Dimensions.get('window')
//it's not safe -> 서버에 올려야 함
const API_KEY = "{ADD YOUR API KEY}";
const icons = {
  Clouds: "cloud",
  Clear: "sun",
  Atmosphere: "wind",
  Snow: "cloud-snow",
  Rain: "cloud-rain",
  Drizzle: "cloud-drizzle",
  Thunderstorm: "cloud-lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`)
    const json = await response.json()
    setDays(json.daily)
  }
  useEffect(()=> {
    getWeather();
  }, [])
  return (
    <View style={[styles.container]}>
      <StatusBar style="dark" />
      <View style={[styles.city]}>
        <Text style={[styles.cityText]}>{city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.weather]}>
      {days.length === 0 ? (
          <View style={styles.innerWeather}>
            <ActivityIndicator
              color="black"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.innerWeather}>
              <Feather name={icons[day.weather[0].main]} size={35} color="black" />
              <Text style={styles.date}>{`${new Date(day.dt * 1000).getMonth()+1}월 ${new Date(day.dt * 1000).getDate()}일 ${['일','월','화','수','목','금','토','일'][new Date(day.dt * 1000).getDay()]}요일`}</Text>
              <Text style={styles.temperture}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].description}</Text>
              <Text style={styles.sunset}>{`일몰 ${new Date(day.sunset * 1000).getHours()}시 ${new Date(day.sunset * 1000).getMinutes()}분`}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#f7cda0",
  },
  city:{
    flex:1,
    // backgroundColor:"tan",
    justifyContent:"center",
    alignItems:"center"
  },
  cityText:{
    fontWeight:"600",
    fontSize:28
  },
  weather:{
    // backgroundColor:"red"
  },
  innerWeather:{
    width:screen_width,
    // justifyContent:'center',
    marginTop:50,
    alignItems:'center',
    // backgroundColor:"blue"
  },
  date:{
    fontSize:20,
    marginTop:20
  },
  temperture:{
    fontSize:98,
    fontWeight:"700"
  },
  description:{
    fontSize:25,
    marginTop:-7
  },
  sunset:{
    marginTop:5
  }
});

