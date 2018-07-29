import React, { Component } from 'react';

import {
	Icon,
	Button,
} from "@shoutem/ui";

/**
 * props:
 * navigation: for navigation
 */
class GoBackButton extends Component {

	_onPress = () => {
		this.props.navigation.goBack();
	}

	render() {
		return (
			<Button onPress={this._onPress}><Icon name="back"/></Button>
		);
	}
}

export default GoBackButton;