import React from "react";
import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, Platform, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useTranslation } from 'react-i18next';

const InstructionScreen = () => {

    const [name, setName] = React.useState('');
    const OsVer = Platform.constants['Release'];
    const navigation = useNavigation();
    const [Lattitude, setLattitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isRecording, setIsRecording] = React.useState(false);
    const [userSendToken, setUserSendToken] = React.useState('');
    const { t, i18n } = useTranslation();


    useFocusEffect(
        React.useCallback(() => {
            readMessages();
            return () => {
                // Useful for cleanup functions.

            };
        }, [])
    );

    const readMessages = async () => {
        try {
            const userId = await AsyncStorage.getItem(AsyncStorageContaints.tempServerTokenId);
            const UserData = await AsyncStorage.getItem(AsyncStorageContaints.UserData);
            const UserToken = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
            const surveyLatitude = await AsyncStorage.getItem(AsyncStorageContaints.surveyLatitude);
            const surveyLongitude = await AsyncStorage.getItem(AsyncStorageContaints.surveyLongitude);
            //UserId
            setLattitude(surveyLatitude);
            setLongitude(surveyLongitude);
            setUserSendToken(UserToken);
            setUserName(UserData);
            setName(userId);
            getState();
            console.log("error", userId)
        } catch (error) {
            console.log("error_", error)
        }
    }


    const askToCloseApp = () => {
        Alert.alert(
            "Close Survey",
            "Are you sure, you want to Close survey, you lose all the data?",
            [
                { text: "No" },
                {
                    text: "Yes", onPress: () => {
                        navigation.replace('DashboardScreen');
                        return true;
                    }
                },
            ]
        );
    }

    const validate = () => {
        navigation.navigate('AddSurveyScreen');
    }

    const renderCustomHeader = () => {
        const user = {
            _id: 1,
            name: name,
            avatar: 'https://electricallicenserenewal.com/app-assets/images/user/12.jpg',
            active: true,
        };
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, alignSelf: 'flex-start', marginTop: StatusBar.currentHeight, paddingHorizontal: 20, backgroundColor: '#fff', elevation: 5, width: '100%' }}>
                <TouchableOpacity onPress={() => askToCloseApp()} style={{ marginRight: 10, padding: 5 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/backCopy.png')} />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/app_logo.png')}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName} - {user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>{t('active_survey_token')} - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>{t('instruction')}</Text> </Text>}
                </View>
                {isRecording === true ? <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'green' }} /> : <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'red' }} />}
            </View>
        );
    }

    return (
        <View>
            {renderCustomHeader()}
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: '900' }}>{t('following_instructions')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('good_morning_one')}{userName}{t('good_morning_two')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('awareness')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('confidential')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('participate')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('banking')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: '900' }}>{t('following_description')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('financial_sector_employee')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('other_employees')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('self_employed')}</Text>
                    <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('homemaker_respondents')}</Text>
                    <View style={{ padding: 10, }} />
                    <TouchableOpacity
                        onPress={() => validate()} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'rgb(36,78,154)', borderRadius: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{t('start_main_Block')}</Text>
                    </TouchableOpacity>
                    <View style={{ padding: 10, }} />
                    <View style={{ padding: 10, }} />
                    <View style={{ padding: 10, }} />
                    <View style={{ padding: 10, }} />
                    <View style={{ padding: 10, }} />
                </View>
            </ScrollView>
        </View>
    )

}

export default InstructionScreen;