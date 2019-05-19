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
      <div>
        <h3>Participant Feedback</h3>
        <Query query={VIEW_FEEDBACK_QUERY}>
          {({loading, error, data }) => {
            if (loading) return <div>Fetching data...</div>
            if (error) return <div>Error</div>

            const feedback = data.feedback
            const feedbackMarkup = feedback.map(feedback => (
              <div className="feedback_container">
                <div>
                  <label>Participant id:</label> <span>{feedback.participantID}</span>
                </div>
                <div>
                  <label>Activity id:</label> <span>{feedback.activityID}</span>
                </div>
                <div>
                  <label>Trainer id:</label> <span>{feedback.trainerID}</span>
                </div>
                <div>
                  <label>Comment: </label> <span>{feedback.comment}</span>
                </div>
                <div>
                  <label>Participant Feedback:</label> <span>{feedback.participantFeedback}</span>
                </div>
                <div>
                  <label>Trainer Feedback:</label> <span>{feedback.trainerFeedback.engagement}</span>
                </div>
              </div>
            ))
            return (
              feedbackMarkup
            )
          }}
        </Query>
      </div>
    )
  }
}

export default ViewParticipants
