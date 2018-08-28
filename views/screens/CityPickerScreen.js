import React, { Component } from 'react';

import {
	View,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Text,
} from "react-native";

import {
	Grid,
	Col,
	Row,
} from "react-native-easy-grid";

import {
	Spinner,
	Divider,
	Heading,
	NavigationBar,
	Icon,
	Title,
	Subtitle,
	Screen,
	Button,
} from "@shoutem/ui"

import GoBackButton from "./../components/GoBackButton";

import {
	MapLocations,
	fetchProvinceCities,
} from "./../../services/CityPickerServices";

import {
	setLocation, getLocation,
} from "./../../services/StorageService";

import commonStyles from "./../styles/commonStyles";
import { toastMsg } from '../../services/UtilServices';

/**
 * props:
 * onPressItem: function(this.props.pinyinName, this.props.depth) 
 * id: pinyinName or cityID
 * displayName: displayName
 * depth: isProvince: 1, isDirectCity: 0, isSubCity: 2,
 */
class PCListItem extends React.PureComponent {
	_onPress = () => {
		this.props.onPressItem(this.props.id, this.props.displayName, this.props.depth);
	}

	render() {
		return (
			<TouchableOpacity
				style={commonStyles.listItem}
				onPress={this._onPress}
			>
				<Subtitle>{this.props.displayName}</Subtitle>
			</TouchableOpacity>
		)
	}
}

/**
 * props:
 * provinces: for data binding
 * onLoadedCities: let parent node update sub-cities.
 * navigate: function(pinyinName)
 * loadingCities: function(boolean)
 */
class ProvinceList extends React.PureComponent {

	_onPressItem = (pinyinName, displayName, depth) => {
		console.log(pinyinName, displayName, depth);
		this.props.loadingCities(true);
		if (depth === 0) {
			// navigate to event list screen
			this.props.navigate(pinyinName, displayName);
		} else {
			// fetch sub cities
			fetchProvinceCities(pinyinName)
				.then((response) => {
					this.props.onLoadedCities(response);
				})
				.finally(() => {
					this.props.loadingCities(false);
				})
		}
	}

	_keyExtractor = (item) => {
		return item.pinyinName;
	}

	_renderItem = ({ item }) => {
		return (
			<PCListItem
				onPressItem={this._onPressItem}
				displayName={item.displayName}
				id={item.pinyinName}
				depth={item.depth}
			/>
		)
	}

	render() {
		return (
			<FlatList
				style={[commonStyles.fillParent, commonStyles.parentList]}
				data={this.props.provinces}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				ItemSeparatorComponent={() => (<Divider styleName="line" />)}
			/>
		)
	}
}

/**
 * props
 * cities: cities
 * navigate: function(pinyinName)
 */
class CityList extends React.PureComponent {

	_keyExtractor = (item) => {
		return item.id;
	}

	_onPressItem = (id, displayName, depth) => {
		this.props.navigate(id, displayName);
	}

	_renderItem = ({ item }) => {
		return (
			<PCListItem
				onPressItem={this._onPressItem}
				id={item.id}
				displayName={item.name}
				depth={2}
			/>
		)
	}

	render() {
		return (
			<FlatList
				style={[commonStyles.fillParent]}
				data={this.props.cities}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				ItemSeparatorComponent={() => (<Divider styleName="line" />)}
			/>
		);
	}
}

class SpinnerView extends Component {
	render() {
		return (
			<View style={commonStyles.container}>
				<Spinner size="large" />
			</View>
		)
	}
}

class CityPickerScreen extends Component {

	static navigationOptions = {
		title: '城市',
	}

	constructor(props) {
		super(props);

		this.state = {
			provinces: MapLocations,
			subCities: [],
			isLoadingCities: false,
		}
	}

	_onLoadedCities = (response) => {
		console.log(response);
		this.setState({
			subCities: response,
		})
	}

	_loadingCities = (flag) => {
		if (flag) {
			this.setState({
				isLoadingCities: true,
			})
		} else {
			this.setState({
				isLoadingCities: false,
			})
		}
	}

	_navigate = async (id, displayName) => {
		const setResult = await setLocation({ id, displayName });
		if (setResult) {
			toastMsg(`Set Default Location To ${displayName}`);
			this.props.navigation.goBack();
		}
	}

	render() {
		return (
			<Grid>
				<Row style={{ height: 70 }}>
					<NavigationBar
						leftComponent={<GoBackButton navigation={this.props.navigation}/>}
						centerComponent={<Title>CITY</Title>}
					/>
				</Row>
				<Row>
					<Col size={2}>
						<ProvinceList
							provinces={this.state.provinces}
							onLoadedCities={this._onLoadedCities}
							navigate={this._navigate}
							loadingCities={this._loadingCities}
						/>
					</Col>
					<Col size={3}>
						{this.state.isLoadingCities ?
							(
								<SpinnerView />
							) : (
								<CityList
									cities={this.state.subCities}
									navigate={this._navigate}
								/>
							)}

					</Col>
				</Row>
			</Grid>
		);
	}
}

export default CityPickerScreen;