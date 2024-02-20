import { StyleSheet } from 'react-native';
import { widthScale, heightScale } from '../../utility/Utils';
import resources from '../../../res';
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor:resources.colors.white
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  appNameStyle: {
    marginLeft: widthScale(32.6),
    letterSpacing: 8,
    color: resources.colors.black,
    fontSize: widthScale(48.9),
  },
  inputStyle: {
    // marginTop: 7, paddingBottom: 7,

  },
  layoutHorizontal: {
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '27%',
  },
  txtAlreadyHaveAccount: {
    fontFamily: resources.fonts.regular,
    fontSize: widthScale(12),
    color: resources.colors.labelColor
  },
  txtSignupVia: {
    alignSelf: 'center',
    marginVertical: heightScale(20),
    fontFamily: resources.fonts.bold,
    color: resources.colors.labelColor,

  },
  txtSignin: {
    fontFamily: resources.fonts.bold,
    fontSize: widthScale(14),
    marginHorizontal: 5,
    alignSelf: 'center',
    color: resources.colors.labelColor
  },
  textContainer: {
    marginVertical: 18,
    width: '100%',
    flexDirection: 'column',
  }, text: {
    fontSize: widthScale(16),
    fontFamily: resources.fonts.regular,
    color: resources.colors.hint,
    alignSelf: 'center',
    marginVertical: 10,
  },
  inputStyle1: {
    marginTop: 5, paddingBottom: 5
  }, buttonContainer: {
    marginTop: 44,
    alignItems: 'center'
  },
  textAppVersion: {
    alignSelf:'center',
    color: resources.colors.labelColor,
    fontFamily: resources.fonts.regular,
    fontWeight:'600',
    fontSize: 16,
    marginBottom:24
  },
});

export default styles;
