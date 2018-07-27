/**
 * @params:
 * uri: image background uri
 * content: show in button center
 * callback: click and then do it.
 */

import React, { Component } from 'react';
import {
	TouchableOpacity,
	ImageBackground,
	Overlay,
	Title,
} from "@shoutem/ui";

export default class FullScaleTouchable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			uri: this.props.uri || '',
			content: this.props.content || '',
			callback: this.props.callback,
		}
	}

	render() {
		return (
			<TouchableOpacity
				onPress={() => {
					console.log('pressed');
					this.state.callback();
				}}
				style={{ height: '100%', width: '100%' }}
			>
				<ImageBackground
					style={{ height: '100%', width: '100%' }}
					source={{ uri: this.state.uri }}
				>
					<Overlay styleName="fill-parent image-overlay">
						<Title>{this.state.content}</Title>
					</Overlay>
				</ImageBackground>
			</TouchableOpacity>
		)
	}
}
