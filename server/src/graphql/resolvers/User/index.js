// The User schema.
import User from "../../../models/User";
const bcrypt = require('bcrypt');

export async function isAdmin(user) {
  if (!user) {
    return false
  }

  const eUser = await User.findById(user.id)
  if (eUser.roles.includes('admin')) {
    return true
  }

  return false
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
    async participants (root, args, { user }) {
      const isUserAdmin = await isAdmin(user)
      if (!isUserAdmin) {
        throw Error('You must be a logged in admin to create a user')
      }

      const users =  await new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
      return users.filter(u => {
        return u.roles.includes('participant')
      })
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

      const encryptedPassword = bcrypt.hashSync(password, 10)

      const newUser = new User({
        username,
        name,
        email,
        encryptedPassword,
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
