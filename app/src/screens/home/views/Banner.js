import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import resources from '../../../../res';
import AppUser from '../../../utility/AppUser';
import events from '../../../utility/Events';

const windowWidth = Dimensions.get('window').width;
const Banner = props => {
  let data = props?.data?.exploreCategoryBanner;
  let frpData = props?.data?.frp;
  if (props.cityMax == true) {
    if (frpData && frpData.show_flag) {
      return (
        <View style={{padding: 16}}>
          <ImageBackground
            imageStyle={{borderRadius: 10}}
            style={{
              width: '100%',
              height: windowWidth,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            source={{uri: frpData.image}}>
            <View style={{position: 'absolute', top: 15, left: 20}}>
              <Text
                style={{
                  color: '#71717A',
                  fontSize: 12,
                  fontWeight: '400',
                  fontFamily: resources.fonts.regular,
                }}>
                {frpData.title}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  width: '60%',
                  color: '#A62E12',
                  fontSize: 18,
                  fontWeight: '500',
                  fontFamily: resources.fonts.medium,
                }}>
                {frpData.subtitle}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.push('FrpCategoryScreen')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#222222',
                width: '90%',
                padding: 15,
                marginBottom: 15,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: resources.fonts.regular,
                }}>
                {frpData?.button_name}
              </Text>
              <Image
                source={require('../../../../res/images/Image/right.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    } else {
      return false;
    }
  } else if (props.cityMax == false) {
    if (data && data.show_flag) {
      return (
        <View style={{padding: 16}}>
          <ImageBackground
            imageStyle={{borderRadius: 10}}
            style={{
              width: '100%',
              height: windowWidth,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            source={{uri: data.image}}>
            <View style={{position: 'absolute', top: 15, left: 20}}>
              <Text
                style={{
                  color: '#71717A',
                  fontSize: 12,
                  fontWeight: '400',
                  fontFamily: resources.fonts.regular,
                }}>
                {data.title}
              </Text>
              <Text
                numberOfLines={3}
                style={{
                  width: '80%',
                  color: '#A62E12',
                  fontSize: 18,
                  fontWeight: '500',
                  fontFamily: resources.fonts.medium,
                }}>
                {data.subtitle}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                let data1 = {
                  categoryId: data?.cta_category_id,
                  categoryTypeFromHome: 1,
                  categoryIndex: 0,
                };
                let event = AppUser.getInstance().emitterInst;
                props.navigation.navigate('CategoryScreen', {
                  isShowCategory: false,
                });
                setTimeout(() => {
                  event.emit(
                    events.GOTO_PARTICULAR_CATEGORY_FROM_HOME,
                    JSON.stringify(data1),
                  );
                }, 400);
                //props.navigation.push('ExplorerCombos',{showSearchBox : props.showSearchBox})
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#222222',
                width: '90%',
                padding: 15,
                marginBottom: 15,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: resources.fonts.regular,
                }}>
                {data?.button_name}
              </Text>
              <Image
                source={require('../../../../res/images/Image/right.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default Banner;
