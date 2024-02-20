import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  ImageBackground,
} from 'react-native';
import resources from '../../../res';
import {myWidth} from '../../utility/Utils';
import {connect} from 'react-redux';
import colors from '../../../res/colors';
import images from '../../../res/images';

const OnboardingScreen = props => {
  const flatListRef = useRef(FlatList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideData, setSlideData] = useState([1, 2, 3]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{flex: 2.5}}>
        <View style={styles.containerTop}>
          <View style={styles.hiTextWrapper}>
            <Text style={styles.hiText}>hi</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.push('DashboardScreen')}
            style={[styles.right, {justifyContent: 'center'}]}>
            <Image
              source={resources.images.icn_skip}
              style={{width: 70, height: 30}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.headingWrap}>
          <Text style={styles.heading}>
            Make your picture perfect home with us
          </Text>
        </View>
      </View>
      {/* Second Card Design  */}

      <View style={{alignItems: 'center', flex: 4.5, marginBottom: 20}}>
        <FlatList
          data={slideData}
          scrollEventThrottle={16}
          onScroll={event => {
            const totalWidth = event.nativeEvent.layoutMeasurement.width;
            const xPosition = event.nativeEvent.contentOffset.x;
            const newIndex = Math.round(xPosition / totalWidth);
            if (newIndex !== currentIndex) {
              setCurrentIndex(newIndex);
            }
          }}
          windowSize={myWidth - 40}
          horizontal
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={myWidth - 20}
          ref={flatListRef}
          renderItem={({item, index}) => {
            if (item == 1) {
              return (
                <View style={styles.card}>
                  <ImageBackground
                    source={images.splash_cardMainImage}
                    style={styles.cardBackground}>
                    <Text style={styles.cardTopText}>
                      Choose what fits best for you from the wide-range of
                      products
                    </Text>
                    <Image
                      source={resources.images.icn_slideframe}
                      style={{
                        flex: 1,
                        width: '100%',
                        marginTop: -50,
                      }}
                    />
                  </ImageBackground>
                </View>
              );
            } else if (item == 2) {
              return (
                <View style={styles.card}>
                  <View style={styles.cardBackground}>
                    <View style={styles.cardTextWrap}>
                      <Text style={styles.cardTopText}>
                        But, why should you rent with us? Here’s why...
                      </Text>
                    </View>

                    <View style={[styles.CardList]}>
                      <Image
                        source={resources.images.splash_v6icon}
                        style={styles.icon}
                      />
                      <View style={[styles.contentContainer, {marginLeft: 12}]}>
                        <Text
                          style={
                            styles.description
                          }>{`Fresh and mint new condition\n products`}</Text>
                      </View>
                    </View>

                    <View style={styles.CardList}>
                      <Image
                        source={resources.images.splash_shippingIcon}
                        style={styles.icon}
                      />
                      <View style={[styles.contentContainer, {marginLeft: 12}]}>
                        <Text style={styles.description}>
                          You get free shipping and free upgrades on all
                          products
                        </Text>
                      </View>
                    </View>

                    <View style={styles.CardList}>
                      <Image
                        source={resources.images.splash_setting}
                        style={styles.icon}
                      />
                      <View style={[styles.contentContainer, {marginLeft: 12}]}>
                        <Text style={styles.description}>
                          Free relocation and installation
                        </Text>
                      </View>
                    </View>

                    <View style={styles.imageBackslot}>
                      <Image
                        source={resources.images.splash_cardMainImage}
                        style={styles.backgroundImage}
                      />
                    </View>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={styles.card}>
                  <View style={styles.cardBackground}>
                    <View style={{paddingBottom: 15}}>
                      <Text style={styles.cardTopText}>
                        It’s fast. It just takes 3 steps to rent a product.
                      </Text>
                    </View>

                    <View style={styles.CardList}>
                      <View style={styles.iconContainer}>
                        <Image
                          source={resources.images.icn_step1}
                          style={styles.icon1}
                        />
                      </View>
                      <View style={[styles.contentContainer, {marginLeft: 25}]}>
                        <Text style={styles.stepText}>STEP 1</Text>
                        <Text
                          style={
                            styles.description2
                          }>{`Select a product and tenure to \nstart renting`}</Text>
                      </View>
                    </View>
                    <View style={{height: 15}} />
                    <View style={styles.CardList}>
                      <View style={styles.iconContainer}>
                        <Image
                          source={resources.images.icn_step3}
                          style={styles.icon1}
                        />
                      </View>
                      <View style={[styles.contentContainer, {marginLeft: 25}]}>
                        <Text style={styles.stepText}>STEP 2</Text>
                        <Text
                          style={
                            styles.description2
                          }>{`Get items delivered and assembled within 72 hrs`}</Text>
                      </View>
                    </View>
                    <View style={{height: 15}} />
                    <View style={styles.CardList}>
                      <View style={styles.iconContainer}>
                        <Image
                          source={{
                            uri:
                              'https://d3juy0zp6vqec8.cloudfront.net/images/interior-set.webp',
                          }}
                          style={styles.icon1}
                        />
                      </View>
                      <View style={[styles.contentContainer, {marginLeft: 25}]}>
                        <Text style={styles.stepText}>STEP 3</Text>
                        <Text
                          style={
                            styles.description2
                          }>{`Experience the firsthand magic of furniture`}</Text>
                        <Text />
                        <Text />
                      </View>
                    </View>

                    <View style={styles.imageBackslot}>
                      <Image
                        source={resources.images.splash_cardMainImage}
                        style={styles.backgroundImage}
                      />
                    </View>
                  </View>
                </View>
              );
            }
          }}
        />
        <View style={{alignSelf: 'center', marginTop: -11}}>
          {currentIndex == 0 ? (
            <Image
              source={resources.images.icn_dot1}
              style={{width: 42, height: 22}}
            />
          ) : currentIndex == 1 ? (
            <Image
              source={resources.images.icn_dot2}
              style={{width: 42, height: 22}}
            />
          ) : (
            <Image
              source={resources.images.icn_dot3}
              style={{width: 42, height: 22}}
            />
          )}
        </View>
      </View>

      <View style={[styles.btnSlot, {flex: 0.8}]}>
        <TouchableOpacity
          onPress={() => {
            if (currentIndex == 0 || currentIndex == 1) {
              flatListRef?.current?.scrollToIndex({
                animated: true,
                index: currentIndex + 1,
              });
            } else if (currentIndex == 2) {
              props.navigation.push('SigninScreen');
            }
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>
            {currentIndex == 0 || currentIndex == 1 ? 'Next' : 'Start renting'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#F7F7F8',
    flex: 1,
  },
  card: {
    width: myWidth - 40,
    marginHorizontal: 12,
  },
  cardContainerTop: {
    width: '100%',
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    color: '#222222',
    fontFamily: resources.fonts.medium,
  },
  imageBackslot: {
    position: 'absolute',
    bottom: 0,
  },
  skipBtn: {
    color: '#71717A',
    fontWeight: '600',
    fontSize: 14,
    paddingLeft: 6,
    paddingBottom: 6,
    paddingRight: 12,
    paddingTop: 8,
    backgroundColor: '#F6F2EE',
    borderWidth: 1,
    borderColor: '#F6F2EE',
    borderRadius: 22,
  },
  hiText: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 36,
    fontSize: 32,
    fontFamily: resources.fonts.bold,
  },
  hiTextWrapper: {
    backgroundColor: '#000',
    borderRadius: 16,
    height: 72,
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgrounsImage: {
    resizeMode: 'center',
    alignSelf: 'flex-end',
  },

  cardBackground: {
    width: '100%',
    borderRadius: 10,
    borderColor: '#EDEDEE',
    borderWidth: 2,
    paddingTop: 30,
    flex: 1,
  },
  cardTextWrap: {
    paddingBottom: 40,
  },
  cardTopText: {
    color: '#71717A',
    fontSize: 14,
    fontWeight: '400',
    marginHorizontal: 32,
    fontFamily: resources.fonts.regular,
  },

  headingWrap: {
    paddingHorizontal: 20,
  },

  containerTop: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Align items at the ends of the container
    padding: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  left: {
    // Add styles for the left element
  },
  right: {
    // Add styles for the right element
  },

  CardList: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 32,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer1: {
    width: 75,
    height: 75,
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  icon1: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  contentContainer: {
    marginLeft: 16,
    width: '80%',
  },
  description: {
    fontSize: 14,
    color: '#222222',
    //lineHeight: 20,
    fontWeight: '500',
    fontFamily: resources.fonts.medium,
  },
  stepText: {
    color: '#48678B',
    fontFamily: resources.fonts.medium,
    fontWeight: '500',
    fontSize: 14,
  },
  description2: {
    fontSize: 12,
    color: '#71717A',
    lineHeight: 15,
    fontWeight: '400',
    fontFamily: resources.fonts.regular,
    marginTop: 8,
  },
  btnSlot: {
    width: myWidth - 40,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    textAlign: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: resources.fonts.medium,
  },
});

const mapDispatchToProps = dispatch => {
  return {};
};
function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingScreen);
//export default connect(OnboardingScreen);
