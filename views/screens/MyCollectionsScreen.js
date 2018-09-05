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
import GoBackButton from "./../components/GoBackButton";

import { COLLECTION_TYPE } from '../../utils/const';
import { getCollections } from '../../services/CollectionService';
import { removeDuplicated } from '../../utils/arrayUtil';

import I18n from "./../../i18n/translate";

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

	_fetchCollections = async (loadmore) => {
		this.setState({ isLoading: true });

		let _index = loadmore ? this.state.collections.length : 0;
		const [error, collectionRes] = await getCollections(this.state.user_id, this.state.collection_type, _index);

		if (error) {
			this.setState({ isLoading: false });
			return;
		}

		const _newCollections = loadmore ? (
			collectionRes.total > this.state.collections.length ?
				[...this.state.collections, ...collectionRes.events] :
				this.state.collections
		) : collectionRes.events;

		removeDuplicated(_newCollections, 'id');

		this.setState({ collections: _newCollections, isLoading: false });
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
						centerComponent={<Title>{I18n.t(COLLECTION_TYPE[this.state.collection_type])}</Title>}
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
