import React, { Component } from 'react';

import {
	Screen,
	NavigationBar,
	Title,
	Button,
	Icon,
	TouchableOpacity,
	View,
} from '../../node_modules/@shoutem/ui';

class DemoScreen extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Screen>
				<TouchableOpacity onPress={() => console.log("click outside")}>
					<View style={{ height: 300, width: '100%', backgroundColor: '#d9d9d9' }}>
						<Button onPress={() => console.log("click button")}><Title>CLICK ME</Title></Button>
					</View>
				</TouchableOpacity>
			</Screen>
		);
	}
}

export default DemoScreen;