import Event from '../model/eventModel.js'

class EventsController {
  async eventConut(req, res) {
    const events = await Event.find({})
    let eventscount = 0
    events.forEach(() => {
      ++eventscount
    })

    res.status(200).json({
      eventscount,
    })
  }

  async setEvents(req, res) {
    const { description, title, startDateTime, endDateTime, tags, category } = req.body
    const owner = req.user

    if ((!description, !title)) {
      return
    }

    if (!owner) {
      return res.status(403).json({
        error: 'unauthorized',
      })
    }

    const data = Event.create({
      title,
      description,
      owner,
      category,
      tags,
      startDateTime,
      endDateTime,
    })

    return res.status(201).json({
      message: 'event created sucessfully',
      data,
    })
  }

  async getEvents(_, res) {
    try {
      const events = await Event.find({})
      return res.status(200).json({ events })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve events' })
    }
  }

  async deleteEvent(req, res) {
    try {
      const eventId = req.params.id
      const userId = req.user
      console.log('users id', req.user)

      const event = await Event.findById(eventId)

      if (!event) {
        return res.status(404).json({ message: 'Event not found' })
      }

      if (userId !== event.owner.toString()) {
        return res.status(403).json({
          message: "You don't have permission to delete this event as you're not the owner.",
        })
      }

      await event.deleteOne()
      return res.status(200).json({ message: 'Event deleted successfully' })
    } catch (error) {
      console.error('Delete event error:', error)
      return res.status(500).json({ message: 'Failed to delete the event' })
    }
  }
}

async function clearExpiredEvents() {
  try {
    const currentDate = new Date()

    // Find all events where startDateTime is less than current time
    const result = await Event.deleteMany({
      startDateTime: { $lt: currentDate },
    })

    console.log(`Cleared ${result.deletedCount} expired events at ${currentDate.toISOString()}`)

    return {
      success: true,
      message: `Successfully cleared ${result.deletedCount} expired events`,
      count: result.deletedCount,
    }
  } catch (error) {
    console.error('Error clearing expired events:', error)
    return {
      success: false,
      message: 'Failed to clear expired events',
    }
  }
}

function setupExpiredEventsCleanup() {
  // Run once immediately on startup
  clearExpiredEvents()

  // Then run every 30 minutes (30 * 60 * 1000 ms)
  const THIRTY_MINUTES = 30 * 60 * 1000
  setInterval(clearExpiredEvents, THIRTY_MINUTES)

  console.log('Expired events cleanup scheduled to run every 30 minutes')
}

const eventsController = new EventsController()
export default eventsController
export { clearExpiredEvents, setupExpiredEventsCleanup }
