import _ from "lodash";

import { isAdmin } from "../User/index";

import Activity from "../../../models/Activity";
import Feedback from "../../../models/Feedback";
import User from "../../../models/User";

export default {
  Query: {
    async csvExtract(root, args, { user }) {
      if (await !isAdmin(user)) {
        return "";
      }

      const formatDate = (date) =>
        date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getDate();

      const activitiesFromDb = await Activity.find({});
      const usersFromDb = await User.find({});

      const activities = _.chain(activitiesFromDb).keyBy("_id").value();
      const feedback = await Feedback.find({}).sort([['createdAt', 1]]);
      const users = _.chain(usersFromDb).keyBy("_id").value();

      const headerRow = [
        "Participant",
        "Stream",
        "Date Created",
        "Date Updated",
        "Trainer",
        "Activity",
        "Assistance - Physical",
        "Assistance - Verbal",
        "Enjoyment",
        "Engagement",
      ].join(",") + "\n";

      const results =
        headerRow
        + _.map(feedback, f => ([
            users[f.participantID].name,
            "",
            formatDate(f.createdAt),
            formatDate(f.updatedAt),
            users[f.trainerID].name,
            activities[f.activityID].name,
            f.trainerFeedback.assistance.physical,
            f.trainerFeedback.assistance.verbal,
            f.trainerFeedback.enjoyment,
            f.trainerFeedback.engagement,
          ].join(',')
        )).join("\n");

          console.log(results);

      return results;
    },
  },
};
