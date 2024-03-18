const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    priority: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const todo = mongoose.model("Todos", TodoSchema);

module.exports = todo;
