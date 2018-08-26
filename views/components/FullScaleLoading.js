import React, { Component } from "react";

import {
    View,
    StyleSheet,
} from "react-native";

import ProgressCircle from 'react-native-progress/CircleSnail';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    }
})

export default class FullScaleLoading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ProgressCircle
                    size={60}
                    duration={600}
                    color={['#C8C9C7', '#ffffff']}
                />
            </View>
        )
    }
}