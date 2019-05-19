//@flow
import React from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import './styles.scss'
import { FeedbackFormRender } from './FeedbackFormRender';


const FEEDBACK_QUERY = gql`
  query activities {
    activities {
      id
      name
    }
    users {
      id 
      name
    }
  }
`

const CREATE_FEEDBACK_MUTATION = gql`
mutation createFeedback(
  $activityID: String!
  $participantID: String!
  $participantFeedback: FeedbackRating!
  $trainerFeedback: TrainerFeedbackInput!
  $comment: String
) {
  createFeedback(
   activityID: $activityID,
   participantID: $participantID,
   participantFeedback: $participantFeedback,
   trainerFeedback: $trainerFeedback,
   comment: $comment
  ) {
    id
  }
}
`

export default function () {

  return (<Query query={FEEDBACK_QUERY}>
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
              <FeedbackFormRender
                feedback={feedback}
                activities={activities}
                users={users}
                initialValues={{
                  participants: [],
                  feedback: {}
                }} />

            )
          }}
        </Mutation>
      )
    }}
  </Query>
  );

}

