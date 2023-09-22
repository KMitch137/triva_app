const { AuthenticationError } = require('apollo-server-express');
const { User, HighScore } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        //find all highscores
        highscores: async () => {
            const scores = await HighScore.find()
            scores.sort((a,b) => b.highScore - a.highScore);
            return scores;
        },
        //find single users highsscores for all categories
        //ask about parameters here
        user: async (parent, args, context) => {
            if (context.user) {
                //want to find all highscores attached to a username
                return await HighScore.findById(context.user._id)
            }
        }
    }
}

module.exports = resolvers;