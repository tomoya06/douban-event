import React, { Component } from 'react';

import Swiper from "react-native-swiper";

import FullScaleTouchable from './FullScaleTouchable';
import { View } from '../../node_modules/@shoutem/ui';

const KW_LImage = 'image_hlarge';
const KW_Title = 'title';

class HomeEventSlides extends Component {

	constructor(props) {
		super(props);

		this.state = {
			events: [],
		}
	}

	componentDidMount() {
		var events = fetch('https://api.douban.com/v2/event/list?loc=shanghai')
			.then((response) => response.json())
			.then((json) => {
				this.setState({
					events: json.events,
				})
			})
			.catch((error) => console.log(error))
	}

	render() {
		if (this.state.events.length === 0) {
			return (
				<View style={{ height: '100%', width: '100%' }}>
					<FullScaleTouchable 
						uri={'https://img3.doubanio.com/pview/event_poster/raw/public/bedeea7a97c7174.jpg'}
						content={'豆瓣同城'}
						callback={null}
					/>
				</View>
			)
		}
		return (
			<Swiper style={{ height: '100%', width: '100%' }}>
				{this.state.events.map((event) => (
					<View style={{ flex: 1 }} key={event.id}>
						<FullScaleTouchable
							uri={event[KW_LImage]}
							content={event[KW_Title]}
							callback={null}
						/>
					</View>
				))}
			</Swiper>
		);
	}
}

export default HomeEventSlides;