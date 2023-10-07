const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      maxlength: 30,
    },
    isDone:{
        type: Boolean,
        required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
