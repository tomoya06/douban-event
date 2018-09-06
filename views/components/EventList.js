import React, { Component, PureComponent } from "react";

import {
    TouchableOpacity,
    ImageBackground,
    View,
    Title,
    Caption,
    Subtitle,
    Divider,
    Card,
    Image,
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
    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event,
        }
    }

    _onPress = () => {
        this.props.onPressItem(this.props.event);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (nextProps.event.id !== this.state.event.id);
    // }

    render() {
        console.log('1');
        const event = this.state.event;
        return (
            <TouchableOpacity
                onPress={this._onPress}
            >
                <ImageBackground
                    styleName="large-ultra-wide"
                    source={{ uri: event.image_hlarge }}
                >
                </ImageBackground>
                <View styleName="content md-gutter">
                    <Title>{event.title}</Title>
                    <View styleName="horizontal space-between sm-gutter-top">
                        <Caption>{event.category_name}</Caption>
                        <Caption>    </Caption>
                        <Caption>{event.time_str}</Caption>
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
    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event,
        }
    }

    _onPress = () => {
        this.props.onPressItem(this.props.event);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return (nextProps.event.id !== this.state.event.id);
    // }

    render() {
        console.log('1');
        const event = this.state.event;
        return (
            <TouchableOpacity
                onPress={this._onPress}
                styleName="flexible"
            >
            <View styleName="horizontal flexible">
                <View styleName="sm-gutter-left"></View>
                <Card styleName="fill-parent">
                    <Image
                        styleName="medium-wide"
                        source={{ uri: event.image }}
                    />
                    <View styleName="content">
                        <Subtitle ellipsizeMode="tail" numberOfLines={1}>{event.title}</Subtitle>
                        <Caption ellipsizeMode="tail" numberOfLines={1}>{event.time_str}</Caption>
                    </View>
                </Card>
            </View>
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
        // if (this.props.grid) {
        //     return (<View></View>)
        // } else {
        //     return (<Divider styleName="section-header" />)
        // }
        // return (<Divider styleName="section-header" />);
        return (<View styleName="md-gutter-bottom"></View>)
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
                removeClippedSubviews={true}
                disableVirtualization={true}
            />
        )
    }
}

export default EventList;