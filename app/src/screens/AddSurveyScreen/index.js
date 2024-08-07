import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, ActivityIndicator, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import React, { Component, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';
import MultiSelect from 'react-native-multiple-select';
import AudioRecord from 'react-native-audio-record';
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Audio } from 'react-native-compressor';
// var RNFS = require('react-native-fs');

const AddSurveyScreen = () => {

    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isRecording, setIsRecording] = React.useState(false);
    const [isInstruction, setSurveyInstruction] = React.useState(true);
    const [isLoading, setLoading] = React.useState(false);
    const [isSubmitSurvey, setSubmitSurvey] = React.useState(false);
    const [isAudioUploading, setAudioUploading] = React.useState(false);
    const [isAudioUpload, setAudioUpload] = React.useState(false);
    const [userSendToken, setUserSendToken] = React.useState('');
    const [audioPath, setAudioPath] = React.useState('');
    const [areas, setAreas] = React.useState([{ "id": 1, "area_title": "Rural Area - Population Less Than 10000", "status": 1, "created_date": "2024-01-13 08:48:30" }, { "id": 2, "area_title": "Semi-Urban Area - Population Above 10000 But Less Than 1 Lakh", "status": 1, "created_date": "2024-01-13 08:48:30" }, { "id": 3, "area_title": "Urban Area - Population 1 Lakh And Above But Less Than 10 Lakhs", "status": 1, "created_date": "2024-01-13 08:48:30" }, { "id": 4, "area_title": "Metro Area - Population More Than 10 Lakhs", "status": 1, "created_date": "2024-01-13 08:48:30" }]);
    const [educations, setEducations] = React.useState([{ "id": 1, "education_title": "Illitrate", "status": 1, "created_date": "2024-01-13 08:33:35" }, { "id": 2, "education_title": "No formal education but literate", "status": 1, "created_date": "2024-01-13 08:33:35" }, { "id": 3, "education_title": "Up to 8th std.", "status": 1, "created_date": "2024-01-13 08:33:35" }, { "id": 4, "education_title": "Matric-10th std", "status": 1, "created_date": "2024-01-13 08:33:35" }, { "id": 5, "education_title": "Graduate", "status": 1, "created_date": "2024-01-13 08:33:35" }, { "id": 6, "education_title": "Post-Graduate", "status": 1, "created_date": "2024-01-13 08:33:35" }, { "id": 7, "education_title": "Professional Degree Holder", "status": 1, "created_date": "2024-01-13 08:33:35" }]);
    const [incomes, setIncomes] = React.useState([{ "id": 1, "icomes_title": "Up to 1 Lakh", "status": 1, "created_date": "2024-01-13 08:38:22" }, { "id": 2, "icomes_title": "1 Lakh - 3 Lakhs", "status": 1, "created_date": "2024-01-13 08:38:22" }, { "id": 3, "icomes_title": "3 Lakhs - 5 Lakhs", "status": 1, "created_date": "2024-01-13 08:38:22" }, { "id": 4, "icomes_title": "5 Lakhs - 10 Lakhs", "status": 1, "created_date": "2024-01-13 08:38:22" }, { "id": 5, "icomes_title": "10 Lakhs - 20 Lakhs", "status": 1, "created_date": "2024-01-13 08:38:22" }, { "id": 6, "icomes_title": "20 Lakhs and above", "status": 1, "created_date": "2024-01-13 08:38:22" }]);
    const [occupations, setOccupations] = React.useState([{ "id": 1, "occupation_name": "Student", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 2, "occupation_name": "Homemaker", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 3, "occupation_name": "Govt Service", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 4, "occupation_name": "Private Sector Service", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 5, "occupation_name": "Professional", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 6, "occupation_name": "Farmer-L", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 7, "occupation_name": "Farmer-S/M", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 8, "occupation_name": "Tenant Farmers", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 9, "occupation_name": "Wholesale Trader", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 10, "occupation_name": "Retail Trader", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 11, "occupation_name": "Manufacturer", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 12, "occupation_name": "Daily Wager", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 13, "occupation_name": "Gig Worker", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 14, "occupation_name": "Service Provider", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 15, "occupation_name": "Unemployed", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 16, "occupation_name": "Self-Employed", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 17, "occupation_name": "Not Working", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 18, "occupation_name": "Pensioner", "status": 1, "created_date": "2024-01-13 08:14:06" }, { "id": 19, "occupation_name": "Other Occupation", "status": 1, "created_date": "2024-01-13 08:14:06" }]);
    const [areasSelected, setSelectedAreas] = React.useState([]);
    const [state, setStateData] = React.useState([]);
    const [DistrictData, setDistrictData] = React.useState([]);
    const [PinCodeData, setPinCodeData] = React.useState([]);
    const [Lattitude, setLattitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');
    const [audio_file_name, setAudioFileName] = React.useState('');
    // country dropdowns
    const [value, setValue] = React.useState(null);
    const [selectedState, setSelectedState] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    // select district
    const [valueDistrict, setDistrictValue] = React.useState(null);
    const [selectedDistrict, setSelectedDistrict] = React.useState(null);
    const [isDistrictFocus, setIsDistrictFocus] = React.useState(false);
    const [percentage, setPercentage] = React.useState(0);
    // lable fields. 
    const [Name, setname] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [Stata, setState] = React.useState('');
    const [PinCode, setPinCode] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [age, setAgeNumber] = React.useState(0);
    const [adult, setAdults] = React.useState(0);
    const [children, setChildren] = React.useState(0);
    const [selectedEducation, setSelectedEducation] = React.useState('');
    const [selectedOccupations, setSelectedOccupations] = React.useState('');
    const [selectedIncomes, setSelectedIncomes] = React.useState('');
    const [differentlyAble, setDifferently] = React.useState('');
    const [smartPhone, setSmartphone] = React.useState('');
    const [anyGroup, setAnyGroup] = React.useState('');
    const [is1Focus, setIs1Focus] = React.useState(false);
    const [is2Focus, setIs2Focus] = React.useState(false);
    const [is3Focus, setIs3Focus] = React.useState(false);
    const [is4Focus, setIs4Focus] = React.useState(false);
    const [is5Focus, setIs5Focus] = React.useState(false);
    const [is6Focus, setIs6Focus] = React.useState(false);
    const { t, i18n } = useTranslation();

    // gender setDifferently
    const data = [
        {
            label: 'Male'
        },
        {
            label: 'Female'
        },
        {
            label: 'Other'
        }
    ];

    // anyGroup
    const occupationData = [
        { id: 1, lable: t('financial_sector') },
        { id: 2, lable: t("other_employees_employee") },
        { id: 3, lable: t('self_employed_business') },
        { id: 4, lable: t('homemaker') },
        { id: 5, lable: t("daily_worker") },
        { id: 6, lable: t('retired_person') },
        { id: 7, lable: t('others') },
    ]

    const educationData = [
        { id: 1, lable: t('illiterate') },
        { id: 2, lable: t('below_5th_std') },
        { id: 3, lable: t('5th_Below') },
        { id: 4, lable: t('10th_below') },
        { id: 5, lable: t('12th_std') },
        { id: 6, lable: t('graduate') },
        { id: 7, lable: t('Post_graduate') },

    ]

    const incomeData = [
        { id: 1, lable: t('less_than_5') },
        { id: 2, lable: t('5_10_thousand') },
        { id: 3, lable: t('10_25_thousand') },
        { id: 4, lable: t('25_50_thousand') },
        { id: 5, lable: t('50_thousand_1_lakh') },
        { id: 6, lable: t("lakh_and_above") },


    ]

    const dataGroup = [
        {
            label: t('Yes')
        },
        {
            label: t('No')
        }
    ];

    const smartphone = [
        {
            label: t('Yes')
        },
        {
            label: t('No')
        }
    ];

    const differently = [
        {
            label: t('Yes')
        },
        {
            label: t('No')
        }
    ];

    const adults = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const childern = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]


    const generateRandomAlphanumericString = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    useFocusEffect(
        React.useCallback(() => {
            readMessages();
            return () => {
                // Useful for cleanup functions.

            };
        }, [])
    );

    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, []);


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

    const getState = async () => {
        setLoading(true);
        const UserToken = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
        let url = `https://createdinam.com/DICGCA-SURVEY/public/api/get-states`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserToken}`
        }
        Axios.get(url, {
            headers: headers
        })
            .then((response) => {
                if (response.data.status === true) {
                    setLoading(false);
                    setStateData(response?.data?.data);
                } else {
                    setLoading(false);
                    showMessage({
                        message: "Something went wrong!",
                        description: "Something went wrong. Try again!",
                        type: "danger",
                    });
                }
            });
    }

    const loadDistrict = async (state) => {
        const UserToken = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
        let url = `https://createdinam.com/DICGCA-SURVEY/public/api/get-city/${Number(state)}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserToken}`
        }
        Axios.get(url, {
            headers: headers
        })
            .then((response) => {
                console.log('loadDistrict_______>', JSON.stringify(response?.data))
                if (response.data.status === true) {
                    setDistrictData(response?.data?.data);
                } else {
                    setLoading(false);
                    showMessage({
                        message: "Something went wrong!",
                        description: "Something went wrong. Try again!",
                        type: "danger",
                    });
                }
            });
    }

    const askToCloseApp = () => {
        Alert.alert(
            t("close_survey"),
            t("are_you_sure"),
            [
                { text: t("no") },
                {
                    text: t("yes"), onPress: () => {
                        stopRecordingBack();
                        navigation.replace('DashboardScreen');
                        return true;
                    }
                },
            ]
        );
    }

    const stopRecordingBack = async () => { const audioFile = await AudioRecord.stop(); }

    const renderCustomHeader = () => {
        const user = {
            _id: 1,
            name: name,
            avatar: 'https://electricallicenserenewal.com/app-assets/images/user/12.jpg',
            active: true,
        };
        // this.props?.route?.params?.item?.profile_image,
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, alignSelf: 'flex-start', marginTop: StatusBar.currentHeight, paddingHorizontal: 20, backgroundColor: '#fff', elevation: 5, width: '100%' }}>
                <TouchableOpacity onPress={() => askToCloseApp()} style={{ marginRight: 5, padding: 5 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/backCopy.png')} />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/app_logo.png')}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName} - {user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>{t('active_survey_token')} - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>{t('Block_A')}</Text></Text>}
                </View>
                {/* <CountDown
                    size={11}
                    until={210}
                    onFinish={() => stopAutoRecording()}
                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#000000' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    separatorStyle={{ color: '#1CC625' }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                /> */}
                {isRecording === true ? <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'green', marginLeft: 10 }} /> : <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'red', marginLeft: 10 }} />}
            </View>
        );
    }

    const startRecording = async () => {
        try {
            setSurveyInstruction(false);
            setIsRecording(true);
            AudioRecord.start();
        } catch (error) {
            console.log(error);
        }
    };

    const stopAutoRecording = async () => {
        try {
            // or to get the wav file path
            const audioFile = await AudioRecord.stop();
            console.log('stopRecording', audioFile);
            setAudioPath(audioFile);
            const audioResultFile = await Audio.compress(audioFile, { quality: 'low' });
            uploadAudioFinal(audioResultFile);
        } catch (error) {
            console.log(error);
        }
    };

    const stopRecording = async () => {
        try {
            // or to get the wav file path
            if (isAudioUpload === true) {
                submitSurvey();
            } else {
                setAudioUploading(true);
                const audioFile = await AudioRecord.stop();
                console.log('stopRecording', audioFile);
                setAudioPath(audioFile);
                const audioResultFile = await Audio.compress(audioFile, { quality: 'low' });
                uploadAudioFinal(audioResultFile);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validationCheck = () => {
        const pattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/
        // const mobileRegex = /^[0]?[789]\d{9}$/;
        const mobileRegex = /^[0-9\b\+\-\(\)]+$/
        let pincode_ = /^(\d{4}|\d{6})$/;
        // if (pattern.test(surveryName)) {
        if (Name === '') {
            showMessage({
                message: "Please Enter Name",
                description: "Please Enter Valid Name!",
                type: "danger",
            });
            return false;
        } else if (address === '') {
            showMessage({
                message: "Please Select Address",
                description: "Please Select Valid Address!",
                type: "danger",
            });
            return false;
        } else if (!pincode_.test(PinCode)) {
            showMessage({
                message: "Please Enter Pin Code",
                description: "Please Enter 6 Digit Pin Code!",
                type: "danger",
            });
            return false;
        } else if (mobileRegex.test(contact) === false) {
            showMessage({
                message: "Please Enter Mobile",
                description: "Please Enter 10 digit Valid mobile number!",
                type: "danger",
            });
            return false;
        } else if (gender === '') {
            showMessage({
                message: "Please Select Gender",
                description: "Please Select Valid Gender!",
                type: "danger",
            });
            return false;
        } else if (Number(age) < 18) {
            showMessage({
                message: "Please Enter Age",
                description: "Please Enter Valid Age! \n Age must be 18 or Above 18",
                type: "danger",
            });
            return false;
        } else if (selectedOccupations === '') {
            showMessage({
                message: "Please Select Occupations",
                description: "Please Select Valid Occupations",
                type: "danger",
            });
            return false;
        } else if (selectedEducation === '') {
            showMessage({
                message: "Please Select Education",
                description: "Please Select Valid Education",
                type: "danger",
            });
            return false;
        } else if (selectedIncomes === '') {
            showMessage({
                message: "Please Select Incomes",
                description: "Please Select Valid Incomes",
                type: "danger",
            });
            return false;
        } else {
            stopRecording();
            return true;
        }
    }

    const submitSurvey = async () => {
        setSubmitSurvey(true);
        const FormData = require('form-data');
        let data = new FormData();
        data.append('survey_token', name);
        data.append('user_name', Name);
        data.append('address', address);
        data.append('gender', gender?.label);
        data.append('age_of_repons', Number(age));
        data.append('state', value);
        data.append('city', valueDistrict);
        data.append('pincode', PinCode);
        data.append('mobile', contact);
        data.append('occupation_id', selectedOccupations);
        data.append('education_id', selectedEducation);
        data.append('income_id', selectedIncomes);
        data.append('latitude', Lattitude);
        data.append('longitude', Longitude);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://createdinam.com/DICGCA-SURVEY/public/api/create-survey-demographics',
            headers: {
                'Authorization': 'Bearer ' + userSendToken,
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };
        console.log('submitSurvey', JSON.stringify(config))
        Axios.request(config)
            .then((response) => {
                console.log('submitSurvey response', JSON.stringify(response.data))
                if (response.data.status === true) {
                    setSubmitSurvey(false);
                    showMessage({
                        message: response.data.message + ', Submit By ' + response.data?.name,
                        description: response.data.message,
                        type: "success",
                    });
                    Alert.alert(
                        'Block A Complete',
                        'Move To Block B Survey',
                        [
                            { text: 'Okay', onPress: () => saveSurveryAndMoveToNext() },
                        ]
                    )
                    // saveSurveryAndMoveToNext();
                } else {
                    if (response.data.message === 'Demographic details already submitted!') {
                        setSubmitSurvey(false);
                        Alert.alert(
                            'Block A Complete',
                            'Move To Block B Survey',
                            [
                                { text: 'Okay', onPress: () => saveSurveryAndMoveToNext() },
                            ]
                        )

                    } else {
                        setSubmitSurvey(false);
                        showMessage({
                            message: response.data.message,
                            description: response.data.message,
                            type: "danger",
                            duration: 6000
                        });
                    }
                }
            });
    }

    const saveSurveryAndMoveToNext = async () => {
        AsyncStorage.setItem(AsyncStorageContaints.surveyNextBlock, 'B');
        navigation.replace('BlockBSurveyScreen');
    }

    const uploadProgress = (progressEvent) => {
        var Percentage = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
        );
        setPercentage(Percentage);
        console.log(progressEvent.loaded, progressEvent.total);
        console.log(
            'Upload progress: ' +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            '%',
        );
    };

    const uploadAudioWithRetry = async (fileUri, retries = 3, backoff = 3000) => {
        let API_UPLOAD_MSG_FILE = `https://createdinam.com/DICGCA-SURVEY/public/api/survey-audio-files`;
        const formData = new FormData();
        formData.append('survey_token', name);
        formData.append('sec_no', 'A');
        formData.append('audio', {
            uri: fileUri,
            type: 'audio/mpeg', // Adjust type if needed
            name: 'audio.mp3',
        });

        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const response = await fetch(API_UPLOAD_MSG_FILE, {
                    method: 'POST',
                    body: formData,
                    onUploadProgress: uploadProgress,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.ok) {
                    let status = await response.json();
                    console.log(`uploadAudioWithRetry: ${status}`);
                    setAudioUploading(false);
                    showMessage({
                        message: "Audio Upload",
                        description: "Audio Upload Successfully!",
                        type: "success",
                    });
                    return status;
                } else {
                    throw new Error(`Server error: ${response.status}`);
                }
            } catch (error) {
                if (attempt < retries) {
                    console.warn(`Attempt ${attempt} failed. Retrying in ${backoff}ms...`);
                    await new Promise(resolve => setTimeout(resolve, backoff));
                    backoff *= 2; // Exponential backoff
                } else {
                    throw new Error(`Failed after ${retries} attempts: ${error.message}`);
                }
            }
        }
    };

    const uploadAudioFinal = async (file) => {
        setAudioUploading(true);
        let API_UPLOAD_MSG_FILE = `https://createdinam.com/DICGCA-SURVEY/public/api/survey-audio-files`;
        const formData = new FormData();
        formData.append('survey_token', name);
        formData.append('sec_no', 'A');
        formData.append('audio_file', {
            uri: file,
            name: `${generateRandomAlphanumericString(25)}_a.mp3`,
            type: 'audio/mp3',
        })
        console.log(JSON.stringify(formData));
        try {
            const res = await fetch(API_UPLOAD_MSG_FILE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + userSendToken,
                },
                body: formData,
                onUploadProgress: uploadProgress,
            });
            const json = await res.json();
            if (json.status === true) {
                console.log(`response:- ${JSON.stringify(json)}`)
                setAudioUploading(false);
                setAudioUpload(true);
                showMessage({
                    message: "Audio Upload",
                    description: json.message,
                    type: "success",
                    duration: 2000,
                    hideOnPress: true
                });
                Alert.alert(
                    json.message,
                    json.message,
                    [
                        { text: 'Okay', onPress: () => submitSurvey() },
                    ]
                );
            } else {
                console.log(`response:-Failed ${JSON.stringify(json)}`)
                if (json.message === 'Section A details already submitted!') {
                    // setAudioUploading(false);
                    setAudioUpload(true);
                    showMessage({
                        message: json.message,
                        description: json.message,
                        type: "success",
                        duration: 2000,
                        hideOnPress: true
                    });
                } else {
                    Alert.alert(
                        JSON.stringify(json),
                        JSON.stringify(json),
                        [
                            { text: 'Retry', onPress: () => uploadAudioFinal(file) },
                        ]
                    )
                }
            }
        } catch (err) {
            Alert.alert(
                'Audio Uploading Failed!',
                'Audio Uploading Failed! Please Retry',
                [
                    { text: 'Retry', onPress: () => uploadAudioFinal(audioPath) },
                ]
            )
        }
    }

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedAreas(selectedItems);
    }

    const onSelectedEducationChange = (selectedItems) => {
        setSelectedEducation(selectedItems);
    }

    const onSelectedOccupationsChange = (selectedItems) => {
        setSelectedOccupations(selectedItems);
    }

    const onSelectedIncomesChange = (selectedItems) => {
        setSelectedIncomes(selectedItems);
    }

    const loadPinCode = (name) => {
        // https://createdinam.com/DICGCA-SURVEY/public/api/get-pincode
        const FormData = require('form-data');
        let data = new FormData();
        data.append('district', name);
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://createdinam.com/DICGCA-SURVEY/public/api/get-pincode',
            headers: {
                'Authorization': 'Bearer ' + userSendToken,
                "Content-Type": "multipart/form-data",
            },
            data: data,
        };
        console.log('submitSurvey', JSON.stringify(config))
        Axios.request(config)
            .then((response) => {
                console.log('submitSurvey response', JSON.stringify(response.data))
                if (response.data.status === true) {
                    const keyValueArray = response?.data?.data?.map((code, index) => ({ key: (index + 1).toString(), value: code }));
                    setPinCodeData(keyValueArray)
                } else {
                    showMessage({
                        message: "Something went wrong!",
                        description: "Please select Diffrent District \n No Pincode Found",
                        type: "danger",
                    });
                }
            });
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
            {renderCustomHeader()}
            <Modal isVisible={isInstruction}>
                <View style={{ width: Dimensions.get('screen').width - 50, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 5, padding: 20 }}>
                    <View style={{ alignItems: 'center', alignContent: 'center', marginTop: 15 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t('Survey_Instructions')}</Text>
                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>{t('Survey_description')}</Text>
                    </View>
                    <TouchableOpacity onPress={() => startRecording()} style={{ paddingVertical: 10, paddingHorizontal: 50, backgroundColor: '#000', borderRadius: 5, elevation: 5, zIndex: 999 }}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', padding: 5 }}>{t('Start')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {isAudioUploading && <Progress.Bar progress={percentage} width={Dimensions.get('screen').width} color={'green'} style={{ borderRadius: 0 }} indeterminate={false} />}
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}> {t('Block_I')}. {t('Respondennt_Details')}</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ margin: 20, marginBottom: 0 }}>
                        {/* <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('check_respondent')}</Text> */}
                        {/* <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('check_validation')}</Text> */}
                        <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('check_accepted')}</Text>
                        <Text style={{ marginBottom: 20, fontSize: 16 }}>{t('check_category')}</Text>
                    </View>
                    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#b4b4b4', marginBottom: 20 }} />
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>1. {t("name")}:</Text>
                            <TextInput placeholderTextColor={'#000000'} style={{ color: '#000000', backgroundColor: '#fff', paddingLeft: 15, borderBottomWidth: 0.5, borderBottomColor: "gray" }} placeholder={t('Enter_Name')} editable={true} value={Name} onChangeText={(text) => setname(text)} />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>2. {t('address')}:</Text>
                            <TextInput placeholderTextColor={'#000000'} style={{ color: '#000000', backgroundColor: '#fff', paddingLeft: 15, borderBottomWidth: 0.5, borderBottomColor: "gray" }} placeholder={t('enter_address')} editable={true} value={address} onChangeText={(text) => setAddress(text)} />
                        </View>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>{t('state')}:</Text>
                            <Dropdown
                                style={[styles.dropdown, is4Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                data={state}
                                // search
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={!is4Focus ? t('select_state') : value}
                                // searchPlaceholder="Search..."
                                value={value}
                                onFocus={() => setIs4Focus(true)}
                                onBlur={() => setIs4Focus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item))
                                    setValue(item?.id);
                                    loadDistrict(item.id);
                                    setIs4Focus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>{t('district')}:</Text>
                            <Dropdown
                                style={[styles.dropdown, is5Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={DistrictData}
                                maxHeight={300}
                                labelField="name"
                                valueField="id"
                                placeholder={!is5Focus ? t('select_district') : valueDistrict}
                                value={selectedDistrict}
                                onFocus={() => setIs5Focus(true)}
                                onBlur={() => setIs5Focus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item))
                                    setDistrictValue(item?.id);
                                    loadPinCode(item?.name);
                                    setIs5Focus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', marginTop: 5 }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>{t('pin_code')}</Text>
                            <Dropdown
                                style={[styles.dropdown, is6Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={PinCodeData}
                                maxHeight={300}
                                labelField="value"
                                valueField="value"
                                placeholder={!is6Focus ? t('pin_code') : PinCode}
                                value={PinCode}
                                onFocus={() => setIs6Focus(true)}
                                onBlur={() => setIs6Focus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item))
                                    setPinCode(item?.value);
                                    setIs6Focus(false);
                                }}
                            />
                            {/* <TextInput keyboardType='numeric' maxLength={6} style={{ backgroundColor: '#fff', paddingLeft: 15, borderBottomWidth: 0.5, borderBottomColor: "gray" }} placeholder={t('enter_pincode')} editable={true} value={PinCode} onChangeText={(text) => setPinCode(text)} /> */}
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', marginTop: 5 }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>3. {t('contact_no')}.</Text>
                            <TextInput placeholderTextColor={'#000000'} maxLength={10} keyboardType='numeric' style={{ color: '#000000', backgroundColor: '#fff', paddingLeft: 15, borderBottomWidth: 0.5, borderBottomColor: "gray" }} placeholder={t('enter_contact')} editable={true} value={contact} onChangeText={(text) => setContact(text)} />
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>4. {t('gender')}</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setGender(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', marginTop: 5 }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', paddingLeft: 10, paddingTop: 10 }}>5. {t('age')}.</Text>
                            <TextInput placeholderTextColor={'#000000'} keyboardType='numeric' onChangeText={(e) => setAgeNumber(e)} style={{ color: '#000000', backgroundColor: '#fff', paddingLeft: 15 }} placeholder='Enter Age' maxLength={2} value={age} />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>6. {t('category/ occupation')}</Text>
                            <Dropdown
                                style={[styles.dropdown, is1Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                data={occupationData}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!is1Focus ? t('select_category') : selectedOccupations}
                                // searchPlaceholder="Search..."
                                value={selectedOccupations}
                                onFocus={() => setIs1Focus(true)}
                                onBlur={() => setIs1Focus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item));
                                    setSelectedOccupations(item?.id);
                                    setIs1Focus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', borderWidth: .5 }}>
                            <Text style={{ paddingVertical: 20, paddingHorizontal: 5 }}>{t('respondent_certificate')}</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>7. {t('education')}</Text>
                            <Dropdown
                                style={[styles.dropdown, is2Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={educationData}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!is2Focus ? t('education_qualification') : selectedEducation}
                                // searchPlaceholder="Search..."
                                value={selectedEducation}
                                onFocus={() => setIs2Focus(true)}
                                onBlur={() => setIs2Focus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item))
                                    setSelectedEducation(item?.id);
                                    setIs2Focus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', borderWidth: .5 }}>
                            <Text style={{ paddingVertical: 20, paddingHorizontal: 5 }}>{t('monthly_income')}</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>8. {t('income')}</Text>
                            <Dropdown
                                style={[styles.dropdown, is3Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={incomeData}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!is3Focus ? t('Select_annual_income') : selectedIncomes}
                                value={selectedIncomes}
                                onFocus={() => setIs3Focus(true)}
                                onBlur={() => setIs3Focus(false)}
                                onChange={item => {
                                    console.log('______>', JSON.stringify(item))
                                    setSelectedIncomes(item?.id);
                                    setIs3Focus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <TouchableOpacity disabled={isSubmitSurvey} onPress={() => {
                            validationCheck();
                        }} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            {isAudioUploading !== true ? <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{t('next_block_B')}</Text> : <ActivityIndicator color={'#fff'} style={{ alignItems: 'center', alignSelf: 'center' }} />}
                        </TouchableOpacity>
                    </View>
                </ScrollView> : <ActivityIndicator style={{ alignItems: 'center', marginTop: Dimensions.get('screen').width }} color={'#000'} />}
        </SafeAreaView >
    )
}
// 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default AddSurveyScreen;