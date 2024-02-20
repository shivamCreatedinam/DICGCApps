import React, { Component } from 'react';
import { Platform, View, Image, ImageBackground, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeView: '',
    };
  }

  componentDidMount = async () => {
    if (Platform.OS == 'ios') {
    }
    let isLoggedIn = false;
    try {
      const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
      if (userId !== null && userId != '') {
        console.log('componentDidMount--->', userId);
        this.props.navigation.replace('DashboardScreen');
        isLoggedIn = true;
      } else {
        this.props.navigation.replace('SigninScreen');
        isLoggedIn = false;
      }
    } catch (error) {
      console.log('Error fetching user id', error);
    }
  };

  render() {
    const { changeView } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Image source={require('../../../assets/app_logo.png')} />
      </View>
    );

  }

}
export default SplashScreen;
