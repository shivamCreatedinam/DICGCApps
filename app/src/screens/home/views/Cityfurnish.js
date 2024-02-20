import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {type4Data} from './preconfig';

const Cityfurnish = ({data = type4Data, title = 'Why Cityfurnish?'}) => {
  return (
    <View>
      <Text style={styles.freeServiceHeaderTitle}>{title}</Text>
      <ScrollView
        contentContainerStyle={{marginTop: 24, paddingRight: 20}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <View key={index.toString()} style={styles.freeServiceItem}>
              <Image style={styles.freeServiceImage} source={item.image} />
              <Text style={styles.txtFreeServiceTitle}>{item.title}</Text>
              <Text style={styles.txtFreeServiceDetail}>{item.desc}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cityfurnish;
