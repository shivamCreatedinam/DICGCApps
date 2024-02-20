import React, {Component} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import resources from '../../../../res';
import {myWidth} from '../../../utility/Utils';
import ImageGrid from './ImageGrid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Market = props => {
  //

  let data = props?.data?.testimonialProductImages;
  if (props?.data?.testimonialProductImages) {
    return (
      <>
        <ImageBackground
          imageStyle={{borderRadius: 5}}
          style={{
            width: windowWidth,
            height: windowWidth + 130,
            backgroundColor: '#EFECE6',
            marginTop: 15,
            marginBottom: 40,
          }}
          source={require('../../../../res/images/Image/mainBox.png')}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              marginTop: 15,
              fontWeight: '500',
              fontFamily: resources.fonts.regular,
            }}>
            Our furniture makes it cool
          </Text>

          <View
            style={{
              padding: 16,
              height: 450,
              marginBottom: 30,
            }}>
            <ImageGrid images={data} />
          </View>
        </ImageBackground>
      </>
    );
  } else {
    return false;
  }
};

export default Market;

{
  /* <FlatList 
                    data={data}
                    horizontal
                    style={{
                        flexDirection: "row",
               flexWrap: "wrap",
               
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item,index}) => {
                        
                        return(
                            <>
                               <Image 
                                source={{uri : item}}
                                // style={{
                                //     width: myWidth * .2,  //its same to '20%' of device width
                                //     aspectRatio: 1, // <-- this
                                //     resizeMode: 'contain', //optional
                                // }}
                                style={[
                                    {
                                      width: index % 2 === 1 ? 200 : 95,
                                      height: index % 2 === 1 ? 300 : 95,
                                      
                                    },
                                  ]}
                                  resizeMode="center"
                            
                               />
                            </>
                        )
                    }}
                /> */
}
