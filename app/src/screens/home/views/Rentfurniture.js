import React from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import resources from '../../../../res';
import {myWidth} from '../../../utility/Utils';

const Rentfurniture = props => {
  if (props?.data?.categories) {
    return (
      <View style={{padding: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            marginLeft: 5,
            marginTop: 10,
            fontFamily: resources.fonts.medium,
          }}>
          {props.label}
        </Text>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <FlatList
            data={props?.data?.categories}
            numColumns={3}
            renderItem={({item, index}) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      // let data = {
                      //     categoryId: item.id,
                      //     categoryTypeFromHome: 0,
                      //   };
                      //   let event = AppUser.getInstance().emitterInst;
                      //   setTimeout(() => {
                      //     event.emit(
                      //       events.GOTO_PARTICULAR_CATEGORY_FROM_HOME,
                      //       JSON.stringify(data),
                      //     );
                      //   }, 400);
                      props.onPressItem(item, index);
                    }}
                    style={{alignItems: 'center', padding: 5}}>
                    <Image
                      resizeMode="cover"
                      style={{
                        width: myWidth / 3.45,
                        height: 120,
                        borderRadius: 10,
                      }}
                      source={{uri: item.imgUrl}}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#222222',
                        marginTop: 4,
                        marginBottom: 5,
                        fontFamily: resources.fonts.medium,
                      }}>
                      {item.cat_name}
                    </Text>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      </View>
    );
  } else {
    return false;
  }
};

export default Rentfurniture;
