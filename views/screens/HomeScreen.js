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
						uri={'https://img3.doubanio.com/pview/event_poster/raw/public/bedeea7a97c7174.jpg'}
						content={'豆瓣同城'}
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
							uri={event.image_hlarge}
							content={event.title}
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
		if (loc.id === this.state.locID) { return false; }
		if (loc === null) {
			// console.log("No location in storage. Use default Guangzhou. ");
			this.setState({
				locID: DEFAULT_LOCATION.id,
				locDisplayName: DEFAULT_LOCATION.displayName,
			})
		} else {
			// console.log("location: ", loc.displayName, " id: ", loc.id);
			this.setState({
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
							uri='https://img3.doubanio.com/pview/event_poster/hlarge/public/e068d72d8ad021d.jpg'
							content={<Tile><Title>Browser</Title><Subtitle>@{this.state.locDisplayName}</Subtitle></Tile>}
							callback={this._gotoEventList} />
					</Col>
					<Col>
						<FullScaleTouchable
							uri='https://img3.doubanio.com/pview/event_poster/raw/public/737fa99450d8a22.jpg'
							content={<Tile><Title>Your</Title><Title>Library</Title></Tile>}
							callback={null} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default HomeScreen;