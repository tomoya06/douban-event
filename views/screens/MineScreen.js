import React, { Component } from 'react';

import {
	View,
	Text,
	Button,
	Icon,
	Tile,
	Image,
	Title,
	Subtitle,
} from "@shoutem/ui";

import { Grid, Row, Col } from 'react-native-easy-grid';

import FullScaleTouchable from '../components/FullScaleTouchable';

import { fetchMeInfoService, fetchMEinfoAsync } from '../../services/UserServices';
import { COLLECTION_TYPE } from '../../utils/const';

class MineScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Mine',
		tabBarIcon: ({ tintColor }) => (
			<Icon name="add-to-favorites-on" style={{ color: tintColor }} />
		)
	}

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			userMEinfo: null,
			loadInfoFail: false,
		}
	}

	_willFocusHandler = async () => {
		this.setState({
			isLoading: true,
		})

		const MEinfoRes = await fetchMEinfoAsync();
		await this.setState({
			isLoading: false,
			userMEinfo: MEinfoRes,
			loadInfoFail: MEinfoRes === null,
		})
	}

	async componentDidMount() {
		// this.willFocusListener = this.props.navigation.addListener('willFocus', this._willFocusHandler);
		await this._willFocusHandler();
	}

	componentWillUnmount() {
		// this.willFocusListener.remove();
	}

	_blankAvatar = () => {
		const info = this.state.userMEinfo;
		return (
			<View styleName="clear vertical h-center">
				<Image
					styleName="small"
					source={require('./../../src/img/conversation.png')}
				/>
				<View styleName="md-gutter-bottom"></View>
				<Title>Log In For More Fun</Title>
			</View>
		)
	}

	_loginAvatar = () => {
		const info = this.state.userMEinfo;
		return (
			<View styleName="clear vertical h-center">
				<Image
					styleName="medium-avatar"
					source={{ uri: info.large_avatar }}
				/>
				<View styleName="md-gutter-bottom"></View>
				<Title>{info.name}</Title>
				<View styleName="sm-gutter-bottom"></View>
				<Subtitle>{info.desc}</Subtitle>
			</View>
		)
	}

	_navigateToCollections = (type) => {
		this.props.navigation.navigate('MyCollections', {
			user_id: this.state.userMEinfo.id,
			collection_type: type,
		})
	}

	render() {
		const MEinfo = this.state.userMEinfo;

		// TODO: while loading, prohibit user touch event
		// TODO: let user reload if fetch info error
		if (MEinfo === null) {
			return (
				<Grid>
					<Row size={1}>
						<FullScaleTouchable
							callback={() => this.props.navigation.navigate('Login')}
							source={require('./../../src/img/black.jpg')}
							content={this._blankAvatar()}
						/>
					</Row>
				</Grid>
			)
		} else {
			// TODO: add two photos as background
			return (
				<Grid>
					<Row size={3}>
						<FullScaleTouchable
							callback={null}
							source={{}}
							content={this._loginAvatar()}
						/>
					</Row>
					<Row size={2}>
						<Col>
							<FullScaleTouchable
								callback={() => this._navigateToCollections(COLLECTION_TYPE.wish)}
								source={{}}
								content={<Title>LIKES</Title>}
							/>
						</Col>
						<Col>
							<FullScaleTouchable
								callback={() => this._navigateToCollections(COLLECTION_TYPE.wish)}
								source={{}}
								content={<Title>IN</Title>}
							/>
						</Col>
					</Row>
				</Grid>
			)
		}
	}
}

export default MineScreen;