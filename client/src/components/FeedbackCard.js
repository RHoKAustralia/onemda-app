import React from 'react';
import { IntensitySelector } from './IntensitySelector';

export function FeedbackCard({
    participant,
    handleChange,
}) {
    // Id prefix allows Formik to automatically handle changes in feedback for a user. Currently all feedback is stored in a feedback object indexed
    // by participant id's. Ideally these would be stored in an array, perhaps with the actual participants objects but using objects in this way
    // plays well with Formik.
    let inputIdPrefix = `feedback.${participant.id}`

    return (
        <div className="feedback-card" key={participant.id}>
            <div className="feedback-card__participant-name">{participant.name || participant.email || "John Doe"}</div>
            <div className="question-group">
                <div className="question-group__title"> Participant Question (Optional)</div>
                <IntensitySelector
                    id={`${inputIdPrefix}.participant.enjoyment`}
                    handleSelect={handleChange(`${inputIdPrefix}.participant.enjoyment`)}
                    label="How happy were you with today’s program? "
                />
            </div>
            <div className="question-group">
                <div className="question-group__title">Trainer Questions</div>
                <IntensitySelector
                    id={`${inputIdPrefix}.trainer.participantEnjoyment`}
                    handleSelect={handleChange(`${inputIdPrefix}.trainer.participantEnjoyment`)}
                    label="How engaged was the participant in the program?"
                />

                <IntensitySelector
                    id={`${inputIdPrefix}.trainer.participantEngagement`}
                    handleSelect={handleChange(`${inputIdPrefix}.trainer.participantEngagement`)}
                    label="How happy was the participant with today’s program?"
                />
                <div className="question-group__label">Comments (Optional)</div>
                {/* TODO: Debug why comment state is not updating. */}
                <textarea
                    className="question-group__comment"
                    id={`${inputIdPrefix}.trainer.comment`}
                    onChange={handleChange} />
            </div>
        </div>
    );
}

