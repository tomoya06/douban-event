import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	Subtitle,
	Button,
	Icon,
	Spinner,
	Tile,
} from "@shoutem/ui";

import {
	Alert,
	StyleSheet,
} from "react-native";

import {
	userLoginService,
} from "./../../services/UserServices";

class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			isLoading: false,
			isLoginSuccess: false,
		}
	}

	_inputMissingAlert = () => {
		const title = 'oops...';
		const msg = 'Something is missing.';
		const cancel_btn = {
			text: 'AH HA',
			style: 'Cancel'
		}
		Alert.alert(title, msg, [cancel_btn]);
	}

	_loginFailAlert = () => {
		const title = 'oops...';
		const msg = 'Fail to login. Try again please.';
		const cancel_btn = {
			text: 'ALRIGHT',
			style: 'Cancel'
		}
		Alert.alert(title, msg, [cancel_btn]);
	}

	_submitLogin = async () => {
		try {
			this.setState({ isLoading: true });
			if (this.state.username == '' || this.state.password == '') {
				this._inputMissingAlert();
				throw new Error('input missing');
			}
			const loginRes = await userLoginService(this.state.username, this.state.password);
			if (!loginRes) {
				this._loginFailAlert();
				throw new Error('login fail');
			}
			// navigate to previous page...
			console.log('login success');
			this.setState({ isLoginSuccess: true });
			this.props.navigation.goBack();
		} catch (error) {
			console.log(error);
			this.setState({ isLoading: false });
			return null;
		}
	}

	render() {
		return (
			<View styleName="fill-parent md-gutter">
				<Subtitle
					styleName="h-center lg-gutter-vertical"
				>LOGIN WITH DOUBAN</Subtitle>
				<TextInput
					placeholder={'USERNAME'}
					onChangeText={(username) => this.setState({ username })}
					returnKeyType='next'
					returnKeyLabel='next'
					onSubmitEditing={() => this._submitLogin()}
				/>
				<TextInput
					placeholder={'PASSWORD'}
					secureTextEntry
					onChangeText={(password) => this.setState({ password })}
					returnKeyLabel='done'
					returnKeyType='done'
					onSubmitEditing={() => this._submitLogin()}
					styleName="sm-gutter-top"
				/>
				<Button
					styleName='secondary md-gutter-top '
					disabled={this.state.isLoading}
					onPress={() => this._submitLogin()}
				>
					<Text>LOGIN</Text>
					{!this.state.isLoading ? (<Icon name="right-arrow" />) : (<Spinner style={{ color: '#fff' }} />)}
				</Button>
				{this.state.isLoginSuccess && (
					<Button styleName="clear muted md-gutter-top" disabled={true}>
						<Text>LOGIN SUCCESS...</Text>
					</Button>
				)}

			</View>
		);
	}
}

export default LoginScreen;