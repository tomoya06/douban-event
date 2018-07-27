import {
	createBottomTabNavigator,
	TabNavigator,
} from 'react-navigation';

import HomeScreen from "./../screens/HomeScreen";
import MineScreen from "./../screens/MineScreen";

// const HomeTabNavigation = TabNavigator({
// 	Home: {
// 		screen: HomeScreen
// 	},
// 	Mine: {
// 		screen: MineScreen
// 	}, 
// }, {
// 	tabBarPosition: 'bottom',
// 	animationEnabled: true,
// 	tabBarOptions: {
// 		activeTintColor: '#d9d9d9',
// 		showIcon: false,
// 	}
// })

// export default HomeTabNavigation;

export default createBottomTabNavigator({
	Home: {
		screen: HomeScreen,
	},
	Mine: {
		screen: MineScreen,
	},
}, {
	tabBarOptions: {
		style: {
			backgroundColor: '#000'
		},
		activeTintColor: '#fff',
		inactiveTintColor: '#d9d9d9',
	}
})