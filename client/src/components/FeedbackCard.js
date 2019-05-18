import React, { Fragment } from 'react';
import { EngagmentSelector } from './EngagementSelector';


export function FeedbackCard({
    handleChange,

}) {

    return (<Fragment>
        <EngagmentSelector id='0'
            handleSelect={handleChange('0')}
            label="How Engaged Was The Partipant?"
        />

        <EngagmentSelector id='1'
            handleSelect={handleChange('1')}
            label="How Much Did They Enjoy it?"
        />

    </Fragment>
    );

}

