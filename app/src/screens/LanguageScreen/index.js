import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function LanguageScreen() {

    const navigate = useNavigation();
    const [selectedLanguage, setSelectedLanguage] = React.useState(false);
    const [SelectLanguage, setSelectLanguage] = React.useState(null);
    const { t, i18n } = useTranslation();


    React.useEffect(() => {
        navigate.addListener("focus", () => {
            getLanguage();
        });
    }, []);


    const getLanguage = async () => {
        try {
            const language = await AsyncStorage.getItem('@appLanguage');
            if (language !== null) {
                setSelectLanguage(language);
                i18n.changeLanguage(language);
            }
        } catch (e) {
            // error reading value
            console.log('storeData', e)
        }
    }

    const setLanguage = (info) => {
        setSelectLanguage(info);
        setSelectedLanguage(true);
        onChangeLanguage(info)
    }

    const onChangeLanguage = async (lang) => {
        try {
            await AsyncStorage.setItem('@appLanguage', lang);
            i18n.changeLanguage(lang);
            console.log('storeData', lang)
        } catch (e) {
            // saving error
        }
    }

    const saveLanguage = async () => {
        if (SelectLanguage === null) {
            showMessage({
                message: "Choose Language!",
                description: "Please select your mother language!!",
                type: "danger",
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
            // navigate.replace('LoginScreen');
        }
    }

    return (
        <ScrollView
            automaticallyAdjustKeyboardInsets={false}
            contentContainerStyle={{
                flexGrow: 1,
            }}
            style={{ padding: 20, flex: 1, marginBottom: 50 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 60 }}>{t('choose_language')}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{t('select_your_language')}</Text>
            <TouchableOpacity onPress={() => setLanguage('en')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>A</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>English</Text>
                {SelectLanguage === 'en' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('hi')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>हिं</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Hindi</Text>
                {SelectLanguage === 'hi' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('mr')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>म</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Marathi</Text>
                {SelectLanguage === 'mr' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('te')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>మ</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Telgu</Text>
                {SelectLanguage === 'te' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('kn')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>ಮ</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Kannada</Text>
                {SelectLanguage === 'kn' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('gu')} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#000', marginTop: 10, elevation: 5, borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ height: 30, width: 30, borderRadius: 150, backgroundColor: 'grey', }}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 20, padding: 2, textAlign: 'center', }}>મ</Text>
                </View>
                <Text style={{ color: '#fff', paddingVertical: 0, paddingHorizontal: 5 }}>Gujarati</Text>
                {SelectLanguage === 'gu' ? <View style={{ position: 'absolute', right: 0, top: -5, zIndex: 9999 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/check_mark.png')} />
                </View> : null}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => saveLanguage()} style={{ width: '100%', height: 50, backgroundColor: '#000', marginTop: 40, elevation: 5, borderRadius: 5, marginBottom: 150, }}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center', marginTop: 15, textTransform: 'uppercase', fontWeight: 'bold' }}>{t('save_language')}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})