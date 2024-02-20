import React from 'react'
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native'


const HeaderAndStatusBar = props => {
    const { isBackIconVisible, customStyle, styleHeaderContainer,
        onResetPress, isCrossIconVisible, isResetVisible, navigationVisible, statusBarColor } = props;
    const renderBackIcon = () => {
        if (isBackIconVisible) {
            return (
                <TouchableOpacity onPress={props.onBackClick} style={[styles.backBtnCont,
                { width: '15%', }]}
                    hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
                    <Image style={styles.backIconStyle} source={require('../../assets/backCopy.png')} resizeMode={'contain'}></Image>
                </TouchableOpacity>

            );
        }
    }
    const renderResetButton = () => {
        if (isResetVisible) {
            return (
                <TouchableOpacity onPress={onResetPress} style={styles.resetCont}
                    hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
                    <Text style={styles.resetStyle} >{"Reset"}</Text>
                </TouchableOpacity>
            );
        }
    }
    const renderCrossIcon = () => {
        if (isCrossIconVisible) {
            return (
                <TouchableOpacity onPress={props.onBackClick}
                    style={[styles.backBtnCont, { width: '15%', }]}
                    hitSlop={{ top: 10, left: 20, right: 20, bottom: 10 }}>
                    <Image style={styles.crossIconStyle} source={require('../../assets/backCopy.png')} resizeMode={'contain'}></Image>
                </TouchableOpacity>
            );
        }
    }
    const renderNavigationIcon = () => {
        if (navigationVisible) {
            return (
                <View style={styles.navigationCont} >
                    <Image style={styles.navigationIconStyle} source={require('../../assets/backCopy.png')} resizeMode={'contain'}></Image>
                </View>
            );
        }
    }
    const renderLeftEmptyViewToBalanceFlex = () => {
        if (!isBackIconVisible && !isCrossIconVisible) {
            return (
                <View style={{ width: '15%', height: 20, borderWidth: 0 }} />
            );
        }
    }
    return (
        <View style={styleHeaderContainer ? styleHeaderContainer : {}}>
            <MyStatusBar
                backgroundColor={statusBarColor ? statusBarColor : '#FFFFFF'}
                barStyle="dark-content" />
            <View style={[styles.headerContainer]}>
                {isCrossIconVisible ? renderCrossIcon() : renderBackIcon()}
                {renderLeftEmptyViewToBalanceFlex()}
                <View style={{ flexDirection: 'row' }}>
                    {navigationVisible ? renderNavigationIcon() : null}
                    <Text numberOfLines={1} ellipsizeMode={'tail'}
                        style={[styles.textHeaderStyle, customStyle ? customStyle : {}]} >{props.headerTitle}</Text>
                </View>
                {isResetVisible ? renderResetButton() : <View style={{ width: '15%', height: 20, }} />}

            </View>
        </View>

    )
}

export const MyStatusBar = ({ barStyle, backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} barStyle={barStyle} />
    </View>
);


const styles = StyleSheet.create({

    headerContainer: {
        height: 55,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 0,
    },
    backIconStyle: {
        justifyContent: 'flex-start',
    },
    textHeaderStyle: {
        // flex: 1,
        borderWidth: 0,
        color: '#000',
        textAlign: 'center',
        fontSize: 17,
    },
    textRightOptionStyle: {
        borderWidth: 0,
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16
    },
    backBtnCont: {
        alignSelf: "stretch",
        justifyContent: "center",
    },
    navigationCont: {
        alignSelf: "center",
        marginRight: 10
    },
    statusBar: {
        height: StatusBar.currentHeight,
    },
    resetStyle: {
        justifyContent: 'flex-start',
        color: "rgb(45,109,154)",
        fontSize: 14,
    },
    resetCont: {
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: 'flex-end',
        width: '15%',
    },
    crossIconStyle: {
        justifyContent: 'flex-start',
        width: 17,
        height: 17
    },
    navigationIconStyle: {
        width: 14,
        height: 18
    },
})

HeaderAndStatusBar.propTypes = {
    isBackIconVisible: PropTypes.bool
};

HeaderAndStatusBar.defaultProps = {
    isBackIconVisible: true
};


export default HeaderAndStatusBar