import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeStack,
  ProductStack,
  ProfileStack,
  ProfileScreen
} from '../../../navigation/AppNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { withTranslation } from 'react-i18next';
const MessageStack = createStackNavigator();
const Tab = createBottomTabNavigator();

class DashboardScreen extends Component {

  static ROUTE_NAME = 'DashboardScreen';
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === t("home_screen")) {
              iconName = focused
                ? require('../../../assets/home.png')
                : require('../../../assets/home.png')
            } else if (route.name === t("profile_screen")) {
              iconName = focused
                ? require('../../../assets/profilenew.png')
                : require('../../../assets/profilenew.png');
            }
            return (
              <Image
                source={iconName}
                resizeMode={'contain'}
                style={{
                  width: 25,
                  height: 25,
                  borderWidth: 0,
                  tintColor: color,
                }}
              />
            );
          },
        })}
        tabBarOptions={{
          style: { height: 57, paddingVertical: 5 },
          tabStyle: { height: 45, backgroundColor: 'white' },
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          labelStyle: { fontSize: 12 },
        }}>
        <Tab.Screen
          name={t("home_screen")}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              navigation.navigate('Home');
            },
          })}
          component={HomeStack}
        />
        <Tab.Screen
          name={t("profile_screen")}
          component={ProfileStack}
          listeners={({ navigation, route }) => ({

          })}
        />
      </Tab.Navigator>
    );
  }
}

export default withTranslation()(DashboardScreen);
