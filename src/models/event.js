import mongoose from "mongoose";
import moment from "moment";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validate if the string is in the dd-mm-yyyy format
        return /^\d{2}-\d{2}-\d{4}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid date! Use the format DD-MM-YYYY.`,
    },
    set: function (value) {
      // Convert the date to dd-mm-yyyy format before saving
      return moment(value, "DD-MM-YYYY").format("DD-MM-YYYY");
    },
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Regex for HH:MM (24-hour format)
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid time! Use the 24-hour format HH:MM.`,
    },
  },
  description: {
    type: String,
    required: true,
  },
  participantList: {
    type: [String],
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

// Create the model
const Event = mongoose.model("Event", eventSchema);

export default Event;
