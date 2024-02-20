import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeaderWithLocation = props => {
  const {
    isBackIconVisible,
    customStyle,
    appLogoVisible,
    styleHeaderContainer,
    statusBarColor,
    headerColor,
    isLogoutVisible,
    navigateProps,
    onClickLogout,
    isProfileIconVisible,
    onClickLocation,
    isSearch,
    headerTitle
  } = props;

  const searchVisible = isSearch || false;

  const [homePageData, setHomePageData] = useState([]);

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const fetchHomePageData = async () => {
    try {
      AsyncStorage.getItem('HomePageData').then(data => {
        let dataSet = JSON.parse(data);
        setHomePageData(dataSet);
      });
    } catch (err) {
      console.log(err);
    }

    // if (value !== null) {
    //   let dataSet = JSON.parse(value);
    //   setHomePageData(dataSet);
    // }
  };

  const renderBackIcon = () => {
    if (isBackIconVisible) {
      return (
        <TouchableOpacity
          onPress={props.onBackClick}
          style={styles.backBtnCont}
          hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
          <Image
            style={styles.backIconStyle}
            source={res.images.icn_back}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      );
    }
  };
  const renderAppLogo = () => {
    if (appLogoVisible) {
      return (
        <TouchableOpacity
          onPress={props.onAppLogoClick}
          style={[styles.backBtnCont]}
          hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
          <Image
            style={styles.backIconStyle}
            source={res.images.inc_appLogo_header}
            resizeMode={'contain'}
            width={70}
          />
        </TouchableOpacity>
      );
    }
  };
  const renderLogoutText = () => {
    if (isLogoutVisible) {
      return (
        <TouchableOpacity
          onPress={onClickLogout}
          style={styles.logoutBtnCont}
          hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
          <Image source={res.images.icn_logout} resizeMode={'contain'} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      );
    }
  };
  const renderLeftEmptyViewToBalanceFlex = () => {
    if (!isBackIconVisible && !appLogoVisible) {
      return <View style={{ width: 20, height: 20 }} />;
    }
  };
  const renderRightEmptyViewToBalanceFlex = () => {
    return <View style={{ width: 40, height: 20 }} />;
  };

  return (
    <View style={styleHeaderContainer ? styleHeaderContainer : {}}>
      <MyStatusBar
        backgroundColor={
          statusBarColor ? statusBarColor : '#ffffff'
        }
        barStyle="dark-content"
      />
      <View style={[styles.headerContainer, headerColor]}>
        {/* {renderBackIcon()} */}
        {/* {renderAppLogo()} */}
        {/* {renderLeftEmptyViewToBalanceFlex()} */}
        <TouchableOpacity
          onPress={() => onClickLocation()}
          style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', elevation: 5 }}>
            <Image
              style={{ width: 60, height: 25, resizeMode: 'contain' }}
              source={require('../../assets/app_logo.png')}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize' }}>
              {props.headerTitle?.name}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Text style={{ color: 'green', fontSize: 14, fontWeight: 'bold', textAlign: 'center', paddingTop: 3, backgroundColor: '#fff', elevation: 5, paddingVertical: 5, paddingHorizontal: 10 }}>Pending Survey {props.headerTitle?.surveyCountInProcessing}</Text> */}
          <Text style={{ color: 'green', fontSize: 14, fontWeight: 'bold', textAlign: 'center', paddingTop: 3, backgroundColor: '#fff', elevation: 5, paddingVertical: 5, paddingHorizontal: 10 }}>Total Survey {props.headerTitle?.surveyCountInTotal}</Text>
        </View>
      </View>
    </View>
  );
};

export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={'white'} {...props} />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1,
    borderWidth: 0,
  },
  backIconStyle: {
    justifyContent: 'flex-start',
    tintColor: '#FFFFFF',
  },
  titleView: {
    borderWidth: 0,
    marginLeft: 20,
  },
  txtYourLocation: {
    // flex: 1,
    borderWidth: 0,
    color: '#000000',
    textAlign: 'center',
    fontSize: 12,
  },
  textHeaderStyle: {
    // flex: 1,
    borderWidth: 0,
    color: '#ffffff',
    fontSize: 16,
    marginHorizontal: 4,
  },
  textRightOptionStyle: {
    borderWidth: 0,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  backBtnCont: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  navigationCont: {
    alignSelf: 'center',
    marginRight: 10,
  },
  statusBar: {
    height: StatusBar.currentHeight,
  },
  resetStyle: {
    justifyContent: 'flex-start',
    fontSize: 14,
  },
  resetCont: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconStyle: {
    justifyContent: 'flex-start',
    width: 20,
    height: 20,
  },
  navigationIconStyle: {
    width: 12,
    height: 14,
    tintColor: 'white',
  },
  downlwardArrowIconStyle: {
    width: 10,
    height: 13,
    borderWidth: 0,
    tintColor: 'white',
    transform: [{ rotate: '90deg' }],
  },
  avtarStyle: {
    height: 30,
    width: 30,
    marginRight: 5,
    backgroundColor: '#ffffff',
    borderRadius: 30,
  },
  logoutText: {
    fontSize: 12,
    color: '#ffffff',
    marginLeft: 5,
  },
  logoutBtnCont: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

HeaderWithLocation.propTypes = {
  isBackIconVisible: PropTypes.bool,
  isProfileIconVisible: PropTypes.bool,
  isLogoutVisible: PropTypes.bool,
};

HeaderWithLocation.defaultProps = {
  isBackIconVisible: true,
  isProfileIconVisible: true,
  isLogoutVisible: false,
};

export default HeaderWithLocation;
