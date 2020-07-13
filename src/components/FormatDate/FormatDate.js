import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';


function FormatDate(props) {
    const calendarStrings = {
        lastDay: '[Yesterday at] LT',
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        lastWeek: '[last] dddd [at] LT',
        nextWeek: 'dddd [at] LT',
        sameElse: 'L'
    };

    return (
        <div>
            <Moment fromNow>
                {props.data}
            </Moment>
        </div>
    );
}

export default FormatDate;