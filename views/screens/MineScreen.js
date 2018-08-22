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
import { fetchMeInfoService } from '../../services/UserServices';

class MineScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'Mine',
		tabBarIcon: ({ tintColor }) => (
			<Icon name="add-to-favorites-off" style={{ color: tintColor }} />
		)
	}

	constructor(props) {
		super(props);

		this.state = {
			userMEinfo: null,
		}
	}

	async componentDidMount() {
		const MEinfoRes = await fetchMeInfoService();
		this.setState({
			userMEinfo: MEinfoRes,
		})
	}

	_blankAvatar = () => {
		const info = this.state.userMEinfo;
		return (
			<Tile styleName="clear">
				<Image
					styleName="medium-avatar"
					source={{ uri: './../../src/img/conversation.png' }}
				/>
				<Title>Log In For More Fun</Title>
			</Tile>
		)
	}

	_loginAvatar = () => {
		const info = this.state.userMEinfo;
		return (
			<Tile styleName="clear">
				<Image
					styleName="medium-avatar"
					source={{ uri: info.large_avatar }}
				/>
				<Title>{info.name}</Title>
				<Subtitle>{info.desc}</Subtitle>
			</Tile>
		)
	}

	render() {
		const MEinfo = this.state.userMEinfo;

		if (MEinfo === null) {
			return (
				<Grid>
					<Row size={1}>
						<FullScaleTouchable
							callback={null}
							uri={'./../../src/img/black.jpg'}
							content={this._blankAvatar()}
						/>
					</Row>
				</Grid>
			)
		} else {
			return (
				<Grid>
					<Row size={3}>
						<FullScaleTouchable
							callback={null}
							uri={''}
							content={this._loginAvatar()}
						/>
					</Row>
					<Row size={2}>
						<Col>
							<FullScaleTouchable 
								callback={null}
								uri={''}
								content={<Title>LIKES</Title>}
							/>
						</Col>
						<Col>
							<FullScaleTouchable 
								callback={null}
								uri={''}
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