import Event from "../models/event.js";
import EmailService from "../services/email.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).send({ message: "No events found." });
    }

    const eventsInShort = events.map((event) => {
      return {
        eventName: event.eventName,
        eventId: event._id,
        date: event.date,
        time: event.time,
      };
    });

    res.status(200).send(eventsInShort);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: "An error occurred while fetching events." });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const { eventName, date, time, description } = req.body;

  if (!date || !time || !description || !eventName) {
    return res.status(400).send({
      message: "EventName, date, time and description are required.",
    });
  }

  try {
    if (!req.user || !req.user.userName) {
      return res.status(400).send({
        message: "User authentication failed.",
      });
    }

    const userName = req.user.userName;

    const dbEvent = await Event.create({
      eventName,
      date,
      time,
      description,
      participantList: [userName], // Add current user as a participant
      createdBy: userName,
    });

    res.status(201).send({
      event: {
        eventId: dbEvent._id,
        eventName: dbEvent.eventName,
        date: dbEvent.date,
        time: dbEvent.time,
        description: dbEvent.description,
        participantList: dbEvent.participantList,
        createdBy: dbEvent.createdBy,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while creating the event.",
      error: err?.message || "Internal Server Error",
    });
  }
};

// Update an event by id
export const updateEvent = async (req, res) => {
  const eventId = req.params.id;

  const { eventName, date, time, description } = req.body;

  if (!date || !time || !description || !eventName) {
    return res.status(400).send({
      message: "EventName, date, time and description are required.",
    });
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).send({ message: "Event not found." });
  }

  const userName = req.user.userName;

  if (event.createdBy !== userName) {
    return res.status(401).send({
      message:
        "Cannot alter this event. You can only alter the events created by yourself.",
    });
  }

  event.eventName = eventName;
  event.date = date;
  event.time = time;
  event.description = description;

  try {
    const updatedEvent = await event.save();

    res.status(200).send({
      message: `Successfully update the event with id ${eventId}.`,
      event: updatedEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while registering for the event.",
    });
  }
};

// Delete an event by id
export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).send({ message: "Event not found." });
  }

  const userName = req.user.userName;

  if (event.createdBy !== userName) {
    return res.status(401).send({
      message:
        "Cannot alter this event. You can only alter the events created by yourself.",
    });
  }

  try {
    // Delete the event
    await event.remove();

    // Respond with a success message
    res.status(200).send({
      message: "Event successfully deleted.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while deleting the event.",
    });
  }
};

// Register for an event
export const registerForEvent = async (req, res) => {
  const eventId = req.params.id;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).send({ message: "Event not found." });
  }

  const userName = req.user.userName;

  if (event.participantList.includes(userName)) {
    return res
      .status(400)
      .send({ message: "User already registered for this event." });
  }

  event.participantList.push(userName);

  try {
    const updatedEvent = await event.save();

    await EmailService.sendEventRegistrationEmail(
      req.user.email,
      req.user.userName,
      updatedEvent
    );

    res.status(200).send({
      message: "Successfully registered for the event.",
      event: updatedEvent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while registering for the event.",
    });
  }
};

// Get details of an event by id
export const getEventDetails = async (req, res) => {
  const eventId = req.params.id;

  const dbEvent = await Event.findById(eventId);
  if (!dbEvent) {
    return res.status(404).send({ message: "Event not found." });
  }

  try {
    res.status(201).send({
      event: {
        eventId: dbEvent._id,
        eventName: dbEvent.eventName,
        date: dbEvent.date,
        time: dbEvent.time,
        description: dbEvent.description,
        participantList: dbEvent.participantList,
        createdBy: dbEvent.createdBy,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while fetching the event details.",
      error: err?.message || "Internal Server Error",
    });
  }
};
