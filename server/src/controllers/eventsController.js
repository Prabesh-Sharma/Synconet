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

const eventsController = new EventsController()
export default eventsController
