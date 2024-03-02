import { Text, View, Image, SafeAreaView, Alert, TouchableOpacity, StatusBar } from 'react-native'
import React, { Component, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants';
import { showMessage, hideMessage } from "react-native-flash-message";
import axios from "axios";
;

export default class DraftSurveyScreen extends Component {


    static ROUTE_NAME = 'DraftSurveyScreen';


    constructor(props) {
        super(props);
        console.log("props", props?.route?.params);
        this.state = {
            messages: [],
            receiver_id: 2,
            allMessages: [],
            name: '',
            userToken: '',
            tempServerTokenId: '',
            DraftSection: '',
            DraftLoading: false,
            surveyToken: null
        };

    }

    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            //do your api call
            this.readMessages();
        });
    }

    async readMessages() {
        try {
            const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
            const UserData = await AsyncStorage.getItem(AsyncStorageContaints.UserData);
            const ServerTokenId = await AsyncStorage.getItem(AsyncStorageContaints.tempServerTokenId);
            this.setState({ name: UserData, userToken: userId, tempServerTokenId: ServerTokenId });
            console.log("error", userId)
            this.getDraftSurvey();
        } catch (error) {
            console.log("error", error);
        }
    }

    async getDraftSurvey() {
        // api/generate-survey-token
        let SERVER = 'https://createdinam.in/SURVEY-3/public/api/get-survey-token'
        this.setState({ DraftLoading: true });
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.state.userToken}`
        }
        axios.get(`${SERVER}`, {
            headers: headers
        })
            .then((response) => {
                if (response.data.status === true) {
                    console.log('getDraftSurvey', JSON.stringify(response.data?.surveyToken))
                    let serverToken = response?.data?.surveyToken
                    AsyncStorage.setItem(AsyncStorageContaints.tempServerTokenId, serverToken);
                    let CurrentDraft = response?.data?.section_status;
                    this.setState({ DraftLoading: false, DraftSection: CurrentDraft });
                } else {

                }
                this.setState({ DraftLoading: false });
            }).catch((error) => {
                console.log('getDraftSurvey', JSON.stringify(error))
                showMessage({
                    message: "Something went wrong!",
                    description: "Something went wrong",
                    type: "danger",
                });
                this.setState({ DraftLoading: false });
            })

    }

    renderCustomHeader() {
        const user = {
            _id: 1,
            name: this.state.name,
            avatar: 'https://electricallicenserenewal.com/app-assets/images/user/12.jpg',
            active: true,
        };
        // this.props?.route?.params?.item?.profile_image,
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, alignSelf: 'flex-start', marginTop: StatusBar.currentHeight, paddingHorizontal: 20, backgroundColor: '#fff', elevation: 5, width: '100%' }}>
                <TouchableOpacity onPress={() => this.props.navigation.replace('DashboardScreen')} style={{ marginRight: 10, padding: 5 }}>
                    <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../../../assets/goback.png')} />
                </TouchableOpacity>
                <Image
                    source={require('../../../assets/app_logo.png')}
                    style={{ width: 50, height: 50, borderRadius: 20, resizeMode: 'contain' }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }} >{user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Online</Text>}
                </View>
            </View>
        );
    }


    showConfirmationAlert = () => {
        Alert.alert(
            "Delete Survey",
            "Are you sure, you want to Delete All Data Delete?",
            [
                { text: "Yes", onPress: () => this.finishSurvey() },
                { text: "No" }
            ]
        );
    };

    async finishSurvey() {
        const userId = await AsyncStorage.getItem(AsyncStorageContaints.tempServerTokenId);
        let SERVER = 'https://createdinam.in/SURVEY-3/public/api/finish-survey';
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.state.userToken}`);
        var formdata = new FormData();
        formdata.append("surveytoken", this.state?.tempServerTokenId);
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
                    this.saveSurveryAndMoveToNext();
                } else { 
                    showMessage({
                        message: "Something went wrong!",
                        description: result?.message,
                        type: "danger",
                    });
                }
            });
    }

    async saveSurveryAndMoveToNext() {
        AsyncStorage.setItem(AsyncStorageContaints.surveyNextBlock, '');
        this.props.navigation.replace('DashboardScreen');
        setSubmitSurvey(true);
        saveSurveyCount();
    }

    DraftSurvey() {
        if (this.state.DraftSection === '' || this.state.DraftSection === null) {
            showMessage({
                message: "You Haven't Any Draft Survey",
                description: "Create new survey!",
                type: "danger",
            });
        } else if (this.state.DraftSection === 'B') {
            console.log("inside B")
            this.props.navigation.replace('BlockCSurveyScreen');
        } else if (this.state.DraftSection === 'C') {
            console.log("inside C")
            this.props.navigation.replace('BlockDSurveyScreen');
        } else if (this.state.DraftSection === 'D') {
            this.props.navigation.replace('BlockESurveyScreen');
            console.log("inside D")
        } else if (this.state.DraftSection === 'E') {
            this.props.navigation.replace('BlockFSurveyScreen');
            console.log("inside E")
        } else if (this.state.DraftSection === 'A') {
            console.log("inside F")
            this.props.navigation.replace('BlockBSurveyScreen');
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderCustomHeader()}
                <View style={{ margin: 20 }}>
                    <View style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'rgb(36,78,154)', borderRadius: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Draft Survey {this.state?.DraftSection !== '' && this.state?.DraftSection + ' -' } {this.state?.DraftSection !== '' && this.state?.tempServerTokenId}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, marginTop: 0 }}>
                    <TouchableOpacity onPress={() => this.showConfirmationAlert()} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'red', borderRadius: 10, flex: 1, marginRight: 5 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Delete Survey</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.DraftSurvey()} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: 'rgb(36,78,154)', borderRadius: 10, flex: 1 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Continue Survey</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}