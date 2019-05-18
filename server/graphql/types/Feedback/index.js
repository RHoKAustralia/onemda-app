export default `
  type TrainerFeedback {
    serviceID: String!
    engagement: String!
  }
  input TrainerFeedbackInput {
    serviceID: String!
    engagement: String!
  }
  type Feedback {
    id: String!
    activityID: String!
    trainerID: String!
    participantID: String!
    participantFeedback: String
    trainerFeedback: [TrainerFeedback]
    comment: String
  }
  type Query {
    feedback: [Feedback]
  }
  type Mutation {
    createFeedback(activityID: String!, participantID: String!, participantFeedback: String!, trainerFeedback: [TrainerFeedbackInput], comment: String): Feedback
  }
`;