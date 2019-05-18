export default `
  enum FeedbackRating {
    Low,
    Minimal,
    Average,
    High,
  }
  type TrainerFeedback {
    enjoyment: FeedbackRating
    engagement: FeedbackRating
  }
  input TrainerFeedbackInput {
    enjoyment: FeedbackRating
    engagement: FeedbackRating
  }
  type Feedback {
    id: String!
    activityID: String!
    trainerID: String!
    participantID: String!
    participantFeedback: FeedbackRating
    trainerFeedback: TrainerFeedback!
    comment: String
  }
  type Query {
    feedback: [Feedback!]
  }
  type Mutation {
    createFeedback(activityID: String!, participantID: String!, participantFeedback: FeedbackRating!, trainerFeedback: TrainerFeedbackInput!, comment: String): Feedback
  }
`;