import * as AddCalendarEvent from 'react-native-add-calendar-event';

import Toast from "react-native-root-toast";

import {
    Clipboard,
    Platform,
    Share,
    Linking,
} from "react-native";

import I18n from "./../i18n/translate";

import { version } from "./../package.json";

function formatDate(dateStr) {
    console.log(dateStr);
    return dateStr.replace(/(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/g, '$1T$2.000Z');
}

export function toastMsg(msg) {
    Toast.show(msg, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
    })
}

export function copyText(txt) {
    Clipboard.setString(txt);
    toastMsg(`"${txt}" ${I18n.t('error_isCopied')}`);
}

export function addEventToCalendar(eventDetails) {
    const eventConfig = {
        title: eventDetails.title,
        startDate: formatDate(eventDetails.begin_time),
        endDate: formatDate(eventDetails.end_time),
        location: eventDetails.address,
        // and other options
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
        .then((eventInfo) => {
            // eventInfo: { calendarItemIdentifier: string, eventIdentifier: string }
            // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
            // These are two different identifiers on iOS.
            // On Android, where they are both equal and represent the event id, also strings.
            // when { action: 'CANCELLED' } is returned, the dialog was dismissed
            console.warn(JSON.stringify(eventInfo));
            if (eventInfo.action === 'CANCELED') { toastMsg(I18n.t('error_calendarCancel')) }
            else { toastMsg(I18n.t('error_calendarAdded')) }
        })
        .catch((error) => {
            // handle error such as when user rejected permissions
            console.warn(error);
            toastMsg(I18n.t('error_noCalendar'));
        });
}

export function shareText(title, message) {
    Share.share({
        message,
        title,
    }, {})
}

export function openMap(geo) {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latlng = geo.split(' ').join(',');
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latlng}`,
        android: `${scheme}${latlng}(${latlng})`,
    })
    openBrowser(url);
}

export function openBrowser(_url) {
    Linking.openURL(_url)
        .then((result) => {
            console.log('success', result);
        })
        .catch((error) => {
            console.log('error', error);
        });
}

export function getAppVersion() {
    return version;
}