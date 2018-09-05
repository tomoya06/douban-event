import React, { Component } from 'react';

import {
	Title,
	NavigationBar,
	Button,
	Icon,
	Lightbox,
	Image,
	View,
	Row as ShRow,
	Subtitle,
	Text,
	Caption,
	TouchableOpacity,
	Divider,
	Html,
	Tile,
	Spinner,
} from "@shoutem/ui";

import {
	ScrollView,
} from "react-native";

import GoBackButton from "./../components/GoBackButton";

import {
	Grid,
	Row,
} from "react-native-easy-grid";

import {
	USER_STATUS
} from "./../../utils/const";

import {
	fetchEventDetails,
	markEvent,
	shareEvent,
} from "./../../services/EventServices";

import {
	addEventToCalendar,
	copyText,
	toastMsg,
} from "./../../services/UtilServices";
import FullScaleLoading from '../components/FullScaleLoading';

import I18n from "./../../i18n/translate";

/**
 * props:
 * eventDetails: event details object
 */
class EventImageRow extends Component {

	_renderContent = () => {
		return (
			<Grid>
				<Image
					style={{
						flex: 1,
						resizeMode: 'contain',
					}}
					source={{ uri: this.props.eventDetails.image_hlarge }}
				/>
			</Grid>
		)
	}

	render() {
		const details = this.props.eventDetails;
		return details && (
			<View>
				<Lightbox
					renderContent={this._renderContent}
				>
					<Image
						styleName="large-wide"
						source={{ uri: details.image_hlarge }}
					/>
				</Lightbox>
				<TouchableOpacity
					onPress={() => copyText(details.title)}
				>
					<ShRow>
						<View styleName="vertical">
							<Title>{details.title}</Title>
							<Caption>{details.tags.split(',').map((tag) => `#${tag} `)}</Caption>
						</View>
					</ShRow>
				</TouchableOpacity>
			</View>
		)
	}
}

/**
 * props:
 * eventDetails: event details object
 */
class BasicInfoRow extends Component {

	_addEventToCalendar = () => {
		addEventToCalendar(this.props.eventDetails);
	}
	// TODO: add open map util
	render() {
		const details = this.props.eventDetails;
		return details && (
			<View>
				<TouchableOpacity
					onPress={() => this._addEventToCalendar()}
				>
					<ShRow styleName="small">
						<Icon name="add-event" />
						<View styleName="vertical">
							<Text>{details.time_str}</Text>
							<Caption>{details &&
								details.begin_time + " - " + details.end_time
							}</Caption>
						</View>
						<Icon styleName="disclosure" name="right-arrow" />
					</ShRow>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => console.log('address pressed')}
				>
					<ShRow>
						<Icon name="address" />
						<View styleName="vertical">
							<Text>{details.address}</Text>
							<Caption>{details.fee_str}</Caption>
						</View>
						<Icon styleName="disclosure" name="right-arrow" />
					</ShRow>
				</TouchableOpacity>
			</View>
		)
	}
}

/**
 * props: 
 * eventDetails: event details
 * markEvent: function(status, boolean);
 * isLoading: boolean
 */
class UserActionRow extends Component {

	_markEvent = (status) => {
		this.props.markEvent(status, true);
	}

	_deleteMarkEvent = (status) => {
		this.props.markEvent(USER_STATUS[status], false);
	}

	render() {
		const details = this.props.eventDetails;
		// const wish_styleName = details.status === USER_STATUS.WISH ? '' : 'secondary';
		// const will_styleName = details.status === USER_STATUS.WILL ? '' : 'secondary';
		return details && (
			<Tile
				styleName="md-gutter-vertical"
			>

				{
					details.status ?
						(
							<View styleName="horizontal">
								<Button
									styleName={details.status == USER_STATUS.wishCN ? 'confirmation' : "confirmation secondary"}
									onPress={() => this._deleteMarkEvent(details.status)}
								>
									<Icon name={details.status == USER_STATUS.wishCN ? 'like' : 'notifications'} />
									<Text>{details.status == USER_STATUS.wishCN ? I18n.t('addToWish') : I18n.t('takeMeIn')}</Text>
								</Button>
							</View>
						) : (
							<View styleName="horizontal">
								<Button
									styleName="confirmation"
									onPress={() => this._markEvent(USER_STATUS.wish)}
								>
									<Icon name="like" />
									<Text>{I18n.t('addToWish')}</Text>
								</Button>
								<Button
									styleName="confirmation secondary"
									onPress={() => this._markEvent(USER_STATUS.in)}
								>
									<Icon name="notifications" />
									<Text>{I18n.t('takeMeIn')}</Text>
								</Button>
							</View>
						)
				}

				{
					this.props.isLoading ?
						(
							<View styleName="horizontal sm-gutter-top">
								<Button
									styleName="confirmation clear"
									disabled={true}
								>
									<Spinner />
								</Button>
							</View>
						) : (details.status ?
							(
								<View styleName="horizontal sm-gutter-top">
									<Button
										styleName="confirmation clear"
										disabled={true}
									>
										<Caption>{`WITH TOTAL ${details.wisher_count} LIKED AND ${details.participant_count} IN`}</Caption>
									</Button>
								</View>
							) : (
								<View styleName="horizontal sm-gutter-top">
									<Button
										styleName="confirmation clear"
										disabled={true}
									>
										<Caption>{"WITH OTHER " + details.wisher_count}</Caption>
									</Button>
									<Button
										styleName="confirmation clear"
										disabled={true}
									>
										<Caption>{"WITH OTHER " + details.participant_count}</Caption>
									</Button>
								</View>
							)
						)

				}

			</Tile>
		)
	}
}

