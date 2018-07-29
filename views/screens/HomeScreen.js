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

import Swiper from "react-native-swiper";

import {
	StyleSheet,
} from "react-native";

import FullScaleTouchable from "./../components/FullScaleTouchable";

class HomeEventSlides extends Component {

	constructor(props) {
		super(props);

		this.state = {
			events: [],
		}
	}

	componentDidMount() {
		var events = fetch('https://api.douban.com/v2/event/list?loc=shanghai')
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					events: json.events,
				})
			})
			.catch((error) => console.log(error))
	}

	render() {
		if (this.state.events.length === 0) {
			return (
				<View style={{ height: '100%', width: '100%' }}>
					<FullScaleTouchable
						uri={'https://img3.doubanio.com/pview/event_poster/raw/public/bedeea7a97c7174.jpg'}
						content={'豆瓣同城'}
						callback={null}
					/>
				</View>
			)
		}
		return (
			<Swiper style={{ height: '100%', width: '100%' }}>
				{this.state.events.map((event) => (
					<View style={{ flex: 1 }} key={event.id}>
						<FullScaleTouchable
							uri={event[KW_LImage]}
							content={event[KW_Title]}
							callback={null}
						/>
					</View>
				))}
			</Swiper>
		);
	}
}

class HomeScreen extends Component {

	// TODO : change 2 cover to living image
	// TODO : COmmon stylesheets
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