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
