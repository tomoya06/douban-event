import * as AddCalendarEvent from 'react-native-add-calendar-event';

import {
    Clipboard,
    Platform,
} from "react-native";

function formatDate(dateStr) {
    return (new Date(dateStr)).toISOString();
}

export function copyText(txt) {
    Clipboard.setString(txt)
    
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
            // TODO: make some noise of the result
        })
        .catch((error) => {
            // handle error such as when user rejected permissions
            console.warn(error);
            // TODO: noise as well
        });
}
