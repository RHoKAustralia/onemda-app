import React from 'react';
import { FilterList } from '../../components/FilterList';
import { FeedbackCard } from '../../components/FeedbackCard';
import { Formik } from 'formik';
import * as Yup from 'yup';

const FeedbackSchema = Yup.object().shape({
    participants: Yup.array().of(Yup.object().required('Required')).max(1),
    activity: Yup.object().required('Required'),
    trainer: {
        participantEngagement: Yup.object().required('Required'),
        participantHappiness: Yup.object().required('Required'),
    },
});


export function FeedbackFormRender({
    feedback,
    activities,
    users,
    initialValues
}) {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={FeedbackSchema}
            onSubmit={(values, formikBag) => {
                console.log(values);
                //Values from form come in here. 

                //NB. there's still a question of matching the correct IDs to the form 
                //Below. 

                //Mutate graphql here. 
                feedback({
                    variables:
                    {
                        activityID: values.activity.id,
                        trainerID: "5cd2cace363cfe4bd9ef981b",
                        // participantID: values.user.id,
                        // TODO: use participant's IDs
                        participantFeedback: "2",

                        //Still need to get the trainer feedback. 

                        comment: values.comment
                    }
                })
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,

            setFieldValue,

            /* and other goodies */
        }) => {

            const ourHandleChange = (id) => (value) => {
                setFieldValue(id, value);
            }


            return (
                <form onSubmit={handleSubmit}>
                    {JSON.stringify(errors)}\
                    {JSON.stringify(isValid)}
                    <p>Submit Feedback</p>
                    <div>Activities</div>
                    <FilterList options={activities.map(v => ({
                        label: v.name,
                        value: v,
                    }))}
                        handleChange={ourHandleChange('activity')} />

                    <div>Participants</div>
                    <FilterList
                        isMulti
                        options={users.map(v => ({
                            label: v.email,
                            value: v,
                        }))}
                        handleChange={ourHandleChange('participants')} />

                    <FeedbackCard handleChange={ourHandleChange} />

                    <div>Comments</div>
                    <input
                        type='text'
                        id="comment"
                        value={values.comment}
                        onChange={handleChange} />
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

