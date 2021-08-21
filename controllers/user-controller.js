const { User, Thought } = require('../models')
const errMSG = ['No user found with this id!', 'This friend does not exist!']
const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    getUsersById({ params }, res) {
        User.findOne({
            _id: params.id
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: errMSG[0] })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: errMSG[1] })
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: errMSG[0] });
                    return
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({
            _id: params.id
        })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: errMSG[0] })
                }
                if (dbUserData.thoughts)
                    Thought.deleteMany(
                        { _id: { $in: dbUserData.thoughts } }
                    )
                        .then(userData => res.json(userData))
                        .catch(err => res.status(400).json(err));
            })
    },

    deleteFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: errMSG[1] })
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController