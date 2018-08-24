import React, { Component, PureComponent } from "react";

import {
    TouchableOpacity,
    ImageBackground,
    View,
    Title,
    Caption,
    Subtitle,
    Divider,
} from "@shoutem/ui";

import {
    FlatList,
} from "react-native";


/**
 * props:
 * event: event object {title, time_str, image_hlarge, category_name, id}
 * onPress: function
 */
class EventItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.event);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this._onPress}
            >
                <ImageBackground
                    styleName="large-ultra-wide"
                    source={{ uri: this.props.event.image_hlarge }}
                >
                </ImageBackground>
                <View styleName="content md-gutter">
                    <Title>{this.props.event.title}</Title>
                    <View styleName="horizontal space-between sm-gutter-top">
                        <Caption>{this.props.event.category_name}</Caption>
                        <Caption>    </Caption>
                        <Caption>{this.props.event.time_str}</Caption>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

/**
 * props:
 * onPressItem: function()
 * event: event
 */
class CollectionItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.event);
    }

    render() {
        const event = this.props.event;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                styleName="flexible"
            >
                <Card>
                    <Image
                        styleName="medium-wide"
                        source={{ uri: event.image }}
                    />
                    <View styleName="content">
                        <Subtitle ellipsizeMode="tail" numberOfLines={2}>{event.title}</Subtitle>
                        <Caption ellipsizeMode="tail" numberOfLines={1}>{event.time_str}</Caption>
                    </View>
                </Card>
            </TouchableOpacity>
        )
    }
}

/**
 * props:
 * events: events
 * isLoading: for flatlist to show loading
 * fetchEventList: function(flag: boolean). trigger parent's fetch new list. flag=true: load more. flag=false: reload
 * grid: boolean. show in grid(two column) or single list
 * callback: function(id) for press item.
 */
class EventList extends PureComponent {

    _onPressItem = (event) => {
        // console.log(event.title);
       this.props.callback(event.id);
    }

    _renderItem = ({ item }) => {
        if (this.props.grid) {
            return (
                <CollectionItem
                    event={item}
                    onPressItem={this._onPressItem}
                />
            )
        } else {
            return (
                <EventItem
                    event={item}
                    onPressItem={this._onPressItem}
                />
            )
        }
    }

    _itemSeparatorComponent = () => {
        if (this.props.grid) {
            return (<View></View>)
        } else {
            return (<Divider styleName="section-header" />)
        }
    }

    _keyExtrator = (item) => {
        return item.id;
    }

    render() {
        return (
            <FlatList
                ref={(ref) => { this._flatlistRef = ref; }}
                data={this.props.events}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtrator}
                ItemSeparatorComponent={this._itemSeparatorComponent}
                refreshing={this.props.isLoading}
                onRefresh={() => this.props.fetchEventList(false)}
                onEndReached={() => this.props.fetchEventList(true)}
                onEndReachedThreshold={0.2}
                numColumns={this.props.grid ? 2 : 1}
            />
        )
    }
}

export default EventList;