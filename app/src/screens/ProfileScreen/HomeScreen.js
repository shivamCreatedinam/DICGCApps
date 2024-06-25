import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ImageBackground,
  Alert,
  TextInput
} from 'react-native';
import axios from "axios";
import { version } from '../../../../package.json';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import HeaderWithLocation from '../../../genriccomponents/header/HeaderWithLocation';
import networkSpeed from 'react-native-network-speed';
import AudioRecord from 'react-native-audio-record';
import { withTranslation } from 'react-i18next';


const options = {
  sampleRate: 16000,  // default 44100
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  wavFile: 'audio.wav' // default 'audio.wav'
};

class HomeScreen extends Component {
  static ROUTE_NAME = 'HomeScreen';
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      name: '',
      userToken: '',
      surveyNextBlock: '',
      DraftSection: '',
      surveCount: null,
      loading: false,
      DraftLoading: false,
      CountLoading: false,
      counter: null,
      surveyCount: null,
      surveyCountInProcessing: null,
      surveyCountInTotal: null,
      surveyCompleteCount: null,
      surveyToken: null,
      appVersion: version,
    };
  }

  renderHeader = () => {
    return (
      <HeaderWithLocation
        headerTitle={this.state}
        appLogoVisible={true}
        isBackIconVisible={false}
        isLogoutVisible={false}
        navigateProps={this.props.navigation}
        onClickLocation={this.onClickLocation}
      />
    );
  };


  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      //do your api call
      this.readMessages();
      this.getSavedLocation();
      this.checkInternetSpeed();
    });
  }

  checkInternetSpeed() {
    // networkSpeed.startListenNetworkSpeed(({ downLoadSpeed, downLoadSpeedCurrent, upLoadSpeed, upLoadSpeedCurrent }) => {
    //   console.log(downLoadSpeed + 'kb/s') // download speed for the entire device 整个设备的下载速度
    //   console.log(downLoadSpeedCurrent + 'kb/s') // download speed for the current app 当前app的下载速度(currently can only be used on Android)
    //   console.log(upLoadSpeed + 'kb/s') // upload speed for the entire device 整个设备的上传速度
    //   console.log(upLoadSpeedCurrent + 'kb/s') // upload speed for the current app 当前app的上传速度(currently can only be used on Android)
    // })
  }

  getSavedLocation = async () => {
    try {
      const latitude = await AsyncStorage.getItem(AsyncStorageContaints.surveyLatitude);
      const longitude = await AsyncStorage.getItem(AsyncStorageContaints.surveyLongitude);
      if (latitude !== null && longitude !== null) {
      } else {
        console.log('Latitude and longitude not found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error retrieving latitude and longitude from AsyncStorage:', error);
    }
  };

  async readMessages() {
    try {
      AudioRecord.init(options);
      const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
      const UserData = await AsyncStorage.getItem(AsyncStorageContaints.UserData);// AsyncStorageContaints.surveyNextBlock
      const surveyNextBlock = await AsyncStorage.getItem(AsyncStorageContaints.surveyNextBlock);
      const surveyCompleteCount = await AsyncStorage.getItem(AsyncStorageContaints.surveyCompleteCount);
      this.setState({ name: UserData, userToken: userId, surveyNextBlock: surveyNextBlock, surveCount: surveyCompleteCount });
      // console.log("readMessages" + surveyCompleteCount, JSON.stringify(this.state))
      this.getDraftSurvey();
      this.getSurveyCount();
    } catch (error) {
      console.log("error", error)
    }
  }

  renderItem(item) {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20, elevation: 5, backgroundColor: '#fff', paddingVertical: 5, paddingHorizontal: 10, marginBottom: 2, borderRadius: 5 }}
        onPress={() => this.props.navigation?.navigate("ChatScreen", { item: item?.item })} >
        <Image source={{ uri: item?.item?.profile_image }} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 220, marginTop: 0, }} />
        <View style={{ marginLeft: 10, justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{item?.item?.name}</Text>
          <Text>{item?.item?.last_message}</Text>
          <Text style={{ marginTop: 10, fontSize: 10, color: 'grey' }}>{item?.item?.last_update}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  async navigateToSurvey() {
    // api / generate - survey - token
    let SERVER = 'https://createdinam.com/DICGCA-SURVEY/public/api/generate-survey-token'
    let tempServerTokenId = ';'
    this.setState({ loading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.state.userToken}`
    }
    console.log('navigateToSurvey', JSON.stringify(headers))
    axios.get(`${SERVER}`, {
      headers: headers
    })
      .then((response) => {
        if (response.data.status === true) {
          let serverToken = response?.data?.surveyToken
          console.log('navigateToSurvey', JSON.stringify(response.data))
          AsyncStorage.setItem(AsyncStorageContaints.tempServerTokenId, serverToken);
          showMessage({
            message: "Survey Token Generated",
            description: "Survey Token Generated, You can take survey!",
            type: "success",
          });
          this.setState({ loading: false });
          this.CheckCurrentActiveSurvey();
          // this.props.navigation.navigate('BlockFSurveyScreen');
        } else {
          console.log('navigateToSurvey', JSON.stringify(response.data))
          showMessage({
            message: "Something went wrong!",
            description: "Something went wrong. Try again!",
            type: "danger",
          });
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        console.log('navigateToSurvey', JSON.stringify(error))
        showMessage({
          message: "Something went wrong!",
          description: "Something went wrong. " + error,
          type: "danger",
        });
        this.setState({ loading: false });
      })
  }

  async getDraftSurvey() {
    // api/generate-survey-token
    let SERVER = 'https://createdinam.com/DICGCA-SURVEY/public/api/get-survey-token'
    this.setState({ DraftLoading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.state.userToken}`
    }
    axios.get(`${SERVER}`, {
      headers: headers
    })
      .then((response) => {
        if (response.data.status === true) {
          console.log('getDraftSurvey', JSON.stringify(response.data?.surveyToken))
          let serverToken = response?.data?.surveyToken
          AsyncStorage.setItem(AsyncStorageContaints.tempServerTokenId, serverToken);
          let CurrentDraft = response?.data?.section_status;
          this.setState({ DraftLoading: false, DraftSection: CurrentDraft });
        } else {

        }
        this.setState({ DraftLoading: false });
      }).catch((error) => {
        console.log('getDraftSurvey', JSON.stringify(error))
        showMessage({
          message: "Something went wrong!",
          description: "Something went wrong",
          type: "danger",
        });
        this.setState({ DraftLoading: false });
      })

  }

  async getSurveyCount() {
    let SERVER = 'https://createdinam.com/DICGCA-SURVEY/public/api/get-my-survey-count'
    this.setState({ DraftLoading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.state.userToken}`,
    }
    axios.get(`${SERVER}`, {
      headers: headers
    })
      .then((response) => {
        console.log('getSurveyCount', JSON.stringify(response.data?.surveyToken))
        if (response.data.status === true) {
          console.log('getSurveyCount', JSON.stringify(response.data?.surveyToken))
          AsyncStorage.setItem(AsyncStorageContaints.surveyCompleteCount, response.data?.in_processing);
          AsyncStorage.setItem(AsyncStorageContaints.surveyCountInProcessing, response.data?.completed);
          AsyncStorage.setItem(AsyncStorageContaints.surveyCountInTotal, response.data?.total);
          this.setState({
            surveyCountInProcessing: response.data?.in_processing,
            surveyCompleteCount: response.data?.completed,
            surveyCountInTotal: response.data?.total,
          });
        } else {

        }
        this.setState({ DraftLoading: false });
      }).catch((error) => {
        console.log('getDraftSurvey', JSON.stringify(error))
        showMessage({
          message: "Something went wrong!",
          description: "Something went wrong. " + error,
          type: "danger",
        });
        this.setState({ DraftLoading: false });
      })
  }

  CheckCurrentActiveSurvey = () => {
    this.props.navigation.navigate('InstructionScreen');
    // this.props.navigation.replace('BlockFSurveyScreen');
  }

  navigateToPendingSurvey = () => {
    console.log("this.state.surveyNextBlock", this.state.DraftSection);
    this.props.navigation.replace('DraftSurveyScreen');
  }

  checkStartSurvey() {
    // (this.state.DraftSection === '' || this.state.DraftSection === null) ? this.navigateToSurvey() : showMessage({
    //   message: "Please Check",
    //   description: "You May Have A Draft Survey!",
    //   type: "danger",
    // });
    this.navigateToSurvey()
  }


  render() {
    const { t } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F8', marginTop: 0 }}>
        {this.renderHeader()}
        {/* <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} /> */}
        <View style={{ height: 50, width: '90%', marginHorizontal: 20, marginVertical: 10, borderRadius: 15, borderColor: 'grey', borderWidth: 1, elevation: 5, backgroundColor: '#fff' }} >
          <TextInput placeholder={t('search')} style={{ flex: 1, paddingLeft: 15 }} />
        </View>
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <TouchableOpacity onPress={() => this.checkStartSurvey()} style={{ paddingVertical: 14, paddingHorizontal: 20, backgroundColor: '#000000', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#fff' }} source={require('../../../assets/add_survery_logo.png')} />
            {this.state.loading === false ? <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', flex: 1 }}>{t('create_new_survey')}</Text> : <ActivityIndicator style={{ alignSelf: 'center', flex: 1 }} color={'#fff'} />}
          </TouchableOpacity>
          {this.state.surveyNextBlock !== '' ? <TouchableOpacity onPress={() => this.navigateToPendingSurvey()} style={{ paddingVertical: 14, paddingHorizontal: 20, backgroundColor: '#000000', borderRadius: 5, flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Image style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: '#fff' }} source={require('../../../assets/add_survery_logo.png')} />
            {/* {this.state.loading === false ?  */}
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', flex: 1 }}>{t('draft_survey')}</Text>
            {/* : <ActivityIndicator style={{ alignSelf: 'center', flex: 1 }} color={'#fff'} />} */}
          </TouchableOpacity> : null}
        </View>
        <View style={{ position: 'absolute', bottom: 50, alignSelf: 'center', flexDirection: 'row', margin: 10 }}>
          <Text adjustsFontSizeToFit style={{ marginRight: 20, fontWeight: 'bold' }}>{t('survey_in_progress')} {this.state.surveyCountInProcessing}</Text>
          <Text adjustsFontSizeToFit style={{ marginRight: 0, fontWeight: 'bold' }}>{t('complete_survey')} {this.state.surveyCompleteCount}</Text>
        </View>
        <Text style={{ position: 'absolute', textAlign: 'center', alignSelf: 'center', bottom: 5, fontWeight: 'bold' }}>{t('app_version')} {this.state.appVersion}</Text>
      </SafeAreaView>
    );
  }
}


export default withTranslation()(HomeScreen);
