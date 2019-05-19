import { mergeTypes } from "merge-graphql-schemas";
import User from "./User/";
import Service from "./Service";
import Authentication from "./Authentication";
import Activity from "./Activity"
import Feedback from "./Feedback"

const typeDefs = [User, Service, Authentication, Activity, Feedback];

export default mergeTypes(typeDefs, { all: true });