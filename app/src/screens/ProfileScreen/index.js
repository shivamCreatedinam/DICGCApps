import { Text, View, Image, SafeAreaView, Alert, TouchableOpacity, StatusBar } from 'react-native'
import React, { Component, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageContaints from '../../../utility/AsyncStorageConstants'; 

export default class ProfileScreen extends Component {


    static ROUTE_NAME = 'ProfileScreen';


    constructor(props) {
        super(props);
        console.log("props", props?.route?.params)
        this.state = {
            messages: [],
            receiver_id: 2,
            allMessages: [],
            name: '',
            userToken: ''
        };

    }

    componentDidMount() {
        this.readMessages()
    }

    async readMessages() {
        try {
            const userId = await AsyncStorage.getItem(AsyncStorageContaints.UserId);
            const UserData = await AsyncStorage.getItem(AsyncStorageContaints.UserData);
            this.setState({ name: UserData, userToken: userId });
            console.log("error", userId)
        } catch (error) {
            console.log("error", error)
        }
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
                <Image
                    source={require('../../../assets/app_logo.png')}
                    style={{ width: 50, height: 50, borderRadius: 20, resizeMode: 'contain' }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text>{user.name}</Text>
                    {user.active && <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold' }}>Online</Text>}
                </View>
            </View>
        );
    }


    showConfirmationAlert = () => {
        Alert.alert(
            "Logout",
            "Are you sure, you want to logout?",
            [
                { text: "Yes", onPress: () => this.clearAsyncStorage() },
                { text: "No" }
            ]
        );
    };

    clearAsyncStorage = async () => {
        try {
            AsyncStorage.clear();
            console.log('clearAsyncStorage')
            this.props.navigation.replace('SigninScreen');
        } catch (error) {
            console.log('clearAsyncStorage', error)
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderCustomHeader()}
                <View style={{ margin: 20 }}>
                    <View style={{ alignItems: 'center', padding: 50 }}>
                        <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={require('../../../assets/app_logo.png')} />
                        <Text style={{ marginTop: 20, textTransform: 'capitalize', fontWeight: 'bold' }}>{this.state.name}</Text>
                        <Text style={{ textTransform: 'uppercase', textAlign: 'center', marginTop: 5 }} adjustsFontSizeToFit={true} numberOfLines={1}><Text style={{ fontWeight: 'bold' }}>URID:</Text> *****{this.state.userToken.slice(0, 10)}******</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.showConfirmationAlert()} style={{ paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#000', borderRadius: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}