import React, { Component } from 'react';

import {
	Text,
	View,
	Button,
	Icon,
	Tile,
	Image,
	Title,
	Subtitle,
} from "@shoutem/ui";

import {
	StyleSheet,
} from "react-native";

import { Grid, Row, Col } from 'react-native-easy-grid';

import FullScaleTouchable from '../components/FullScaleTouchable';

import { fetchMeInfoService, fetchMEinfoAsync } from '../../services/UserServices';
import { COLLECTION_TYPE } from '../../utils/const';
import { getUserLogin } from '../../services/StorageService';

import I18n from './../../i18n/translate';

import FullScaleLoading from '../components/FullScaleLoading';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#000',
	}
})

class MineScreen extends Component {
	static navigationOptions = {
		tabBarLabel: I18n.t('library'),
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
			currentUsername: '',
		}
	}

	_willFocusHandler = async () => {
		this.setState({
			isLoading: true,
		})

		const loginRes = await getUserLogin();
		if (loginRes === null) { // user log out or no user login yet
			this.setState({
				isLoading: false,
				userMEinfo: null,
				currentUsername: '',
				loadInfoFail: false,
			})
		} else if (loginRes.username !== this.state.currentUsername) { // new user login
			const MEinfoRes = await fetchMEinfoAsync();
			this.setState({
				isLoading: false,
				userMEinfo: MEinfoRes,
				loadInfoFail: MEinfoRes === null,
				currentUsername: loginRes.username,
			})
		} else { // no changes.
			this.setState({
				isLoading: false,
			})
		}
	}

	async componentDidMount() {
		this.willFocusListener = this.props.navigation.addListener('willFocus', this._willFocusHandler);
		// await this._willFocusHandler();
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
				<Title>{I18n.t('loginAdvice')}</Title>
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

		// TODO: let user reload if fetch info error
		if (this.state.isLoading) {
			return (
				<View style={{ backgroundColor: '#000', flex: 1 }}>
					<FullScaleLoading />
				</View>
			)
		}
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
							callback={() => this.props.navigation.navigate('Setting')}
							source={{}}
							content={this._loginAvatar()}
						/>
					</Row>
					<Row size={2}>
						<Col>
							<FullScaleTouchable
								callback={() => this._navigateToCollections(COLLECTION_TYPE.wish)}
								source={{}}
								content={<Title>{I18n.t('wish')}</Title>}
							/>
						</Col>
						<Col>
							<FullScaleTouchable
								callback={() => this._navigateToCollections(COLLECTION_TYPE.in)}
								source={{}}
								content={<Title>{I18n.t('in')}</Title>}
							/>
						</Col>
					</Row>
				</Grid>
			)
		}
	}
}

export default MineScreen;