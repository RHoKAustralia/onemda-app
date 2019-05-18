import React from 'react';
import { IntensitySelector } from './IntensitySelector';

export function FeedbackCard({
    handleChange,
}) {

    return (
        <div>
            <h3>Participant Question (Optional)</h3>
            <IntensitySelector
                id='participant.happiness'
                handleSelect={handleChange('0')}
                label="How happy were you with today’s program? "
            />
            <h3>Trainer Questions</h3>
            <IntensitySelector
                id='trainer.participantEngagement'
                handleSelect={handleChange('0')}
                label="How engaged was the participant in the program?"
            />

            <IntensitySelector
                id='trainer.participantHappiness'
                handleSelect={handleChange('1')}
                label="How happy was the participant with today’s program?"
            />
        </div>
    );

}

