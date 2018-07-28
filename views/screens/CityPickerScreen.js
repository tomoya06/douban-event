import React, { Component } from 'react';

import {
	MapLocations,
	fetchProvinceCities,
} from "./../../services/CityPickerServices";

import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
} from "react-native"

import {
	Screen,
	Title,
	View,
	Spinner,
} from "@shoutem/ui";

import {
	Grid,
	Row,
	Col,
} from "react-native-easy-grid";

const styles = StyleSheet.create({
	fillParent: {
		height: '100%',
		width: '100%',
	}
})

class CityPickerScreen extends Component {

	static navigationOptions = {
		title: 'City',
	}

	constructor(props) {
		super(props);
		this.state = {
			provinces: MapLocations,
			selectedProvince: '',
			citiesList: [],
		}
	}

	componentDidMount() {
		console.log(this.state.provinces);
	}

	fetchCities = (item) => {
		if (item.item.depth === 0) {
			this.props.navigation.navigate('EventList', { city: item.item.pinyinName });
			return;
		} else {
			if (this.state.selectedProvince === item.item.pinyinName) {
				return;
			} else {
				this.setState({
					selectedProvince: item.item.pinyinName,
					citiesList: [],
				})
				fetchProvinceCities(item.item.pinyinName)
					.then((cities) => {
						this.setState({
							citiesList: cities,
						})
					})
					.catch((error) => {
						// error
					})
			}
		}
	}

	renderProvinceItem = (item) => {
		return (
			<TouchableOpacity
				onPress={this.fetchCities(item)}
				style={{ height: 60, width: '100%' }}
			>
				<Title>{item.item.displayName}</Title>
			</TouchableOpacity>
		)
	}

	renderCityItem = ({ cityItem }) => {

		// TODO: change cityItem.name to correct name
		gotoCityEvent = (cityItem) => {
			this.props.navigation.navigate('EventList', { city: citiItem.name });
			return;
		}

		// TODO: change cityItem.name to correct name
		return (
			<TouchableOpacity
				onPress={gotoCityEvent(cityItem)}
			>
				<Title>{cityItem.name}</Title>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<Grid>
				<Col size={2}>
					<View style={{ height: '100%', width: '100%', backgroundColor: '#d9d9d9' }}>
						<FlatList
							style={{ height: '100%', width: '100%', backgroundColor: '#dddddd' }}
							data={this.state.provinces}
							renderItem={this.renderProvinceItem}
						/>
					</View>
				</Col>
				<Col size={3}>
					{this.state.citiesList.length === 0 && this.state.selectedProvince !== '' ?
						(
							<View>
								<Spinner />
							</View>
						) : (
							<View>

							</View>
						)
					}

				</Col>
			</Grid>
		);
	}
}

export default CityPickerScreen;