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
  AppState,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  useColorScheme,
  TouchableOpacity,
  ImageBackground,
  PermissionsAndroid,
  FlatList,
  Linking,
  Alert
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import VersionCheck from 'react-native-version-check';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';
import data from './package.json';

console.disableYellowBox = true;

const options = {
  sampleRate: 8000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 8,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'dicgc_survey.mp3' // default 'audio.wav'
};

const App = () => {

  let audioInt16 = [];
  let listener;

  const myLocalFlashMessage = useRef();
  const [isMockLocation, setIsMockLocation] = useState(false);
  const [isupdated, setisupdated] = React.useState(false);
  const appState = React.useRef(AppState.currentState);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    // checkPermission();
    try {
      AudioRecord.init(options);
    } catch (error) {
      console.log('record_______error_______x_x_x_x_x_x_x_x_', error);
    }
  }, []);

  // useEffect(() => {
  //   checkMockLocation()
  //     .then(result => {
  //       setIsMockLocation(result);
  //       if (result) {
  //         Alert.alert('Warning', 'Mock location detected!');
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  React.useEffect(() => {
    checkAppVersion();
  }, []);

  const checkAppVersion = async () => {
    try {
      const latestVersion = await VersionCheck.getLatestVersion({
        packageName: 'com.createdinam.dicgc.app', // Replace with your app's package name
        ignoreErrors: true,
      });

      const currentVersion = VersionCheck.getCurrentVersion();

      if (latestVersion > currentVersion) {
        console.log(' App is up-to-date, proceed with the app');
        setisupdated(true);
        Alert.alert(
          'Update Required',
          `A new version of ${data?.name} app is available. Please update to continue using the app.`,
          [
            {
              text: 'Update Now',
              onPress: () => {
                Linking.openURL(
                  Platform.OS === 'ios'
                    ? VersionCheck.getAppStoreUrl({ appID: 'com.createdinam.dicgc.app' })
                    : 'https://play.google.com/store/apps/details?id=com.createdinam.dicgc.app&hl=en&gl=US'
                );
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // App is up-to-date, proceed with the app
        setisupdated(false);
        console.log(' App is up-to-date, proceed with the app');
      }
    } catch (error) {
      // Handle error while checking app version
      console.error('Error checking app version:', error);
    }
  };

  const forceUpdate = async () => {
    try {
      const PlayStoreUrl = await VersionCheck.getPlayStoreUrl();
      VersionCheck.needUpdate({
        currentVersion: VersionCheck.getCurrentVersion(),
        latestVersion: data.version
      }).then((res) => {
        if (res.isNeeded) {
          console.log('updateNeeded------------->' + PlayStoreUrl, JSON.stringify(res));
        }
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  Geolocation.getCurrentPosition(
    (position) => {
      console.log("position", position?.mocked)
      if (position?.mocked) {
        Alert.alert('Security Warring 👨‍💻', 'Mock location detected! Your location is not secure.');
      } else {
        Alert.alert('Info 👨‍💻', 'Your location is secure.');
      }
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


  if (isupdated) {
    return <ImageBackground
      style={{ flex: 1 }}
      source={require('./app/assets/background_maps.jpeg')}
      resizeMode={'cover'}>
      <Image
        style={{ width: 300, height: 300, resizeMode: 'contain', alignSelf: 'center', marginTop: 150, tintColor: 'rgb(131,24,28)' }}
        source={require('./app/assets/updateImage.png')} />
      <TouchableOpacity
        style={{ alignSelf: 'center', top: -50, backgroundColor: 'rgb(131,24,28)', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10, elevation: 5 }}
        onPress={() => checkAppVersion()}>
        <Text style={{ color: '#ffffff', textTransform: 'uppercase', fontWeight: 'bold' }}>Update Now {data?.version}</Text>
      </TouchableOpacity>
    </ImageBackground>
  } else {
    return (
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <StatusBar translucent={true} backgroundColor="transparent" />
          <AppNavigation />
          <FlashMessage
            style={{ marginTop: StatusBar.currentHeight }}
            position={'top'}
            ref={myLocalFlashMessage} />
        </SafeAreaView>
      </Provider>
    );
  }
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