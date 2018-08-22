import React, { Component } from 'react';

import {
	View,
	Text,
	Button,
	Icon,
} from "@shoutem/ui";

import { StackNavigator } from "react-navigation";

class MineScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Mine',
		tabBarIcon: ({ tintColor }) => (
			<Icon name="add-to-favorites-off" style={{ color: tintColor }} />
		)
	}

	

	render() {
		return (
			<View styleName="fill-parent">
				<Text>Mine</Text>
				<Button
					onPress={() => this.props.navigation.navigate('Login')}><Text>LOG IN</Text></Button>
			</View>
		);
	}
}

export default MineScreen;