import React, { Component, Fragment } from 'react'
import { FilterList } from '../../components/FilterList'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './styles.scss'
import { EngagmentSelector } from '../../components/EngagementSelector';
import { Formik } from 'formik';



const FEEDBACK_QUERY = gql`
  query activities {
    activities {
      name
    }
    users {
      id 
      email
    }
  }
`

const CREATE_FEEDBACK_MUTATION = gql`
  mutation createFeedback($activityID: String!, $trainerID: String!, $participantID: String!, $participantFeedback: String!, $trainerFeedback: [TrainerFeedbackInput]!, $comment: String!) {
    createFeedback(activityID: $activityID, trainerID: $trainerID, participantID: $participantID, participantFeedback: $participantFeedback, trainerFeedback: $trainerFeedback, comment: $comment) {
      id
    }
  }
`


const formDefinition = {
  participantFeedback: "ENGAGEMENT",
  trainerFeedback: [
    {
      serviceID: "5cd8dd57a06604360152edd7",
      engagement: ""
    },
    {
      serviceID: "5cd8dd5da06604360152edd8",
      engagement: "2"
    },
    {
      serviceID: "5cd8dd65a06604360152edd9",
      engagement: "1"
    }
  ],
  comment: "this is a test comment"
}

class FeedbackScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  handleChange = (e) => {
    console.log(e)
  }

  handleSubmit = (e) => {
    e.preventDefault()

  }

  handleSelect = (data) => {
    const { id, value, selectedID } = data
  }

  render() {
    return (
      <Query query={FEEDBACK_QUERY}>
        {({ error, loading, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>
          const activities = data.activities;
          const users = data.users; 

          return (

            <Mutation
              mutation={CREATE_FEEDBACK_MUTATION}
              onCompleted={() => {
                console.log('complete')
              }}
            >
              {(feedback, { loading, error }) => {

                if (error) {
                  console.log(error)
                  console.log(error)
                }

                return (
                  <div>

                    <Formik
                      initialValues={{
                        comment: "test",
                      }}
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
                            participantID: values.user.id,
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

                      setFieldValue,

                      /* and other goodies */
                    }) => {

                      const ourHandleChange = (id) => (value) => {
                        setFieldValue(id, value);
                      }


                      return (
                        <form onSubmit={handleSubmit}>
                          <p>Submit Feedback</p>
                          <div>Activities</div>
                          <FilterList options={activities.map(v => ({
                            label: v.name, 
                            value: v, 
                          }))} 
                            handleChange={ourHandleChange('activity')} />

                          <div>Users</div>
                          <FilterList options={users.map(v=> ({
                            label: v.email, 
                            value: v, 
                          }))} handleChange={ourHandleChange('user')} />

                          <strong>How Engaged Was The Partipant?</strong>
                          <EngagmentSelector id='0'
                            handleSelect={ourHandleChange('0')} />

                          <strong>How Much Did They Enjoy it?</strong>
                          <EngagmentSelector id='1'
                            handleSelect={ourHandleChange('1')} />

                          <div>Comments</div>
                          <input
                            type='text'
                            id="comment"
                            value={values.comment}
                            onChange={handleChange} />
                          <button
                            type="submit"
                          >Submit</button>
                        </form>
                      )
                    }}
                    </Formik>
                  </div>

                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default FeedbackScreen