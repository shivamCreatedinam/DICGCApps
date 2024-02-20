import {Card} from 'native-base';
import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from 'react-native';
import resources from '../../../../res';
const windowWidth = Dimensions.get('window').width;

const UserTosay = props => {
  return (
    <View style={{padding: 10, marginTop:0}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          marginBottom: 0,
          marginLeft: 10,
          fontFamily: resources.fonts.medium,
        }}>
        What our users have to say
      </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{marginTop: 10}}
        showsHorizontalScrollIndicator={false}>
        {props?.data?.customerTestimonial?.reviews?.map((cs, index) => {
          return (
            <View key={index.toString()}>
              <Card
                style={{
                  height: 240,
                  width: windowWidth / 1.6,
                  marginLeft: index == 0 ? 10 : 15,
                  borderRadius: 12,borderColor:'#fff',borderWidth:1,
                  padding: 8,backgroundColor:'#fff',elevation:5
                }}>
                <View style={{padding: 8}}>
                  {/* <ImageBackground source={require('../../../../res/images/MainBox.png')} style={{backgroundColor:'#FFFFFF',height:windowWidth/3,width:windowWidth/1.7}}>
                                    </ImageBackground> */}

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 170,
                    }}>
                    <Text
                      numberOfLines={4}
                      style={{
                        color: '#302F30',
                        fontWeight: '500',
                        fontFamily: resources.fonts.regular,
                        fontSize: 14,
                        width: '90%',
                        position: 'absolute',
                        bottom: 50,
                      }}>{`"${cs.comment}"`}</Text>
                    <View style={{justifyContent: 'center'}}>
                      <Image
                        style={{
                          height: 20,
                          width: 20,
                          borderRadius: 100,
                          marginRight: 10,
                        }}
                        source={{uri: cs.user_img}}
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <Text
                        style={{
                          color: '#71717A',
                          fontSize: 12,
                          fontWeight: '400',
                          fontFamily: resources.fonts.regular,
                          width: '100%',
                        }}>
                        {cs.user_name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{position: 'absolute', right: 5}}>
                  <Image
                    source={require('../../../../res/images/MainBox.png')}
                  />
                </View>
              </Card>
            </View>
          );
        })}

        {/* <View style={{width:windowWidth/1.1}}>
            <ImageBackground source={require('../../../../res/images/Image/userTosay.png')} style={{backgroundColor:'#FFFFFF',height:windowWidth/3,width:windowWidth/1.3}}>
            </ImageBackground>
                <Text style={{color:'black',fontSize:22,marginTop:10,width:'80%'}}>“Good work and fast assembly by Dilip Maurya”</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{marginTop:10,height:40,width:40,borderRadius:100,marginRight:10}} source={require('../../../../res/images/Image/freeShoping.png')}/>
                <Text style={{color:'#71717A',fontSize:14,marginTop:10,width:'100%',marginBottom:10}}>Saumya Ranjan Giri</Text> 
                </View>
            </View> */}
        {/* <View style={{width:windowWidth/1.1}}>
            <ImageBackground source={require('../../../../res/images/Image/userTosay.png')} style={{backgroundColor:'#FFFFFF',height:windowWidth/3,width:windowWidth/1.3}}>
            </ImageBackground>
                <Text style={{color:'black',fontSize:22,marginTop:10,width:'80%'}}>“Good work and fast assembly by Dilip Maurya”</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{marginTop:10,height:40,width:40,borderRadius:100,marginRight:10}} source={require('../../../../res/images/Image/freeShoping.png')}/>
                <Text style={{color:'#71717A',fontSize:14,marginTop:10,width:'100%',marginBottom:10}}>Saumya Ranjan Giri</Text> 
                </View>
            </View> */}
      </ScrollView>
    </View>
  );
};

export default UserTosay;
