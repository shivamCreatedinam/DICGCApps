import React from 'react';
import PropTypes from 'prop-types';
import { statusBarHeight, widthScale } from '../../utility/Utils';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import res from '../../../res';

const HeaderWithProfilePic = props => {
  const {
    isBackIconVisible,
    customStyle,
    appLogoVisible,
    styleHeaderContainer,
    statusBarColor,
    headerColor,
    changeColor,
    isLogoutVisible,
    navigateProps,
    toRoute,
    onClickLogout,
    isProfileIconVisible,
    isLoginSignupVisible,
    headerTitleVisible,
    onClickLoginSignup, isCart, screenName,
    isFromProfileScreen,
    renderRightView = () => null,
  } = props;
  const renderBackIcon = (isCart) => {
    if (isBackIconVisible) {
      return (
        <TouchableOpacity
          onPress={props.onBackClick}
          style={isCart ? styles.backBtnCont : styles.backBtnContCart}
          hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
          <Image
            style={isCart ? styles.backIconStyle : styles.backcartIcon}
            source={isCart ? res.images.icn_back : res.images.go_back}
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
          style={styles.backBtnCont}
          hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
          <Image
            style={styles.backIconStyle}
            source={res.images.inc_appLogo_header}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      );
    }
  };
  const renderLogoutText = () => {
    if (isLogoutVisible) {
      // return (
      //     <TouchableOpacity onPress={onClickLogout} style={styles.logoutBtnCont}
      //         hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
      //         <Image source={res.images.icn_logout} resizeMode={'contain'} />
      //         <Text style={styles.logoutText}>Logout</Text>
      //     </TouchableOpacity>
      // );
      return <></>;
    }
  };
  const renderloginSignupText = () => {
    if (isLoginSignupVisible) {
      // return (
      //     <TouchableOpacity onPress={onClickLoginSignup}
      //         style={styles.logoutBtnCont}
      //         hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
      //         <Text style={[styles.logoutText, { marginLeft: 0, borderWidth: 0, width: 40 }]}
      //             numberOfLines={2}
      //         >Login/signup</Text>
      //     </TouchableOpacity>
      // );
      return <></>;
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
  const renderProfileView = () => {
    // return (
    //     <TouchableOpacity
    //         onPress={() => {
    //             navigateProps.navigate("MyAccountScreen")
    //         }}
    //         style={{ flexDirection: 'row', alignItems: 'center' }}>
    //         <Image source={res.images.img_avtar} style={styles.avtarStyle} />
    //         <Image source={res.images.icn_menu} />
    //     </TouchableOpacity>
    // );
    return <></>;
  };

  return (
    <View style={[styleHeaderContainer ? styleHeaderContainer : {}, { backgroundColor: 'white' }]}>
      <MyStatusBar
        backgroundColor={statusBarColor ? statusBarColor : res.colors.white}
        barStyle="dark-content"
      />
      <View style={isCart ? [styles.cartHeaderContainer, headerColor] : [styles.headerContainer, headerColor]}>
        {renderBackIcon()}
        {/* {headerTitleVisible ? (
          <View style={styles.titleView}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[styles.textHeaderStyle, customStyle ?? {}]}>
              {props.headerTitle}
            </Text>
          </View>
        ) : null} */}

        {(isCart || isFromProfileScreen) && <View style={styles.titleView}>
          <Text numberOfLines={1} ellipsizeMode={'tail'}
            style={[isFromProfileScreen ? styles.textProfileHeaderStyle : styles.textHeaderStyle, customStyle ? customStyle : {}]} >{props.headerTitle}</Text>
        </View>}

        {isCart && screenName === "CartScren" && <View style={{ flex: 1 }}></View>}

        {renderAppLogo()}
        {renderLeftEmptyViewToBalanceFlex()}

        {!isLogoutVisible
          ? isProfileIconVisible
            ? renderProfileView()
            : isLoginSignupVisible
              ? renderloginSignupText()
              : renderRightEmptyViewToBalanceFlex()
          : renderLogoutText()}

        {renderRightView && renderRightView()}
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
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: res.colors.white,
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
    tintColor: res.colors.black,
  },
  titleView: {
    borderWidth: 0,
    justifyContent: 'flex-start',
    // marginTop:7
  },
  textHeaderStyle: {
    // flex: 1,
    borderWidth: 0,
    color: res.colors.black,
    textAlign: 'left',
    fontSize: 17,
    fontFamily: res.fonts.medium,
    marginLeft: 6,
  },
  textProfileHeaderStyle: {
    borderWidth: 0,
    color: res.colors.black,
    textAlign: 'left',
    fontSize: 17,
    fontFamily: res.fonts.medium,
  },
  textRightOptionStyle: {
    borderWidth: 0,
    color: res.colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
  backBtnCont: {
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  backBtnContCart: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    // marginTop:12
  },
  navigationCont: {
    alignSelf: 'center',
    marginRight: widthScale(9),
  },
  statusBar: {
    height: statusBarHeight,
  },
  resetStyle: {
    justifyContent: 'flex-start',
    color: res.colors.blueText,
    fontSize: widthScale(16),
  },
  resetCont: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossIconStyle: {
    justifyContent: 'flex-start',
    width: widthScale(19),
    height: widthScale(19),
  },
  navigationIconStyle: {
    width: 14,
    height: 18,
  },
  avtarStyle: {
    height: 30,
    width: 30,
    marginRight: widthScale(4),
    backgroundColor: res.colors.white,
    borderRadius: 30,
  },
  logoutText: {
    fontFamily: res.fonts.bold,
    fontSize: 12,
    color: res.colors.white,
    marginLeft: 5,
  },
  logoutBtnCont: {
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartHeaderContainer: {
    height: 65,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: res.colors.white,
    paddingHorizontal: 15,
  },
  backcartIcon: { width: 25, height: 25, resizeMode: 'contain' }
});

HeaderWithProfilePic.propTypes = {
  isBackIconVisible: PropTypes.bool,
};

HeaderWithProfilePic.defaultProps = {
  isBackIconVisible: true,
};

export default HeaderWithProfilePic;

HeaderWithProfilePic.propTypes = {
  isProfileIconVisible: PropTypes.bool,
  isLogoutVisible: PropTypes.bool,
  isLoginSignupVisible: PropTypes.bool,
};

HeaderWithProfilePic.defaultProps = {
  isProfileIconVisible: true,
  isLogoutVisible: false,
  isLoginSignupVisible: false,
};
