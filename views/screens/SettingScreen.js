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

export default class SettingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	_logoutHandler = async () => {
		const logoutRes = await userLogoutService();
		if (logoutRes) {
			toastMsg("Log Out Success.");
			this.props.navigation.goBack();
		}
	}

	render() {
		return (
			<Grid>
				<Row style={{ height: 70 }}>
					<NavigationBar
						leftComponent={<GoBackButton navigation={this.props.navigation} />}
						centerComponent={<Title>SETTINGS</Title>}
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
								<Text>Log Out</Text>
								<Icon styleName="disclosure" name="right-arrow" />
							</ShRow>
						</TouchableOpacity>
					</ScrollView>
				</Row>
			</Grid>
		);
	}
}
