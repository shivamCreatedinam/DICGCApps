import React, { useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {getTrendingProductApi} from '../../../redux/actions/ProductDetailsAction';
import resources from '../../../../res';
import AppUser from '../../../utility/AppUser';
import {
  hitAddDeleteWishListApi,
  onUpdateWishlistBadgeCount,
} from '../../../redux/actions/WishListAction';
import {checkIfUserIsLoggedIn, isPlatformIOS} from '../../../utility/Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppToast from '../../../genriccomponents/appToast/AppToast';
import fonts from '../../../../res/constants/fonts';

const TrendingProduct = props => {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    getTrendingProduct();
  }, []);

  const getTrendingProduct = () => {
    let city = AppUser?.getInstance()?.selectedCityId;
    props
      .getTrendingProductApi(city)
      .then(data => {
        let dataTrending = [];
        if (data?.data) {
          props.setHomePageData(data?.data);
        }
        if (data?.data?.trendingProducts) {
          Object.keys(data.data.trendingProducts).map(tp => {
            data?.data?.trendingProducts[tp].map(Obj => {
              dataTrending.push(Obj);
            });
          });
          setProductData(dataTrending);
        }
      })
      .catch(error => {});
  };
  const storeWishlistCountData = async data => {
    let obj = AppUser.getInstance();
    obj.wishlistCount = data;
    props.onUpdateWishlistBadgeCount(data);
    try {
      await AsyncStorage.setItem(
        AsyncStorageConstants.wishlistBadgeCount,
        data.toString(),
      );
    } catch (e) {
      // saving error
      console.log('error', e);
    }
  };

  const onPressFav = (productId, key) => {
    if (checkIfUserIsLoggedIn()) {
      props
        .hitAddDeleteWishListApi(productId)
        .then(data => {
          let finalData = productData.filter(item => {
            if (item.id == productId) {
              if (item.isFavourite == 0) {
                item.isFavourite = 1;
                AppToast(resources.strings.addedToWishList);
              } else {
                item.isFavourite = 0;
                AppToast(resources.strings.removedFromWishList);
              }
            }
            return item;
          });
          setProductData(finalData);
          storeWishlistCountData(data.data.WishlistItemsCount);
        })
        .catch(error => {
          console.log('Error while adding product to wishlist');
        });
    } else {
      showSigninAlert('DashboardScreen');
    }
  };

  return (
    <View style={{padding: 10}}>
      {productData ? (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            marginLeft: 5,
            marginTop: 10,
            fontFamily: resources.fonts.regular,
          }}>
          Trending products
        </Text>
      ) : null}

      <ScrollView
        horizontal={true}
        contentContainerStyle={{marginTop: 15}}
        showsHorizontalScrollIndicator={false}>
        {productData?.map((val, i) => {
          let getFileName = val?.image?.split(',');
          let imageUrl = `https://d3juy0zp6vqec8.cloudfront.net/images/product/${
            getFileName[0]
          }`.replace(',', '');

          return (
            <TouchableOpacity
              key={i.toString()}
              onPress={() =>
                props.navigation.navigate('ProductDetailScreen', {
                  productId: val.id,
                })
              }
              style={{padding: 10, width: 150, height: 250}}>
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={{
                  width: 140,
                  height: 120,
                  flexDirection: 'row',
                }}
                source={
                  imageUrl
                    ? {uri: imageUrl}
                    : resources.images.img_placeholer_small
                }>
                {isPlatformIOS ? (
                  val.product_label != '' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 2,
                        backgroundColor:
                          val.product_label == 'New Launch'
                            ? '#257B57'
                            : '#5B48BF',
                        paddingHorizontal: 5,
                        paddingRight: 8,
                        height: '20%',
                        fontSize: 12,
                        color: 'white',
                        borderRadius: 5,
                        marginTop: -10,
                      }}>
                      <View style={{justifyContent: 'center'}}>
                        <Image
                          source={require('../../../../res/images/Image/newProduct.png')}
                        />
                      </View>
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontFamily: fonts.medium,
                            fontSize: 12,
                            color: 'white',
                          }}>
                          {`  ${val.product_label}`}
                        </Text>
                      </View>
                    </View>
                  ) : null
                ) : val.product_label != '' ? (
                  <Text
                    style={{
                      padding: 2,
                      backgroundColor:
                        val.product_label == 'New Launch'
                          ? '#257B57'
                          : '#5B48BF',
                      paddingHorizontal: 5,
                      paddingRight: 8,
                      height: '20%',
                      fontFamily: fonts.medium,
                      fontSize: 12,
                      color: 'white',
                      borderRadius: 5,
                      marginTop: -10,
                    }}>
                    <Image
                      source={require('../../../../res/images/Image/newProduct.png')}
                    />{' '}
                    {val.product_label}
                  </Text>
                ) : null}
              </ImageBackground>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <View style={{width: 120, height: 50}}>
                  {val.product_name?.length >= 14 ? (
                    <Text numberOfLines={2} style={{color: '#9A9AA2'}}>
                      {`${val.product_name}`}
                    </Text>
                  ) : (
                    <Text numberOfLines={2} style={{color: '#9A9AA2'}}>
                      {val.product_name}
                    </Text>
                  )}

                  <Text style={{fontSize: 16}}>
                    ₹{val.product_sale_price} / month
                  </Text>
                  <Text
                    style={{
                      color: '#9A9AA2',
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    ₹{val.price} / month
                  </Text>
                </View>
                <TouchableOpacity onPress={() => onPressFav(val.id, i)}>
                  {val.isFavourite == 1 || val.isFavourite == true ? (
                    <Image
                      source={resources.images.icn_wishlist_Select}
                      style={{width: 23, height: 23}}
                    />
                  ) : (
                    <Image
                      source={require('../../../../res/images/Image/like.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {};
};
let container = connect(
  mapStateToProps,
  {
    getTrendingProductApi,
    onUpdateWishlistBadgeCount,
    hitAddDeleteWishListApi,
  },
)(TrendingProduct);
export default container;
