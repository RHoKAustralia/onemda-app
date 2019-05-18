import React from 'react';
import { Formik } from 'formik';
import { EngagmentSelector } from '../../components/EngagementSelector';



export function TrainerFeedback({ }) {

    return (<div>
        <Formik
            initialValues={{
                //Initial values go here. 
            }}
            onSubmit={(values, formikBag) => {
                console.log(values);


                //graphql 
            }}>{({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

                setFieldValue,

                /* and other goodies */
            }) => {

                const handleEngagementChange = (id) => (value) => {
                    setFieldValue(id, value);
                }

                return (
                    <form onSubmit = {handleSubmit}>
                        <strong>How Engaged Was The Partipant?</strong>
                        <EngagmentSelector id='0'
                            handleSelect={handleEngagementChange('0')} />

                        <strong>How Much Did They Enjoy it?</strong>
                        <EngagmentSelector id='1'
                            handleSelect={handleEngagementChange('1')} />

                            <button type = "submit">Submit</button>
                    </form>
                )
            }}</Formik>

    </div>
    );

}


