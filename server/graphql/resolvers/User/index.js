// The User schema.
import User from "../../../models/User";

export async function isAdmin(user) {
  if (!user) {
    return false
  }
  const eUser = await User.findById(user.id)
  if (!eUser.roles.includes('admin')) {
    return false
  }
  return true
}

export default {
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: () => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    async createUser (root, { username, name, email, password, roles, stream }, { user }) {
      const isUserAdmin = await isAdmin(user)
      if (!isUserAdmin) {
        throw Error('You must be a logged in admin to create a user')
      }

      const newUser = new User({
        username,
        name,
        email,
        password,
        roles,
        stream
      });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    async editUser (root, { id, name, email, password, roles }, { user }) {
      const isUserAdmin = await isAdmin(user)
      if (!isUserAdmin) {
        throw Error('You must be a logged in admin to edit a user')
      }

      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { name, email, password, roles } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};
