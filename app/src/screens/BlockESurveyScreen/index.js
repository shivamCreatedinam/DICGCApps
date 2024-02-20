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
;
import AudioRecord from 'react-native-audio-record';
import Modal from 'react-native-modal';
import Axios from 'axios';
import { Children } from 'react';
import { TENURE_EXTENSION_PRICE } from '../../apimanager/ApiEndpoint';
// import fs from 'fs';

const BlockESurveyScreen = () => {

    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const multiSelectRef = React.useRef(null);
    const [userName, setUserName] = React.useState('');
    const [isRecording, setIsRecording] = React.useState(false);
    const [isInstruction, setSurveyInstruction] = React.useState(true);
    const [isLoading, setLoading] = React.useState(false);
    const [selectedFreeLoanRefuseReason, setSelectedFreeLoanRefuseReason] = React.useState([]);
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

    const [selectedReason, setSelectedReason] = React.useState([]);
    // start  Schemes
    const [PensionAwareness, setPensionAwareness] = React.useState(null);
    const [PensionEnrolled, setPensionEnrolled] = React.useState(null);
    const [PensionSubscription, setPensionSubscription] = React.useState(null);
    const [PensionAccount, setPensionAccount] = React.useState(null);

    const [SchemesAwareness, setSchemesAwareness] = React.useState(null);
    const [SchemesEnrolled, setSchemesEnrolled] = React.useState(null);
    const [SchemesSubscription, setSchemesSubscription] = React.useState(null);
    const [SchemesAccount, setSchemesAccount] = React.useState(null);

    const [Lattitude, setLattitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');

    // gender setDifferently
    const data = [
        {
            label: 'Yes'
        },
        {
            label: 'No'
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

    const pensionschemes = [
        { id: 1, lable: 'Don’t need it ' },
        { id: 2, lable: 'Don’t trust' },
        { id: 3, lable: 'No money to pay subscription' },
        { id: 4, lable: 'Any other reason' },
    ]

    const reason = [
        { id: 1, lable: 'Don’t need it' },
        { id: 2, lable: 'Don’t trust' },
        { id: 3, lable: 'No money to pay subscription' },
        { id: 4, lable: 'Any other reason ' },
    ]

    const SelectedReasonTypeLabels = selectedReason.map((selectedId) => {
        const selectedReason = reason.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

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
        setSelectedReason(selectedItems);
    }

    useFocusEffect(
        React.useCallback(() => {
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


    // AudioRecord.on('data', data => {
    //     // base64-encoded audio data chunks
    //     console.log('AudioRecord_>', JSON.stringify(data));
    // });

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
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block E</Text> </Text>}
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
            console.warn('startRecording')
            const audioFile = await AudioRecord.stop();
            console.warn(audioFile)
            setAudioPath(audioFile);
            uploadAudioFinal(audioFile);
            submitSurvey(audioFile);
        } catch (error) {
            console.log(error);
        }
    };

    const uploadAudioFinal = async (file) => {
        setAudioUploading(true);
        let API_UPLOAD_MSG_FILE = `https://createdinam.in/SURVEY-3/public/api/survey-audio-files`;
        const path = `file://${file}`;
        const formData = new FormData();
        formData.append('survey_token', name);
        formData.append('sec_no', 'E');
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

    const Validate = () => {
        if (PensionAwareness === null) {
            showMessage({
                message: "Please Select APY Awareness",
                description: "Please Select APY Awareness!",
                type: "danger",
            });
        }
        else if (PensionEnrolled === null) {
            showMessage({
                message: "Please Select APY Enerolled!",
                description: "Please Select APY Enerolled!",
                type: "danger",
            });
        }
        else if (PensionSubscription === null) {
            showMessage({
                message: "Please Select APY Subscription Payment!",
                description: "Please Select APY Subscription Payment!",
                type: "danger",
            });
        }
        else if (PensionAccount === null) {
            showMessage({
                message: "Please Select Inactive Reason",
                description: "Please Select Inactive Reason!",
                type: "danger",
            });
        }
        else if (SchemesAwareness === null) {
            showMessage({
                message: "Please Select Any Other Scheme",
                description: "Please Select Any Other Scheme!",
                type: "danger",
            });
        }
        else if (SchemesEnrolled === null) {
            showMessage({
                message: "Please Select Scheme Enrolled",
                description: "Please Select Scheme Enrolled!",
                type: "danger",
            });
        }
        else if (SchemesSubscription === null) {
            showMessage({
                message: "Please Select Payment Intimation",
                description: "Please Select Payment Intimation!",
                type: "danger",
            });
        }
        else if (SchemesAccount === null) {
            showMessage({
                message: "Please Select A/C Inactive Subs",
                description: "Please Select A/C Inactive Subs!",
                type: "danger",
            });
        }
        else if ((PensionEnrolled?.label === "Yes" || SchemesEnrolled?.label === "Yes") && selectedReason?.length === 0) {
            showMessage({
                message: "Please Select Reason",
                description: "Please Select Reason!",
                type: "danger",
            });
        }
        else {
            stopRecording();
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
            "section_no": "E",
            "data": [
                {
                    'section_no': "E",
                    'q_no': "30",
                    'q_type': "CHILD",
                    'sub_q_no': "a",
                    'sub_q_title': "Atal Pension Yojana (APY)",
                    'sub_q_type': "SINGLECHECK",
                    'response1': `${PensionAwareness?.label}`,
                    'response2': `${PensionEnrolled?.label}`,
                    'response3': `${PensionSubscription?.label}`,
                    'response4': `${PensionAccount?.label}`,
                    'response': ``
                },
                {
                    'section_no': "E",
                    'q_no': "30",
                    'q_type': "CHILD",
                    'sub_q_no': "b",
                    'sub_q_title': "Any other Pension Schemes?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': `${SchemesAwareness?.label}`,
                    'response2': `${SchemesEnrolled?.label}`,
                    'response3': `${SchemesSubscription?.label}`,
                    'response4': `${SchemesAccount?.label}`,
                    'response': ``
                },
                {
                    'section_no': "E",
                    'q_no': "31",
                    'q_type': "MULTI",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'response': selectedReason?.length === 0 ? [] : selectedReason
                },
            ],
        });

        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://createdinam.in/SURVEY-3/public/api/create-survey-section-e", requestOptions)
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
    }

    const saveSurveryAndMoveToNext = async () => {
        setSubmitSurvey(false);
        AsyncStorage.setItem(AsyncStorageContaints.surveyNextBlock, 'F');
        navigation.replace('BlockFSurveyScreen');
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
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>E. ACCESS and USAGE OF FINANCIAL SERVICES – PENSION FACILITIES</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Specific Pension Facility/Scheme</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>30 (a). Atal Pension Yojana (APY)</Text>
                            <Text>30 (a) 1. Awareness</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setPensionAwareness(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text>30 (a) 2. Enrolled</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setPensionEnrolled(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text>30 (a) 3. Received intimation of subscription payment</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setPensionSubscription(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text>30 (a) 4. Account is inactive due to non-payment of subscription.</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setPensionAccount(e)}
                            />
                            <View style={{ padding: 10, }} />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>30 (b).  Any other Pension Schemes?</Text>
                            <Text>30 (b) 1. Awareness</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSchemesAwareness(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text>30 (b) 2. Enrolled</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSchemesEnrolled(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text>30 (b) 3. Received intimation of subscription payment</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSchemesSubscription(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text>30 (b) 4. {PensionEnrolled?.label} {PensionAwareness?.label} Account is inactive due to non-payment of subscription.</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSchemesAccount(e)}
                            />
                            <View style={{ padding: 10, }} />
                        </View>

                        {(PensionEnrolled?.label === "Yes" || SchemesEnrolled?.label === "Yes") &&
                            <View>
                                <View style={{ padding: 10, }} />
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>31. If you are not enrolled in any of pension schemes, please indicate the reasons?</Text>
                                    <MultiSelect
                                        hideTags
                                        items={reason}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedReason(items)
                                        }
                                        selectedItems={selectedReason}
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
                                </View>
                            </View>
                        }

                        <View style={{ padding: 10, }} />
                        <TouchableOpacity disabled={isSubmitSurvey} onPress={() => {
                            //  navigation.replace('BlockFSurveyScreen');
                            Validate()
                        }} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            {isSubmitSurvey === true ? <ActivityIndicator style={{ alignItems: 'center' }} color={'#fff'} /> : <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Next Block F</Text>}
                        </TouchableOpacity>
                    </View>
                </ScrollView> : <ActivityIndicator style={{ alignItems: 'center', marginTop: Dimensions.get('screen').width }} color={'#000'} />}
        </SafeAreaView >
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

export default BlockESurveyScreen;