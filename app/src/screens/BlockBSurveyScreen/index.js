import { Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, useWindowDimensions, ActivityIndicator, TextInput, Alert, BackHandler, ScrollView, StyleSheet } from 'react-native'
import React, { Component, useCallback, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import RadioButtonRN from 'radio-buttons-react-native';
import MultiSelect from 'react-native-multiple-select';
import AudioRecord from 'react-native-audio-record';
import * as Progress from 'react-native-progress';
import { Platform } from 'react-native';
import Modal from 'react-native-modal';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Audio } from 'react-native-compressor';

const options = {
    sampleRate: 16000,  // default 44100
    channels: 1,        // 1 or 2, default 1
    bitsPerSample: 16,  // 8 or 16, default 16
    audioSource: 6,     // android only (see below)
    wavFile: 'test.wav' // default 'audio.wav'
};

const BlockBSurveyScreen = () => {
    const OsVer = Platform.constants['Release'];
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [gender, setGender] = React.useState('');
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
    const [Lattitude, setLattitude] = React.useState('');
    const [Longitude, setLongitude] = React.useState('');
    const [isAudioUploading, setAudioUploading] = React.useState(false);
    const [isSubmitSurvey, setSubmitSurvey] = React.useState(false);

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
    const [bank, setBank] = React.useState(null);
    const [age, setAgeNumber] = React.useState(0);
    const [adult, setAdults] = React.useState(0);
    const [children, setChildren] = React.useState(0);
    const [selectedEducation, setSelectedEducation] = React.useState([]);
    const [selectedOccupations, setSelectedOccupations] = React.useState([]);
    const [selectedIncomes, setSelectedIncomes] = React.useState([]);
    const [selectCashReceipt, setSelectCashReceipt] = React.useState([]);
    const [SelectedSaveMoney, setSelectSaveMoney] = React.useState([]);
    const [differentlyAble, setDifferently] = React.useState('');
    const [smartPhone, setSmartphone] = React.useState('');
    const [anyGroup, setAnyGroup] = React.useState('');

    // blockB    
    const [isAccountTypeFocus, setAccountTypeFocus] = React.useState(false);
    const [AccountTypeValue, setAccountTypeValue] = React.useState([]);
    const [DepositInsuranceCoverage, setDepositInsuranceCoverage] = React.useState(null);
    const [AccountFrequencyFocus, setAccountFrequencyFocus] = React.useState(null);
    const [transaction, sTransaction] = React.useState(null);
    const [istransactionFocus, setIsTransactionFocus] = React.useState(false);
    const [subsidy, setSubsidy] = React.useState(null);
    const [subsidyFocus, setSubsidyFocus] = React.useState(false);
    const multiSelectRef = useRef(null);
    const multiSelectRefQ12 = useRef(null);
    const multiSelectRefQ20 = useRef(null);
    const { t, i18n } = useTranslation();
    // anyGroup
    const [percentage, setPercentage] = React.useState(0);

    React.useEffect(() => {
        try {
            AudioRecord.init(options);
        } catch (error) {
            // logOnConsole('Failed to initialise appsflyer !!')
        }
    }, []);

    const Nodata = [
        { id: 1, lable: t('bank_branch_or_BC') },
        { id: 2, lable: t('bank_timings') },
        { id: 3, lable: t('Dont_have_documents') },
        { id: 4, lable: t('know_the_process') },
    ]

    // multi select 
    const [selectedDigitalpreferred, setSelectedDigitalpreferred] = React.useState([]);

    const onSelectedDigitalpreferredChange = (selectedItems) => {
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
        setSelectedDigitalpreferred(selectedItems);
    }

    const SelectedDigitalpreferredLabels = selectedDigitalpreferred.map((selectedId) => {
        const selectedReason = Nodata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const lackdocumentsdata = [
        { id: 1, lable: t('Lack_of_proof') },
        { id: 2, lable: t('lack_of_address_proof') },
        { id: 3, lable: t('both') },
        { id: 4, lable: t('any_other') },
    ]

    // multi select 
    const [selectedlackdocuments, setSelectedlackdocuments] = React.useState([]);

    const onSelectedlackdocumentsChange = (selectedItems) => {
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
        setSelectedlackdocuments(selectedItems);
    }

    const SelectedlackdocumentsLabels = selectedlackdocuments.map((selectedId) => {
        const selectedReason = lackdocumentsdata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const bankAccountsdata = [
        { id: 1, lable: t('no_source') },
        { id: 2, lable: t('prefer_cash') },
        { id: 3, lable: t('no_knowledge') },
        { id: 4, lable: t('no_trust') },
        { id: 5, lable: t('fee_and_charges') },
        { id: 6, lable: t('family_members') },
        { id: 7, lable: t('acquaintances') },
    ]

    // multi select 
    const [selectedbankAccounts, setSelectedbankAccounts] = React.useState([]);

    const onSelectedbankAccountsChange = (selectedItems) => {
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

        setSelectedbankAccounts(selectedItems);
    }

    const SelectedbankAccountsLabels = selectedbankAccounts.map((selectedId) => {
        const selectedReason = bankAccountsdata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const [DepositInsurance, setSetDepositInsurance] = React.useState(null);
    const [ZeroBalance, setZeroBalance] = React.useState(null);
    const [DirectBenefit, setDirectBenefit] = React.useState(null);
    const [visitBranch, setVisitBranch] = React.useState(null);
    const [EnvironmentBranch, setEnvironmentBranch] = React.useState(null);
    const [EnvironmentOutlet, setEnvironmentOutlet] = React.useState(null);
    const [SupportiveBranch, setSupportiveBranch] = React.useState(null);
    const [SupportiveOutlet, setSupportiveOutlet] = React.useState(null);
    const [AmenitiesBranch, setAmenitiesBranch] = React.useState(null);
    const [AmenitiesOutlet, setAmenitiesOutlet] = React.useState(null);
    const [LongBranch, setLongBranch] = React.useState(null);
    const [LongOutlet, setLongOutlet] = React.useState(null);
    const [WithoutVisiting, setWithoutVisiting] = React.useState(null);
    const [AccountOpened, setAccountOpened] = React.useState(null);
    const [AccountNumber, setAccountNumber] = React.useState([]);
    const initialCommentInputValues = [];
    const [commentInputValues, setCommentInputValues] = React.useState(
        initialCommentInputValues
    );
    // const [selectedAccountLabels, setSelectedAccountLabels] = useState([]);
    const [accountValues, setAccountValues] = React.useState([]);
    const [errorMessages, setErrorMessages] = React.useState([]);

    // new 
    const [DepositMoney, setDepositMoney] = React.useState(null);
    const [HeardDepositInsurance, setHeardDepositInsurance] = React.useState(null);
    const [ConstitutionDICGC, setConstitutionDICGC] = React.useState(null);
    const [FinancialInstitutionBanks, setFinancialInstitutionBanks] = React.useState(null);
    const [FinancialCategoryCompanies, setFinancialCategoryCompanies] = React.useState(null);
    const [CreditSocieties, setCreditSocieties] = React.useState(null);
    const [DifferentBranches, setDifferentBranches] = React.useState(null);
    const [MandatoryRegistered, setMandatoryRegistered] = React.useState(null);
    const [MeaningCapacity, setMeaningCapacity] = React.useState(null);
    const [ProvidingDepositInsurance, setProvidingDepositInsurance] = React.useState(null);
    const [FollowingIsDICGC, setFollowingIsDICGC] = React.useState(null);
    const [TypesOfDeposits, setTypesOfDeposits] = React.useState(null);
    const [PlacedUnderAID, setPlacedUnderAID] = React.useState(null);
    const [subsidy1Focus, setSubsidy1Focus] = React.useState(false);
    const [subsidy2Focus, setSubsidy2Focus] = React.useState(false);
    const [subsidy3Focus, setSubsidy3Focus] = React.useState(false);
    const [subsidy4Focus, setSubsidy4Focus] = React.useState(false);
    const [subsidy5Focus, setSubsidy5Focus] = React.useState(false);
    const [subsidy6Focus, setSubsidy6Focus] = React.useState(false);
    const [sub1sidy, set1Subsidy] = React.useState(null);
    const [sub2sidy, set2Subsidy] = React.useState(null);
    const [sub3sidy, set3Subsidy] = React.useState(null);
    const [sub4sidy, set4Subsidy] = React.useState(null);
    const [sub5sidy, set5Subsidy] = React.useState(null);
    const [sub6sidy, set6Subsidy] = React.useState(null);
    // const commentInputOnChange = (index, value) => {
    //     const updatedValues = [...accountValues];
    //     updatedValues[index] = { id: index, value };
    //     console.log("value", updatedValues)
    //     setAccountValues(updatedValues);

    // };
    // console.log("accountValues", accountValues)

    const commentInputOnChange = (id, value) => {
        value = String(value); // Ensure value is treated as a string
        // Check if the value starts with '0'
        if (value.startsWith('0')) {
            setErrorMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                updatedMessages[id] = 'Value cannot start with 0';
                return updatedMessages;
            });
        } else {
            setErrorMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                updatedMessages[id] = '';
                return updatedMessages;
            });

            setAccountValues(prevValues => {
                const updatedValues = [...prevValues];
                const existingIndex = updatedValues.findIndex(item => item.id === id);
                if (existingIndex !== -1) {
                    updatedValues[existingIndex].value = value;
                } else {
                    updatedValues.push({ id, value });
                }
                return updatedValues;
            });
        }
    };

    const whatPurposesdata = [
        { id: 1, lable: t('receive_salary') },
        { id: 2, lable: t('pay_money') },
        { id: 3, lable: t('save_money') },
        { id: 4, lable: t('for_business') },
        { id: 5, lable: t('transfer_remittance') },
        { id: 6, lable: t('do_not_use') },
    ]

    // multi select 
    const [selectedwhatPurposes, setSelectedwhatPurposes] = React.useState([]);
    const [selectedwhatPurposesQ12, setSelectedwhatPurposesQ12] = React.useState([]);
    const [selectedwhatPurposesQ20, setSelectedwhatPurposesQ20] = React.useState([]);

    const onSelectedwhatPurposesChange = (selectedItems) => {
        // if (selectedItems.length === 0) {
        //     Alert.alert('Selection Required', 'Please select two valid reason.');
        //     return
        // }
        // else if (selectedItems.length > 2) {
        //     Alert.alert('Limit Exceeded', 'You cannot select more than 2 reasons.', [
        //         { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
        //     ]);
        //     return
        // }
        setSelectedwhatPurposes(selectedItems);
    }

    const onSelectedwhatPurposesChangeQ12 = (selectedItems) => {
        setSelectedwhatPurposesQ12(selectedItems);
    }

    const onSelectedwhatPurposesChangeQ20 = (selectedItems) => {
        setSelectedwhatPurposesQ20(selectedItems);
    }


    const AccountType = [
        { id: 1, lable: t('newspapers') },
        { id: 2, lable: t('website_and_social_media') },
        { id: 3, lable: t('DICGC_website_and_social_media_handles') },
        { id: 4, lable: t('bank') },
        { id: 5, lable: t('earlier_options') },
        { id: 6, lable: t('no_idea') },
    ];

    const frequentlyBank = [
        { id: 1, lable: t('till_bank_is_liquidated') },
        { id: 2, lable: t('deposits_int') },
        { id: 3, lable: t('no_idea') },
    ];

    const privateInsuranceData = [
        { id: 1, lable: t('private_insurance_company') },
        { id: 2, lable: t('public_insurance_company') },
        { id: 3, lable: t('subsidiary') },
        { id: 4, lable: t('no_idea') },
    ]

    const reasons = [
        { id: 1, lable: t('upto_11akh') },
        { id: 2, lable: t('upto_51akh') },
        { id: 3, lable: t('5lakh_in_one_bank') },
        { id: 4, lable: t('entire_amount') },
        { id: 5, lable: t('no_idea') },

    ];

    const mostTransact = [
        { id: 1, lable: t('depositors') },
        { id: 2, lable: t('deposit_account') },
        { id: 3, lable: t('government') },
        { id: 4, lable: t('no_idea') },

    ];

    const depositAmount = [
        { id: 1, lable: t('get_entire_amount_from_bank') },
        { id: 2, lable: t('deposits_int') },
        { id: 3, lable: t('no_idea') },
    ]

    const subsidyTimes = [
        { id: 1, lable: t('deposits_SB') },
        { id: 2, lable: t('deposits_SB_interest') },
        { id: 3, lable: t('current_account') },
        { id: 4, lable: t('deposits_fixed') },
        { id: 5, lable: t('deposits_fixed_interest') },
        { id: 6, lable: t('no_idea') },
    ];

    const Incomedata = [
        { id: 1, lable: t('news_papers') },
        { id: 2, lable: t('bank') },
        { id: 3, lable: t('Social_media') },
        { id: 4, lable: t('Website') },
        { id: 5, lable: t('earlier_options') },
        { id: 6, lable: t('other_specify') },
    ];

    const cashReceipt = [
        { id: 1, lable: t('automatic_credit') },
        { id: 2, lable: t('approach_brokers') },
        { id: 3, lable: t('no_idea') }
    ];

    const saveMoney = [
        { id: 1, lable: t('automatic_credit') },
        { id: 2, lable: t('approach_brokers') },
        { id: 3, lable: t('updated_kyc_details') },
        { id: 4, lable: t('no_idea') }
    ];

    // gender setDifferently
    const data = [
        {
            label: t('Yes')
        },
        {
            label: t('No')
        }
    ];

    const dataOne = [
        {
            label: t('Yes')
        },
        {
            label: t('No')
        },
        {
            label: t('no_idea')
        }
    ];

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
            setUserSendToken(UserToken);
            setUserName(UserData);
            setName(userId);
            console.log("readMessages", userId)
        } catch (error) {
            console.log("readMessages_", error)
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
                    style={{ width: 40, height: 40, borderRadius: 20, resizeMode: 'cover' }}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ fontWeight: 'bold' }}>{userName} - {user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>{t('active_survey_token')} - <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'red' }}>{t('Block_B')}</Text> </Text>}
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
            console.log('stopRecording');
            const audioFile = await AudioRecord.stop();
            console.log(audioFile);
            setAudioPath(audioFile);
            const audioResultFile = await Audio.compress(audioFile, { quality: 'low' });
            uploadAudioFinal(audioResultFile);
            submitSurveyXml();
        } catch (error) {
            console.log(error);
        }
    };

    const validate = () => {
        if (bank === null) {
            showMessage({
                message: "Please Select Bank Account",
                description: "Please Select Bank Account!",
                type: "danger",
            });
            return false;
        }
        else if (DepositMoney === null) {
            showMessage({
                message: "Please Select deposit money in a bank",
                description: "Please Select deposit money in a bank!",
                type: "danger",
            });
            return false;
        }
        else if (HeardDepositInsurance === null) {
            showMessage({
                message: "Please Select heard about Deposit Insurance",
                description: "Please Select heard about Deposit Insurance!",
                type: "danger",
            });
            return false;
        }
        else if (ConstitutionDICGC === null) {
            showMessage({
                message: "Please Select aware of the constitution/ nature",
                description: "Please Select aware of the constitution/ nature!",
                type: "danger",
            });
            return false;
        }
        else if (FollowingIsDICGC === null) {
            showMessage({
                message: "Please Select following is DICGC?",
                description: "Please Select following is DICGC?!",
                type: "danger",
            });
            return false;
        }
        else if (FinancialInstitutionBanks === null) {
            showMessage({
                message: "Please Select financial institutions",
                description: "Please Select financial institutions!",
                type: "danger",
            });
            return false;
        }
        else if (FinancialCategoryCompanies === null) {
            showMessage({
                message: "Please Select Non-banking Financial Companies (NBFC)",
                description: "Please Select Non-banking Financial Companies (NBFC)!",
                type: "danger",
            });
            return false;
        }
        else if (CreditSocieties === null) {
            showMessage({
                message: "Please Select Co-operative credit societies",
                description: "Please Select Co-operative credit societies!",
                type: "danger",
            });
            return false;
        }
        else if (DifferentBranches === null) {
            showMessage({
                message: "Please Select different branches of a bank",
                description: "Please Select different branches of a bank!",
                type: "danger",
            });
            return false;
        }
        else if (MandatoryRegistered === null) {
            showMessage({
                message: "Please Select mandatory for banks",
                description: "Please Select mandatory for banks!",
                type: "danger",
            });
            return false;
        }
        else if (MeaningCapacity === null) {
            showMessage({
                message: "Please Select right and capacity?",
                description: "Please Select right and capacity?!",
                type: "danger",
            });
            return false;
        }
        else if (DepositInsuranceCoverage === null) {
            showMessage({
                message: "Please Select insurance coverage",
                description: "Please Select insurance coverage!",
                type: "danger",
            });
            return false;
        }
        else if (ProvidingDepositInsurance === null) {
            showMessage({
                message: "Please Select premium to DICGC",
                description: "Please Select premium to DICGC!",
                type: "danger",
            });
            return false;
        }
        else if (selectedwhatPurposesQ12 === null) {
            showMessage({
                message: "Please Select deposits are insured by DICGC",
                description: "Please Select deposits are insured by DICGC!",
                type: "danger",
            });
            return false;
        }
        else if (LongOutlet === null) {
            showMessage({
                message: "Please Select All Inclusive Directions (AID)’",
                description: "Please Select All Inclusive Directions (AID)’!",
                type: "danger",
            });
            return false;
        }
        else if (WithoutVisiting === null) {
            showMessage({
                message: "Please Select Liquidation’ of a bank",
                description: "Please Select Liquidation’ of a bank!",
                type: "danger",
            });
            return false;
        }
        else if (selectedwhatPurposes.length === 0) {
            showMessage({
                message: "Please Select placed under AID Or Liquidated by Reserve Bank of India",
                description: "Please Select placed under AID Or Liquidated by Reserve Bank of India!",
                type: "danger",
            });
            return false;
        }
        else if (PlacedUnderAID === null) {
            showMessage({
                message: "Please Select placed under AID ",
                description: "Please Select placed under AID !",
                type: "danger",
            });
            return false;
        }
        else if (transaction === null) {
            showMessage({
                message: "Please Select  liquidated by Reserve Bank of India",
                description: "Please Select  liquidated by Reserve Bank of India!",
                type: "danger",
            });
            return false;
        }
        else if (sub1sidy === null) {
            showMessage({
                message: "Please Select bank is placed under AID",
                description: "Please Select bank is placed under AID!",
                type: "danger",
            });
            return false;
        }
        else if (sub2sidy === null) {
            showMessage({
                message: "Please Provided KYC details are in place",
                description: "Please Provided KYC details are in place!",
                type: "danger",
            });
            return false;
        }
        else if (selectedwhatPurposesQ20 === null) {
            showMessage({
                message: "Please Select know more about DICGC",
                description: "Please Select know more about DICGC!",
                type: "danger",
            });
            return false;
        }
        else {
            stopRecording();
        }
    }

    const submitSurveyXml = async () => {
        setSubmitSurvey(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", 'application/json');
        myHeaders.append("Authorization", "Bearer " + userSendToken);

        var raw = JSON.stringify({
            "latitude": Lattitude,
            "longitude": Longitude,
            "survey_token": name,
            "section_no": "B",
            "data": [
                {
                    "section_no": "B",
                    "q_no": "1",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    "response": bank === null ? "" : `${bank?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "2",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': DepositMoney === null ? "" : DepositMoney?.label
                },
                {
                    "section_no": "B",
                    "q_no": "3",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': HeardDepositInsurance === null ? "" : HeardDepositInsurance?.label
                },
                {
                    "section_no": "B",
                    "q_no": "4",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': ConstitutionDICGC === null ? '' : ConstitutionDICGC?.label
                },
                {
                    "section_no": "B",
                    "q_no": "5",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': FollowingIsDICGC === null ? "" : `${FollowingIsDICGC}`
                },
                {
                    "section_no": "B",
                    "q_no": "6",
                    "q_type": "CHILD",
                    "sub_q_no": "a",
                    "sub_q_title": "Banks",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': FinancialInstitutionBanks === null ? "" : `${FinancialInstitutionBanks?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "6",
                    "q_type": "CHILD",
                    "sub_q_no": "b",
                    "sub_q_title": "Non-banking Financial Companies (NBFC)",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': FinancialCategoryCompanies === null ? "" : `${FinancialCategoryCompanies?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "6",
                    "q_type": "CHILD",
                    "sub_q_no": "c",
                    "sub_q_title": "Co-operative credit societies",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': CreditSocieties === null ? "" : `${CreditSocieties?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "7",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': DifferentBranches === null ? "" : `${DifferentBranches?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "8",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    'response': MandatoryRegistered === null ? "" : `${MandatoryRegistered?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "9",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    'response': MeaningCapacity === null ? "" : `${MeaningCapacity?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "10",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    'response': DepositInsuranceCoverage === null ? "" : `${DepositInsuranceCoverage}`
                },
                {
                    'section_no': "B",
                    'q_no': "11",
                    'q_type': "SELF",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'account_no': '',
                    'response': ProvidingDepositInsurance === null ? "" : `${ProvidingDepositInsurance}`
                },
                {
                    'section_no': "B",
                    'q_no': "12",
                    'q_type': "MULTI",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'account_no': '',
                    'response': selectedwhatPurposesQ12 === null ? [] : selectedwhatPurposesQ12
                },
                {
                    'section_no': "B",
                    'q_no': "13",
                    'q_type': "SELF",
                    'sub_q_no': "",
                    'sub_q_title': "",
                    'sub_q_type': "",
                    'response': LongOutlet === null ? "" : `${LongOutlet?.label}`,
                },
                {
                    "section_no": "B",
                    "q_no": "14",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': WithoutVisiting === null ? "" : `${WithoutVisiting?.label}`
                },
                {
                    "section_no": "B",
                    "q_no": "15",
                    "q_type": "MULTI",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': selectedwhatPurposes.length === 0 ? [] : selectedwhatPurposes
                },
                {
                    "section_no": "B",
                    "q_no": "16",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': PlacedUnderAID === null ? '' : PlacedUnderAID
                },
                {
                    "section_no": "B",
                    "q_no": "17",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': transaction === null ? "" : `${transaction}`
                },
                {
                    "section_no": "B",
                    "q_no": "18",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': sub1sidy === null ? "" : sub1sidy
                },
                {
                    "section_no": "B",
                    "q_no": "19",
                    "q_type": "SELF",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': sub2sidy === null ? "" : sub2sidy
                },
                {
                    "section_no": "B",
                    "q_no": "20",
                    "q_type": "MULTI",
                    "sub_q_no": "",
                    "sub_q_title": "",
                    "sub_q_type": "",
                    "account_no": "",
                    'response': selectedwhatPurposesQ20 === null ? [] : selectedwhatPurposesQ20
                }
            ]
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        console.log('submitSurveyXml______>', raw);

        fetch("https://scslsurvey.online/DICGCA-SURVEY/public/api/create-survey-section-b", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log('submitSurveyXml______', JSON.stringify(result));
                if (result?.status === true) {
                    showMessage({
                        message: result.message,
                        description: result.message,
                        type: "success",
                    });
                    setSubmitSurvey(false);
                } else {
                    showMessage({
                        message: "Something went wrong!",
                        description: result.message,
                        type: "danger",
                    });
                }
            })
            .catch(error => {
                console.log('error', error);
                setSubmitSurvey(false);
            });
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

    const uploadAudioFinal = async (file) => {
        setAudioUploading(true);
        let API_UPLOAD_MSG_FILE = `https://scslsurvey.online/DICGCA-SURVEY/public/api/survey-audio-files`;
        const path = `file://${file}`;
        const formData = new FormData();
        formData.append('survey_token', name);
        formData.append('sec_no', 'B');
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
                onUploadProgress: uploadProgress,
            });
            const json = await res.json();
            setAudioUploading(false);
            showMessage({
                message: "Audio Upload",
                description: "Audio Upload Successfully!",
                type: "success",
            });
            finishSurvey();
        } catch (err) {
            showMessage({
                message: "Audio Upload",
                description: "Audio Upload Failed!",
                type: "error",
            });
            Alert.alert(
                'Audio Uploading Failed!',
                'Audio Uploading Failed! Please Retry',
                [
                    { text: 'Retry', onPress: () => uploadAudioFinal(audioPath) },
                ]
            )
        }
    }

    // const saveSurveryAndMoveToNext = async () => {
    //     setSubmitSurvey(false);
    //     AsyncStorage.setItem(AsyncStorageContaints.surveyNextBlock, 'C');
    //     navigation.replace('BlockCSurveyScreen');
    // }

    const onSelectedItemsChange = (selectedItems) => {
        setSelectedAreas(selectedItems);
    }

    const onSelectedEducationChange = (selectedItems) => {
        setSelectedEducation(selectedItems);
    }

    const selectedLabels = selectedOccupations.map((selectedId) => {
        const selectedReason = reasons.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedIncomeLabels = selectedIncomes.map((selectedId) => {
        const selectedReason = Incomedata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedAccountLabels = AccountTypeValue.map((selectedId) => {
        const selectedReason = AccountType.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedCashReceiptLabels = selectCashReceipt.map((selectedId) => {
        const selectedReason = cashReceipt?.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const selectedSaveMoneyLabels = SelectedSaveMoney.map((selectedId) => {
        const selectedReason = saveMoney.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });


    const SelectedwhatPurposesLabels = selectedwhatPurposes.map((selectedId) => {
        const selectedReason = AccountType.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedwhatPurposesQ12Labels = selectedwhatPurposesQ12.map((selectedId) => {
        const selectedReason = subsidyTimes.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const SelectedwhatPurposesQ20Labels = selectedwhatPurposesQ20.map((selectedId) => {
        const selectedReason = Incomedata.find((reason) => reason.id === selectedId);
        return selectedReason ? selectedReason.lable : '';
    });

    const onSelectedOccupationsChange = (selectedItems) => {
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
        setSelectedOccupations(selectedItems);
    }

    const onSelectedCashReceipt = (selectedItems) => {
        setSelectCashReceipt(selectedItems);
    }

    const onSelectedSaveMoney = (selectedItems) => {
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
        setSelectSaveMoney(selectedItems);
    }

    const onSelectedIncomesChange = (selectedItems) => {
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
        setSelectedIncomes(selectedItems);
    }

    const onSelectedBankAccounts = (selectedItems) => {
        // if (selectedItems.length === 0) {
        //     Alert.alert('Selection Required', 'Please select two valid reason.');
        //     return
        // }
        // else if (selectedItems.length > 2) {
        //     Alert.alert('Limit Exceeded', 'You cannot select more than 2 reasons.', [
        //         { text: 'OK', onPress: () => multiSelectRef.current._removeItem(selectedItems[selectedItems.length - 1]) },
        //     ]);
        //     return
        // }
        setAccountTypeValue(selectedItems);
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
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
            {renderCustomHeader()}
            <Modal isVisible={isInstruction}>
                <View style={{ width: Dimensions.get('screen').width - 50, backgroundColor: '#fff', alignSelf: 'center', borderRadius: 5, padding: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{t('Survey_Instructions')}</Text>
                        <Text style={{ textAlign: 'center', paddingVertical: 15 }}>{t('Survey_description')}</Text>
                    </View>
                    <TouchableOpacity onPress={() => startRecording()} style={{ paddingVertical: 10, paddingHorizontal: 50, backgroundColor: '#000', borderRadius: 5, elevation: 5, zIndex: 999 }}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', textAlign: 'center', padding: 5 }}>{t('Start')}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {isAudioUploading && <Progress.Bar progress={percentage} width={Dimensions.get('screen').width} color={'green'} style={{ borderRadius: 0 }} indeterminate={false} />}
            <Text style={{ fontWeight: 'bold', paddingLeft: 20, paddingTop: 10 }}>{t('Block_II')}: {t('respondent_feedback')}</Text>
            {isLoading === false ?
                <ScrollView>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('bank_account')} </Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setBank(e)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('money_deposit_safe')}</Text>
                                <RadioButtonRN
                                    data={dataOne}
                                    selectedBtn={(e) => setDepositMoney(e)}
                                />
                            </View>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('deposit_insurance')}</Text>
                                <RadioButtonRN
                                    data={dataOne}
                                    selectedBtn={(e) => setHeardDepositInsurance(e)}
                                />
                            </View>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('constitution_nature')}</Text>
                                <RadioButtonRN
                                    data={dataOne}
                                    selectedBtn={(e) => setConstitutionDICGC(e)}
                                />
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('if_yes_DICGC')}</Text>
                            <Dropdown
                                style={[styles.dropdown, AccountFrequencyFocus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                data={privateInsuranceData}
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!AccountFrequencyFocus ? t('select_dICGC') : FollowingIsDICGC}
                                // searchPlaceholder="Search..."
                                value={FollowingIsDICGC}
                                onFocus={() => setAccountTypeFocus(true)}
                                onBlur={() => setAccountTypeFocus(false)}
                                onChange={item => {
                                    console.log(JSON.stringify(item))
                                    setFollowingIsDICGC(item.id);
                                    setAccountFrequencyFocus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('depositors_financial_institutions')}</Text>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('category_financial_institution')}</Text>
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('banks')}</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setFinancialInstitutionBanks(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('non-banking_financial')}</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setFinancialCategoryCompanies(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('co-operative_credit')}</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setCreditSocieties(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ flex: 1 }}>
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <View style={{ padding: 10, }} />
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('different_branches')}</Text>
                                    <RadioButtonRN
                                        data={dataOne}
                                        selectedBtn={(e) => setDifferentBranches(e)}
                                    />
                                    <View style={{ padding: 10, }} />
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('mandatory_for_banks_registered')}</Text>
                                    <RadioButtonRN
                                        data={dataOne}
                                        selectedBtn={(e) => setMandatoryRegistered(e)}
                                    />
                                </View>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('right_and_capacity')}</Text>
                                    <RadioButtonRN
                                        data={dataOne}
                                        selectedBtn={(e) => setMeaningCapacity(e)}
                                    />
                                    <View style={{ padding: 10, }} />
                                </View>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('deposit_insurance_coverage')}</Text>
                                    <Dropdown
                                        style={[styles.dropdown, AccountFrequencyFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        // iconStyle={styles.iconStyle}
                                        // data={AccountType}
                                        data={reasons}
                                        // search
                                        maxHeight={300}
                                        labelField="lable"
                                        valueField="id"
                                        placeholder={!AccountFrequencyFocus ? t('select_deposit_insurance_coverage') : DepositInsuranceCoverage}
                                        // searchPlaceholder="Search..."
                                        value={DepositInsuranceCoverage}
                                        onFocus={() => setAccountTypeFocus(true)}
                                        onBlur={() => setAccountTypeFocus(false)}
                                        onChange={item => {
                                            console.log(JSON.stringify(item))
                                            setDepositInsuranceCoverage(item?.id);
                                            setAccountFrequencyFocus(false);
                                        }}
                                    />
                                    <View style={{ padding: 10, }} />
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('providing_deposit_insurance_coverage')}</Text>
                                    <Dropdown
                                        style={[styles.dropdown, AccountFrequencyFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        // iconStyle={styles.iconStyle}
                                        // data={AccountType}
                                        data={mostTransact}
                                        // search
                                        maxHeight={300}
                                        labelField="lable"
                                        valueField="id"
                                        placeholder={!AccountFrequencyFocus ? t('select_ providing_deposit_insurance') : ProvidingDepositInsurance}
                                        // searchPlaceholder="Search..."
                                        value={ProvidingDepositInsurance}
                                        onFocus={() => setAccountTypeFocus(true)}
                                        onBlur={() => setAccountTypeFocus(false)}
                                        onChange={item => {
                                            console.log(JSON.stringify(item))
                                            setProvidingDepositInsurance(item.id);
                                            setAccountFrequencyFocus(false);
                                        }}
                                    />
                                </View>
                                <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('deposits_insured_DICGC')}</Text>
                                    <View>
                                        <MultiSelect
                                            hideTags
                                            items={subsidyTimes}
                                            uniqueKey="id"
                                            ref={multiSelectRefQ12}
                                            onSelectedItemsChange={(items) =>
                                                onSelectedwhatPurposesChangeQ12(items)
                                            }
                                            selectedItems={selectedwhatPurposesQ12}
                                            selectText={t('select_insured_by_DICGC')}
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
                                            {SelectedwhatPurposesQ12Labels.map((label, index) => (
                                                <View style={{ margin: 5 }}>
                                                    <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, }} />
                                    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('term')}</Text>
                                    <RadioButtonRN
                                        data={data}
                                        selectedBtn={(e) => setLongOutlet(e)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('liquidation_bank')}</Text>
                            <RadioButtonRN
                                data={data}
                                selectedBtn={(e) => setWithoutVisiting(e)}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('bank_placed')}</Text>
                                <View>
                                    <MultiSelect
                                        hideTags
                                        items={AccountType}
                                        uniqueKey="id"
                                        ref={multiSelectRef}
                                        onSelectedItemsChange={(items) =>
                                            onSelectedwhatPurposesChange(items)
                                        }
                                        selectedItems={selectedwhatPurposes}
                                        selectText={t('select_placed')}
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
                                        {SelectedwhatPurposesLabels.map((label, index) => (
                                            <View style={{ margin: 5 }}>
                                                <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>{t('deposit_amount_under_AID')}</Text>
                                <Dropdown
                                    style={[styles.dropdown, AccountFrequencyFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    // iconStyle={styles.iconStyle}
                                    // data={AccountType}
                                    data={frequentlyBank}
                                    // search
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!AccountFrequencyFocus ? t('select_bank_AID') : PlacedUnderAID}
                                    // searchPlaceholder="Search..."
                                    value={PlacedUnderAID}
                                    onFocus={() => setAccountTypeFocus(true)}
                                    onBlur={() => setAccountTypeFocus(false)}
                                    onChange={item => {
                                        console.log(JSON.stringify(item))
                                        setPlacedUnderAID(item.id);
                                        setAccountFrequencyFocus(false);
                                    }}
                                />
                            </View>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>{t('what_happens_to_your_deposit_amount')}</Text>
                                <Dropdown
                                    style={[styles.dropdown, istransactionFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    data={depositAmount}
                                    maxHeight={300}
                                    labelField={"lable"}
                                    valueField="id"
                                    placeholder={!istransactionFocus ? t('select_liquidated') : transaction}
                                    // searchPlaceholder="Search..."
                                    value={transaction}
                                    onFocus={() => setIsTransactionFocus(true)}
                                    onBlur={() => setIsTransactionFocus(false)}
                                    onChange={item => {
                                        console.log(JSON.stringify(item))
                                        sTransaction(item.id);
                                        setIsTransactionFocus(false);
                                    }}
                                />
                            </View>
                            <View style={{ padding: 10, }} />
                            <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                                <Text style={{ marginBottom: 5, fontWeight: 'bold', flex: 1 }}>{t('receive_your_insured_amount')}</Text>
                                <Dropdown
                                    style={[styles.dropdown, subsidy1Focus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    data={saveMoney}
                                    maxHeight={300}
                                    labelField="lable"
                                    valueField="id"
                                    placeholder={!subsidy1Focus ? t('select_receive_your_insured_amount') : sub1sidy}
                                    // searchPlaceholder="Search..."
                                    value={sub1sidy}
                                    onFocus={() => setSubsidy1Focus(true)}
                                    onBlur={() => setSubsidy1Focus(false)}
                                    onChange={item => {
                                        console.log(JSON.stringify(item))
                                        set1Subsidy(item.id);
                                        setSubsidy1Focus(false);
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{t('bank_liquidated')}</Text>
                            <Dropdown
                                style={[styles.dropdown, subsidy2Focus && { borderColor: 'blue' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                // data={AccountType}
                                data={cashReceipt}
                                // search
                                maxHeight={300}
                                labelField="lable"
                                valueField="id"
                                placeholder={!subsidy2Focus ? t('select_receive_insured_liquidated') : sub2sidy}
                                // searchPlaceholder="Search..."
                                value={sub2sidy}
                                onFocus={() => setSubsidy2Focus(true)}
                                onBlur={() => setSubsidy2Focus(false)}
                                onChange={item => {
                                    console.log(JSON.stringify(item))
                                    set2Subsidy(item.id);
                                    setSubsidy2Focus(false);
                                }}
                            />
                        </View>
                        <View style={{ padding: 10, }} />
                        <View style={{ padding: 5, elevation: 1, backgroundColor: '#fff' }}>
                            <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>xx{t('like_more_about_DICGC')}</Text>
                            <View>
                                <MultiSelect
                                    hideTags
                                    items={Incomedata}
                                    uniqueKey="id"
                                    ref={multiSelectRefQ20}
                                    onSelectedItemsChange={(items) =>
                                        onSelectedwhatPurposesChangeQ20(items)
                                    }
                                    selectedItems={selectedwhatPurposesQ20}
                                    selectText={t('select_more_about_DICGC')}
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
                                    {SelectedwhatPurposesQ20Labels.map((label, index) => (
                                        <View style={{ margin: 5 }}>
                                            <Text key={index} style={{ color: '#000', borderColor: '#DFDFDF', borderWidth: 0.8, padding: 10 }}>{label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 10, }} />
                        <TouchableOpacity
                            // disabled={isSubmitSurvey}
                            onPress={() => validate()} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'rgb(36,78,154)', borderRadius: 10 }}>
                            {isSubmitSurvey === true ? <ActivityIndicator style={{ alignItems: 'center' }} color={'#fff'} /> : <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>{t('complete_survey')}</Text>}
                        </TouchableOpacity>
                        <View style={{ padding: 10, }} />
                    </View>
                </ScrollView> : <ActivityIndicator style={{ alignItems: 'center', marginTop: Dimensions.get('screen').width }} color={'#000'} />
            }
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

export default BlockBSurveyScreen;