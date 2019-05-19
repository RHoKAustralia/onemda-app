import React from 'react';
import { FilterList } from '../../components/FilterList';
import { FeedbackCard } from '../../components/FeedbackCard';
import { Formik } from 'formik';
import * as Yup from 'yup';

// TODO: Yup schema validation - Only appears to be checking activity/participants has a value
const FeedbackSchema = Yup.object().shape({
    participants: Yup
        .array()
        .of(
            Yup.object().required('Required')
        ).max(1),
    activity: Yup.object().required('Required'),
    feedback: {
        participant: {
            enjoyment: Yup.object().required('Required'),
        },
        trainer: {
            participantEngagement: Yup.object().required('Required'),
            participantEnjoyment: Yup.object().required('Required'),
        },
    },
});

const feedbackMutationVariablesFromParticipantFeedback = ({
    participant,
    feedback: {
        participant: {
            enjoyment: {
                value: participantFeedbackEnjoyment
            },
        },
        trainer: {
            participantEnjoyment: { //TODO: refactor onchange to set value directly to avoid extracting here.
                value: participantEnjoyment
            },
            participantEngagement: {
                value: participantEngagement
            },
            comment,
            assistance: {
                physical: {
                    value: physicalAssistance,
                },
                verbal: {
                    value: verbalAssistance,
                },
            }
        },
    }
}) => ({
    participantID: participant.id,
    participantFeedback: participantFeedbackEnjoyment,
    comment: comment,
    trainerFeedback: {
        engagement: participantEnjoyment,
        enjoyment: participantEngagement,
        assistance: {
            physical: physicalAssistance,
            verbal: verbalAssistance,
        },
    }
})


export function FeedbackFormRender({
    activities,
    users,
    feedback,
    initialValues,
}) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FeedbackSchema}
            onSubmit={(values, formikBag) => {
                // TODO: rename variables related to feedback to be way less ambiguous.
                let { activity, participants, feedback: rawParticipantFeedbacks } = values
                //Values from form come in here.

                //NB. there's still a question of matching the correct IDs to the form
                //Below.

                // Mutate graphql here.
                let participantFeedbacks = participants.map(participant => ({ participant: participant, feedback: rawParticipantFeedbacks[participant.id] }))

                //TODO: validation elsewhere!
                let participantFeedbackMutationVariables = feedbackMutationVariablesFromParticipantFeedback(participantFeedbacks[0])

                feedback({
                    variables: {
                        activityID: activity.id,
                        ...participantFeedbackMutationVariables,
                    }
                });
            }}
        >{({
            values,
            errors,
            handleSubmit,
            isValid,

            setFieldValue,

            /* and other goodies */
        }) => {

            const ourHandleChange = (id) => (value) => {
                setFieldValue(id, value);
            }

            console.log(values);

            return (
                <form onSubmit={handleSubmit}>
                    <div className="feedback_form__title">Submit Feedback</div>
                    <div>Activities</div>
                    <FilterList options={activities.map(v => ({
                        label: v.name,
                        value: v,
                    }))}
                        handleChange={ourHandleChange('activity')} />

                    <div>Participants</div>
                    <FilterList
                        isMulti
                        options={
                            values.participants.length < 1
                                ? users
                                    // TODO: remove client side filtering when participant GraphQL query is completed.
                                    .filter(
                                        ({ roles }) => roles.includes("participant")
                                    )
                                    .map(v => ({
                                        label: v.name,
                                        value: v,
                                    }))
                                : []

                        }
                        handleChange={ourHandleChange('participants')} />

                    <div>
                        {values.participants.map(participant => <FeedbackCard participant={participant} handleChange={ourHandleChange} />)}
                    </div>

                    <button
                        disabled={!isValid}
                        type="submit"
                    >Submit</button>
                </form>
            )
        }}
        </Formik>
    );

}

