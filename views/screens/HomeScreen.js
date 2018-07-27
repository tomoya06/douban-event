import React, { Component } from 'react';

import {
	View,
	Text,
	Button,
	NavigationBar,
	Title,
	Screen,
	Subtitle,
	TouchableOpacity,
	ImageBackground,
	Overlay
} from "@shoutem/ui";

import { Col, Row, Grid } from "react-native-easy-grid";

import {
	StyleSheet,
} from "react-native";

import FullScaleTouchable from "./../components/FullScaleTouchable";
import HomeEventSlides from "./../components/HomeEventSlides";

class HomeScreen extends Component {

	render() {
		return (
			<Grid>
				<Row size={3}>
					<HomeEventSlides />
				</Row>
				<Row size={2}>
					<Col>
						<FullScaleTouchable
							uri='https://img3.doubanio.com/pview/event_poster/hlarge/public/e068d72d8ad021d.jpg'
							content='Browser' />
					</Col>
					<Col>
						<FullScaleTouchable
							uri='https://img3.doubanio.com/pview/event_poster/raw/public/737fa99450d8a22.jpg'
							content={'Your\nLibrary'} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default HomeScreen;