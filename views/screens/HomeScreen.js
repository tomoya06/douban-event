import React, { Component } from 'react';

import {
	View,
	Icon,
	Tile,
	Title,
	Subtitle,
} from "@shoutem/ui";

import { Col, Row, Grid } from "react-native-easy-grid";

import Swiper from "react-native-swiper";

import {
	StyleSheet,
} from "react-native";

import FullScaleTouchable from "./../components/FullScaleTouchable";

import {
	fetchCityEvents,
} from "./../../services/EventServices";

import {
	autoLogin,
} from "./../../services/UserServices";
import { getLocation } from '../../services/StorageService';
import { DEFAULT_LOCATION } from '../../utils/const';

/**
 * props:
 * events: event list
 * eventCallback: function(id)
 */
class HomeEventSlides extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.events.length === 0) {
			return (
				<View style={{ flex: 1 }}>
					<FullScaleTouchable
						source={{ uri: 'https://img3.doubanio.com/pview/event_poster/raw/public/bedeea7a97c7174.jpg' }}
						content={<Title>豆瓣同城</Title>}
						callback={null}
					/>
				</View>
			)
		}
		return (
			<Swiper style={{ flex: 1 }}>
				{this.props.events.map((event) => (
					<View style={{ flex: 1 }} key={event.id}>
						<FullScaleTouchable
							source={{ uri: event.image_hlarge }}
							content={<Title>{event.title}</Title>}
							callback={() => this.props.eventCallback(event.id)}
						/>
					</View>
				))}
			</Swiper>
		);
	}
}

class HomeScreen extends Component {

	static navigationOptions = {
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => (
			<Icon name="home" style={{ color: tintColor }} />
		)
	}

	constructor(props) {
		super(props);

		this.state = {
			events: [],
			isLoading: false,
			locID: '',
			locDisplayName: '',
		}
	}

	_fetchEventListAsync = async () => {
		const [error, fetchResult] = await fetchCityEvents(this.state.locID, '', '', 0);

		if (error) {
			console.warn(error);
			return;
		}

		this.setState({ events: fetchResult.events });
	}

	_gotoEventDetails = (id) => {
		this.props.navigation.navigate('EventDetails', { id });
	}

	_gotoEventList = () => {
		this.props.navigation.navigate('EventList');
	}

	_getLocation = async () => {
		const loc = await getLocation();
		if (loc === null) {
			// console.log("No location in storage. Use default Guangzhou. ");
			await this.setState({
				locID: DEFAULT_LOCATION.id,
				locDisplayName: DEFAULT_LOCATION.displayName,
			})
		} else {
			if (loc.id === this.state.locID) { return false; }
			// console.log("location: ", loc.displayName, " id: ", loc.id);
			await this.setState({
				locID: loc.id,
				locDisplayName: loc.displayName,
			})
		}
		return true;
	}

	componentDidMount() {
		this.willFocusListener = this.props.navigation.addListener('willFocus', async payload => {
			const locUpdateRes = await this._getLocation();
			if (!locUpdateRes) { return; }
			await this._fetchEventListAsync();
		})
	}

	componentWillUnmount() {
		this.willFocusListener.remove();
	}

	// TODO: change 2 cover to living image
	// TODO: add pulldown refresh
	render() {
		return (
			<Grid>
				<Row size={3}>
					<HomeEventSlides
						events={this.state.events}
						eventCallback={this._gotoEventDetails}
					/>
				</Row>
				<Row size={2}>
					<Col>
						<FullScaleTouchable
							source={{ uri: 'https://img3.doubanio.com/pview/event_poster/hlarge/public/e068d72d8ad021d.jpg' }}
							content={<View styleName="clear vertical h-center"><Title>Browser</Title><Subtitle>@{this.state.locDisplayName}</Subtitle></View>}
							callback={this._gotoEventList} />
					</Col>
					<Col>
						<FullScaleTouchable
							source={{ uri: 'https://img3.doubanio.com/pview/event_poster/raw/public/737fa99450d8a22.jpg' }}
							content={<View styleName="clear vertical h-center"><Title>Your</Title><Title>Library</Title></View>}
							callback={null} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default HomeScreen;