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
import { toastMsg } from '../../services/UtilServices';

import I18n from "./../../i18n/translate";

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
		toastMsg("Oops...Something is missing.");
	}

	_loginFailAlert = () => {
		toastMsg("Oops...please try again later.");
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
					<Text>{I18n.t('login')}</Text>
					{!this.state.isLoading ? (<Icon name="right-arrow" />) : (<Spinner style={{ color: '#fff' }} />)}
				</Button>
				{this.state.isLoginSuccess && (
					<Button styleName="clear muted md-gutter-top" disabled={true}>
						<Text>{I18n.fallbacks('login')+I18n.t('success')}...</Text>
					</Button>
				)}

			</View>
		);
	}
}

export default LoginScreen;