import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import axios from "axios";
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { MyStatusBar } from '../../../genriccomponents/header/HeaderAndStatusBar';
import { TextInput } from 'react-native-gesture-handler';


const SigninScreen = props => {

  const navigation = useNavigation();
  const [emailOrMobile, set_emailOrMobile] = useState('');
  const [fromOtpless, set_fromOtpless] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [updateEmail, set_updateEmail] = useState('');
  const [updatePassword, set_updatePassword] = useState('');
  const [countDown, set_countDown] = useState(30);
  const [otp, set_otp] = useState('');
  const [isMobileLogin, set_isMobileLogin] = useState(false);
  const [isOtpInputFIeldVisible, set_isOtpInputFIeldVisible] = useState(false);
  const [isGetOtpTextVisible, set_isGetOtpTextVisible] = useState(true);
  const [error, set_error] = useState({});
  const [isOtpSent, set_isOtpSent] = useState(false);
  const [emailFieldVisible, set_emailFieldVisible] = useState(false);
  const [isTimeVisible, set_isTimeVisible] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isEmailView, setIsEmailView] = useState(false);
  const [isRefferalCodeScreen, setIsRefferalCodeScreen] = useState(false);
  const [saveResultData, setSaveResultData] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const intervalRef = useRef(null);
  const [skipCity, setSkipCity] = useState(false);
  const [cityName, setCityName] = useState(null);
  const [permissionAttempts, setPermissionAttempts] = useState(0);
  const [showPermissionRequest, setShowPermissionRequest] = useState(true);


  useEffect(() => {

  }, []);

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePassword = (email) => {
    var re = /(?=.*[0-9])/;
    return re.test(email);
  }

  const validateLogin = async () => {
    if (validateEmail(updateEmail)) {
      if (validatePassword(updatePassword)) {
        registerLogin(updateEmail, updatePassword);
      } else {
        showMessage({
          message: "Invalid Password",
          description: "Please enter valid password",
          type: "danger",
        });
      }
    } else {
      showMessage({
        message: "Invalid Email",
        description: "Please enter valid Email",
        type: "danger",
      });
    }
  }

  const registerLogin = (email, pass) => {
    setLoading(true);
    let self = this;
    const resource = {
      email: email,
      password: pass,
    }
    axios
      .post(`https://createdinam.com/DICGCA-SURVEY/public/api/login`, resource)
      .then((res) => {
        console.log(res);
        if (res.data.status === true) {
          let token = res?.data?.token;
          let user = res?.data?.user;
          AsyncStorage.setItem(AsyncStorageContaints.UserId, token);
          AsyncStorage.setItem(AsyncStorageContaints.UserData, user);
          showMessage({
            message: "Successfully Login",
            description: "Please successfully login!",
            type: "success",
          });
          setLoading(false);
          navigation.replace('PermissionScreenMain');
        } else {
          showMessage({
            message: "User Not Found",
            description: "Please check your login Details!",
            type: "danger",
          });
          setLoading(false);
        }
      });
  }


  return (
    <View style={styles.fullScreen}>
      <MyStatusBar
        barStyle="dark-content"
        backgroundColor={'#ffffff'}
      />
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image style={{ height: 180, width: 180, resizeMode: 'contain', alignSelf: "center", marginTop: 80 }} source={require('../../../assets/app_logo.png')} />
          <View style={{ flex: 1, marginTop: 50 }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: 10, fontSize: 20, color: '#000000' }}>DICGC Survey</Text>
            <TextInput placeholderTextColor={'#000000'} value={updateEmail} onChangeText={(e) => set_updateEmail(e.toLocaleLowerCase())} keyboardType={'email-address'} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 15, paddingLeft: 15, borderRadius: 5 }} placeholder='Enter Email' />
            <TextInput placeholderTextColor={'#000000'} value={updatePassword} onChangeText={(e) => set_updatePassword(e)} keyboardType={'default'} secureTextEntry={true} style={{ backgroundColor: '#fff', elevation: 5, marginBottom: 5, paddingLeft: 15, borderRadius: 5 }} placeholder='Password' />
            <TouchableOpacity onPress={() => validateLogin()} style={{ backgroundColor: 'rgb(36,78,154)', marginTop: 10, paddingVertical: 20, paddingHorizontal: 15, elevation: 5, borderRadius: 5 }}>
              {isLoading === true ? <ActivityIndicator style={{ alignItems: 'center', }} color={'#fff'} /> : <Text style={{ textAlign: 'center', color: '#fff', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 'bold', fontSize: 15 }}>Login</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SigninScreen;
