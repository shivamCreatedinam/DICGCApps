import { StyleSheet, Platform } from 'react-native';
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1, 
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    color: '#222222',
  },

  underlineStyleHighLighted: {
    borderColor: '#222222',
  },

  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailText: {
    color: '#45454A',
    fontSize: 14, 
  },
  appNameStyle: {
    marginLeft: 20,
    letterSpacing: 8,
    color: '#000000',
    fontSize: 14,
  },
  inputStyle: {
    // marginTop: 7,
    //  paddingBottom: 7,
  },
  layoutHorizontal: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSignInViaStyle: {
    alignSelf: 'center',
    marginVertical: 20, 
  },
  textForgotPass: {
    alignSelf: 'flex-end', 
    fontWeight: '600',
    fontSize: 16,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
  },
  dontHaveAccount: { 
    fontSize: 14, 
  },
  txtSignin: { 
    fontSize: 14,
    marginHorizontal: 5,
    alignSelf: 'center', 
  },
  backgroundImage: {
    flex: 1,
  },
  titleText: {
    color: '#45454A',
    fontSize: 24, 
  },
  subTitleText: {
    color: '#9A9AA2', 
    fontSize: 14,
  },
  subTitleText1: {
    color: '#71717A', 
    fontSize: 16,
    lineHeight: 20
  },
  skipText: { 
    fontSize: 20, 
  },
  skipBtn: {
    marginRight: 21,
    marginTop: 10,
  },
  textAppVersion: {
    alignSelf: 'center', 
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
