import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';


const USER_TYPES = [
    {
        value: "Trainer",
        label: "Trainer",
    },
    {
        value: "Participant",
        label: "Participant",
    },
    {
        value: "Admin",
        label: "Admin",
    },
    {
        value: "Supporter",
        label: "Supporter",
    }
]

export function CreateParticipant({ }) {

    return (<div>

        <Formik
            initialValues={{
                //Initial values go here. 
            }}
            onSubmit={(values, formikBag) => {
                console.log(values);
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
                return (
                    <form
                        style = {{
                            display: "flex", 
                            flexFlow: "column nowrap", 
                            maxWidth: 800, 
                            margin: "0 auto", 
                        }}
                    >
                        <Select
                            options={USER_TYPES} />
                        <input type="text"
                            name="firstName"
                            placeholder="First Name"
                        />
                        <input type="text"
                            name="lastName"
                            placeholder="Last Name"
                        />
                        <input type="email"
                            name="email"
                            placeholder="Email" />
                        <input type="text"
                            name="username"
                            placeholder="Username" />
                    </form>
                )
            }}</Formik>

    </div>
    );

}

