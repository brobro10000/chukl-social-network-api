const { Schema, model } = require('mongoose');

const TestSchema = new Schema(
    {
        testName: {
            type: String,
            required: true,
            trim: true
          },
        createdBy: {
            type: String
        },
    }
);

const Test = model('Test', TestSchema);

// export the Pizza model
module.exports = Test;