import React, { Component } from 'react';

import {
	StyleSheet,
	FlatList,
} from "react-native";

import {
	View,
	Button,
	NavigationBar,
	ImageBackground,
	Overlay,
	Tile,
	DropDownMenu,
	Icon,
	TouchableOpacity,
	Title,
	Subtitle,
	Caption,
	Divider,
	Row as ShRow,
} from "@shoutem/ui";

import {
	Grid,
	Row,
	Col,
} from "react-native-easy-grid";

import GoBackButton from './../components/GoBackButton';
import EventList from "./../components/EventList";

import {
	getLocation,
} from "./../../services/StorageService";

import {
	EVENT_DAY_TYPES,
	EVENT_TYPES,
	fetchCityEvents,
} from "./../../services/EventServices";


import { DEFAULT_LOCATION } from "./../../utils/const";

import { removeDuplicated } from "./../../utils/arrayUtil";

class EventFilterScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			locID: '',
			locDisplayName: '',
			day_type: EVENT_DAY_TYPES[0],
			event_type: EVENT_TYPES[0],
			eventList: [],
			isLoading: false,
		}

		this.evnetIDlist = [];
	}

	_willFocusHandler = async () => {
		const locUpdateRes = await this._getLocation();
		if (!locUpdateRes) { return; }
		await this._fetchEventListAsync();
	}

	componentWillMount() {
		this.willFocusListener = this.props.navigation.addListener('willFocus', this._willFocusHandler)
	}

	componentWillUnmount() {
		this.willFocusListener.remove();
	}

	_getLocation = async () => {
		const loc = await getLocation();
		if (loc === null) {
			// console.log("No location in storage. Use default Guangzhou. ");
			this.setState({
				locID: DEFAULT_LOCATION.id,
				locDisplayName: DEFAULT_LOCATION.displayName,
			})
		} else {
			// console.log("location: ", loc.displayName, " id: ", loc.id);
			if (loc.id === this.state.locID) { return false; }
			this.setState({
				locID: loc.id,
				locDisplayName: loc.displayName,
			})
		}
		return true;
	}

	_fetchEventListAsync = async (loadMore = false) => {
		this.setState({ isLoading: true });
		const [error, fetchResult] = await fetchCityEvents(
			this.state.locID,
			this.state.day_type.typeName || '',
			this.state.event_type.typeName || '',
			loadMore ? this.state.eventList.length : 0
		);

		this.setState({ isLoading: false });
		if (error) {
			console.warn(error);
			return;
		}

		const _newList = loadMore ? (
			fetchResult.total > this.state.eventList.length ?
				[...this.state.eventList, ...fetchResult.events] :
				this.state.eventList
		) : fetchResult.events;

		removeDuplicated(_newList, 'id');
		this.setState({
			eventList: _newList,
		})

	}

	_selectDate = async (date) => {
		console.log(date);
		this.setState({
			day_type: date,
		}, async () => {
			await this._fetchEventListAsync();
		})
	}

	_selectType = async (type) => {
		this.setState({
			event_type: type,
		}, async () => {
			await this._fetchEventListAsync();
		})
	}

	_rightComponent = () => (
		<Button onPress={() => this.props.navigation.navigate('CityPicker')}>
			<Subtitle>{this.state.locDisplayName}</Subtitle><Icon name="pin" />
		</Button>
	)

	_centerComponent = () => (
		<Title>LIST</Title>
	)

	_filterArea = () => (
		<Row style={{ height: 50 }}>
			<Col>
				<View styleName="horizontal h-center v-center overlay fill-parent">
					<Icon name="events" />
					<DropDownMenu
						options={EVENT_DAY_TYPES}
						selectedOption={this.state.day_type}
						onOptionSelected={(date) => this._selectDate(date)}
						titleProperty="displayName"
						valueProperty="typeName"
					/>
				</View>
			</Col>
			<Col>
				<View styleName="horizontal h-center v-center fill-parent">
					<Icon name="books" />
					<DropDownMenu
						options={EVENT_TYPES}
						selectedOption={this.state.event_type}
						onOptionSelected={(type) => this._selectType(type)}
						titleProperty="displayName"
						valueProperty="typeName"
					/>
				</View>
			</Col>
		</Row>
	)

	_itemCallback = (id) => {
		this.props.navigation.navigate('EventDetails', { id });
	}

	render() {
		return (
			<Grid>
				<Row style={{ height: 70 }}>
					<NavigationBar
						leftComponent={<GoBackButton navigation={this.props.navigation} />}
						centerComponent={this._centerComponent()}
						rightComponent={this._rightComponent()}
					/>
				</Row>
				<Row>
					<EventList
						events={this.state.eventList}
						isLoading={this.state.isLoading}
						fetchEventList={this._fetchEventListAsync}
						callback={this._itemCallback}
						grid={true}
					/>
				</Row>
				{this._filterArea()}
			</Grid >
		);
	}
}

export default EventFilterScreen;