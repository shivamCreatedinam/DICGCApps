import { Text, View, Image, SafeAreaView, FlatList } from 'react-native'
import React, { Component, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
;

export default class ChatScreen extends Component {
    static ROUTE_NAME = 'ChatScreen';
    constructor(props) {
        super(props);
        console.log("props", props?.route?.params)
        this.state = {
            messages: [],
            sender_id: this.props?.route?.params?.item?.key,
            receiver_id: 2,
            allMessages: []
        };

    }
    componentDidMount() {
        this.readMessages()
    }

    onSend(messages = []) {
        this.setState(previousMessages => ({
            messages: GiftedChat.append(previousMessages.messages, messages),
        }));
    }

    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = { text, user, createdAt: new Date().toLocaleString(), sent: true, received: true, };
            try {
                database().ref(`/Messages/users/${this.state.sender_id}`).push(message);
                this.lastMessage(text)
                console.log("save", reference)
            } catch (error) {
                console.log("error", error)
            }
        }
    };

    lastMessage(message) {

        try {
            const item = {
                last_message: message,
                is_read: false,
                last_update: new Date().toLocaleString(),
                sent_time: new Date().toLocaleString()
            }
            database().ref('/AllMessages/users').child(String(this.state.sender_id)).update(item);
        } catch (error) {
            console.log("error", error)
        }

    }


    readMessages() {
        try {
            const dataRef = database().ref(`/Messages/users/${this.state.sender_id}`);
            dataRef.on('value', snapshot => {
                const newData = [];
                snapshot.forEach(childSnapshot => {
                    newData.push(childSnapshot.val());
                });
                this.setState({ allMessages: newData })

            });
        } catch (error) {
            console.log("error", error)
        }
    }

    renderCustomHeader() {

        const user = {
            _id: 1,
            name: this.props?.route?.params?.item?.name,
            avatar: 'https://electricallicenserenewal.com/app-assets/images/user/12.jpg',
            active: true,
        };
        // this.props?.route?.params?.item?.profile_image,
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 30, alignSelf: 'flex-start', marginTop: 10, paddingHorizontal: 20, backgroundColor: '#fff', elevation: 5, width: '100%' }}>
                <Image
                    source={{ uri: user.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text>{user.name}</Text>
                    {user.active && <Text style={{ color: 'green' }}>Active</Text>}
                </View>
            </View>
        );
    }

    renderItem(item) {
        console.log("item", item?.item)
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 10 }} >
                <Image
                    source={{ uri: item?.item?.user?.avatar }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
                <View style={{ justifyContent: 'center' }}>
                    <Text>{item?.item?.user?.name}</Text>
                </View>
                <Text>{item?.item?.user?.createdAt}</Text>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.renderCustomHeader()}
                <GiftedChat
                    messages={this.state.allMessages.reverse()}
                    onSend={(item) => this.send(item)}
                    showAvatarForEveryMessage={true}
                    user={{
                        _id: 1,
                        name: String(this.props?.route?.params?.item?.name),
                        avatar: this.props?.route?.params?.item?.profile_image,
                    }
                    }
                    alwaysShowSend={true}
                />
            </SafeAreaView>
        )
    }
}