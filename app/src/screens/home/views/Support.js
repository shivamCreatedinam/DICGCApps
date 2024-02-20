import React from 'react';
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native';
import resources from '../../../../res';
import colors from '../../../../res/colors';
import Button from '../../../genriccomponents/button/Button';
import { myWidth } from '../../../utility/Utils';
import CustomButton from '../../../genriccomponents/button/CustomButton';

const windowWidth = Dimensions.get('window').width;

const Support = props => {
  return (
    <View
      style={{
        padding: 24,
        borderRadius: 12,
        backgroundColor: colors.white,
        margin: 20,
        // alignSelf:'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      }}>
      <ImageBackground
        source={require('../../../../res/images/HelpAndSupport/help.png')}
        resizeMode='cover'
        style={{
          // width: '100%',
          // height: 200,
          // padding: 24,
          height: windowWidth / 2.4,
          width: windowWidth / 1.2,
          marginTop: -21

        }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column', marginTop: 20 }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: colors.greyText,
                fontFamily: resources.fonts.regular,
              }}>
              HELP & SUPPORT
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: colors.gray_222222,
                fontFamily: resources.fonts.medium,
                marginBottom: 12,
              }}>
              Looking for an answer?
            </Text>
          </View>
        </View>
      </ImageBackground>

      <CustomButton
        text={'Reach out to us'}
        onPress={() => props.handleOnPress()}
        
      />
    </View>

  );
};

export default Support;
