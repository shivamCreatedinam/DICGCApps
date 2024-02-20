import React from 'react'
import PropTypes from "prop-types";
import { statusBarHeight, widthScale } from '../../utility/Utils'
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, NativeModules } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import res from '../../../res'

const HeaderWithChat = props => {
    const { isBackIconVisible, customStyle, appLogoVisible, styleHeaderContainer,
        statusBarColor, headerColor,
        chatBotCloseModal } = props;

      

    const renderBackIcon = () => {
        if (isBackIconVisible) {
            return (
                <TouchableOpacity onPress={props.onBackClick} style={styles.backBtnCont} hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
                    <Image style={styles.backIconStyle} source={res.images.icn_back} resizeMode={'contain'}></Image>
                </TouchableOpacity>
            );
        }
    }
    const renderAppLogo = () => {
        if (appLogoVisible) {
            return (
                <TouchableOpacity onPress={props.onAppLogoClick} style={styles.backBtnCont} hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
                    <Image style={styles.backIconStyle} source={res.images.inc_appLogo_header} resizeMode={'contain'}></Image>
                </TouchableOpacity>
            );
        }
    }


    return (
        <View
            style={styleHeaderContainer ? styleHeaderContainer : {}}>
            <MyStatusBar
                backgroundColor={statusBarColor ? statusBarColor : res.colors.appColor}
                barStyle="dark-content" />
            <View style={[styles.headerContainer, headerColor]}>
                {renderBackIcon()}
                {renderAppLogo()}
                <View style={styles.titleView}>
                    <Text style={styles.txtYourChat}>Chat With Us</Text>
                </View>
                {
                    <TouchableOpacity
                        onPress={chatBotCloseModal}
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='close' size={20} color={res.colors.white} />
                    </TouchableOpacity>
                        
                }
            </View>
        </View >

    )
}




export const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);


const styles = StyleSheet.create({

    headerContainer: {
        height: 55,
        marginTop: -20,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: res.colors.appColor,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        shadowColor: "rgba(0,0,0,0.4)",
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
        tintColor: res.colors.white
    },
    titleView: {
        borderWidth: 0,
        marginLeft: 0,
    },
    txtYourChat: {
        // flex: 1,
        borderWidth: 0,
        color: res.colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: res.fonts.bold
    },
    textHeaderStyle: {
        // flex: 1,
        borderWidth: 0,
        color: res.colors.white,
        fontSize: 16,
        fontFamily: res.fonts.regular,
        marginHorizontal: 4,

    },
    textRightOptionStyle: {
        borderWidth: 0,
        color: res.colors.white,
        textAlign: 'center',
        fontSize: 16
    },
    backBtnCont: {
        alignSelf: "stretch",
        justifyContent: "center",
    },
    navigationCont: {
        alignSelf: "center",
        marginRight: widthScale(9)
    },
    statusBar: {
        height: statusBarHeight,
    },
    resetStyle: {
        justifyContent: 'flex-start',
        color: res.colors.blueText,
        fontSize: widthScale(16)
    },
    resetCont: {
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
    },
    crossIconStyle: {
        justifyContent: 'flex-start',
        width: widthScale(19),
        height: widthScale(19)
    },
    navigationIconStyle: {
        width: 12,
        height: 14,
        tintColor: 'white'
    },
    downlwardArrowIconStyle: {
        width: 10,
        height: 13,
        borderWidth: 0,
        tintColor: 'white',
        transform: [{ rotate: '90deg' }]
    },
    avtarStyle: {
        height: 30,
        width: 30,
        marginRight: widthScale(4),
        backgroundColor: res.colors.white,
        borderRadius: 30
    },
    logoutText: {
        fontFamily: res.fonts.bold,
        fontSize: 12,
        color: res.colors.white,
        marginLeft: 5
    },
    logoutBtnCont: {
        alignSelf: 'center',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center',
    },
})

HeaderWithChat.propTypes = {
    isBackIconVisible: PropTypes.bool,
    isProfileIconVisible: PropTypes.bool,
    isLogoutVisible: PropTypes.bool,
};

HeaderWithChat.defaultProps = {
    isBackIconVisible: true,
    isProfileIconVisible: true,
    isLogoutVisible: false,
};


export default HeaderWithChat

