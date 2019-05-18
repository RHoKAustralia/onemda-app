import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Engagement = Object.freeze({
  Low: 'Low',
  Minimal: 'Minimal',
  Average: 'Average',
  High: 'High',
})

const TrainerFeedbackSchema = new Schema({
  enjoyment: {
    type: Engagement,
    enum: Object.values(Engagement),
    required: true,
  },
  engagement: {
    type: Engagement,
    enum: Object.values(Engagement),
    required: true
  }
})

const FeedbackSchema = new Schema({
  activityID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  trainerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  participantFeedback: {
    type: String,
    enum: Object.values(Engagement),
    required: true
  },
  trainerFeedback: TrainerFeedbackSchema,
  comment: {
    type: String,
  },
}, {collection: 'feedback', timestamps: true})

const Feedback = mongoose.model('Feedback', FeedbackSchema)

export default Feedback