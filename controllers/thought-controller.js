const { User, Thought } = require('../models');
const { getUsersById } = require('./user-controller');
const errMSG = ['No thought found with this id!']

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    getThoughtsById({ params }, res) {
        Thought.findOne({
            _id: params.id
        }).populate('User')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: errMSG[0] })
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(dataThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dataThoughtData._id } },
                    { new: true, runValidators: true }
                ).then(dbUserData => res.json(dbUserData))
                    .catch(err => res.status(400).json(err));
            })
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: errMSG[0] })
                    return
                }
                res.json(dbReactionData)
            })
            .catch(err => res.json(err))
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        ).populate('User')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: errMSG[0] });
                    return
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({
            _id: params.id
        })
            .then(dbThoughtData => {
                console.log(dbThoughtData)
                if (!dbThoughtData) {
                    res.status(404).json({ message: errMSG[0] })
                }
                User.findOneAndUpdate(
                    {thoughts: dbThoughtData._id},
                    {$pull: {thoughts: dbThoughtData._id}}
                ).then(data => {
                    console.log(data)
                    res.json(dbThoughtData);
                })
                .catch(err => res.status(400).json(err));
            })
    },

    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: body.reactionId } } },
            { new: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: errMSG[0] })
                    return
                }
                Thought.findOneAndDelete(
                    { reactionId: body.reactionId }
                )
                res.json(dbReactionData)
            })
            .catch(err => res.json(err))
    }
}

module.exports = thoughtController