import React from 'react';
import { IntensitySelector } from './IntensitySelector';

export function FeedbackCard({
    handleChange,
}) {

    return (
        <div className="feedback-card">
            <div className="feedback-card__participant-name"> Name of Participant</div>
            <div className="question-group">
                <div className="question-group__title"> Participant Question (Optional)</div>
                <IntensitySelector
                    id='participant.happiness'
                    handleSelect={handleChange('0')}
                    label="How happy were you with today’s program? "
                />
            </div>
            <div className="question-group">
                <div className="question-group__title">Trainer Questions</div>
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
        </div>
    );
}

