import Event from '../model/eventModel.js'

class EventsController {
  async setEvents(req, res) {
    const { description, title, startTime, endTime, tags, category } = req.body
    const owner = req.user

    if (!description || !title || !startTime || !endTime || !tags || !category) {
      return res.status(400).json({
        error: 'error bad request',
      })
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
      startTime,
      endTime,
    })

    return res.status(201).json({
      message: 'event created sucessfully',
      data,
    })
  }
}

const eventsController = new EventsController()
export default eventsController
