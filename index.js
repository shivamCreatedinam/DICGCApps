/**
 * @format
 */

import 'react-native-gesture-handler';
import './app/localization/i18n';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
LogBox.ignoreAllLogs(true);

AppRegistry.registerComponent(appName, () => App);
