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

import GoBackButton from './../components/GoBackButton'

import {
	getLocation,
} from "./../../services/StorageService";

import {
	EVENT_DAY_TYPES,
	EVENT_TYPES,
	fetchCityEvents,
} from "./../../services/EventServices";

const DEFAULT_LOCATION = {
	id: '118281',
	displayName: '广州'
}

const styles = StyleSheet.create({

})

/**
 * props:
 * event: event object {title, time_str, image_hlarge, category_name, id}
 * onPress: function
 */
class EventItem extends React.PureComponent {

	_onPress = () => {
		this.props.onPressItem(this.props.event);
	}

	render() {
		return (
			<TouchableOpacity
				onPress={this._onPress}
			>
				<ImageBackground
					styleName="large-ultra-wide"
					source={{ uri: this.props.event.image_hlarge }}
				>
				</ImageBackground>
				<View styleName="content md-gutter">
					<Title>{this.props.event.title}</Title>
					<View styleName="horizontal space-between sm-gutter-top">
						<Caption>{this.props.event.category_name}</Caption>
						<Caption>    </Caption>
						<Caption>{this.props.event.time_str}</Caption>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

/**
 * props:
 * events: events
 *
 */
class EventList extends React.PureComponent {

	_onPressItem = (event) => {
		// navigate to event detail
		console.log(event.title);
	}

	_renderItem = ({ item }) => {
		return (
			<EventItem
				event={item}
				onPressItem={this._onPressItem}
			/>
		)
	}

	_keyExtrator = (item) => {
		return item.id;
	}

	// TODO: pull-down refresh and touch-bottom load more.
	render() {
		return (
			<FlatList
				data={this.props.events}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtrator}
				ItemSeparatorComponent={() => <Divider styleName="section-header" />}
			/>
		)
	}
}

class EventFilterScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			locID: null,
			locDisplayName: '',
			day_type: 0,
			event_type: 0,
			eventList: [],
		}
	}

	_getLocation = async () => {
		const loc = await getLocation();
		if (loc === null || loc === undefined) {
			console.log("No location in storage. Use default Guangzhou. ");
			this.setState({
				locID: DEFAULT_LOCATION.id,
				locDisplayName: DEFAULT_LOCATION.displayName,
			})
		} else {
			console.log("location: ", loc.displayName, " id: ", loc.id);
			this.setState({
				locID: loc.id,
				locDisplayName: loc.displayName,
			})
		}
	}

	_fetchEventList = async () => {
		try {
			const fetchResult = await fetchCityEvents(
				this.state.locID, EVENT_DAY_TYPES[this.state.day_type], EVENT_TYPES[this.state.event_type]
			);
			this.setState({
				eventList: fetchResult.events,
			})
		} catch (error) {
			// error callback
		}
	}

	async componentDidMount() {
		await this._getLocation();
		await this._fetchEventList();
	}

	_rightComponent = () => (
		<Button onPress={() => this.props.navigation.navigate('CityPicker')}>
			<Subtitle>{this.state.locDisplayName}</Subtitle><Icon name="pin" />
		</Button>
	)

	_centerComponent = () => (
		<Title>EVENTS</Title>
	)

	_filterArea = () => (
		<Row style={{height: 50}}>
			<Col>
				<View styleName="horizontal h-center v-center overlay fill-parent">
					<Icon name="events" />
					<DropDownMenu
						options={EVENT_DAY_TYPES}
						selectedOption={EVENT_DAY_TYPES[this.state.day_type]}
						onOptionSelected={(date) => console.log(date)}
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
						selectedOption={EVENT_TYPES[this.state.event_type]}
						onOptionSelected={(type) => console.log(type)}
						titleProperty="displayName"
						valueProperty="typeName"
					/>
				</View>
			</Col>
		</Row>
	)

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
					/>
				</Row>
				{this._filterArea()}
			</Grid >
		);
	}
}

export default EventFilterScreen;