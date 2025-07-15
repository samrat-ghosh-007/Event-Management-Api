const Event = require("../models/Event");
const User = require("../models/User");
const mongoose = require("mongoose");

 
// routes/users.js
const express = require('express');
const router = express.Router();





//Create Event
exports.createEvent = async (req, res) => {
  try {
    const { title, dateTime, location, capacity } = req.body;

    if (!title || !dateTime || !location || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ message: "Capacity must be between 1 and 1000" });
    }

    const event = await Event.create({
      title,
      dateTime,
      location,
      capacity,
      registrations: []
    });

    res.status(201).json({ eventId: event._id });
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

//Get Event Details
exports.getEventDetails = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate("registrations", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error fetching event details" });
  }
};

//Register of an User to an Event
exports.registerUserToEvent = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid eventId or userId" });
    }

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) return res.status(404).json({ message: "User or Event not found" });

    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: "User already registered" });
    }

    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    if (new Date(event.dateTime) <= new Date()) {
      return res.status(400).json({ message: "Cannot register for past events" });
    }

    event.registrations.push(userId);
    user.registeredEvents.push(eventId);

    await event.save();
    await user.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


//Cancels Registration
exports.cancelRegistration = async (req, res) => {
  try {
    const { eventId, userId } = req.params;

    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) return res.status(404).json({ message: "User or Event not found" });

    if (!event.registrations.includes(userId)) {
      return res.status(400).json({ message: "User is not registered for this event" });
    }

    event.registrations.pull(userId);
    user.registeredEvents.pull(eventId);

    await event.save();
    await user.save();

    res.json({ message: "Registration cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling registration", error: err.message });
  }
};


//List of Upcoming Events
exports.listUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();

    const events = await Event.find({ dateTime: { $gt: now } })
      .sort({ dateTime: 1, location: 1 }); 

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching upcoming events" });
  }
};


//Get Event Stats
exports.getEventStats = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const total = event.registrations.length;
    const remaining = event.capacity - total;
    const percentage = ((total / event.capacity) * 100).toFixed(2);

    res.json({
      totalRegistrations: total,
      remainingCapacity: remaining,
      percentageUsed: percentage
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching event stats" });
  }
};


