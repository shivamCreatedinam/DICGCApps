import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import Toast from 'react-native-toast-message';
import React from 'react';

export default function LanguageScreen() {

    const navigate = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = React.useState(false);
    const [SelectLanguage, setSelectLanguage] = React.useState(null);

    const setLanguage = (info) => {
        setSelectLanguage(info);
        setSelectedLanguage(true);
        onChangeLanguage(info)
    }

    const onChangeLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem('@appLanguage', lang);
            console.log('storeData', lang)
        } catch (e) {
            // saving error
        }
    }

    const saveLanguage = async () => {
        if (SelectLanguage === null) {
            Toast.show({
                type: 'error',
                text1: 'Choose Language',
                text2: 'Please select your mother language!'
            });
        } else {
            try {
                const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
                if (userId !== null && userId != '') {
                    console.log('componentDidMount--->', userId);
                    navigate.replace('DashboardScreen');
                    isLoggedIn = true;
                } else {
                    navigate.replace('SigninScreen');
                    isLoggedIn = false;
                }
            } catch (error) {
                console.log('Error fetching user id', error);
            }
            navigate.replace('LoginScreen');
        }
    }

    return (
        <ScrollView
            automaticallyAdjustKeyboardInsets={false}
            contentContainerStyle={{
                flexGrow: 1,
            }}
            style={{ padding: 20, flex: 1, marginBottom: 50 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 60 }}>Choose Language</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>Select your </Text>
            <TouchableOpacity onPress={() => setLanguage('English')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>A</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>English</Text>
                {SelectLanguage === 'English' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('Hindi')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>हिं</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Hindi</Text>
                {SelectLanguage === 'Hindi' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('Marathi')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>म</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Marathi</Text>
                {SelectLanguage === 'Marathi' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('Telgu')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>మ</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Telgu</Text>
                {SelectLanguage === 'Telgu' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('Kannada')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>ಮ</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Kannada</Text>
                {SelectLanguage === 'Kannada' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('Gujarati')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>મ</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Gujarati</Text>
                {SelectLanguage === 'Gujarati' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => saveLanguage()} style={{ width: '100%', height: 50, backgroundColor: '#000', marginTop: 40, elevation: 5, borderRadius: 5, marginBottom: 150, }}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center', marginTop: 15, textTransform: 'uppercase', fontWeight: 'bold' }}>Save Language</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})