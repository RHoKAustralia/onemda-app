import Feedback from '../../../models/Feedback'
import Activity from '../../../models/Activity'
import User from '../../../models/User'
import Service from '../../../models/Service'

const fetchByIDFromModel = async (id, model) => {
  return await model.findById(id)
}

const fetchService = async function(id) {
  return await Service.findOne({_id: id})
}

const fetchServices = async (services) => {
  const fetchedServices = await Promise.all(services.map(s => {
    return fetchService(s)
  }))
  const finishServices = fetchedServices.filter(s => s !=null)
  return  finishServices
}

export async function isTrainer(user) {
  if (!user) {
    return false
  }
  const eUser = await User.findById(user.id)
  if (!eUser.roles.includes('trainer')) {
    return false
  }
  return true
}

export default {
  Query: {
    feedback: () => {
      return new Promise((resolve, reject) => {
        Feedback.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    async createFeedback (root, { activityID, participantID, participantFeedback, trainerFeedback, comment }, { user }) {
    
      try {
        const isUserTrainer = await isTrainer(user)
        if (!isUserTrainer) {
          throw Error('Must be logged in trainer to create feedback.')
        }

        // Validate activity ID
        const activity = await fetchByIDFromModel(activityID, Activity)

        // Validate participant ID
        const userP = await fetchByIDFromModel(participantID, User)

        // Ensure we are providing feedback on an actual participant
        if (!userP.roles.includes('participant')) {
          throw Error('A participant is required to give feedback on.')
        }

        // List of service IDs supplied in the form
        const suppliedServiceIDs = trainerFeedback.map(s => s.serviceID)

        // Grab the list of services mentioned in the feedback
        const services = await fetchServices(suppliedServiceIDs)

        // Confirm that every service ID supplied in the form maps to an actual service.
        if (services.length !== suppliedServiceIDs.length) {
          throw Error("Some services which were supplied are invalid.")
        }

        const newFeedback = new Feedback({ activityID: activity._id, participantID, trainerID: user.id, participantFeedback, trainerFeedback, comment });
        return await newFeedback.save()
      } catch(e) {
        throw Error(e)
      }
    }
  }
};
