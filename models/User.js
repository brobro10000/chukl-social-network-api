const {Schema, model} = require('mongoose');

const UserSchema = new Schema(
    {
        username:{
            type:String,
            unique: true,
            required:true,
            trim: true
        },
        email: {
            type:String,
            required:true,
            unique:true,
            match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Valid Email is Required ( local@domain.com ) ']
        },
        // thoughts: {
        //     //Array of _id values referencing the Thought model
        // },
        // friends: {
        //     //Array of _id values referencing the User model (self-reference)
        // }
    },
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true
    //     }
    // }
);
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// UserSchema.virtual('friendCount').get(function() => {
//     this.friends.reduce((total, friend) => total + friends.length + 1, 0)
// })

const User = model('User', UserSchema)

module.exports = User;