import React, {useState} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import styles from './styles';
import resource from '../../../../res';
import resources from '../../../../res';
import HorizontalImageView from '../../../genriccomponents/productView/horizontalImage/HorizontalImageView';
import {isPlatformIOS} from '../../../utility/Utils';

const OUT_OF_STOCK = 1;

function WishListItem(props) {
  const {
    onPressItem,
    serverData,
    loadMoreData,
    isRefreshing,
    onRefresh,
    renderFooter,
    onPressAddToCart,
    notifyBtn,
    navigation,
  } = props;
  return (
    <View style={styles.mainContainer}>
      {serverData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={serverData}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => (
            <Item
              data={item}
              itemKey={index}
              onPressItem={onPressItem}
              onPressDeleteItem={props.onPressDeleteItem}
              notifyBtn={notifyBtn}
              navigation={navigation}
              onPressAddToCart={onPressAddToCart}
            />
          )}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        renderEmptyListView(props)
      )}
    </View>
  );
}
function Item(props) {
  const {
    data,
    itemKey,
    onPressAddToCart,
    notifyBtn,
    navigation,
  } = props;
  const [index, setIndex] = useState(0);

  return (
    <>
      <View style={styles.product}>
        <HorizontalImageView
          data={data.images}
          activeIndexHorizontal={index}
          onSnapToItem={index => {
            setIndex(index);
          }}
          pageType={'categoryScreen'}
          onPressHorizontalImageView={() => {
            navigation.navigate('ProductDetailScreen', {
              productId: data.product_id,
            });
          }}
        />

        {data.product_state == OUT_OF_STOCK ? (
          getCornerRibbon()
        ) : isPlatformIOS ? (
          data.product_label != '' ? (
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: -10,
                left: 7,
                width: '100%',
                borderRadius: 5,
                padding: 4,
                backgroundColor:
                  data.product_label == 'New Launch' ? '#257B57' : '#5B48BF',
                width: '30%',
                height: 30,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={require('../../../../res/images/Image/newProduct.png')}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    color: 'white',
                    fontFamily: resources.fonts.regular,
                  }}>
                  {`  ${data.product_label}`}
                </Text>
              </View>
            </View>
          ) : null
        ) : data.product_label != '' ? (
          <View
            style={{position: 'absolute', top: -10, width: '100%', left: 7}}>
            <Text
              style={[
                styles.productImage,
                {
                  backgroundColor:
                    data.product_label == 'New Launch' ? '#257B57' : '#5B48BF',
                },
              ]}>
              <Image
                source={require('../../../../res/images/Image/newProduct.png')}
              />
              {`  ${data?.product_label}`}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {
              productId: data.product_id,
            })
          }>
          <View style={[styles.flex, {marginTop: 10}]}>
            <View>
              <Text numberOfLines={2} style={styles.font}>
                {data.product_name}
              </Text>
            </View>
            <View />
          </View>
          <View style={[styles.flex, {marginTop: 15}]}>
            <View>
              <Text style={styles.fontSize}>
                {'\u20B9'}
                {data.product_sale_price ? data.product_sale_price : ''} / month
              </Text>
              <Text
                style={[styles.price]}
                numberOfLines={1}
                ellipsizeMode={'tail'}>
                {'\u20B9'}
                {data.price}/{'month'}
              </Text>
            </View>
            {data.product_state !== OUT_OF_STOCK ? (
              <View
                style={{
                  backgroundColor: '#E3E1DC',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 120,
                  borderRadius: 100,
                  height: 40,
                }}>
                <View style={[styles.flex, {padding: 5}]}>
                  <View>
                    <Image
                      style={styles.image}
                      source={require('../../../../res/images/blackTruck.png')}
                    />
                  </View>
                  <View>
                    <Text style={styles.time}>{'4-5 Days'}</Text>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
        <View style={styles.mainButton}>
          <TouchableOpacity
            onPress={() => props.onPressDeleteItem(data.product_id, itemKey)}
            style={styles.removeButton}>
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              data.product_state == OUT_OF_STOCK
                ? notifyBtn(data.product_id)
                : onPressAddToCart(
                    data.product_id,
                    itemKey,
                    data.isComboCategory,
                  )
            }
            style={styles.addButton}>
            <Text style={styles.add}>
              {data.product_state == OUT_OF_STOCK ? 'Notify Me' : 'Add to cart'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function getCornerRibbon() {
  return isPlatformIOS ? (
    <View
      style={{
        flexDirection: 'row',
        padding: 5,
        backgroundColor: resources.colors.outOfStockRed,
        width: '30%',
        fontWeight: '600',
        fontSize: 12,
        color: 'white',
        borderRadius: 5,
        position: 'absolute',
        top: -10,
        left: 7,
      }}>
      <View style={{justifyContent: 'center'}}>
        <Image
          source={require('../../../../res/images/Image/newProduct.png')}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={{fontWeight: '600', fontSize: 12, color: 'white'}}>
          {`  Out of Stock`}
        </Text>
      </View>
    </View>
  ) : (
    <View style={{position: 'absolute', top: -10, width: '100%', left: 7}}>
      <Text
        style={[
          styles.productImage,
          {backgroundColor: resource.colors.outOfStockRed},
        ]}>
        <Image
          source={require('../../../../res/images/Image/newProduct.png')}
        />
        {`  Out of Stock`}
      </Text>
    </View>
  );
  // return (
  //     <CornerLabel
  //         cornerRadius={60}
  //         style={{ backgroundColor: resource.colors.outOfStockRed, height: 20, paddingHorizontal: 10 }}>
  //         Out of Stock
  //     </CornerLabel>
  // )
}

function renderEmptyListView(props) {
  if (props.isLoading) {
    return false;
  } else {
    return (
      <View>
        <View style={styles.productEmpaty}>
          <Image
            width={70}
            height={70}
            style={styles.images}
            source={require('../../../../res/images/Image/heart.png')}
          />
          <Text style={styles.text}>Haven’t made any wish yet?</Text>
          <Text style={styles.texts}>
            Explore our products and put the one’s you like in the Wishlist
          </Text>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('CategoryScreen', {
                isShowCategory: true,
              })
            }
            style={styles.explorButton}>
            <Text style={styles.explor}>Explore products</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export {WishListItem};