/**
 * props: 
 * toggleContentCollapse()
 * contentCollapsed: boolean
 */
class IntroToggle extends Component {
	render() {
		return (
			<TouchableOpacity
				onPress={() => this.props.toggleContentCollapse()}
			>
				<ShRow styleName="small">
					<Icon name="about" />
					<Text>{I18n.t('introduction')}</Text>
					<Icon
						name={this.props.contentCollapsed ? 'down-arrow' : 'up-arrow'}
						styleName="disclosure"
					/>
				</ShRow>
			</TouchableOpacity>
		)
	}
}

// TODO: change HTML renderer
/**
 * props:
 * eventDetails: the same
 * contentCollapsed: boolean
 */
class IntroRow extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const details = this.props.eventDetails;
		return details && (
			<View>
				<View>
					{this.props.contentCollapsed
						? (
							<ShRow>
								<Text
									ellipsizeMode="tail"
									numberOfLines={3}
								>
									{details.content}
								</Text>
							</ShRow>
						) : (
							<Html
								body={details.content}
							/>
						)}
				</View>
				<View styleName="horizontal h-center md-gutter-vertical v-center">
					<Caption>{I18n.t('anEventBy')}  </Caption>
					<Image
						styleName="small-avatar"
						source={{ uri: details.owner.avatar }}
					/>
					<Caption>  @{details.owner.name}</Caption>
				</View>
			</View>
		)
	}
}

class EventDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			eventID: '',
			eventDetails: null,
			contentCollapsed: true,
			isMarking: false,
			isLoading: false,
		}
	}

	async componentDidMount() {
		// getParam(key, default_value)
		await this.setState({ isLoading: true });
		const paramID = this.props.navigation.getParam('id', null);
		if (paramID === null) {
			// await this.setState({ eventID: '30023544' });
			return;
		} else {
			await this.setState({ eventID: paramID });
		}
		const [error, _eventDetails] = await fetchEventDetails(this.state.eventID);
		await this.setState({ isLoading: false });
		if (error) { return; }
		await this.setState({ eventDetails: _eventDetails });
	}

	_centerComponent = () => (
		<Title>{I18n.t('event')}</Title>
	)

	_rightComponent = () => (
		<Button
			onPress={() => shareEvent(this.state.eventDetails)}
		><Icon name="share-android" /></Button>
	)

	_toggleContentCollapse = () => {
		this.setState({
			contentCollapsed: !this.state.contentCollapsed,
		})
	}

	_markEventAsync = async (status, flag) => {
		await this.setState({ isMarking: true });
		const markRes = await markEvent(this.state.eventID, status, flag);
		await this.setState({ isMarking: false });
		if (markRes == 4) {
			toastMsg("Oops...Have You Logged In?"); return;
		} else if (markRes == 0) {
			toastMsg("Oops...How's Your Network?"); return;
		}
		const [error, _eventDetails] = await fetchEventDetails(this.state.eventID);
		if (error) {
			toastMsg("Oops...How's Your Network?"); return;
		}
		this.setState({ eventDetails: _eventDetails });
	}

	render() {
		const event = this.state.eventDetails;

		return (
			<Grid>
				<Row style={{ height: 70 }}>
					<NavigationBar
						leftComponent={<GoBackButton navigation={this.props.navigation} />}
						centerComponent={this._centerComponent()}
						rightComponent={this._rightComponent()}
					/>
				</Row>
				<Row>
					{
						this.state.isLoading ?
							(
								<FullScaleLoading />
							) : (
								<ScrollView
									stickyHeaderIndices={[5]}
								>
									<EventImageRow eventDetails={event} />

									<View styleName="sm-gutter-top" />
									<BasicInfoRow eventDetails={event} />
									<UserActionRow eventDetails={event} markEvent={this._markEventAsync} isLoading={this.state.isMarking} />
									<View styleName="sm-gutter-top" />

									<IntroToggle
										toggleContentCollapse={this._toggleContentCollapse}
										contentCollapsed={this.state.contentCollapsed}
									/>
									<IntroRow
										eventDetails={event}
										contentCollapsed={this.state.contentCollapsed}
									/>
								</ScrollView>
							)
					}
				</Row>
			</Grid >
		);
	}
}

export default EventDetails;