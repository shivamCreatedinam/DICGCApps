import React, {Component} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';

const GridImage = ({images, idx}) => {
  const isLast = Math.floor(images.length / 2) === idx;
  const isEven = idx === 0 || idx % 2 === 0;
  return (
    <View>
      <View style={{width: 160, height: isEven ? 160 : 240, padding: 2}}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: images[idx + idx],
          }}
        />
      </View>
      {!isLast && (
        <View
          style={{
            width: 160,
            height: isEven ? 240 : 160,
            padding: 2,
          }}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: images[idx + idx + 1],
            }}
          />
        </View>
      )}
    </View>
  );
};

export default class ImageGrid extends Component {
  render() {
    const {images} = this.props;
    return images.length > 0 ? (
      <View style={{flex: 1}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 10,
            paddingVertical: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            {images
              .slice(0, Math.ceil(images.length / 2))
              .map((item, index) => (
                <GridImage key={index.toString()} images={images} idx={index} />
              ))}
          </View>
        </ScrollView>
      </View>
    ) : null;
  }
}

export const styles = StyleSheet.create({
  container_row: {
    flexDirection: 'row',
    padding: 4,
  },

  container: {
    flex: 1,
    padding: 4,
  },

  image_view: {
    flex: 1,
    margin: 2,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: 'grey',
  },

  item_view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  item_view_overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  text: {
    color: 'white',
    fontSize: 18,
  },
});
