const { AuthenticationError } = require('apollo-server-express');
const { User, HighScore } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
// will need to add API key and a Query for the questions
const resolvers = {
    Query: {
        //find all highscores
        highscores: async () => {
            const scores = await HighScore.find()
            scores.sort((a, b) => b.score - a.score);
            return scores;
        },
        //find single users highsscores for all categories
        //ask about parameters here
        user: async (parent, args, context) => {
            if (context.user) {
                //want to find all highscores attached to a username
                return await User.findById(context.user._id)
                    .populate({
                        path: 'scores',
                        options: { sort: { 'score': -1 } }
                    })
            }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            console.log(password)
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            console.log()
            const correctPw = await bcrypt.compare(password, user.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials PW');
            }

            const token = signToken(user);

            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id }, 
                    { $set: args },
                    { new: true, runValidators: true }
                    )
                return user;
            } 
            throw new AuthenticationError('Not logged in');
        },
        addHighScore: async (parent, args, context) => {
            if (context.user) {
                const highScore = await HighScore.create(args)
                const user = await User.findOneAndUpdate(
                    { userName: args.userName },
                    { $push: { scores: highScore._id } },
                    { new: true }
                    )
                return highScore;
            }
            throw new AuthenticationError('Not logged in');
        }
    }
}

module.exports = resolvers;