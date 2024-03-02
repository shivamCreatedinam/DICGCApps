import React, { useState, useEffect, useRef } from 'react';
import FlashMessage from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';
import AppNavigation from './app/navigation/AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from './app/utility/AsyncStorageConstants';
import AudioRecord from 'react-native-audio-record';
import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

console.disableYellowBox = true;

const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'test.wav' // default 'audio.wav'
};

const App = () => {

  const myLocalFlashMessage = useRef();
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    // checkPermission();
    try {
      AudioRecord.init(options);
    } catch (error) {

    }
  }, []);

  Geolocation.getCurrentPosition(
    (position) => {
      console.log("position", position)
      //getting the Longitude from the location json
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Latitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //Setting the state
      saveLocationForFutureUse(currentLatitude, currentLongitude);
    },
    (error) => {
      // See error code and message
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
  );

  const saveLocationForFutureUse = async (latitude, longitude) => {
    try {
      await AsyncStorage.setItem(AsyncStorageContaints.surveyLatitude, latitude);
      await AsyncStorage.setItem(AsyncStorageContaints.surveyLongitude, longitude);
      console.log('Latitude and longitude saved successfully!');
    } catch (error) {
      console.log('Error saving latitude and longitude:', error);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <StatusBar translucent={true} backgroundColor="transparent" />
      <AppNavigation />
      <FlashMessage style={{ marginTop: StatusBar.currentHeight }} position={'top'} ref={myLocalFlashMessage} />
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  }, buttonXStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  }
  ,
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
    flex: 1
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
export default App;