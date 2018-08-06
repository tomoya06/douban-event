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
} from "./../../services/EventServices";

/**
 * props:
 * eventDetails: event details object
 */
class EventImageRow extends Component {
	render() {
		const details = this.props.eventDetails;
		return details && (
			<View>
				<Lightbox>
					<Image
						styleName="large-wide"
						source={{ uri: details.image_hlarge }}
					/>
				</Lightbox>
				<TouchableOpacity
					onPress={() => console.log('title pressed')}
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
	render() {
		const details = this.props.eventDetails;
		return details && (
			<View>
				<TouchableOpacity
					onPress={() => console.log('time pressed')}
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
 */
class UserActionRow extends Component {
	render() {
		const details = this.props.eventDetails;
		// const wish_styleName = details.status === USER_STATUS.WISH ? '' : 'secondary';
		// const will_styleName = details.status === USER_STATUS.WILL ? '' : 'secondary';
		return details && (
			<Tile
				styleName="md-gutter-vertical"
			>
				<View styleName="horizontal">
					<Button
						styleName="confirmation"
						onPress={() => console.log('wish pressed')}
					>
						<Icon name="like" />
						<Text>{'ADD TO WISH'}</Text>
					</Button>
					<Button
						styleName="confirmation secondary"
						onPress={() => console.log('participant pressed')}
					>
						<Icon name="notifications" />
						<Text>{'TAKE ME IN'}</Text>
					</Button>
				</View>
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
					<Text>INTRODUCTION</Text>
					<Icon
						name={this.props.contentCollapsed ? 'down-arrow' : 'up-arrow'}
						styleName="disclosure"
					/>
				</ShRow>
			</TouchableOpacity>
		)
	}
}

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
					<Caption>AN EVENT BY  </Caption>
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
		}
	}

	async componentDidMount() {
		const paramID = this.props.navigation.getParam('id', null);
		if (paramID === null) {
			await this.setState({ eventID: '30023544' });
			// return ;
		} else {
			await this.setState({ eventID: paramID });
		}
		console.log(this.state.eventID);
		const [error, _eventDetails] = await fetchEventDetails(this.state.eventID);
		if (error) { return; }
		await this.setState({ eventDetails: _eventDetails });
	}

	_centerComponent = () => (
		<Title>EVENT</Title>
	)

	_rightComponent = () => (
		<Button
			onPress={() => console.log('right com. pressed')}
		><Icon name="share-android" /></Button>
	)

	_toggleContentCollapse = () => {
		this.setState({
			contentCollapsed: !this.state.contentCollapsed,
		})
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
					<ScrollView
						stickyHeaderIndices={[5]}
					>
						<EventImageRow eventDetails={event} />

						<View styleName="sm-gutter-top" />
						<BasicInfoRow eventDetails={event} />
						<UserActionRow eventDetails={event} />
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
				</Row>
			</Grid>
		);
	}
}

export default EventDetails;