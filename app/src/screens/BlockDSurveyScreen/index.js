import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, ActivityIndicator, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import React, { Component, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';
import MultiSelect from 'react-native-multiple-select';
;
import AudioRecord from 'react-native-audio-record';
import Modal from 'react-native-modal';
import Axios from 'axios';
import { Children } from 'react';
// import fs from 'fs';

const BlockDSurveyScreen = () => {

    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [isRecording, setIsRecording] = React.useState(false);
    const [isInstruction, setSurveyInstruction] = React.useState(true);
    const [isLoading, setLoading] = React.useState(false);
    const [userSendToken, setUserSendToken] = React.useState('');
    const [audioPath, setAudioPath] = React.useState('');
    const [areas, setAreas] = React.useState([]);
    const [educations, setEducations] = React.useState([]);
    const [incomes, setIncomes] = React.useState([]);
    const [occupations, setOccupations] = React.useState([]);
    const [areasSelected, setSelectedAreas] = React.useState([]);
    const [state, setStateData] = React.useState([]);
    const [DistrictData, setDistrictData] = React.useState([]);
    const [isSubmitSurvey, setSubmitSurvey] = React.useState(false);
    const [isAudioUploading, setAudioUploading] = React.useState(false);
    // country dropdowns
    const [value, setValue] = React.useState(null);
    const [selectedState, setSelectedState] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    // select district
    const [valueDistrict, setDistrictValue] = React.useState(null);
    const [selectedDistrict, setSelectedDistrict] = React.useState(null);
    const [isDistrictFocus, setIsDistrictFocus] = React.useState(false);

    // lable fields. 
    const [surveryName, setSurveyName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [age, setAgeNumber] = React.useState(0);
    const [adult, setAdults] = React.useState(0);
    const [children, setChildren] = React.useState(0);
    const [selectedEducation, setSelectedEducation] = React.useState([]);
    const [selectedOccupations, setSelectedOccupations] = React.useState([]);
    const [selectedIncomes, setSelectedIncomes] = React.useState([]);
    const [differentlyAble, setDifferently] = React.useState('');
    const [smartPhone, setSmartphone] = React.useState('');
    const [anyGroup, setAnyGroup] = React.useState('');
    const [life, setLife] = React.useState(null);
    const [nonLife, setNonLife] = React.useState(null);
    const [getInsurance, setGetInsurance] = React.useState(null);
    const [selectedReason, setSelectedReason] = React.useState([]);
    const [awareA, setAwareA] = React.useState(null);
    const [enrollA, setEnrollA] = React.useState(null);
    const [renewalA, setRenewalA] = React.useState(null);
    const [inactiveA, setInactiveA] = React.useState(null);
    const [awareB, setAwareB] = React.useState(null);
    const [enrollB, setEnrollB] = React.useState(null);
    const [renewalB, setRenewalB] = React.useState(null);
    const [inactiveB, setInactiveB] = React.useState(null);
    const [awareC, setAwareC] = React.useState(null);
    const [enrollC, setEnrollC] = React.useState(null);
    const [renewalC, setRenewalC] = React.useState(null);
    const [inactiveC, setInactiveC] = React.useState(null);
    const [awareD, setAwareD] = React.useState(null);
    const [enrollD, setEnrollD] = React.useState(null);
    const [renewalD, setRenewalD] = React.useState(null);
    const [inactiveD, setInactiveD] = React.useState(null);
    const [privateBorrowing, setprivateBorrowing] = React.useState(null);
    const [privateBorrowingFocus, setPrivateBorrowingFocus] = React.useState(null);
    const [reasonForEnroll, setReasonForEnroll] = React.useState([]);
    const [reasonForEnrollProducts, setReasonForEnrollProducts] = React.useState([]);
    const [enrolledOtherInsurance, setEnrolledOtherInsurance] = React.useState(null);
    const [rupayCover, setRupayCover] = React.useState(null);
    const [PMJJBY, setPMJJBY] = React.useState(null);
    const [PMSBY, setPMSBY] = React.useState(null);
    const [PMFBY, setPMFBY] = React.useState(null);
    const [other, setOther] = React.useState(null);
    const [insuranceInactive, setInsuranceInactive] = React.useState([]);
    const [Lattitude, setLattitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');
    const multiSelectRef = useRef(null);
    // gender setDifferently
    const data = [
        {
            label: 'Male'
        },
        {
            label: 'Female'
        },
        {
            label: 'Prefer not to say'
        }
    ];

    // anyGroup
    const dataGroup = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

    const smartphone = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

    const differently = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
        }
    ];

    const reason = [
        { id: 1, lable: 'Don’t need it' },
        { id: 2, lable: 'Don’t trust' },
        { id: 3, lable: 'No money to pay premium' },
        { id: 4, lable: 'Any other reason' },
    ]

    const enrolPlace = [
        { id: 1, lable: 'Bank Branch ' },
        { id: 2, lable: 'BC Agent' },
        { id: 3, lable: 'Digital App' },
        { id: 4, lable: 'Insurance Agent ' },
    ]
    const enrolReason = [
        { id: 1, lable: 'Needed the product ' },
        { id: 2, lable: 'Liked the benefits' },
        { id: 3, lable: 'Enrolled by the bank on its own' },
        { id: 4, lable: 'Convinced by Family/Friends' },
    ]

    const InsuranceInactiveReason = [
        { id: 1, lable: 'Lack of Funds' },
        { id: 2, lable: 'No Trust' },
        { id: 3, lable: 'No intimation received' },
        { id: 4, lable: 'Don’t like the service/support' },
    ]

    const adults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const childern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    useFocusEffect(
        React.useCallback(() => {
            // getLoadingData();
            readMessages();
            return () => {
                // Useful for cleanup functions
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
            //UserId
            setUserSendToken(UserToken);
            setUserName(UserData);
            setName(userId);
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
                <TouchableOpacity onPress={() => askToCloseApp()} style={{ marginRight: 10, padding: 5 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/goback.png')} />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/app_logo.png')}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName} - {user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block D</Text> </Text>}
                </View>
                {isRecording === true ? <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'green' }} /> : <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'red' }} />}
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

    const stopRecording = async () => {
        try {
            // or to get the wav file path
            console.log('startRecording')
            const audioFile = await AudioRecord.stop();
            console.log(audioFile)
            setAudioPath(audioFile);
            uploadAudioFinal(audioFile);
            submitSurvey(audioFile);
        } catch (error) {
            console.log(error);
        }
    };


    const uploadAudioFinal = async (file) => {
        setAudioUploading(true);
        let API_UPLOAD_MSG_FILE = `https://createdinam.com/DICGCA-SURVEY/public/api/survey-audio-files`;
        const path = `file://${file}`;
        const formData = new FormData();
        formData.append('survey_token', name);
        formData.append('sec_no', 'D');
        formData.append('audio_file', {
            uri: path,
            name: 'test.wav',
            type: 'audio/wav',
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
            });
            const json = await res.json();
            setAudioUploading(false);
            showMessage({
                message: "Audio Upload",
                description: "Audio Upload Successfully!",
                type: "success",
            });
        } catch (err) {
            showMessage({
                message: "Audio Upload",
                description: "Audio Upload Successfully",
                type: "success",
            });
        }
    }

    const validate = () => {
        console.log('validate', enrollA?.label, enrollB?.label, enrollC?.label, enrollD?.label, enrolledOtherInsurance?.label);
        if (life === null) {
            showMessage({
                message: "Please Select Insurance Facility!",
                description: "Please Select Insurance Facility!",
                type: "danger",
            });
        } else if (nonLife === null) {
            showMessage({
                message: "Please Select Non-life Insurance Facility!",
                description: "Please Select Insurance Facility!",
                type: "danger",
            });
        } else if (nonLife?.label === "No" && getInsurance === null) {
            showMessage({
                message: "Please Select You Want Inusrance Reason!",
                description: "Please Select You Want Inusrance Reason!",
                type: "danger",
            });
        } else if (awareA === null) {
            showMessage({
                message: "Please Select Insurance Facility Awareness A",
                description: "Please Select IF Awareness A!",
                type: "danger",
            });
        }
        else if (enrollA === null || enrollA === undefined) {
            showMessage({
                message: "Please Select IF Enroll A",
                description: "Please Select IF Enroll A!",
                type: "danger",
            });
        }
        else if (awareB === null || awareB === undefined) {
            showMessage({
                message: "Please Select IF Awareness B",
                description: "Please Select IF Awareness B!",
                type: "danger",
            });
        } else if (getInsurance?.label === "No") {
            if (reasonForEnroll.length === 0) {
                showMessage({
                    message: "Please Select Insurance Facility",
                    description: "Please Select Insurance Facility",
                    type: "danger",
                });
            }
        } else if (enrollA === null || enrollA === undefined) {
            showMessage({
                message: "Please Select IF Enroll A",
                description: "Please Select IF Enroll A!",
                type: "danger",
            });
        } else if (renewalA === null || renewalA === undefined) {
            showMessage({
                message: "Please Select IF renewal A",
                description: "Please Select IF renewal A!",
                type: "danger",
            });
        }
        else if (inactiveA === null || inactiveA === undefined) {
            showMessage({
                message: "Please Select IF inactive A",
                description: "Please Select IF inactive A!",
                type: "danger",
            });
        } else if (enrollB === null || enrollB === undefined) {
            showMessage({
                message: "Please Select IF Enroll B",
                description: "Please Select IF Enroll B!",
                type: "danger",
            });
        } else if (awareC === null || awareC === undefined) {
            showMessage({
                message: "Please Select IF Awareness C",
                description: "Please Select IF Awareness C!",
                type: "danger",
            });
        }
        else if (enrollC === null || enrollC === undefined) {
            showMessage({
                message: "Please Select IF Enroll C",
                description: "Please Select IF Enroll A!",
                type: "danger",
            });
        }
        else if (renewalC === null || renewalC === undefined) {
            showMessage({
                message: "Please Select IF renewal C",
                description: "Please Select IF renewal C!",
                type: "danger",
            });
        }
        else if (inactiveC === null || inactiveC === undefined) {
            showMessage({
                message: "Please Select IF inactive C",
                description: "Please Select IF inactive C!",
                type: "danger",
            });
        } else if (awareD === null || awareD === undefined) {
            showMessage({
                message: "Please Select IF Awareness D",
                description: "Please Select IF Awareness D!",
                type: "danger",
            });
        }
        else if (enrollD === null || enrollD === undefined) {
            showMessage({
                message: "Please Select IF Enroll D",
                description: "Please Select IF Enroll D!",
                type: "danger",
            });
        }
        else if (renewalD === null || renewalD === undefined) {
            showMessage({
                message: "Please Select IF renewal D",
                description: "Please Select IF renewal D!",
                type: "danger",
            });
        }
        else if (inactiveD === null || inactiveD === undefined) {
            showMessage({
                message: "Please Select IF inactive D",
                description: "Please Select IF inactive D!",
                type: "danger",
            });
        } else if (enrollA?.label === "Yes" || enrollB?.label === "Yes" || enrollC?.label === "Yes" || enrollD?.label === "Yes") {
            if (privateBorrowing === null) {
                showMessage({
                    message: "Please Select Insurance Product Of Enroll",
                    description: "Please Select Insurance Product Of Enroll!",
                    type: "danger",
                });
            }
        }
        if ((enrollA?.label === "Yes" || enrollB?.label === "Yes" || enrollC?.label === "Yes" || enrollD?.label === "Yes") && reasonForEnrollProducts?.length === 0) {
            showMessage({
                message: "Please Select Reason For Enroll",
                description: "Please Select Reason For Enroll!",
                type: "danger",
            });
        } else if (enrolledOtherInsurance === null || enrolledOtherInsurance === undefined) {
            showMessage({
                message: "Please Select Other Life Insurance Enroll",
                description: "Please Select Other Life Insurance Enroll!",
                type: "danger",
            });
        } else if (rupayCover === null || rupayCover === undefined) {
            showMessage({
                message: "Please Select Rupay Accident Cover",
                description: "Please Select Rupay Accident Cover!",
                type: "danger",
            });
        }
        else if (PMJJBY === null || PMJJBY?.label === undefined) {
            showMessage({
                message: "Please Select PMJJBY",
                description: "Please Select PMJJBY!",
                type: "danger",
            });
        }
        else if (PMSBY === null) {
            showMessage({
                message: "Please Select PMSBY",
                description: "Please Select PMSBY!",
                type: "danger",
            });
        }
        else if (PMFBY === null) {
            showMessage({
                message: "Please Select PMFBY",
                description: "Please Select PMFBY!",
                type: "danger",
            });
        } else if (other === null) {
            showMessage({
                message: "Please Select Any Other",
                description: "Please Select Any Othe!",
                type: "danger",
            });
        } else if (enrollA?.label === "Yes" && enrollB?.label === "Yes" && enrollC?.label === "Yes" && enrollD?.label === "Yes" && enrolledOtherInsurance?.label === "Yes") {
            if (insuranceInactive.length === 0) {
                showMessage({
                    message: "Please Select Insurance Inactive Resaon",
                    description: "Please Select Insurance Inactive Resaon!",
                    type: "danger",
                });
            }
        } else {
            stopRecording();
        }
    }

    const validateX = () => {
        if (life === null) {
            showMessage({
                message: "Please Select Insurance Facility!",
                description: "Please Select Insurance Facility!",
                type: "danger",
            });

        }
        else if (nonLife === null) {
            showMessage({
                message: "Please Select Insurance Facility!",
                description: "Please Select Insurance Facility!",
                type: "danger",
            });
        }
        else if (nonLife?.label === "No" && getInsurance === null) {
            showMessage({
                message: "Please Select Inusrance Reason!",
                description: "Please Select Inusrance Reason!",
                type: "danger",
            });
        }
        else if (awareA === null) {
            showMessage({
                message: "Please Select IF Awareness A",
                description: "Please Select IF Awareness A!",
                type: "danger",
            });
        }
        else if (awareB === null) {
            showMessage({
                message: "Please Select IF Awareness B",
                description: "Please Select IF Awareness B!",
                type: "danger",
            });
        }
        // else if (enrollA === null) {
        //     showMessage({
        //         message: "Please Select IF Enroll A",
        //         description: "Please Select IF Enroll A!",
        //         type: "danger",
        //     });
        // }
        // else if (renewalA === null) {
        //     showMessage({
        //         message: "Please Select IF renewal A",
        //         description: "Please Select IF renewal A!",
        //         type: "danger",
        //     });
        // }
        // else if (inactiveA === null) {
        //     showMessage({
        //         message: "Please Select IF inactive A",
        //         description: "Please Select IF inactive A!",
        //         type: "danger",
        //     });
        // }
        // else if (enrollB === null) {
        //     showMessage({
        //         message: "Please Select IF Enroll B",
        //         description: "Please Select IF Enroll B!",
        //         type: "danger",
        //     });
        // }

        // else if (renewalB === null) {
        //     showMessage({
        //         message: "Please Select IF renewal B",
        //         description: "Please Select IF renewal B!",
        //         type: "danger",
        //     });
        // }
        // else if (inactiveB === null) {
        //     showMessage({
        //         message: "Please Select IF inactive B",
        //         description: "Please Select IF inactive B!",
        //         type: "danger",
        //     });
        // }
        else if (awareC === null) {
            showMessage({
                message: "Please Select IF Awareness C",
                description: "Please Select IF Awareness C!",
                type: "danger",
            });
        }
        // else if (enrollC === null) {
        //     showMessage({
        //         message: "Please Select IF Enroll C",
        //         description: "Please Select IF Enroll A!",
        //         type: "danger",
        //     });
        // }
        // else if (renewalC === null) {
        //     showMessage({
        //         message: "Please Select IF renewal C",
        //         description: "Please Select IF renewal C!",
        //         type: "danger",
        //     });
        // }
        // else if (inactiveC === null) {
        //     showMessage({
        //         message: "Please Select IF inactive C",
        //         description: "Please Select IF inactive C!",
        //         type: "danger",
        //     });
        // }
        else if (awareD === null) {
            showMessage({
                message: "Please Select IF Awareness D",
                description: "Please Select IF Awareness D!",
                type: "danger",
            });
        }
        // else if (enrollD === null) {
        //     showMessage({
        //         message: "Please Select IF Enroll D",
        //         description: "Please Select IF Enroll D!",
        //         type: "danger",
        //     });
        // }
        // else if (renewalD === null) {
        //     showMessage({
        //         message: "Please Select IF renewal D",
        //         description: "Please Select IF renewal D!",
        //         type: "danger",
        //     });
        // }
        // else if (inactiveD === null) {
        //     showMessage({
        //         message: "Please Select IF inactive D",
        //         description: "Please Select IF inactive D!",
        //         type: "danger",
        //     });
        // }
        else if ((enrollA?.label === "Yes" || enrollB?.label === "Yes" || enrollC?.label === "Yes" || enrollD?.label === "Yes") && privateBorrowing === null) {
            showMessage({
                message: "Please Select Place Of Enroll",
                description: "Please Select  Place Of Enroll!",
                type: "danger",
            });
        }
        if ((enrollA?.label === "Yes" || enrollB?.label === "Yes" || enrollC?.label === "Yes" || enrollD?.label === "Yes") && reasonForEnroll?.length === 0) {
            showMessage({
                message: "Please Select Reason For Enroll",
                description: "Please Select Reason For Enroll!",
                type: "danger",
            });
        }
        else if (enrolledOtherInsurance === null) {
            showMessage({
                message: "Please Select Other IF Enroll",
                description: "Please Select Other IF Enroll!",
                type: "danger",
            });
        }
        else if (rupayCover === null) {
            showMessage({
                message: "Please Select Rupay Accident Cover",
                description: "Please Select Rupay Accident Cover!",
                type: "danger",
            });
        }
        else if (PMJJBY === null) {
            showMessage({
                message: "Please Select PMJJBY",
                description: "Please Select PMJJBY!",
                type: "danger",
            });
        }
        else if (PMSBY === null) {
            showMessage({
                message: "Please Select PMSBY",
                description: "Please Select PMSBY!",
                type: "danger",
            });
        }
        else if (PMFBY === null) {
            showMessage({
                message: "Please Select PMFBY",
                description: "Please Select PMFBY!",
                type: "danger",
            });
        }
        else if (other === null) {
            showMessage({
                message: "Please Select Any Other",
                description: "Please Select Any Othe!",
                type: "danger",
            });
        }
        else if ((enrollA?.label === "Yes" || enrollB?.label === "Yes" || enrollC?.label === "Yes" || enrollD?.label === "Yes") && insuranceInactive?.length === 0) {
            showMessage({
                message: "Please Select Insurance Inactive Resaon",
                description: "Please Select Insurance Inactive Resaon!",
                type: "danger",
            });
        }
        else {
            showMessage({
                message: 'All Set',
                description: "All Set",
                type: "danger",
            });
            // stopRecording();
        }
    }

    const submitSurvey = async () => {
        setSubmitSurvey(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Authorization", "Bearer " + userSendToken);

        var raw = JSON.stringify({
            "latitude": Lattitude,
            "longitude": Longitude,
            "survey_token": name,
            "section_no": "D",
            "data": [
                {
                    "section_no": "D",
                    "q_no": "23",
                    "q_type": "CHILD",
                    "sub_q_no": "a",
                    "sub_q_title": "Life",
                    "sub_q_type": "SINGLECHECK",
                    'response1': "",
                    'response2': "",
                    'response3': "",
                    'response4': "",
                    'response5': "",
                    "response": `${life?.label}`
                },
                {
                    "section_no": "D",
                    "q_no": "23",
                    "q_type": "CHILD",
                    "sub_q_no": "b",
                    "sub_q_title": "Non-Life",
                    "sub_q_type": "SINGLECHECK",
                    'response1': "",
                    'response2': "",
                    'response3': "",
                    'response4': "",
                    "response": `${nonLife?.label}`
                },
                {
                    "section_no": "D",
                    "q_no": "23",
                    "q_type": "CHILD",
                    "sub_q_no": "c",
                    "sub_q_title": "If not, do you want to get any insurance facilities?",
                    "sub_q_type": "SINGLECHECK",
                    'response1': "",
                    'response2': "",
                    'response3': "",
                    'response4': "",
                    "response": `${getInsurance?.label}`
                },
                {
                    "section_no": "D",
                    "q_no": "23",
                    "q_type": "CHILD",
                    "sub_q_no": "d",
                    "sub_q_title": "If not interested in any insurance facility, what could be the reasons?",
                    "sub_q_type": "MULTICHECK",
                    'response1': "",
                    'response2': "",
                    'response3': "",
                    'response4': "",
                    "response": selectedReason.length === 0 ? "" : selectedReason
                },
                {
                    "section_no": "D",
                    "q_no": "24",
                    "q_type": "CHILD",
                    "sub_q_no": "a",
                    "sub_q_title": "In-built Insurance Accident Cover on RuPay card holders under PM Jan Dhan Account [Accidental]",
                    "sub_q_type": "SINGLECHECK",
                    'response1': `${awareA?.label}`,
                    'response2': `${enrollA?.label}`,
                    'response3': `${renewalA?.label}`,
                    'response4': `${inactiveA?.label}`,
                    "response": ``
                },
                {
                    "section_no": "D",
                    "q_no": "24",
                    "q_type": "CHILD",
                    "sub_q_no": "b",
                    "sub_q_title": "Pradhan Mantri Suraksha Bima Yojana (PMSBY) having an annual premium of ₹ 20- per year",
                    "sub_q_type": "SINGLECHECK",
                    'response1': `${awareB?.label}`,
                    'response2': `${enrollB?.label}`,
                    'response3': `${renewalB?.label}`,
                    'response4': `${inactiveB?.label}`,
                    "response": ``
                },
                {
                    "section_no": "D",
                    "q_no": "24",
                    "q_type": "CHILD",
                    "sub_q_no": "c",
                    "sub_q_title": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
                    "sub_q_type": "SINGLECHECK",
                    'response1': `${awareC?.label}`,
                    'response2': `${enrollC?.label}`,
                    'response3': `${renewalC?.label}`,
                    'response4': `${inactiveC?.label}`,
                    "response": ``
                },
                {
                    "section_no": "D",
                    "q_no": "24",
                    "q_type": "CHILD",
                    "sub_q_no": "d",
                    "sub_q_title": "IPM Fasal Bima Yojana [PMFBY]",
                    "sub_q_type": "SINGLECHECK",
                    'response1': `${awareD?.label}`,
                    'response2': `${enrollD?.label}`,
                    'response3': `${renewalD?.label}`,
                    'response4': `${inactiveD?.label}`,
                    "response": ``
                },
                {
                    "section_no": "D",
                    "q_no": "25",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response5': ``,
                    "response": `${privateBorrowing}`
                },
                {
                    "section_no": "D",
                    "q_no": "26",
                    "q_type": "MULTI",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "response": reasonForEnroll.length === 0 ? [] : reasonForEnroll
                },
                {
                    "section_no": "D",
                    "q_no": "27",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "response": `${enrolledOtherInsurance?.label}`
                },
                {
                    "section_no": "D",
                    "q_no": "28",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    'response1': `${rupayCover?.label}`,
                    'response2': `${PMJJBY?.label}`,
                    'response3': `${PMSBY?.label}`,
                    'response4': `${PMFBY?.label}`,
                    'response5': `${other?.label}`,
                    "response": ``
                },
                {
                    "section_no": "D",
                    "q_no": "29",
                    "q_type": "MULTI",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "response": insuranceInactive.length === 0 ? "" : insuranceInactive
                },
            ]
        });

        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        console.log('--------->>', requestOptions?.body);

        fetch("https://createdinam.com/DICGCA-SURVEY/public/api/create-survey-section-d", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.status === true) {
                    showMessage({
                        message: result.message,
                        description: result.message,
                        type: "success",
                    });
                    saveSurveryAndMoveToNext();
                } else {
                    showMessage({
                        message: "Something went wrong!",
                        description: result.message,
                        type: "danger",
                    });
                }
            })
            .catch(error => console.log('error', error));
        // navigation.replace('BlockESurveyScreen');
    }


    const saveSurveryAndMoveToNext = async () => {
        setSubmitSurvey(false);
        AsyncStorage.setItem(AsyncStorageContaints.surveyNextBlock, 'E');
        navigation.replace('BlockESurveyScreen');
    }

    const onSelectedReason = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select two valid reason.');
            return
        }
        else if (selectedItems.length > 2) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 2 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setReasonForEnroll(selectedItems);
    }

    const onSelectedEnrollProductsReason = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select two valid reason.');
            return
        }
        else if (selectedItems.length > 2) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 2 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setReasonForEnrollProducts(selectedItems);
    }

    const onSelectedInsuranceInactiveReason = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select two valid reason.');
            return
        }
        else if (selectedItems.length > 2) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 2 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setInsuranceInactive(selectedItems);
    }

    const onSelectedOccupationsChange = (selectedItems) => {
        setSelectedOccupations(selectedItems);
    }

    const onSelectedIncomesChange = (selectedItems) => {
        setSelectedIncomes(selectedItems);
    }

    const SelectedReasonForEnrolLabels = reasonForEnroll.map((selectedId) => {
        const selectedReason = enrolReason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedReasonForEnrolProductsLabels = reasonForEnrollProducts.map((selectedId) => {
        const selectedReason = enrolReason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedInsuranceInactiveLabels = insuranceInactive.map((selectedId) => {
        const selectedReason = InsuranceInactiveReason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    // SelectedReasonTypeLabels

    const SelectedReasonTypeLabels = reasonForEnroll.map((selectedId) => {
        const selectedReason = reason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
            {renderCustomHeader()}
            <Modal isVisible={isInstruction}>
                <View style={{ width: Dimensions.get('screen').width - 50, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 5, padding: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Survey Instructions</Text>
                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>Once your start the survey, this will track your location, and also record your audio, by click on start button all the featurs enable and track your location and record your audio.</Text>
                    </View>
                    <TouchableOpacity onPress={() => startRecording()} style={{ paddingVertical: 10, paddingHorizontal: 50, backgroundColor: '#000', borderRadius: 5, elevation: 5, zIndex: 999 }}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', padding: 5 }}>Start</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>D. ACCESS and USAGE OF FINANCIAL SERVICES – INSURANCE FACILITIES</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23. Do you have any insurance facility?</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(a). Life</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setLife(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(b). Non-Life</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setNonLife(e)}
                                />
                            </View>
                            {nonLife?.label === "No" ? <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(c). If not, do you want to get any insurance facilities?</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setGetInsurance(e)}
                                />
                            </View> : null}
                            {getInsurance?.label === "No" ? <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>23(d). If not interested in any insurance facility, what could be the reasons?</Text>
                                <MultiSelect
                                    hideTags
                                    items={reason}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedReason(items)
                                    }
                                    selectedItems={reasonForEnroll}
                                    selectText="Select Reason"
                                    onChangeInput={(text) => console.log(text)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#000"
                                    tagBorderColor="#000"
                                    tagTextColor="#000"
                                    selectedItemTextColor="#000"
                                    selectedItemIconColor="#000"
                                    itemTextColor="#000"
                                    displayKey="lable"
                                    searchInputStyle={{ color: '#000', paddingLeft: 10 }}
                                    submitButtonColor="#000"
                                    submitButtonText="Submit"
                                    itemBackground="#000"
                                    styleTextDropdownSelected={{ color: '#000', paddingLeft: 8, fontSize: 16 }}
                                />
                                <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {SelectedReasonTypeLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View> : null}

                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24. Specific Insurance Facility/Scheme</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(a). In-built Insurance Accident Cover on RuPay card holders under PM Jan Dhan Account [Accidental]</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveA(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(b). Pradhan Mantri Suraksha Bima Yojana (PMSBY) having an annual premium of ₹ 20- per year</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveB(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(c). Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveC(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>24(d). PM Fasal Bima Yojana [PMFBY]</Text>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Awareness</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setAwareD(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Enrolled (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setEnrollD(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Received intimation of renewal/ premium payment (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRenewalD(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Insurance is inactive due to non-payment of premium (wherever applicable)</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setInactiveD(e)}
                                />
                            </View>
                        </View>
                        {(enrollA?.label === "Yes" || enrollB?.label === "Yes" || enrollC?.label === "Yes" || enrollD?.label === "Yes") &&
                            <View>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>25. Where did you enrol for any of the above insurance product?</Text>
                                    <Dropdown
                                        style={[styles.dropdown, privateBorrowingFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        // iconStyle={styles.iconStyle}
                                        // data={AccountType}
                                        data={enrolPlace}
                                        // search
                                        maxHeight={300}
                                        labelField="lable"
                                        valueField="id"
                                        placeholder={!privateBorrowingFocus ? 'Select' : privateBorrowing}
                                        // searchPlaceholder="Search..."
                                        value={privateBorrowing}
                                        onFocus={() => setPrivateBorrowingFocus(true)}
                                        onBlur={() => setPrivateBorrowingFocus(false)}
                                        onChange={item => {
                                            console.log(JSON.stringify(item))
                                            setprivateBorrowing(item.id);
                                            setPrivateBorrowingFocus(false);
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>26 . Why did you enrol in this product?</Text>
                                    <MultiSelect
                                        hideTags
                                        items={enrolReason}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedEnrollProductsReason(items)
                                        }
                                        selectedItems={reasonForEnrollProducts}
                                        selectText="Select Reason"
                                        onChangeInput={(text) => console.log(text)}
                                        altFontFamily="ProximaNova-Light"
                                        tagRemoveIconColor="#000"
                                        tagBorderColor="#000"
                                        tagTextColor="#000"
                                        selectedItemTextColor="#000"
                                        selectedItemIconColor="#000"
                                        itemTextColor="#000"
                                        displayKey="lable"
                                        searchInputStyle={{ color: '#000', paddingLeft: 10 }}
                                        submitButtonColor="#000"
                                        submitButtonText="Submit"
                                        itemBackground="#000"
                                        styleTextDropdownSelected={{ color: '#000', paddingLeft: 8, fontSize: 16 }}
                                    />
                                    <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {SelectedReasonForEnrolProductsLabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        }
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>27. Are you enrolled in any other life insurance (other than above)?</Text>
                            <RadioButtonRN
                                data={dataGroup}
                                selectedBtn={(e) => setEnrolledOtherInsurance(e)}
                            />
                        </View>

                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>28. Do you know anybody, who has received an insurance claim from banks or other insurance agency for the following schemes</Text>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>

                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Rupay Accidental Cover</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setRupayCover(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>PMJJBY</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setPMJJBY(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>PMSBY</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setPMSBY(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>PMFBY</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setPMFBY(e)}
                                />
                            </View>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: '500' }}>Any Other</Text>
                                <RadioButtonRN
                                    data={dataGroup}
                                    selectedBtn={(e) => setOther(e)}
                                />
                            </View>
                        </View>
                        <Text>{enrollA?.label}{enrollB?.label}{enrollA?.label}{enrollC?.label}{enrollD?.label}{enrolledOtherInsurance?.label}</Text>
                        {(enrollA?.label === "Yes" && enrollB?.label === "Yes" && enrollC?.label === "Yes" && enrollD?.label === "Yes") && enrolledOtherInsurance?.label === 'Yes' &&
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>29 . If your insurance has become inactive, please indicate the reasons?</Text>
                                <MultiSelect
                                    hideTags
                                    items={InsuranceInactiveReason}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedInsuranceInactiveReason(items)
                                    }
                                    selectedItems={insuranceInactive}
                                    selectText="Select Reason"
                                    onChangeInput={(text) => console.log(text)}
                                    altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#000"
                                    tagBorderColor="#000"
                                    tagTextColor="#000"
                                    selectedItemTextColor="#000"
                                    selectedItemIconColor="#000"
                                    itemTextColor="#000"
                                    displayKey="lable"
                                    searchInputStyle={{ color: '#000', paddingLeft: 10 }}
                                    submitButtonColor="#000"
                                    submitButtonText="Submit"
                                    itemBackground="#000"
                                    styleTextDropdownSelected={{ color: '#000', paddingLeft: 8, fontSize: 16 }}
                                />
                                <View style={{ padding: 8, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {SelectedInsuranceInactiveLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        }

                        <View style={{ padding: 10, }} />
                        <TouchableOpacity disabled={isSubmitSurvey} onPress={() => validate()}
                            style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            {isSubmitSurvey === true ? <ActivityIndicator style={{ alignItems: 'center' }} color={'#fff'} /> : <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Next Block E</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView> : <ActivityIndicator style={{ alignItems: 'center', marginTop: Dimensions.get('screen').width }} color={'#000'} />}
        </SafeAreaView>
    )
}

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

export default BlockDSurveyScreen;