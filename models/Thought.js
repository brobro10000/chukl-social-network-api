const {Schema, model, Types} = require('mongoose')
const  convertDate  = require('../utils/dateFormat')

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type:String,
            required:true,
            max:[280, 'Calm down! Youre overreacting!']
        },
        username: {
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default: Date,
            get: createdAtVal => convertDate().toLocaleString(createdAtVal)
        }
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type:String,
            required:true,
            min:[1, 'A thought it required'],
            max:[280,'You think too much, consolidate your thought']
        },
        createdAt: {
            type:Date,
            default: Date,
            get: createdAtVal => convertDate().toLocaleString(createdAtVal)
        },
        username: {
            type:String,
            required:true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON:{
            virtuals:true,
            getters:true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    //Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
    return this.reactions.length
})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought
