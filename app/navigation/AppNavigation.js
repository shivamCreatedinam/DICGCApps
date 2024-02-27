import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../src/screens/splash/SplashScreen';
import SigninScreen from '../src/screens/signin/SigninScreen';
import DashboardScreen from '../src/screens/dashboard/DashboardScreen';
// import OnboardingScreen from '../src/screens/OnBoarding/index';
import HomeScreen from '../src/screens/ProfileScreen/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ChatScreen from '../src/screens/ChatScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import AddSurveyScreen from '../src/screens/AddSurveyScreen';
import PermissionScreenMain from '../src/screens/PremissionScreen';
import BlockBSurveyScreen from '../src/screens/BlockBSurveyScreen';
import DraftSurveyScreen from '../src/screens/DraftSurveyScreen';
// import BlockCSurveyScreen from '../src/screens/BlockCSurveyScreen';
// import BlockDSurveyScreen from '../src/screens/BlockDSurveyScreen';
// import BlockESurveyScreen from '../src/screens/BlockESurveyScreen';
// import BlockFSurveyScreen from '../src/screens/BlockFSurveyScreen';

const Stack = createStackNavigator();

export const commonStack = () => {
  return (
    <>

    </>
  );
};
export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />

      {commonStack()}
    </Stack.Navigator>
  );
};

export const ProductStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Products'} component={ProductPage} />

      {commonStack()}
    </Stack.Navigator>
  );
};

export const WishlistStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WishlistScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />

      {commonStack()}
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyAccountScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
      {commonStack()}
    </Stack.Navigator>
  );
};

function AppNavigation() {
  const navigationRef = useRef();
  const routeNameRef = useRef();
  let isInitialRoute = '';
  let isRouteValue = true;
  useEffect(() => {
    getInitiatPage();
  }, []);

  const getInitiatPage = async () => {
    const value = await AsyncStorage.getItem('onBoardingScreen');
    if (value == 'true') {
      isRouteValue = false;
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        const trackScreenView = async () => {
          // Your implementation of analytics goes here!
          // await analytics().logScreenView({
          //   screen_name: currentRouteName,
          //   screen_class: currentRouteName,
          // });
        };

        if (previousRouteName !== currentRouteName) {
          // Replace the line below to add the tracker from a mobile analytics SDK
          trackScreenView(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName={'PermissionScreenMain'}
        screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name={'ChatScreen'} component={ChatScreen} /> */}
        <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
        <Stack.Screen name={'DashboardScreen'} component={DashboardScreen} />
        <Stack.Screen name={'SigninScreen'} component={SigninScreen} />
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
        <Stack.Screen name={'PermissionScreenMain'} component={PermissionScreenMain} />
        <Stack.Screen name={'AddSurveyScreen'} component={AddSurveyScreen} />
        <Stack.Screen name={'BlockBSurveyScreen'} component={BlockBSurveyScreen} />
        <Stack.Screen name={'DraftSurveyScreen'} component={DraftSurveyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigation;
