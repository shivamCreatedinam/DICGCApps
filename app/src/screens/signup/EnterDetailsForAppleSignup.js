import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import styles from './styles'
import Header from '../../genriccomponents/header/HeaderAndStatusBar'
import Button from '../../genriccomponents/button/Button'
import Input from '../../genriccomponents/input/Input'
import resources from '../../../res';
import { validateEmail, renderInputError } from '../../utility/Utils'
import MaterialInput from '../../genriccomponents/input/MaterialInput';

class EnterDetailsForAppleSignup extends Component {
    constructor(props) {
        super(props)
        this.callback = this.props.route.params.callback ? this.props.route.params.callback : null
        this.userSocialId = this.props.route.params && this.props.route.params.userSocialId ? this.props.route.params.userSocialId : null
        this.userEmail = this.props.route.params && this.props.route.params.userEmail ? this.props.route.params.userEmail : null
        this.name = this.props.route.params && this.props.route.params.name ? this.props.route.params.name : null
        this.state = {
            email: "",
            name: "",
            error: {},
        }
    }

    componentDidMount() {
        this.setState({
            email: this.userEmail,
            name: this.name
        })
    }

    renderHeader = () => {
        return (
            <Header
                headerTitle={resources.strings.User_Details}
                onBackClick={this.onBackClick}

            />
        )
    }
    render() {
        const { email, error, name } = this.state
        return (
            <View style={styles.fullScreen}>
                {this.renderHeader()}
                <KeyboardAvoidingView>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{resources.strings.Below_TEXT}</Text>
                        </View>
                        <MaterialInput
                            label={resources.strings.NAME}
                            // inputStyles={[styles.inputStyle1]}
                            value={name}
                            onChangeText={this.onChangeNameText}
                            error={renderInputError("name", error)}
                            errorKey={"name"}
                            callbackToRemoveError={this.callbackToRemoveError} />
                        <MaterialInput
                            label={resources.strings.EMAIL_ADDRESS}
                            // inputStyles={[styles.inputStyle1]}
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
                error: error
            })
        }
    }
    onContinuePressed = () => {

        const isValid = this.validate();

        if (!isValid) {
            return;
        }
        const { email, name } = this.state
        this.callback(email.trim().toLowerCase(), name, this.userSocialId)

    }
    onBackClick = () => {
        this.props.navigation.goBack()
    }
    onChangeEmailText = (text) => {
        this.setState({ email: text })
    }
    onChangeNameText = (text) => {
        this.setState({ name: text })
    }
    validate = () => {
        const { email, name } = this.state
        let errorObject = {};
        if (name == null) {
            errorObject.name = resources.strings.nameCannotBeEmpty;
        } else if (name && name.trim() == "") {
            errorObject.name = resources.strings.nameCannotBeEmpty;
        }
        if (email && email.trim() == "") {
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



export default EnterDetailsForAppleSignup;

