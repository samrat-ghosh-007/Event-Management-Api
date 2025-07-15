const express = require("express");
const router = express.Router();
const { registerUserToEvent, cancelRegistration, listUpcomingEvents, getEventStats, createEvent, getEventDetails} = require("../controllers/eventController");



router.post('/', createEvent);

router.get('/:eventId', getEventDetails);

router.post("/:eventId/register/:userId", registerUserToEvent);

router.delete("/:eventId/cancel/:userId", cancelRegistration);

router.get("/upcoming/all", listUpcomingEvents);

router.get("/:id/stats", getEventStats);







module.exports = router;
