import React, { Component } from 'react';

import {
	Icon,
	Tile,
	Title,
	Subtitle,
	View,
} from "@shoutem/ui";

import { Col, Row, Grid } from "react-native-easy-grid";

import Swiper from "react-native-swiper";

import ProgressBar from "react-native-progress/Bar";

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
import { getLocation, setLocation } from '../../services/StorageService';
import { DEFAULT_LOCATION } from '../../utils/const';
import FullScaleLoading from '../components/FullScaleLoading';

import I18n from "./../../i18n/translate";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

/**
 * props:
 * events: event list
 * eventCallback: function(id)
 * reloadCallback: function()
 * isLoading: boolean
 * loadFail: boolean
 */
class HomeEventSlides extends Component {

	constructor(props) {
		super(props);
	}

	_content = () => {
		if (this.props.isLoading) {
			return (
				<FullScaleLoading />
			)
		}
		if (this.props.loadFail) {
			return (
				<FullScaleTouchable
					source={require('./../../src/img/black.jpg')}
					content={<Title>{I18n.t('clickToReload')}</Title>}
					callback={this.props.reloadCallback}
				/>
			)
		} else {
			return (
				<FullScaleTouchable
					source={require('./../../src/img/black.jpg')}
					content={<Title>{I18n.t('appTitle')}</Title>}
					callback={this.props.reloadCallback}
				/>
			)
		}
	}

	_swiperItemContent = (_event) => {
		return (
			<View styleName="clear vertical h-center">
				<Title>{_event.title}</Title>
				<View styleName='md-gutter-bottom'></View>
				<Subtitle>{_event.time_str}</Subtitle>
				<Subtitle>{_event.address}</Subtitle>
			</View>
		)
	}

	render() {
		if (this.props.events.length === 0 || this.props.isLoading) {
			return (
				<View style={{ flex: 1, backgroundColor: '#000' }}>
					{this._content()}
				</View>
			);
		}
		return (
			<Swiper
				style={{ flex: 1 }}
				autoplay={true}
				autoplayTimeout={3}
				autoplayDirection={true}
			>
				{this.props.events.map((event) => (
					<View style={{ flex: 1 }} key={event.id}>
						<FullScaleTouchable
							source={{ uri: event.image_hlarge }}
							content={this._swiperItemContent(event)}
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
		tabBarLabel: I18n.t('home'),
		tabBarIcon: ({ tintColor }) => (
			<Icon name="home" style={{ color: tintColor }} />
		)
	}

	constructor(props) {
		super(props);

		this.state = {
			events: [],
			isLoading: false,
			explore_bg: 'https://img3.doubanio.com/pview/event_poster/hlarge/public/e068d72d8ad021d.jpg',
			locID: '',
			locDisplayName: '',
			loadHomeFail: false,
		}
	}

	_fetchEventListAsync = async () => {
		await this.setState({
			isLoading: true,
		})
		const [error, fetchResult] = await fetchCityEvents(this.state.locID, '', '', 0, 11);
		this.setState({
			isLoading: false,
		})

		if (error) {
			this.setState({ loadHomeFail: true });
		} else {
			this.setState({
				events: fetchResult.events.slice(0, 9),
				explore_bg: fetchResult.events[10].image_hlarge,
			});
		}
	}

	_gotoEventDetails = (id) => {
		this.props.navigation.navigate('EventDetails', { id });
	}

	_gotoEventList = () => {
		this.props.navigation.navigate('EventList');
	}

	_gotoMine = () => {
		this.props.navigation.navigate('Mine');
	}

	_getLocation = async () => {
		const loc = await getLocation();
		console.log(loc);
		if (loc === null) {
			// console.log("No location in storage. Use default Guangzhou. ");
			await setLocation({
				id: DEFAULT_LOCATION.id,
				displayName: DEFAULT_LOCATION.displayName,
			})
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
			if (!locUpdateRes) { console.log('same location'); return; }
			await this._fetchEventListAsync();
		})
	}

	componentWillUnmount() {
		this.willFocusListener.remove();
	}

	// TODO: change 2 cover to living image
	render() {
		return (
			<Grid>
				<Row size={3}>
					<HomeEventSlides
						isLoading={this.state.isLoading}
						loadFail={this.state.loadHomeFail}
						reloadCallback={this._fetchEventListAsync}
						events={this.state.events}
						eventCallback={this._gotoEventDetails}
					/>
				</Row>
				<Row size={2}>
					<Col>
						<FullScaleTouchable
							source={{ uri: this.state.explore_bg }}
							content={<View styleName="clear vertical h-center"><Title>{I18n.t('browser')}</Title><Subtitle>@{this.state.locDisplayName}</Subtitle></View>}
							callback={this._gotoEventList} />
					</Col>
					<Col>
						<FullScaleTouchable
							source={{ uri: 'https://img3.doubanio.com/pview/event_poster/raw/public/737fa99450d8a22.jpg' }}
							content={<View styleName="clear vertical h-center"><Title>{I18n.t('library')}</Title></View>}
							callback={this._gotoMine} />
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default HomeScreen;