import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import resources from '../../../res';
import {isiPhoneX, myWidth} from '../../utility/Utils';
import colors from '../../../res/colors';

function DoneReceiveOtpModal(props) {
  const {visibleModal, onPressBackDrop} = props;

  return (
    <Modal
      avoidKeyboard
      animationOutTiming={0}
      onBackdropPress={() => onPressBackDrop()}
      onRequestClose={() => onPressBackDrop()}
      isVisible={visibleModal}
      style={styles.bottomModal}>
      {renderViewTypes(props)}
    </Modal>
  );
}

function renderViewTypes(props) {
  const {
    titlemodel,
    onChangeMobileNumner,
    onPressGetOtp,
    onPressBackDrop,
  } = props;
  return (
    <View
      style={{
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        alignItems: 'flex-start',
        marginHorizontal: 0,
        bottom: 0,
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingBottom: 32,
        paddingTop: 32,
      }}>
      <TouchableOpacity
        onPress={() => {
          onPressBackDrop();
        }}
        style={styles.closeButton}>
        <Image
          source={require('../../../res/images/productDetail/close.png')}
        />
      </TouchableOpacity>
      <View style={styles.boxLayout}>
        <View
          style={{
            height: 1,
            width: '10%',
            backgroundColor: resources.colors.inputLabel,
          }}
        />
        <Text
          style={{
            color: resources.colors.textBlack,
            fontSize: 24,
            lineHeight: 28,
            fontFamily: resources.fonts.medium,
          }}>
          {titlemodel}
        </Text>

        <TouchableOpacity
          onPress={onChangeMobileNumner}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 32,
            width: '95%',
          }}>
          <View>
            <Text style={styles.subTitleText}>{`Change mobile number`}</Text>
          </View>
          <View>
            <Image
              source={resources.images.splash_right}
              style={{width: 20, height: 20}}
            />
          </View>
        </TouchableOpacity>

        <View
          style={[
            {
              marginVertical: 15,
              width: myWidth - 56,
              borderBottomWidth: 1,
              borderColor: colors.gray,
            },
          ]}
        />

        <TouchableOpacity
          onPress={() => {
            onPressGetOtp();
            onPressBackDrop();
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // marginTop: 20,
            width: '95%',
          }}>
          <View>
            <Text style={styles.subTitleText}>{`Resend OTP`}</Text>
          </View>
          <View>
            <Image
              source={resources.images.splash_right}
              style={{width: 20, height: 20}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{height: 20, backgroundColor: resources.colors.inputLabel}}
      />
    </View>
  );
}

export {DoneReceiveOtpModal};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  closeButton: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -40,
    right: 16,
  },
  featureLabel: {
    fontFamily: 'Gill Sans',
    fontSize: 15,
    height: 25,
    marginHorizontal: 10,
    marginTop: 4,
    color: resources.colors.BLACK_TEXT,
    fontWeight: '500',
  },
  categoryLabel: {
    fontFamily: 'Gill Sans',
    fontSize: 15,
    alignSelf: 'center',
    color: resources.colors.BLACK_TEXT,
    fontWeight: '500',
  },
  boxLayout: {
    // margin: 16,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  boxBottom: {
    height: 2,
    width: '100%',
    backgroundColor: resources.colors.inputLabel,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  productBox: {
    // flex: 1,
    height: 400,
    // marginHorizontal: 20,
    // marginBottom: 20,
  },
  subTitleText: {
    color: colors.titleBlack,
    fontFamily: resources.fonts.regular,
    fontSize: 14,
    lineHeight: 18,
  },
  divider1: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#DDDDDF',
    // marginTop : 15,
    marginBottom: 15,
    marginRight: 20,
  },
});
