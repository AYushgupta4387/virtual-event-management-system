import express from "express";
import validateJWT from "../middlewares/validateJWT.js";
import {
  getAllEvents,
  createEvent,
  registerForEvent,
  updateEvent,
  deleteEvent,
  getEventDetails,
} from "../controllers/event.js";

const router = express.Router();

// Get all events
router.get("/", getAllEvents);

// Get details of an event by id
router.get("/:id", validateJWT, getEventDetails);

// Create a new event
router.post("/", validateJWT, createEvent);

// Update an event
router.put("/:id", validateJWT, updateEvent);

// Delete an event
router.delete("/:id", validateJWT, deleteEvent);

// Register for an event
router.post("/:id/register", validateJWT, registerForEvent);

export default router;
