import React, { Component } from 'react';
import {
	createStackNavigator,
	StackNavigator
} from "react-navigation";

import HomeTabNavigation from "./views/navigations/HomeTabNavigation";
import EventDetailsScreen from "./views/screens/EventDetailsScreen";
import LoginScreen from "./views/screens/LoginScreen";
import EventListScreen from "./views/screens/EventListScreen";
import CityPickerScreen from './views/screens/CityPickerScreen';

/**
 * Disable Debug Yellow Warning Box
 */
console.disableYellowBox = true;

export default createStackNavigator({
	HomeTab: {
		screen: HomeTabNavigation,
		navigationOptions: {
			header: null,
		}
	},
	CityPicker: {
		screen: CityPickerScreen,
	},
	EventDetails: {
		screen: EventDetailsScreen,
	},
	Login: {
		screen: LoginScreen,
	},
	EventList: {
		screen: EventListScreen,
	},
}, {
	initialRouteName: 'CityPicker',
});