import Event from '../model/eventModel.js'

class EventsController {
  // Create an event
  async setEvents(req, res) {
    const { description, title, startTime, endTime, tags, category } = req.body
    const owner = req.user

    // Validate the required fields
    if (!description || !title || !startTime || !endTime || !tags || !category) {
      return res.status(400).json({
        error: 'Bad request: missing required fields',
      })
    }

    if (!owner) {
      return res.status(403).json({
        error: 'Unauthorized',
      })
    }

    // Determine if the event is scheduled or attended based on the start time
    const type = new Date(startTime) >= new Date() ? 'scheduled' : 'attended'

    // Create the event in the database
    try {
      const event = await Event.create({
        title,
        description,
        owner,
        category,
        tags,
        startTime,
        endTime,
        type, // Set the type of the event (scheduled or attended)
      })

      return res.status(201).json({
        message: 'Event created successfully',
        data: event,
      })
    } catch (error) {
      return res.status(500).json({
        error: 'Server error: unable to create event',
        details: error.message,
      })
    }
  }

  // Get all scheduled events (future events)
  async getScheduledEvents(req, res) {
    try {
      const events = await Event.find({
        type: 'scheduled',
        startTime: { $gte: new Date() }, // Ensure the event is in the future
      }).sort({ startTime: 1 }) // Sort by start time ascending
      res.status(200).json(events)
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching scheduled events',
        error: error.message,
      })
    }
  }

  // Get all attended events (past events)
  async getAttendedEvents(req, res) {
    try {
      const events = await Event.find({
        type: 'attended',
        startTime: { $lt: new Date() }, // Ensure the event is in the past
      }).sort({ startTime: -1 }) // Sort by start time descending
      res.status(200).json(events)
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching attended events',
        error: error.message,
      })
    }
  }
}

const eventsController = new EventsController()
export default eventsController
