import React, {
	Component,
	PureComponent,
} from 'react';

import {
	Title,
	NavigationBar,
} from "@shoutem/ui";

import {
	FlatList,
} from "react-native";

import {
	Grid,
	Row,
} from "react-native-easy-grid";

import EventList from "./../components/EventList";

import { COLLECTION_TYPE } from '../../utils/const';
import { getCollections } from '../../services/CollectionService';

/**
 * props:
 * onPressItem: function()
 * event: event
 */
// class CollectionItem extends PureComponent {
// 	_onPress = () => {
// 		this.props.onPressItem(this.props.event);
// 	}

// 	render() {
// 		const event = this.props.event;
// 		return (
// 			<TouchableOpacity
// 				onPress={this._onPress}
// 				styleName="flexible"
// 			>
// 				<Card>
// 					<Image
// 						styleName="medium-wide"
// 						source={{ uri: event.image }}
// 					/>
// 					<View styleName="content">
// 						<Subtitle ellipsizeMode="tail" numberOfLines={2}>{event.title}</Subtitle>
// 						<Caption ellipsizeMode="tail" numberOfLines={1}>{event.time_str}</Caption>
// 					</View>
// 				</Card>
// 			</TouchableOpacity>
// 		)
// 	}
// }

export default class MyCollectionsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_id: '',
			collection_type: '',
			collections: null,
			isLoading: false,
		};
	}

	_fetchCollections = async () => {
		this.setState({ isLoading: true });
		const collections = await getCollections(this.state.user_id, COLLECTION_TYPE[this.state.collection_type]);
		// TODO: load more or reload
		this.setState({ collections, isLoading: false });
	}

	_itemCallback = (id) => {
		this.props.navigation.navigate("EventDetails", { id });
	}

	async componentDidMount() {
		const user_id = this.props.navigation.getParam('user_id', '');
		const collection_type = this.props.navigation.getParam('collection_type', COLLECTION_TYPE.like);
		await this.setState({ user_id, collection_type });
		await this._fetchCollections();
	}

	render() {
		return (
			<Grid>
				<Row style={{ height: 70 }}>
					<NavigationBar
						leftComponent={<GoBackButton navigation={this.props.navigation} />}
						centerComponent={<Title>{this.state.collection_type.toUpperCase()}</Title>}
					/>
				</Row>
				<Row>
					<EventList
						events={this.state.collections}
						isLoading={this.state.isLoading}
						fetchEventList={this._fetchCollections}
						callback={this._itemCallback}
						grid={true}
					/>
				</Row>
			</Grid>
		);
	}
}
