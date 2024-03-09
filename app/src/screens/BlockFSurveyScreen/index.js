import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, ActivityIndicator, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import React, { Component, useCallback, useState } from 'react'
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

const BlockFSurveyScreen = () => {

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
    // country dropdowns
    const [value, setValue] = React.useState(null);
    const [selectedState, setSelectedState] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);
    const [isAudioUploading, setAudioUploading] = React.useState(false);

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
    const [selectedSatisfiedReasons, setSatisfiedReasons] = React.useState([]);
    const [selectedOccupations, setSelectedOccupations] = React.useState([]);
    const [selectedReason, setSelectedReason] = React.useState([]);
    const [selectedIncomes, setSelectedIncomes] = React.useState([]);
    const [financialliteracyReason, setfinancialliteracyReason] = React.useState([]);
    const [differentlyAble, setDifferently] = React.useState('');
    const [smartPhone, setSmartphone] = React.useState('');
    const [anyGroup, setAnyGroup] = React.useState('');
    const [serviceContinue, setServiceContinue] = React.useState(null);
    const [moneyRecover, setMoneyRecover] = React.useState(null);
    const [preacution, setPreacution] = React.useState(null);
    const [satisfy, setsatisfy] = React.useState(null);
    const [attentive, sattentive] = React.useState(null);
    const [lodgeComplaint, sLodgeComplaint] = React.useState(null);
    const [complaintSatisfy, setComplaintSatisfy] = React.useState(null);
    const [noReason, setNoReason] = React.useState(null);
    const [compProcess, setCompProcess] = React.useState(null);
    const [offerPdt, setofferPdt] = React.useState(null);
    const [queryRespond, setQueryRespond] = React.useState(null)
    const [compBC, sCompBC] = useState(null)
    const [reasonprovidedBC, setReasonprovidedBC] = React.useState(null);
    const [reasonprovidedBCFocus, setReasonprovidedBCFocus] = React.useState(null);
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
            label: 'Yes',
            index: 1
        },
        {
            label: 'No',
            index: 2
        },
        {
            label: 'Can’t say/ Never approached',
            index: 3
        },
        {
            label: 'NA (do not use agent point)',
            index: 4
        }
    ];

    const possessnecessary = [
        { id: 1, lable: 'Yes, I know it all ' },
        { id: 2, lable: 'Yes, but I want to know more' },
        { id: 3, lable: 'No, I want to know' },
    ];

    const languagewhich = [
        { id: 1, lable: 'Hindi' },
        { id: 2, lable: 'English' },
        { id: 3, lable: 'Local Language/Dialect' },
    ];

    const informationsharing = [
        { id: 1, lable: ' Pamphlets/ Brochures/ Public Hoardings' },
        { id: 2, lable: 'Newspaper Advertisements' },
        { id: 3, lable: 'Television/Radio Advertisements' },
        { id: 4, lable: 'School Syllabus' },
        { id: 5, lable: 'Email/SMS' },
        { id: 6, lable: 'Small Group Meetings' },
        { id: 7, lable: 'Visit Designated Centers' },
    ]

    const financialliteracy = [
        { id: 1, lable: 'At the Designated Centre (bank Branches/BC Point etc.' },
        { id: 2, lable: 'At Schools/Colleges' },
        { id: 3, lable: 'At Anganwadi Kendra' },
        { id: 4, lable: 'At Village Panchayat' },
        { id: 5, lable: 'At Bus Stands/ Railway Stations' },
        { id: 6, lable: 'At Public Events/ Mela, etc.' },
        { id: 7, lable: 'At Market Places' },
    ]

    const Informationrelating = [
        { id: 1, lable: 'Savings/Deposit' },
        { id: 2, lable: 'Remittances/ Fund Transfer' },
        { id: 3, lable: 'Credit (Loans)' },
        { id: 4, lable: 'Investments (MF, etc.)' },
        { id: 5, lable: 'Insurance (Life & Non-Life)' },
        { id: 6, lable: 'Pension' },
        { id: 7, lable: 'Grievance Redressal' },
    ]

    const financialtransactions = [
        { id: 1, lable: 'Misuse of Documents (ID, Address, etc.)' },
        { id: 2, lable: 'Breach of PIN, OTP, or Passwords' },
        { id: 3, lable: 'Unauthorized withdrawals from the Account ' },
        { id: 4, lable: 'Inability to distinguish between phone calls made by bank officials and fraudsters' },
        { id: 5, lable: 'Charges levied by banks/BCs' },
        { id: 6, lable: 'Trust on Business Correspondents' },
        { id: 7, lable: 'Failure of banks' },
    ]

    const financialchallengingdifficult = [
        { id: 1, lable: 'Lodge complaints against financial service providers – banks/NBFCs/Insurance Co, etc' },
        { id: 2, lable: 'Follow up on the time-bound disposal of complaints' },
        { id: 3, lable: ' Queues/wait time at financial service providers' },
        { id: 4, lable: 'Clash of branch’s working timings with my work/business timings' },
        { id: 5, lable: 'Arranging the documentation requirements' },
        { id: 6, lable: 'Language barrier in digital transactions' },
        { id: 7, lable: 'Complex Interface for online services' },
        { id: 8, lable: 'Dependence on smartphone and internet connection' },
    ]

    const transactionsdigitally = [
        { id: 1, lable: 'Poor connectivity' },
        { id: 2, lable: 'Language barrier' },
        { id: 3, lable: 'Complex interface' },
        { id: 4, lable: 'No trust in Digital Platforms' },
    ]

    const digitalChannel = [
        { id: 1, lable: 'Money transfer' },
        { id: 2, lable: 'Bill Payment' },
        { id: 3, lable: 'Balance Enquiry/Statement' },
        { id: 4, lable: 'Merchant Payment' },
        { id: 5, lable: 'None' },
    ]

    const Digitalpreferred = [
        { id: 1, lable: 'UPI through Mobile App' },
        { id: 2, lable: 'Debit Card' },
        { id: 3, lable: 'Pre-paid Card' },
        { id: 4, lable: 'Mobile Wallets' },
    ]

    const lodgedcomplaintreasons = [
        { id: 1, lable: 'Not Resolved' },
        { id: 2, lable: 'Delayed Response ' },
        { id: 3, lable: 'Complaint not taken' },
        { id: 4, lable: 'Any other' },
    ]

    const bankingtransactionsresponse = [
        { id: 1, lable: 'Don’t trust' },
        { id: 2, lable: 'Fear of data breaches' },
        { id: 3, lable: 'Extra charges' },
        { id: 4, lable: 'Long Queues' },
        { id: 5, lable: 'Bad behaviour' },
    ]

    const addressedtimely = [
        { id: 1, lable: 'BC did not know what to do' },
        { id: 2, lable: 'Still pending with bank officials' },
        { id: 3, lable: 'Unaware of the progress in the case' },
        { id: 4, lable: 'Complaint was dismissed by bank official due to lack of information' },
        { id: 5, lable: 'Received response after one month' },
    ]

    const Selectedfinancialtransactions = [
        { id: 1, lable: 'Lodge complaints against financial service providers – banks/NBFCs/Insurance Co, etc.' },
        { id: 2, lable: 'Follow up on the time-bound disposal of complaints' },
        { id: 3, lable: 'Queues/wait time at financial service providers' },
        { id: 4, lable: 'Clash of branch’s working timings with my work/business timings' },
        { id: 5, lable: 'Arranging the documentation requirements' },
        { id: 6, lable: 'Language barrier in digital transactions' },
        { id: 7, lable: 'Complex Interface for online services' },
        { id: 8, lable: 'Dependence on smartphone and internet connection' },
    ]

    const adults = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const childern = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    const multiSelectRef = React.useRef(null);
    const multifinancialSelectRef = React.useRef(null);
    const [informationValue, setinformationValue] = React.useState(null);
    const [WhichLanguageValue, setWhichLanguageValue] = React.useState(null);
    const [InformationSharingValue, setInformationSharingValue] = React.useState([]);
    const [financialLiteracyValue, setfinancialLiteracyValue] = React.useState(null);
    const [InformationRelatingValue, setInformationRelatingValue] = React.useState([]);
    const [selectedFreeRefuseReason, selectedFreeLoanRefuseReason] = React.useState([]);
    const [hinderanceValue, sethinderanceValue] = React.useState(null);
    const [hinderanceFocus, sethinderanceFocus] = React.useState(false);

    // financial
    const [SpecificInformation, setSpecificInformation] = React.useState(null);
    const [comfortableConducting, setComfortableConducting] = React.useState(null);
    const [grievanceRelated, setGrievanceRelated] = React.useState(null);
    const [selectedfinancial, setSelectedFinancial] = React.useState([]);
    const [digitalChannelChange, ondigitalChannelChange] = React.useState([]);
    const [DigitalpreferredChange, onDigitalpreferredChange] = React.useState([]);

    const [comfortTransaction, sComfortTransaction] = React.useState(null);
    const [transactionHelp, stransactionHelp] = React.useState(null);
    const [isHinderance, setIsHinderance] = React.useState(null);
    const [payFraud, sPayFraud] = React.useState(null);
    const [rbiScheme, sRbiScheme] = React.useState(null);
    const [charges, sCharges] = React.useState(null);
    const [isgrievanceAddressed, sIsGrievanceAddressed] = React.useState(null);

    const [Lattitude, setLattitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');


    const SelectedLoanTypeLabels = selectedOccupations.map((selectedId) => {
        const selectedReason = financialtransactions.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedfinancialLabels = selectedfinancial.map((selectedId) => {
        const selectedReason = Selectedfinancialtransactions.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelecteddigitalChannelLabels = digitalChannelChange.map((selectedId) => {
        const selectedReason = digitalChannel.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedSatisfiedReasonsLabels = selectedSatisfiedReasons.map((selectedId) => {
        const selectedReason = lodgedcomplaintreasons.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedDigitalpreferredLabels = DigitalpreferredChange.map((selectedId) => {
        const selectedReason = Digitalpreferred.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedReasonlabels = selectedReason.map((selectedId) => {
        const selectedReason = transactionsdigitally.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedAreas(selectedItems);
    }

    const onSelectedSatisfiedReasons = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select three valid reason.');
            return
        }
        else if (selectedItems.length > 3) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 3 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setSatisfiedReasons(selectedItems);
    }

    const onSelectedOccupationsChange = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select three valid reason.');
            return
        }
        else if (selectedItems.length > 3) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 3 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setSelectedOccupations(selectedItems);
    }

    const onSelectedfinancialChange = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select three valid reason.');
            return
        }
        else if (selectedItems.length > 3) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 3 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setSelectedFinancial(selectedItems);
    }

    const onSelectedReasonChange = (selectedItems) => {
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

    const onSelectedReason = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select two valid reason.');
            return
        }
        else if (selectedItems.length > 3) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 3 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setfinancialliteracyReason(selectedItems);
    }

    const SelectedReasonTypeLabels = financialliteracyReason.map((selectedId) => {
        const selectedReason = financialliteracy.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });


    const onSelectedReasonForInformation = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select three valid reason.');
            return
        }
        else if (selectedItems.length > 3) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 3 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setInformationSharingValue(selectedItems);
    }
    const onDigitalpreferredChangeFunc = (selectedItems) => {
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
        onDigitalpreferredChange(selectedItems);
    }

    const ondigitalChannelChangefunc = (selectedItems) => {
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
        ondigitalChannelChange(selectedItems);
    }


    const SelectedresonForInformationeLabels = InformationSharingValue.map((selectedId) => {
        const selectedReason = informationsharing.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const onSelectedReasonInfoRelating = (selectedItems) => {
        if (selectedItems.length === 0) {
            Alert.alert('Selection Required', 'Please select three valid reason.');
            return
        }
        else if (selectedItems.length > 3) {
            Alert.alert('Limit Exceeded', 'You cannot select more than 3 reasons.', [
                { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
            ]);
            return
        }
        setInformationRelatingValue(selectedItems);
    }
    const onSelectedReasonInfoRelatingLabels = InformationRelatingValue.map((selectedId) => {
        const selectedReason = Informationrelating.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

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
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Active Survey Token - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>Block F</Text> </Text>}
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
        let API_UPLOAD_MSG_FILE = `https://scslsurvey.online/DICGCA-SURVEY/public/api/survey-audio-files`;
        const path = `file://${file}`;
        const formData = new FormData();
        formData.append('survey_token', name);
        formData.append('sec_no', 'F');
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
        if (SpecificInformation === null) {
            showMessage({
                message: "Please Select Specific Information",
                description: "Please Select Specific Information!",
                type: "danger",
            });
        }
        else if (SpecificInformation?.label === "No" && informationValue === null) {
            showMessage({
                message: "Please Select Necesssary Information",
                description: "Please Select Necesssary Information!",
                type: "danger",
            });
        }
        else if (SpecificInformation?.label === 'Yes' && WhichLanguageValue === null) {
            showMessage({
                message: "Please Select Language Information",
                description: "Please Select Language Information!",
                type: "danger",
            });
        }
        else if (SpecificInformation?.label === 'Yes' && InformationSharingValue?.length === 0) {
            showMessage({
                message: "Please Select Information Sharing",
                description: "Please Select Information Sharing!",
                type: "danger",
            });
        }
        else if (SpecificInformation?.label === 'Yes' && financialLiteracyValue?.length === 0) {
            showMessage({
                message: "Please Select Financial Literacy",
                description: "Please Select Financial Literacy!",
                type: "danger",
            });
        }
        else if (SpecificInformation?.label === 'Yes' && InformationRelatingValue?.length === 0) {
            showMessage({
                message: "Please Select Information Relating",
                description: "Please Select Information Relating!",
                type: "danger",
            });
        }
        else if (SelectedLoanTypeLabels?.length === 0) {
            showMessage({
                message: "Please Select Financial Transactions",
                description: "Please Select Financial Transactions!",
                type: "danger",
            });
        }
        else if (selectedfinancial?.length === 0) {
            showMessage({
                message: "Please Select Challenging  Financial Transactions",
                description: "Please Select Challenging Financial Transactions!",
                type: "danger",
            });
        }
        else if (comfortTransaction === null) {
            showMessage({
                message: "Please Select Digital Transaction",
                description: "Please Select Digital Transaction!",
                type: "danger",
            });
        }
        else if (transactionHelp === null) {
            showMessage({
                message: "Please Select Digital Transaction",
                description: "Please Select Digital Transaction!",
                type: "danger",
            });
        }
        else if (isHinderance === null) {
            showMessage({
                message: "Please Select Hinderance",
                description: "Please Select Hinderance!",
                type: "danger",
            });
        }
        else if (isHinderance.label === 'Yes' && selectedReason?.length === 0) {
            showMessage({
                message: "Please Select Hinderance Reasons",
                description: "Please Select Hinderance Reasons!",
                type: "danger",
            });
        }
        else if (isHinderance.label === 'No' && payFraud === null) {
            showMessage({
                message: "Please Select Payment Fraud",
                description: "Please Select Payment Fraud!",
                type: "danger",
            });
        }
        else if (payFraud?.label === "Yes" && serviceContinue === null) {
            showMessage({
                message: "Please Select Service Continuity",
                description: "Please Select Service Continuity!",
                type: "danger",
            });
        }
        else if (payFraud?.label === "Yes" && moneyRecover === null) {
            showMessage({
                message: "Please Select Recovery Of Money",
                description: "Please Select Recovery Of Money!",
                type: "danger",
            });
        }
        else if (preacution === null) {
            showMessage({
                message: "Please Select Precautions",
                description: "Please Select Precautions!",
                type: "danger",
            });
        }

        else if (SelecteddigitalChannelLabels?.length === 0) {
            showMessage({
                message: "Please Select Digital Channel",
                description: "Please Select Digital Channel!",
                type: "danger",
            });
        }
        else if (SelectedDigitalpreferredLabels?.length === 0) {
            showMessage({
                message: "Please Select Digital Preferred",
                description: "Please Select Digital Preferred!",
                type: "danger",
            });
        }
        else if (satisfy === null) {
            showMessage({
                message: "Please Select Service Satisfaction",
                description: "Please Select Service Satisfaction!",
                type: "danger",
            });
        }
        else if (attentive === null) {
            showMessage({
                message: "Please Select Attentive",
                description: "Please Select Attentive!",
                type: "danger",
            });
        }
        else if (lodgeComplaint === null) {
            showMessage({
                message: "Please Select Complaint",
                description: "Please Select Complaint!",
                type: "danger",
            });
        }
        else if (lodgeComplaint?.label === "Yes" && complaintSatisfy === null) {
            showMessage({
                message: "Please Select Complaint Satisfaction",
                description: "Please Select Complaint Satisfaction!",
                type: "danger",
            });
        }
        else if (lodgeComplaint?.label === "Yes" && selectedSatisfiedReasons === null) {
            showMessage({
                message: "Please Select Reason For NotSatisfactory",
                description: "Please Select Reason For NotSatisfactory!",
                type: "danger",
            });
        }
        else if (rbiScheme === null) {
            showMessage({
                message: "Please Select RBI Scheme",
                description: "Please Select RBI Scheme!",
                type: "danger",
            });
        }
        else if (compProcess === null) {
            showMessage({
                message: "Please Select Complaint Process",
                description: "Please Select Complaint Process!",
                type: "danger",
            });
        }
        else if (comfortableConducting === null) {
            showMessage({
                message: "Please Select Customer Service Quality",
                description: "Please Select Customer Service Quality!",
                type: "danger",
            });
        }
        else if (comfortableConducting?.label === 'No' && value === null) {
            showMessage({
                message: "Please Indicate Reason",
                description: "Please Indicate Reason!",
                type: "danger",
            });
        }
        else if (offerPdt === null) {
            showMessage({
                message: "Please Select BC Agent Capability",
                description: "Please Select BC Agent Capability!",
                type: "danger",
            });
        }
        else if (queryRespond === null) {
            showMessage({
                message: "Please Select Query Respond",
                description: "Please Select  Query Respond!",
                type: "danger",
            });
        }
        else if (charges === null) {
            showMessage({
                message: "Please Select Charges",
                description: "Please Select Charges!",
                type: "danger",
            });
        }
        else if (compBC === null) {
            showMessage({
                message: "Please Select Complaint Lodge",
                description: "Please Select Complaint Lodge!",
                type: "danger",
            });
        }
        else if (grievanceRelated === null) {
            showMessage({
                message: "Please Select Grievance Raised",
                description: "Please Select Grievance Raised!",
                type: "danger",
            });
        }


        else if (grievanceRelated?.label === 'Yes' && isgrievanceAddressed === null) {
            showMessage({
                message: "Please Select Grievance Addressed ",
                description: "Please Select Grievance Addressed!",
                type: "danger",
            });
        }
        else if (grievanceRelated?.label === 'No' && reasonprovidedBC === null) {
            showMessage({
                message: "Please Select Reason By BC Agent",
                description: "Please Select Reason By BC Agent!",
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
            "section_no": "F",
            "data": [
                {
                    'section_no': "F",
                    'q_no': "32",
                    'q_type': "SELF",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'response1': ``,
                    'response': `${SpecificInformation?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "33",
                    'q_type': "SELF",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'response1': ``,
                    'response': informationValue === null ? "" : `${informationValue}`
                },
                {
                    'section_no': "F",
                    'q_no': "34",
                    'q_type': "CHILD",
                    'sub_q_no': "a",
                    'sub_q_title': "In which language do you need the information?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${WhichLanguageValue}`
                },
                {
                    'section_no': "F",
                    'q_no': "34",
                    'q_type': "CHILD",
                    'sub_q_no': "b",
                    'sub_q_title': "Which medium of information sharing do you prefer?",
                    'sub_q_type': "MULTICHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': InformationSharingValue.length === 0 ? [] : InformationSharingValue
                },
                {
                    'section_no': "F",
                    'q_no': "34",
                    'q_type': "CHILD",
                    'sub_q_no': "c",
                    'sub_q_title': "Where do you want such financial literacy information to be disseminated?",
                    'sub_q_type': "MULTICHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': financialliteracyReason.length === 0 ? [] : financialliteracyReason
                },
                {
                    'section_no': "F",
                    'q_no': "34",
                    'q_type': "CHILD",
                    'sub_q_no': "d",
                    'sub_q_title': "Information relating to which function is easy to obtain and understand?",
                    'sub_q_type': "MULTICHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': InformationRelatingValue.length === 0 ? [] : InformationRelatingValue
                },
                {
                    'section_no': "F",
                    'q_no': "35",
                    'q_type': "MULTI",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': selectedOccupations.length === 0 ? "" : selectedOccupations
                },
                {
                    'section_no': "F",
                    'q_no': "36",
                    'q_type': "MULTI",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': selectedfinancial.length === 0 ? "" : selectedfinancial
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "a",
                    'sub_q_title': "Do you feel confident and comfortable doing digital transactions on your own?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${comfortTransaction?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "b",
                    'sub_q_title': "do you carry out digital transactions on your own? transactions with someone’s help?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${transactionHelp?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "c",
                    'sub_q_title': "Do you face any hinderance in carrying out transactions digitally?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${isHinderance?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "d",
                    'sub_q_title': "If yes, please indicate top two reasons?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': selectedReason.length === 0 ? "" : selectedReason
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "e",
                    'sub_q_title': "Have you or anyone in your family lost money in digital payment fraud?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${payFraud?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "f",
                    'sub_q_title': "After the incident, do you continue to use digital banking services?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${serviceContinue?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "g",
                    'sub_q_title': "Were you or your family member could recover the money lost in digital payment fraud?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${moneyRecover?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "37",
                    'q_type': "CHILD",
                    'sub_q_no': "h",
                    'sub_q_title': "Do you know about various precautions while using digital banking?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${preacution?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "38",
                    'q_type': "CHILD",
                    'sub_q_no': "a",
                    'sub_q_title': "Do you use any of the following services via a digital channel (app/internet) linked with this account?",
                    'sub_q_type': "MULTICHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': digitalChannelChange.length === 0 ? "" : digitalChannelChange
                },
                {
                    'section_no': "F",
                    'q_no': "38",
                    'q_type': "CHILD",
                    'sub_q_no': "b",
                    'sub_q_title': "If Digital is your preferred mode of transaction, rate them in your order of preference?",
                    'sub_q_type': "MULTICHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': DigitalpreferredChange.length === 0 ? "" : DigitalpreferredChange
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "a",
                    'sub_q_title': "As a bank customer, are you satisfied with the services?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${satisfy?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "b",
                    'sub_q_title': "Do bank staff remain attentive and sensitive to your problems?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${attentive?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "c",
                    'sub_q_title': "If you have any complaints, do you know how to lodge a complaint?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${lodgeComplaint?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "d",
                    'sub_q_title': "If you have ever lodged a complaint, are you satisfied with its resolution?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': `${complaintSatisfy?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "e",
                    'sub_q_title': "If no, what could be the reasons?",
                    'sub_q_type': "MULTICHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': selectedSatisfiedReasons.length === 0 ? "" : selectedSatisfiedReasons
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "f",
                    'sub_q_title': "Do you know about the RBI Integrated Banking Ombudsman Scheme?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': rbiScheme === null ? "" : `${rbiScheme?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "39",
                    'q_type': "CHILD",
                    'sub_q_no': "g",
                    'sub_q_title': "Do you know about the complaint process regarding others such as Insurance, Pension, etc.?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': compProcess === null ? "" : `${compProcess?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "a",
                    'sub_q_title': "Do you feel comfortable conducting banking transactions at an agent point (BC/BC Outlet) ?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': comfortableConducting === null ? "" : `${comfortableConducting?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "b",
                    'sub_q_title': "is ‘No’, please indicate the reasons?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': value === null ? "" : `${value}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "c",
                    'sub_q_title': "Is the BC agent able to offer the product or service that you require?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': offerPdt === null ? "" : `${offerPdt}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "d",
                    'sub_q_title': "Does the BC agent satisfactorily respond to your queries?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': queryRespond === null ? "" : `${queryRespond}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "e",
                    'sub_q_title': "Does your BC indicate the charges for the services offered upfront?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': charges === null ? "" : `${charges}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "f",
                    'sub_q_title': "Do you know, how to lodge a complaint at the BC point?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': compBC === null ? "" : `${compBC}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "g",
                    'sub_q_title': "Whether you raised any grievance related to service with BC?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': grievanceRelated === null ? "" : `${grievanceRelated?.label}`,
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "h",
                    'sub_q_title': " whether your grievance was addressed timely (within one month)?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': isgrievanceAddressed === null ? "" : `${isgrievanceAddressed?.label}`
                },
                {
                    'section_no': "F",
                    'q_no': "40",
                    'q_type': "CHILD",
                    'sub_q_no': "i",
                    'sub_q_title': "what were reasons provided by BC Agent?",
                    'sub_q_type': "SINGLECHECK",
                    'response1': ``,
                    'response2': ``,
                    'response3': ``,
                    'response4': ``,
                    'response': reasonprovidedBC === null ? "" : `${reasonprovidedBC}`
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

        fetch("https://scslsurvey.online/DICGCA-SURVEY/public/api/create-survey-section-f", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("resulyyyy", result)
                if (result?.status === true) {
                    showMessage({
                        message: result.message,
                        description: result.message,
                        type: "success",
                    });
                    finishSurvey();
                } else {
                    setSubmitSurvey(false);
                    showMessage({
                        message: "Something went wrong!",
                        description: result.message,
                        type: "danger",
                    });
                }
            })
            .catch(error => {
                setSubmitSurvey(false);
                console.log('error', error);
            });
    }

    const finishSurvey = async () => {
        const userId = await AsyncStorage.getItem(AsyncStorageContaints.tempServerTokenId);
        let SERVER = 'https://scslsurvey.online/DICGCA-SURVEY/public/api/finish-survey';
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + userSendToken);
        var formdata = new FormData();
        formdata.append("surveytoken", name);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow',
        };

        fetch(SERVER, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('finishSurvey', result)
                if (result?.status === true) {
                    saveSurveryAndMoveToNext();
                } else {
                    // navigation.replace('BlockBSurveyScreen');
                    showMessage({
                        message: "Something went wrong!",
                        description: result?.message,
                        type: "danger",
                    });
                }
            });
    }

    const saveSurveryAndMoveToNext = async () => {
        AsyncStorage.setItem(AsyncStorageContaints.surveyNextBlock, '');
        navigation.replace('DashboardScreen');
        setSubmitSurvey(true);
        saveSurveyCount();
    }

    const saveSurveyCount = async () => {
        try {
            const value = await AsyncStorage.getItem(AsyncStorageContaints.surveyCompleteCount);
            if (value !== null) {
                console.log('saveSurveyCountX', value);
                let counterPlus = Number(value) + 1;
                storeData(counterPlus)
            } else {
                console.log('saveSurveyCountY', value);
                storeData(1)
            }
        } catch (e) {
            console.log('saveSurveyCountZ', e);
        }
    }

    const storeData = async (counter) => {
        try {
            await AsyncStorage.setItem(AsyncStorageContaints.surveyCompleteCount, counter.toString())
        } catch (e) {
            console.log('saveSurveyCountXYZ', e);
        }
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
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>F. QUALITY OF FINANCIAL SERVICES – FINANCIAL LITERACY, CUSTOMER SERVICE AND GRIEVANCE REDRESSAL</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>32. Do you require specific information and better awareness about your savings, remittances, credit, investments, insurance, pension, digital banking, etc.?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setSpecificInformation(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        {SpecificInformation?.label === "No" &&
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>33. If no, do you possess all the necessary information for your financial well-being?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={possessnecessary}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Necessary information' : informationValue}
                                    // searchPlaceholder="Search..."
                                    value={informationValue}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setinformationValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                            </View>

                        }


                        <View style={{ padding: 10, }} />
                        {SpecificInformation?.label === 'Yes' ?
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (a). In which language do you need the information?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={languagewhich}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Language information' : WhichLanguageValue}
                                    // searchPlaceholder="Search..."
                                    value={WhichLanguageValue}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setWhichLanguageValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                />
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (b). Which medium of information sharing do you prefer?</Text>
                                {/* <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={informationsharing}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select information sharing' : InformationSharingValue}
                                    // searchPlaceholder="Search..."
                                    value={InformationSharingValue}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setInformationSharingValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                /> */}
                                <MultiSelect
                                    hideTags
                                    items={informationsharing}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedReasonForInformation(items)
                                    }
                                    selectedItems={InformationSharingValue}
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
                                    {SelectedresonForInformationeLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>



                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (c). Where do you want such financial literacy information to be disseminated?</Text>
                                <MultiSelect
                                    hideTags
                                    items={financialliteracy}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedReason(items)
                                    }
                                    selectedItems={financialliteracyReason}
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

                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>34 (d). Information relating to which function is easy to obtain and understand?</Text>

                                <MultiSelect
                                    hideTags
                                    items={Informationrelating}
                                    uniqueKey="id"
                                    ref={multiSelectRef}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedReasonInfoRelating(items)
                                    }
                                    selectedItems={InformationRelatingValue}
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
                                    {onSelectedReasonInfoRelatingLabels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ padding: 10, }} />
                            </View> : null}
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>35. Regarding your financial transactions, select the top three aspects which make you worry.</Text>
                            <MultiSelect
                                hideTags
                                items={financialtransactions}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedOccupationsChange(items)
                                }
                                selectedItems={selectedOccupations}
                                selectText="Select financial transactions"
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
                                {SelectedLoanTypeLabels.map((label, index) => (
                                    <View style={{ margin: 5 }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>36. In relation to your financial transactions, which of the following is challenging/difficult for you to handle?</Text>
                            <MultiSelect
                                hideTags
                                items={Selectedfinancialtransactions}
                                uniqueKey="id"
                                ref={multifinancialSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onSelectedfinancialChange(items)
                                }
                                selectedItems={selectedfinancial}
                                selectText="Select financial transactions"
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
                                {SelectedfinancialLabels.map((label, index) => (
                                    <View style={{ margin: 5 }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37. Digital Transaction</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (a). Do you feel confident and comfortable doing digital transactions on your own?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => sComfortTransaction(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (b).If no, do you carry out digital transactions with someone’s help?</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => stransactionHelp(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <View>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (c).Do you face any hinderance in carrying out transactions digitally?</Text>
                                <RadioButtonRN
                                    data={data}
                                    selectedBtn={(e) => setIsHinderance(e)}
                                />
                            </View>
                            {isHinderance?.label === 'Yes' ?
                                <View>
                                    <View style={{ padding: 10, }} />
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (d). If yes, please indicate top two reasons?</Text>
                                    <MultiSelect
                                        hideTags
                                        items={transactionsdigitally}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedReasonChange(items)
                                        }
                                        selectedItems={selectedReason}
                                        selectText="Select financial transactions"
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
                                        {SelectedReasonlabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View> :
                                <View>
                                    <View style={{ padding: 10, }} />
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (e). Have you or anyone in your family lost money in digital payment fraud?</Text>
                                    <RadioButtonRN
                                        data={data}
                                        selectedBtn={(e) => sPayFraud(e)}
                                    />
                                </View>}
                        </View>
                        {payFraud?.label === "Yes" && <View>
                            {/* <View style={{ padding: 10, }} /> */}
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>37 (f). After the incident, do you continue to use digital banking services?</Text>
                                <RadioButtonRN
                                    data={smartphone}
                                    selectedBtn={(e) => setServiceContinue(e)}
                                />
                            </View>
                            {/* <View style={{ padding: 10, }} /> */}
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>37 (g). Were you or your family member could recover the money lost in digital payment fraud?</Text>
                                <RadioButtonRN
                                    data={smartphone}
                                    selectedBtn={(e) => setMoneyRecover(e)}
                                />
                            </View>
                        </View>}

                        {/* <View style={{ padding: 10, }} /> */}
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>

                            <View style={{ padding: 10, }} />
                            <Text style={{ fontWeight: 'bold' }}>37 (h). Do you know about various precautions while using digital banking?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setPreacution(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ fontWeight: 'bold' }}>38. Usage of Digital Medium for Transaction</Text>
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1, marginBottom: 5 }}>38 (a). Do you use any of the following services via a digital channel (app/internet) linked with this account?</Text>
                            <MultiSelect
                                hideTags
                                items={digitalChannel}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    ondigitalChannelChangefunc(items)
                                }
                                selectedItems={digitalChannelChange}
                                selectText="Select digital channel"
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
                                {SelecteddigitalChannelLabels.map((label, index) => (
                                    <View style={{ margin: 5 }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>38 (b). If Digital is your preferred mode of transaction, rate them in your order of preference?</Text>
                            <MultiSelect
                                hideTags
                                items={Digitalpreferred}
                                uniqueKey="id"
                                ref={multiSelectRef}
                                onSelectedItemsChange={(items) =>
                                    onDigitalpreferredChangeFunc(items)
                                }
                                selectedItems={DigitalpreferredChange}
                                selectText="Select Digital preferred"
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
                                {SelectedDigitalpreferredLabels.map((label, index) => (
                                    <View style={{ margin: 5 }}>
                                        <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39. Customer Service and Complaints</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (a). As a bank customer, are you satisfied with the services?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setsatisfy(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (b). Do bank staff remain attentive and sensitive to your problems?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => sattentive(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (c). If you have any complaints, do you know how to lodge a complaint?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => sLodgeComplaint(e)}
                            />
                            {lodgeComplaint?.label === "Yes" && <View>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (d). If you have ever lodged a complaint, are you satisfied with its resolution?</Text>
                                <RadioButtonRN
                                    data={smartphone}
                                    selectedBtn={(e) => setComplaintSatisfy(e)}
                                />
                                {complaintSatisfy?.label === "No" &&
                                    <View>
                                        <View style={{ padding: 10, }} />
                                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (e). If no, what could be the reasons?</Text>
                                        <MultiSelect
                                            hideTags
                                            items={lodgedcomplaintreasons}
                                            uniqueKey="id"
                                            ref={multiSelectRef}
                                            onSelectedItemsChange={(items) =>
                                                onSelectedSatisfiedReasons(items)
                                            }
                                            selectedItems={selectedSatisfiedReasons}
                                            selectText="Select Satisfied Reasons"
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
                                            {SelectedSatisfiedReasonsLabels.map((label, index) => (
                                                <View style={{ margin: 5 }}>
                                                    <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>}
                            </View>}
                            <View>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (f). Do you know about the RBI Integrated Banking Ombudsman Scheme?</Text>
                                <RadioButtonRN
                                    data={smartphone}
                                    selectedBtn={(e) => sRbiScheme(e)}
                                />
                            </View>
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>39 (g). Do you know about the complaint process regarding others such as Insurance, Pension, etc.?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setCompProcess(e)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40. Customer Service Quality at BC point</Text>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (a). Do you feel comfortable conducting banking transactions at an agent point (BC/BC Outlet) ?</Text>
                            <RadioButtonRN
                                data={smartphone}
                                selectedBtn={(e) => setComfortableConducting(e)}
                            />
                            <View style={{ padding: 10, }} />
                            {comfortableConducting?.label === 'No' ? <><Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (b). If response to Q40(a) is ‘No’, please indicate the reasons?</Text>
                                <Dropdown
                                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={bankingtransactionsresponse}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!isFocus ? 'Select Indicate the reasons' : value}
                                    // searchPlaceholder="Search..."
                                    value={value}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setValue(item?.id);
                                        setIsFocus(false);
                                    }}
                                /></> : null}
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (c). Is the BC agent able to offer the product or service that you require?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e, index) => setofferPdt(e?.index)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (d). Does the BC agent satisfactorily respond to your queries?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setQueryRespond(e?.index)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (e). Does your BC indicate the charges for the services offered upfront?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => sCharges(e?.index)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (f). Do you know, how to lodge a complaint at the BC point?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => sCompBC(e?.index)}
                            />
                            <View style={{ padding: 10, }} />
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (g). Whether you raised any grievance related to service with BC?</Text>
                            <RadioButtonRN
                                data={differently}
                                selectedBtn={(e) => setGrievanceRelated(e)}
                            />
                            {grievanceRelated?.label === 'Yes' ? <>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (h). If response to Q40(g) is Yes, whether your grievance was addressed timely (within one month)?</Text>
                                <RadioButtonRN
                                    data={smartphone}
                                    selectedBtn={(e) => sIsGrievanceAddressed(e)}
                                />
                            </> : <>
                                <View style={{ padding: 10, }} />
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>40 (i). If response to Q40(g) is No, what were reasons provided by BC Agent?</Text>
                                <Dropdown
                                    style={[styles.dropdown, reasonprovidedBCFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    data={addressedtimely}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!reasonprovidedBCFocus ? 'Select Reasons provided by BC' : reasonprovidedBC}
                                    // searchPlaceholder="Search..."
                                    value={reasonprovidedBC}
                                    onFocus={() => setReasonprovidedBCFocus(true)}
                                    onBlur={() => setReasonprovidedBCFocus(false)}
                                    onChange={item => {
                                        console.log('______>', JSON.stringify(item))
                                        setReasonprovidedBC(item?.id);
                                        setReasonprovidedBCFocus(false);
                                    }}
                                /></>}
                            <View style={{ padding: 10, }} />
                        </View>
                        <View style={{ padding: 10, }} />
                        <TouchableOpacity disabled={isSubmitSurvey} onPress={() => Validate()} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                            {isSubmitSurvey === true ? <ActivityIndicator color={'#fff'} style={{ alignItems: 'center', }} /> : <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Complete Survey</Text>}
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

export default BlockFSurveyScreen;