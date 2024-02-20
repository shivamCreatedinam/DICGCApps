import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles'
import Header from '../../genriccomponents/header/HeaderAndStatusBar'
import Button from '../../genriccomponents/button/Button'
import Input from '../../genriccomponents/input/Input'
import resources from '../../../res';
import { validateEmail, renderInputError } from '../../utility/Utils'

class EmailScreen extends Component {
    constructor(props) {
        super(props)
        this.callback = this.props.route.params.callback ? this.props.route.params.callback : null
        this.state = {
            email: "",
            error: {},
        }
    }
    renderHeader = () => {
        return (
            <Header
                headerTitle={resources.strings.EMAIL_ADDRESS}
                onBackClick={this.onBackClick}

            />
        )
    }
    render() {
        const { email, error } = this.state
        return (
            <View style={styles.fullScreen}>
                {this.renderHeader()}
                <KeyboardAvoidingView>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{resources.strings.EMAIL_INFO_TEXT}</Text>
                        </View>
                        <Input
                            label={resources.strings.EMAIL_ADDRESS}
                            keyboardType="email-address"
                            inputStyles={[styles.inputStyle1]}
                            value={email}
                            onChangeText={this.onChangeEmailText}
                            error={renderInputError("email", error)}
                            errorKey={"email"}
                            callbackToRemoveError={this.callbackToRemoveError} />
                        <View style={styles.buttonContainer}>
                            <Button rounded btnText={resources.strings.SUBMIT}
                                onPress={() => { this.onContinuePressed() }} />
                        </View>
                    </View>

                </KeyboardAvoidingView>
            </View>
        );
    }
    callbackToRemoveError = (key) => {
        let { error } = this.state
        if (error.hasOwnProperty(key)) {
            error[key] = ""
            this.setState({
                error : error
            })
        }
    }
    onContinuePressed = () => {

        const isValid = this.validate();

        if (!isValid) {
            return;
        }
        const { email } = this.state
        this.callback(email.trim().toLowerCase())

    }
    onBackClick = () => {
        this.props.navigation.goBack()
    }
    onChangeEmailText = (text) => {
        this.setState({ email: text })
    }
    validate = () => {
        const { email } = this.state
        let errorObject = {};
        if (email.trim() == "") {
            errorObject.email = resources.strings.emailCannotBeEmpty;
        } else if (email && email.trim().length > 100) {
            errorObject.email = resources.strings.email100length;
        } else if (!validateEmail(email && email.trim())) {
            errorObject.email = resources.strings.enterValidEmail;
        }
        this.setState({ error: errorObject });
        return Object.keys(errorObject).length == 0;
    }
}



export default EmailScreen;

