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

const styles = StyleSheet.create({

})

/**
 * props:
 * event: event object {title, time_str, image_hlarge, category_name, id}
 * onPress: function
 */
// class EventItem extends React.PureComponent {

// 	_onPress = () => {
// 		this.props.onPressItem(this.props.event);
// 	}

// 	render() {
// 		return (
// 			<TouchableOpacity
// 				onPress={this._onPress}
// 			>
// 				<ImageBackground
// 					styleName="large-ultra-wide"
// 					source={{ uri: this.props.event.image_hlarge }}
// 				>
// 				</ImageBackground>
// 				<View styleName="content md-gutter">
// 					<Title>{this.props.event.title}</Title>
// 					<View styleName="horizontal space-between sm-gutter-top">
// 						<Caption>{this.props.event.category_name}</Caption>
// 						<Caption>    </Caption>
// 						<Caption>{this.props.event.time_str}</Caption>
// 					</View>
// 				</View>
// 			</TouchableOpacity>
// 		);
// 	}
// }

// /**
//  * props:
//  * events: events
//  * isLoading: for flatlist to show loading
//  * fetchEventList: function(flag: boolean). trigger parent's fetch new list. flag=true: load more. flag=false: reload
//  *
//  */
// class EventList extends React.PureComponent {

// 	_onPressItem = (event) => {
// 		// console.log(event.title);
// 		this.props.navigation.navigate('EventDetails', { id: event.id })
// 	}

// 	_renderItem = ({ item }) => {
// 		return (
// 			<EventItem
// 				event={item}
// 				onPressItem={this._onPressItem}
// 			/>
// 		)
// 	}

// 	_keyExtrator = (item) => {
// 		return item.id;
// 	}

// 	// FIXME: what does this mean?
// 	componentDidUpdate() {
// 		if (typeof this.props.event !== 'undefined') {
// 			this._flatlistRef.scrollToIndex({ animated: true, index: 0 });
// 		}
// 	}

// 	// TODO: pull-down refresh and touch-bottom load more.
// 	render() {
// 		return (
// 			<FlatList
// 				ref={(ref) => { this._flatlistRef = ref; }}
// 				data={this.props.events}
// 				renderItem={this._renderItem}
// 				keyExtractor={this._keyExtrator}
// 				ItemSeparatorComponent={() => <Divider styleName="section-header" />}
// 				refreshing={this.props.isLoading}
// 				onRefresh={() => this.props.fetchEventList(false)}
// 				onEndReached={() => this.props.fetchEventList(true)}
// 				onEndReachedThreshold={0.2}
// 			/>
// 		)
// 	}
// }

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
	}

	componentWillMount() {
		this.willFocusListener = this.props.navigation.addListener('willFocus', async payload => {
			const locUpdateRes = await this._getLocation();
			if (!locUpdateRes) { return; }
			await this._fetchEventListAsync();
		})
	}

	componentWillUnmount() {
		this.willFocusListener.remove();
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
			return ;
		}

		const _newList = loadMore ? (
			fetchResult.total > this.state.eventList.length ?
				[...this.state.eventList, ...fetchResult.events] :
				this.state.eventList
		) : fetchResult.events;
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
		this.props.navigation.navigate('EventDetails', {id});
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
						grid={false}
					/>
				</Row>
				{this._filterArea()}
			</Grid >
		);
	}
}

export default EventFilterScreen;