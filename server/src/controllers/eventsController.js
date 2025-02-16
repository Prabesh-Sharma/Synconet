import Event from '../model/eventModel.js'

class EventsController {
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
}

const eventsController = new EventsController()
export default eventsController
