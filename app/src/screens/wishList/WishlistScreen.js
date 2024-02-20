import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import {WishListItem} from './views/WishListItem';
import styles from './styles';
import resources from '../../../res';
import {Header, Right, Body, Title} from 'native-base';
import * as actions from '../../redux/actions/WishListAction';
import {connect} from 'react-redux';
import AppUser from '../../utility/AppUser';
import events from '../../utility/Events';
import {onUpdateWishlistBadgeCount} from '../../redux/actions/WishListAction';
import AsyncStorageConstants from '../../utility/AsyncStorageConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppToast from '../../genriccomponents/appToast/AppToast';
import {MyStatusBar} from '../../genriccomponents/header/HeaderAndStatusBar';
import {CartIconWithBadge} from '../../genriccomponents/badge/CartBadge';
import {checkIfUserIsLoggedIn} from '../../utility/Utils';
import {hitNotifyProductApi} from '../../redux/actions/CategoryListingAction';
import {hitGetProductDetailApi} from '../../redux/actions/ProductDetailsAction';

import {
  hitAddToCartApi,
  getCartDetailApi,
  deleteProductFromCartApi,
  onUpdateCartBadgeCount,
} from '../../redux/actions/CartAction';
import analytics from '@react-native-firebase/analytics';

class WishListScreen extends Component {
  static ROUTE_NAME = 'WishListScreen';
  constructor(props) {
    super(props);
    this.state = {
      wishlistData: [],
      homePageData: null,
      rentDuratinModalVisible: false,
      product_state: 0,
      rental_frequency_message: '',
      detailData: [],
      selectedProductId: null,
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.props.navigation.addListener('focus', () => this.componentDidFocus());
    const value = await AsyncStorage.getItem('HomePageData');
    if (value !== null) {
      let dataSet = JSON.parse(value);
      this.setState({
        homePageData: dataSet,
      });
    }
  }
  componentDidFocus = () => {
    // StatusBar.setBarStyle('dark-content');
    // StatusBar.setBackgroundColor(resources.colors.appColor);
    this.loadData();
  };
  loadData = () => {
    let appInst = AppUser.getInstance();
    this.setState({
      isLoading: true,
    });
    this.props
      .getAllWishListApi(appInst.selectedCityId)
      .then(data => {
        this.setState({wishlistData: data.data, isLoading: false});
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        console.log(data, 'error in Wishlist screen');
      });
  };
  onBackClick = () => {
    this.props.navigation.goBack();
  };

  notifyBtn = pid => {
    let appInst = AppUser.getInstance();

    if (checkIfUserIsLoggedIn()) {
      this.props
        .hitNotifyProductApi(pid, appInst.selectedCityId)
        .then(data => {
          AppToast(data.message);
        })
        .catch(error => {
          AppToast(error);
        });
    } else {
      showSigninAlert(`ProductDetailScreen_${this.productId}`);
    }
  };
  loadCartDetailsData = async () => {
    await this.props
      .getCartDetailApi()
      .then(data => {
        this.setState({detailData: data.data});
        if ('products' in data.data && data.data.products.length > 0) {
          let let_is_frp = false;
          let cartFrpItem = data.data.products.filter(item => {
            if (item.is_frp || item.is_frp == true || item.is_frp == 'true') {
              let_is_frp = true;
              return {cart_id: item.cart_id};
            }
          });

          this.setState({
            is_frp: let_is_frp,
            cartIdArray: cartFrpItem,
            is_cart_data: true,
          });
        } else {
          this.setState({
            is_cart_data: false,
          });
        }
      })
      .catch(error => {
        console.log(error, 'error');
        this.setState({
          is_cart_data: false,
        });
      });
  };
  addToCart = async selectAddons => {
    if (checkIfUserIsLoggedIn()) {
      this.setState({
        isComingFromBuyNow: false,
      });
      await this.loadCartDetailsData();
      if (this.state.is_cart_data && this.state.is_frp) {
        this.setState({
          pickOptionsVisible: 'bottom',
        });
      } else {
        this.addToCartAction(selectAddons);
      }
    } else {
      const temp_user_id = await AsyncStorage.getItem('@temp_user_id');
      if (temp_user_id == null) {
        let rnumber = Math.round(Date.now() * (Math.random() * 1000));
        let rnstring = rnumber.toString();
        await AsyncStorage.setItem('@temp_user_id', rnstring.substring(0, 9));
        this.setState({
          tempIdState: rnstring.substring(0, 9),
        });
        this.addToCartAction(selectAddons);
      } else {
        const savedTempUserId = await AsyncStorage.getItem('@temp_user_id');

        this.setState({
          tempIdState: savedTempUserId,
        });
        this.addToCartAction(selectAddons);
      }
    }
  };

  addToCartAction = async (selectAddons = false) => {
    const {
      selectedCityId,
      isComingFromBuyNow,
      detailData,
      recommendedProductsData,
      tempIdState,
    } = this.state;
    const attribute_value = this.state.selectedDuration
      ? this.state.selectedDuration.pid
      : this.state.durationData[0].pid;

    let appInst = AppUser.getInstance();

    this.props
      .hitAddToCartApi(
        this.state.selectedProductId,
        1,
        attribute_value,
        appInst.selectedCityId,
        tempIdState,
      )
      .then(async data => {
        await analytics().logEvent(
          Platform.OS == 'android' ? 'add_to_cart_android' : 'add_to_cart_ios',
          {
            id: this.productId,
            name: data.data.products[0]?.product_name,
            brand: 'Cityfurnish',
            list_position: 1,
            category: Platform.OS == 'android' ? 'android' : 'iOS',
            quantity: data.data.products[0]?.quantity,
            price: data.data.products[0]?.price,
          },
        );

        let value = data.data.itemsIncartCount;
        this.storeCartCountData(value);
        this.storeWishlistCountData(data.data.WishlistItemsCount);
        AppToast(data.message);
        this.loadData();
        if (recommendedProductsData && recommendedProductsData.length > 0) {
          this.setState({selectAddons: selectAddons});
        }
        if (isComingFromBuyNow) {
          //this.navigateToAddressScreen();
        }
      })
      .catch(error => {
        // AppToast(error);
        console.log('error box running', error);
      });
  };
  storeWishlistCountData = async data => {
    let obj = AppUser.getInstance();
    obj.wishlistCount = data;
    this.props.onUpdateWishlistBadgeCount(data);
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
  storeCartCountData = async data => {
    let obj = AppUser.getInstance();
    obj.itemsIncartCount = parseInt(data);
    this.props.onUpdateCartBadgeCount(parseInt(data));
    try {
      await AsyncStorage.setItem(AsyncStorageConstants.cartBadgeCount, data);
    } catch (e) {
      // saving error
      console.log('error', e);
    }
  };

  onClickAddonsType = type => {
    this.setState({
      loginShowAlert: null,
      pickOptionsVisible: null,
      addonsOptionsVisible: null,
    });
  };

  onClickPickType = type => {
    this.setState({
      loginShowAlert: null,
      pickOptionsVisible: null,
    });
    setTimeout(() => {
      switch (type) {
        case 'go_to_cart':
          // Go to Cart

          let event = AppUser.getInstance().emitterInst;
          this.props.navigation.pop();
          event.emit(events.MOVE_TO_CART, 'trigger');
          break;

        default:
          break;
      }
    }, 500);
  };

  onAddonsMoveProduct = product_id => {
    this.setState({selectAddons: false});
    this.onPressBackDrop();
    this.props.navigation.push('ProductDetailScreen', {productId: product_id});
  };

  onPressBackDrop = () => {
    this.setState({
      rentDuratinModalVisible: false,
    });
  };

  onSliderCallback = index => {
    this.setState(
      {
        selectedSliderIndex: index,
      },
      () => {
        this.setState({
          selectedDuration: this.state.durationData[
            this.state.selectedSliderIndex
          ],
          selectedUpFront: this.state.durationData[
            this.state.selectedSliderIndex
          ],
        });
      },
    );
  };

  renderHeader = () => {
    // return (
    //     <HeaderWithProfile
    //         headerTitle={resources.strings.Wishlist}
    //         isBackIconVisible={false}
    //         navigateProps={this.props.navigation}

    //     />
    // )

    return (
      <>
        <Header
          style={{backgroundColor: 'white', borderBottomWidth: 0, height: 60}}>
          <Body style={{marginLeft: 16}}>
            <Title>
              <Text style={styles.headerTitle}>Wishlist</Text>
            </Title>
          </Body>
          <Right style={{marginRight: 12}}>
            <View style={styles.flexRow}>
              <TouchableOpacity
                style={{marginRight: 15}}
                onPress={() =>
                  this.props.navigation.push('SearchScreen', {
                    data: this.state.homePageData,
                  })
                }>
                <Image
                  style={styles.headerIcon}
                  source={resources.images.icn_searchPage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 8}}
                onPress={() => this.props.navigation.push('CartScreen')}>
                <Image
                  style={styles.headerIcon}
                  source={resources.images.icn_cartPage}
                />
                <View style={{position: 'absolute', top: -10}}>
                  <CartIconWithBadge />
                </View>
              </TouchableOpacity>
            </View>
          </Right>
        </Header>
      </>
    );
  };
  render() {
    return (
      <View style={styles.fullScreen}>
        <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
        {this.renderHeader()}
        <WishListItem
          serverData={this.state.wishlistData}
          // onPressItem={this.onPressItem}
          loadMoreData={this.handleLoadMore}
          isRefreshing={false}
          onRefresh={this.onRefresh}
          onPressDeleteItem={this.onPressDeleteItem}
          navigation={this.props.navigation}
          onPressAddToCart={this.onPressAddToCart}
          notifyBtn={this.notifyBtn}
          openDurationModal={() => {
            this.setState({rentDuratinModalVisible: true});
          }}
          isLoading={this.state.isLoading}
        />
        {/* <Produce/> */}

    
      </View>
    );
  }

  onPressAddToCart = (product_id, key, isComboCategory) => {
    let appInst = AppUser.getInstance();
    this.setState({
      selectedProductId: product_id,
    });
    this.props
      .hitGetProductDetailApi(product_id, appInst.selectedCityId)
      .then(data => {
        if (!data.data.product_name) {
          AppToast('No data Available for this product');
          this.onBackClick();
          return;
        }

        this.setState(
          {
            product_state: data.data.product_state,
            durationData: data.data.tenure,
            rental_frequency_message: data.data.rental_frequency_message,
            selectedDuration:
              data.data.tenure && data.data.tenure.length > 0
                ? data.data.tenure[data.data.tenure.length - 1]
                : null,
          },
          () => {
            this.setState({
              rentDuratinModalVisible: true,
            });
          },
        );
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
        console.log('error', error);
      });
  };

  storeWishlistCountData = async data => {
    let obj = AppUser.getInstance();
    obj.wishlistCount = data;
    this.props.onUpdateWishlistBadgeCount(data);
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
  onPressDeleteItem = (product_id, index) => {
    const {wishlistData} = this.state;
    this.props
      .hitAddDeleteWishListApi(product_id)
      .then(data => {
        this.storeWishlistCountData(data.data.WishlistItemsCount);
        this.setState(
          {
            wishlistData: wishlistData.filter(
              item => item.product_id != product_id,
            ),
          },
          () => {
            let event = AppUser.getInstance().emitterInst;
            event.emit(events.UPDATE_CATEGORY_SCREEN_PRODUCT_LIST, product_id);
          },
        );
        AppToast(data.message);
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  onRefresh = () => {};

  onPressItem = (data, key) => {};

  handleLoadMore = () => {};
}

const mapStateToProps = state => {
  return {};
};
let container = connect(
  mapStateToProps,
  {
    ...actions,
    onUpdateWishlistBadgeCount,
    hitNotifyProductApi,
    hitGetProductDetailApi,
    hitAddToCartApi,
    getCartDetailApi,
    deleteProductFromCartApi,
    onUpdateCartBadgeCount,
  },
)(WishListScreen);

export default container;
