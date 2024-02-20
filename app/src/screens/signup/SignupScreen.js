import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native' 
import styles from './styles'
import Button from '../../genriccomponents/button/Button'
import resources from '../../../res'
import SocialLoginView from '../../genriccomponents/socialLogin/SocialLoginView'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { validateMobileNumber, validateEmail, renderInputError, focusTo, isPlatformIOS } from '../../utility/Utils'
import { connect } from 'react-redux'
import APILoadingHOC from "../../genriccomponents/HOCS/APILoadingHOC"
import * as actions from '../../redux/actions/SignupAction'
//import { InitLinkedinLogin } from '../../utility/SocialLoginUtils'
import {
    configureGoogleSignin, initializeGoogleLogin, initializeFacebookLogin, LOGIN_TYPE
} from '../../utility/SocialLoginUtils'
import { hitSocialLoginApi, hitLinkedinApiToGetUser, hitFacebookApiToGetUser } from '../../redux/actions/SocialLoginAction'
import { hitSendOtpApi } from '../../redux/actions/OtpAction'
import AppUser from '../../utility/AppUser'
import AsyncStorageContaints from '../../utility/AsyncStorageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyStatusBar } from '../../genriccomponents/header/HeaderAndStatusBar'
import { CommonActions } from '@react-navigation/native';
import { updateFcmTokenToServer } from '../../redux/actions/LogoutAction'
import AppToast from '../../genriccomponents/appToast/AppToast'
import DeviceInfo from 'react-native-device-info';
import appleAuth, {
    AppleButton,
    AppleAuthRequestOperation,
    AppleAuthRequestScope,
    AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

class SignupScreen extends Component {
    static ROUTE_NAME = "SignupScreen";
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
            refferalCode: "",
            isPassVisible: true,
            isGetOtpTextVisible: true,
            error: {},
            isTimerVisible: false,
            isMobileVerified: false,
            isMobileFocused: false,
            isPasswordFocused: false,

        }
        this.socialFirstName = ""
        this.socialLastName = ""
        this.socialEmail = ""
        this.socialType = ""
        this.socialID = ""

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.mobileRef = React.createRef();
        this.referralRef = React.createRef();
        this.linkedinRef = React.createRef();
    }
    focusToNext = (ref) => {
        focusTo(ref)
    }
    render() {
        const { name, email, password, mobileNumber, refferalCode,
            isPassVisible, error, isGetOtpTextVisible, isMobileFocused, isPasswordFocused, isMobileVerified } = this.state
        return (
            <View style={styles.fullScreen}>
                <MyStatusBar barStyle="dark-content"
                    backgroundColor={resources.colors.white} />
                {/* <ImageBackground source={resources.images.splash_background} style={styles.fullScreen}> */}
                <KeyboardAwareScrollView
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <View style={styles.logoView}>
                            <Image source={resources.images.img_logo} />
                        </View>
                        <View style={{ marginBottom: 40 }}>
                            <MaterialInput
                                label={resources.strings.NAME} value={name}
                                onChangeText={this.onChangeName}
                                error={renderInputError("name", error)}
                                errorKey={"name"}
                                callbackToRemoveError={this.callbackToRemoveError}
                                inputProps={{
                                    returnKeyType: 'next'
                                }}
                                onSubmitEditing={() => this.focusToNext(this.emailRef)}>

                            </MaterialInput>
                            <MaterialInput label={resources.strings.EMAIL_ADDRESS} value={email}
                                onChangeText={this.onChangeEmail}
                                error={renderInputError("email", error)}
                                errorKey={"email"}
                                callbackToRemoveError={this.callbackToRemoveError}
                                inputProps={{
                                    keyboardType: 'email-address',
                                    autoCaptialize: 'none',
                                    returnKeyType: 'next'
                                }}
                                reference={this.emailRef}
                                onSubmitEditing={() => this.focusToNext(this.passwordRef)}></MaterialInput>
                            <MaterialInput
                                isPasswordEyeVisible
                                label={resources.strings.PASSWORD}
                                value={password}
                                onChangeText={this.onChangePassword}
                                error={renderInputError("pass", error)}
                                errorKey={"pass"}
                                callbackToRemoveError={this.callbackToRemoveError}
                                isPassVisible={isPassVisible}
                                inputProps={{
                                    secureTextEntry: isPassVisible,
                                    autoCaptialize: 'none',
                                    returnKeyType: 'next'
                                }}
                                onPressEyeIcon={this.onPressEyeIcon}
                                reference={this.passwordRef}
                                onSubmitEditing={() => this.focusToNext(this.mobileRef)}
                                onFocus={this.onFoucusPasswordField}
                                onBlur={this.onBlurrPasswordField}
                                isBorderEyeThick={isPasswordFocused}></MaterialInput>
                            <MaterialInput
                                isGetOtpTextVisible={!isMobileVerified && isGetOtpTextVisible}
                                isMobileVerifiedTxtVisible={isMobileVerified}
                                label={resources.strings.MOBILE_NUMBER} value={mobileNumber}
                                onChangeText={this.onChangeMobileNumber}
                                error={renderInputError("mobileNumber", error)}
                                errorKey={"mobileNumber"}
                                callbackToRemoveError={this.callbackToRemoveError}
                                onPressGetOtp={this.onPressGetOtp}
                                inputProps={{
                                    keyboardType: 'phone-pad',
                                    autoCaptialize: 'none',
                                    maxLength: 10,
                                    returnKeyType: 'done',
                                }}
                                reference={this.mobileRef}
                                onSubmitEditing={() => this.focusToNext(this.referralRef)}
                                onFocus={this.onFoucusMobileField}
                                onBlur={this.onBlurrMobileField}
                                isBorderGetOtpThick={isMobileFocused}
                            >

                            </MaterialInput>

                            <MaterialInput
                                label={resources.strings.REFFERAL}
                                value={refferalCode}
                                onChangeText={this.onChangeRefferalCode}
                                reference={this.referralRef}
                                inputProps={{
                                    returnKeyType: 'done',

                                }}
                            ></MaterialInput>
                        </View>
                        <Button rounded btnText={resources.strings.SIGN_UP} onPress={this.onSignupButtonPressed} />
                        <Text style={styles.txtSignupVia}>{resources.strings.SIGN_UP_VIA}</Text>
                        <SocialLoginView
                            customStyle={{ marginVertical: 10 }}
                            onClickFbLogin={this.onClickFbLogin}
                            onClickGoogleLogin={this.onClickGoogleLogin}
                            onClickLinkedinLogin={this.onClickLinkedinLogin} />
                        {isPlatformIOS &&
                            <AppleButton
                                buttonStyle={AppleButton.Style.BLACK}
                                buttonType={AppleButton.Type.SIGN_UP}
                                style={{
                                    width: 200,
                                    height: 45,
                                    alignSelf:'center'
                                }}
                                onPress={() => this.onAppleButtonPress()}
                            />
                        }
                        <View style={styles.layoutHorizontal}>
                            <Text style={styles.txtAlreadyHaveAccount}>{resources.strings.ALREADY_HAVE_ACCOUNT}</Text>
                            <TouchableOpacity onPress={this.onPressSignInText}>
                                <Text style={styles.txtSignin}>{resources.strings.SIGN_IN}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <InitLinkedinLogin
                            onSuccess={this.onLinkedinLoginSuccess}
                            refer={this.linkedinRef} /> */}
                        <Text style={styles.textAppVersion}>Version {DeviceInfo.getVersion()}</Text>
                    </View>
                </KeyboardAwareScrollView>
                {/* </ImageBackground> */}
            </View>
        );
    }
    callbackToRemoveError = (key) => {
        let { error } = this.state
        if (error.hasOwnProperty(key)) {
            error[key] = ""
            this.setState({
                error: error
            })
        }
    }

    onFoucusMobileField = () => {
        this.setState({
            isMobileFocused: true
        })
    }

    onBlurrMobileField = () => {
        this.setState({
            isMobileFocused: false
        })
    }
    onFoucusPasswordField = () => {
        this.setState({
            isPasswordFocused: true
        })
    }
    onBlurrPasswordField = () => {
        this.setState({
            isPasswordFocused: false
        })
    }

    validate = () => {
        const { name, mobileNumber, email, password } = this.state;
        let errorObject = {};
        if (name.trim() == "") {
            errorObject.name = resources.strings.nameCannotBeEmpty;
        } else if (name.length > 20) {
            errorObject.name = resources.strings.name20length;
        }
        if (mobileNumber.trim() == "") {
            errorObject.mobileNumber = resources.strings.phoneCannotBeEmpty;
        } else if (mobileNumber && mobileNumber.length > 10) {
            errorObject.mobileNumber = resources.strings.phone10length;
        } else if (!validateMobileNumber(mobileNumber)) {
            errorObject.mobileNumber = resources.strings.enterValidPhone;
        }
        if (email.trim() == "") {
            errorObject.email = resources.strings.emailCannotBeEmpty;
        } else if (email && email.trim().length > 100) {
            errorObject.email = resources.strings.email100length;
        } else if (!validateEmail(email && email.trim())) {
            errorObject.email = resources.strings.enterValidEmail;
        }
        if (password.trim() == "") {
            errorObject.pass = resources.strings.passwordCannotBeEmpty;
        } else if (password && password.length < 6) {
            errorObject.pass = resources.strings.password6length;
        }
        else if (password && password.length > 16) {
            errorObject.pass = resources.strings.password16length;
        }

        this.setState({ error: errorObject });
        return Object.keys(errorObject).length == 0;
    };
    onPressSignInText = () => {
        this.props.navigation.navigate("SigninScreen")
    }
    onBackClick = () => {

    }
    onSignupButtonPressed = () => {
        const isValid = this.validate();
        if (!isValid) { return; }

        if (this.state.isMobileVerified) {
            // Mobile number is verified
            const { name, email, password, mobileNumber, refferalCode } = this.state

            this.props.hitUserSignupApi(name, email.toLowerCase(), mobileNumber, password, refferalCode, "Yes")
                .then((data) => {
                    if (data.data.access_token) {
                        AppToast("Registered Successfully")
                        this.saveFromAsynAndNavigate(data)
                    } else {
                        this.resetData()
                        AppToast("We do not have required data to proceed. Please Login with same email and password")
                    }
                }
                ).catch((error) => {
                    AppToast(error)
                });

        } else {
            // Mobile number not verified
            AppToast(resources.strings.verifyYourNumber)
        }

    }

    onPressEyeIcon = () => {
        this.setState({ isPassVisible: !this.state.isPassVisible })
    }
    onChangeName = (text) => {
        this.setState({ name: text })
    }
    onChangeEmail = (text) => {
        this.setState({ email: text })
    }
    onChangePassword = (text) => {
        this.setState({ password: text })
    }
    onChangeMobileNumber = (text) => {
        this.setState({
            mobileNumber: text,
            isMobileVerified: false
        })
    }
    onChangeRefferalCode = (text) => {
        this.setState({ refferalCode: text })
    }
    onPressGetOtp = () => {
        const { mobileNumber } = this.state
        if (mobileNumber.trim() != "" && mobileNumber.trim().length == 10) {
            this.props.hitSendOtpApi(mobileNumber.trim(), true, true)
                .then((data) => {
                    this.props.navigation.navigate('OtpScreen', { data: mobileNumber, callback: this.onOtpVerified, isLogin: true, isSignup: true });
                }).catch((error) => {
                    AppToast(error)
                });
        } else {
            AppToast("Please fill valid Mobile number")
        }

    }
    onOtpVerified = (OTP) => {
        this.setState({
            isMobileVerified: true
        })
    }
    onClickLinkedinLogin = () => {

        this.linkedinRef.current.open()
    }

    onLinkedinLoginSuccess = (token) => {
        // console.log("Linkedin success" + JSON.stringify(data))
        // got token after success
        if (token) {
            this.props.hitLinkedinApiToGetUser(token.access_token)
                .then((data) => {
                    this.socialFirstName = data.localizedFirstName;
                    this.socialLastName = data.localizedLastName;
                    this.socialEmail = null;
                    this.socialType = 'linkedin';
                    this.socialID = data.id;
                    if (!data.id) {
                        AppToast("Unable to get data")
                        return
                    }
                    this.callSocialSignup()
                })
                .catch((error) => {
                    console.log("Linkedin error=> " + error)
                })
        }
    }

    /*
     * In this method performing tasks once UI is loaded.
     */
    componentDidMount() {
        configureGoogleSignin();
    }

    /*
    * This method callled on Facebook button pressed and initialize Facebook login process.
    */
    onClickFbLogin = () => {
        initializeFacebookLogin(this.onSuccessFacebookLogin);
    };

    /*
     * Callback when Faceboook login success.
     */
    onSuccessFacebookLogin = (token) => {
        // got token after success
        if (token) {
            this.props.hitFacebookApiToGetUser(token.accessToken)
                .then((data) => {
                    this.socialFirstName = data.name;
                    this.socialLastName = "lastname";
                    this.socialEmail = data.email;
                    this.socialType = 'facebook';
                    this.socialID = data.id;
                    if (!data.id) {
                        AppToast("Unable to get data")
                        return
                    }
                    this.callSocialSignup()
                })
                .catch((error) => {
                    console.log("error" + error)
                })
        }
    };

    /*
    * This method callled on Google button pressed and initialize Google login process.
    */
    onClickGoogleLogin = () => {
        initializeGoogleLogin(this.onSuccessGoogleLogin);
    };

    onAppleButtonPress = async () => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: AppleAuthRequestOperation.LOGIN,
            requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        });

        const {
            user,
            email,
            nonce,
            fullName,
            identityToken,
            realUserStatus /* etc */,
        } = appleAuthRequestResponse;

        if (user == null) {
            AppToast("Unable to fetch data")
            return;
        }

        if (email == null || fullName == null || (fullName && fullName.givenName == null)) {
            // open screen for login
            this.props.navigation.navigate('EnterDetailsForAppleSignup', {
                callback: this.onGetAppleDetailsCallback,
                userSocialId: user,
                userEmail: email,
                name: fullName && fullName.givenName
            });

        } else {
            if (fullName && fullName.givenName) {
                this.signupSociallyWithApple(email, fullName.givenName, user)
            }
        }
    }
    onGetAppleDetailsCallback = (email, firstName, socialID) => {
        this.signupSociallyWithApple(email, firstName, socialID)
    }
    signupSociallyWithApple = (email, firstName, socialID) => {
        this.props.hitSocialLoginApi(firstName,
            " ", email.trim().toLowerCase(), 'apple', socialID)
            .then((data) => {
                if (data.data.access_token) {
                    AppToast("Registered Successfully")
                    this.saveFromAsynAndNavigate(data)
                } else {
                    this.resetData()
                    AppToast("We do not have required data to proceed. Please Login with same email and password")
                }
            }).catch((error) => { AppToast(error) });
    }


    /*
     * Callback when Google login success.
     */
    onSuccessGoogleLogin = (currentUser, token) => {
        if (currentUser) {
            if (!currentUser.user) {
                AppToast("Unable to get data")
                return
            }
            this.socialFirstName = currentUser.user.givenName;
            this.socialLastName = currentUser.user.familyName;
            this.socialEmail = currentUser.user.email;
            this.socialType = 'google';
            this.socialID = currentUser.user.id;

            this.callSocialSignup()
        }
    };

    callSocialSignup = () => {
        if (!this.socialEmail || this.socialEmail == null || this.socialEmail == "") {
            this.props.navigation.navigate('EmailScreen', { callback: this.onGetEmailManuallyCallback });
        } else {
            this.signupSocially(this.socialEmail)
        }
    }

    onGetEmailManuallyCallback = (email) => {
        this.signupSocially(email)
    }

    resetData = () => {
        this.setState({
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
            refferalCode: "",
            isPassVisible: true,
            isGetOtpTextVisible: true,
        })
    }
    signupSocially = (email) => {
        this.props.hitSocialLoginApi(this.socialFirstName,
            this.socialLastName, email.trim(), this.socialType, this.socialID)
            .then((data) => {
                if (data.data.access_token) {
                    AppToast("Registered Successfully")
                    this.saveFromAsynAndNavigate(data)
                } else {
                    this.resetData()
                    AppToast("We do not have required data to proceed. Please Login with same email and password")
                }
            }).catch((error) => { AppToast(error) });
    }

    saveFromAsynAndNavigate = async (data) => {
        let appUsrObj = AppUser.getInstance();
        appUsrObj.token = data.data.access_token;
        appUsrObj.userId = data.data.id.toString();
        appUsrObj.userDetails = data.data;

        const userToken = [AsyncStorageContaints.UserToken, data.data.access_token];
        const userId = [AsyncStorageContaints.UserId, data.data.id.toString()];
        const userDetails = [AsyncStorageContaints.UserData, JSON.stringify(data.data)];
        try {
            await AsyncStorage.multiSet([userToken, userId, userDetails])
            this.gotoSelectCityAndReset()
        } catch (e) {
            console.log("Error saving user details", e);
        }
    }
    gotoSelectCityAndReset = () => {
        const { toScreenName } = this.props
        if (toScreenName == "") {
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'SelectCityScreen' }],
            });
            this.props.navigation.dispatch(resetAction);
        }
        else {
            let obj = AppUser.getInstance()
            let token = obj.fcmToken
            if (token) {
                this.props.updateFcmTokenToServer(token)
            }
            this.props.navigation.pop()

            if (toScreenName.includes("ProductDetailScreen")) {
                let arr = toScreenName.split('_');
                let id = parseInt(arr[1])
                this.props.navigation.navigate("ProductDetailScreen", { productId: id })
            } else {
                this.props.navigation.replace(toScreenName)
            }

        }
    }
}
const mapStateToProps = (state) => {
    const {
        verifyOtpResponse
    } = state.otpReducer;
    const { toScreenName } = state.skipLoginReducer
    return {
        verifyOtpResponse: verifyOtpResponse,
        toScreenName: toScreenName
    };
};
let container = connect(mapStateToProps, {
    ...actions, hitSocialLoginApi,
    hitLinkedinApiToGetUser,
    hitFacebookApiToGetUser,
    hitSendOtpApi,
    updateFcmTokenToServer
})(SignupScreen);
let loader = APILoadingHOC(container);

loader.getIntent = () => {
    return {
        routeName: SignupScreen.ROUTE_NAME,
    };
};

export default loader;
