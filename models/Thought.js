const { Schema, model } = require('mongoose');

// Schema to create a course model
const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Reaction',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (v) {
    const first = v.split(' ')[0];
    const last = v.split(' ')[1];
    this.set({ first, last });
  });


  const Thought = model('thought', thoughtSchema);
  
  module.exports = Thought;
  