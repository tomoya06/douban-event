import React, { Component } from 'react';
import {
	createStackNavigator,
	StackNavigator
} from "react-navigation";

import HomeTabNavigation from "./views/navigations/HomeTabNavigation";
import EventDetailsScreen from "./views/screens/EventDetailsScreen";
import LoginScreen from "./views/screens/LoginScreen";
import EventFilterScreen from "./views/screens/EventFilterScreen";

export default createStackNavigator({
	HomeTab: {
		screen: HomeTabNavigation,
		navigationOptions: {
			header: null,
		}
	},
	EventDetails: {
		screen: EventDetailsScreen,
	},
	Login: {
		screen: LoginScreen,
	},
	EventFilter: {
		screen: EventFilterScreen,
	}
});