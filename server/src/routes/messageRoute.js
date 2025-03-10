// backend/routes/messageRoutes.js
import express from 'express'
import Message from '../model/messageModel.js'

const router = express.Router()

router.post('/messages', async (req, res) => {
  console.log('request:  ', req.body)

  try {
    const { sender, receiver, message } = req.body

    // Ensure 'id' is not included in the request
    const newMessage = await Message.create({ sender, receiver, message })
    res.status(201).json(newMessage)
  } catch (error) {
    console.error('Error:', error)
    res.status(400).json({ error: error.message })
  }
})

router.get('/messages/:sender/:receiver', async (req, res) => {
  try {
    const messages = await Message.find({
      sender: req.params.sender,
      receiver: req.params.receiver,
    })

    if (messages.length === 0) {
      return res.status(204).send() // No messages found
    }

    res.json(messages)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
