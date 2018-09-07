import React, { Component } from 'react';
import {
	View,
	Row as ShRow,
	Title,
	Divider,
	Icon,
	Text,
	TouchableOpacity,
	NavigationBar,
	Tile,
} from "@shoutem/ui";

import {
	Grid,
	Row,
} from "react-native-easy-grid";

import {
	ScrollView,
} from "react-native";

import GoBackButton from "./../components/GoBackButton";
import { toastMsg } from "./../../services/UtilServices";

import { userLogoutService } from '../../services/UserServices';

import I18n from "./../../i18n/translate";

import { openBrowser } from "./../../services/UtilServices";
import { PROJECT_GITHUB } from '../../utils/const';

export default class SettingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	_logoutHandler = async () => {
		const logoutRes = await userLogoutService();
		if (logoutRes) {
			this.props.navigation.goBack();
		}
	}

	_gotoGithub = () => {
		openBrowser(PROJECT_GITHUB);
	}

	render() {
		return (
			<Grid>
				<Row style={{ height: 70 }}>
					<NavigationBar
						leftComponent={<GoBackButton navigation={this.props.navigation} />}
						centerComponent={<Title>{I18n.t('setting')}</Title>}
					/>
				</Row>
				<Row>
					<ScrollView>
						<Divider styleName="section-header" />
						<TouchableOpacity
							onPress={() => this._gotoGithub()}
						>
							<ShRow styleName="small">
								<Icon name="github" />
								<Text>{I18n.t('github')}</Text>
								<Icon styleName="disclosure" name="right-arrow" />
							</ShRow>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this._logoutHandler()}
						>
							<ShRow styleName="small">
								<Icon name="exit-to-app" />
								<Text>{I18n.t('logout')}</Text>
								<Icon styleName="disclosure" name="right-arrow" />
							</ShRow>
						</TouchableOpacity>
					</ScrollView>
				</Row>
			</Grid>
		);
	}
}
