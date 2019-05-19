import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import "./styles.scss"

const VIEW_FEEDBACK_QUERY = gql`
  query feedback {
    feedback {
      activityID
      comment
      trainerID
      participantID
      participantFeedback
      trainerFeedback {
        engagement
        enjoyment
        assistance {
          verbal
          physical
        }
      }
    }
  }
`

class ViewParticipants extends Component {
  render() {
    return (
      <Query query={VIEW_FEEDBACK_QUERY}>
        {({loading, error, data }) => {
          if (loading) return <div>Fetching data...</div>
          if (error) return <div>Error</div>

          const feedback = data.feedback
          const feedbackMarkup = feedback.map(feedback => (
            <div className="feedback_container">
              <div>ActivityID: {feedback.activityID}</div>
              <div>Comment: {feedback.comment}</div>
              <div>trainerID: {feedback.trainerID}</div>
              <div>participantID: {feedback.participantID}</div>
              <div>participantFeedback: {feedback.participantFeedback}</div>
              <div>ActivityID: {feedback.activityID}</div>
              <div>Trainer feedback</div>
              <div>{feedback.trainerFeedback.engagement}</div>
            </div>
          ))

          return (
           feedbackMarkup

          )
        }}
      </Query>
    )
  }
}

export default ViewParticipants