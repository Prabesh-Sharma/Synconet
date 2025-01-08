import express, { urlencoded } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'

import userRoute from './src/routes/userRoute.js'
import connection from './src/database/database.js'
import interestRoute from './src/routes/interestRoute.js'
import http from 'http'
import initializeSocket from './src/services/socketServer.js'

config()
const app = express()
const httpServer = http.createServer(app)

initializeSocket(httpServer)

app.use(morgan('dev'))
app.use(urlencoded({ extended: 'true' }))

app.use(
  cors({
    origin: '*',
  })
)
app.use(express.json())

connection(process.env.MONGO_URI)

app.get('/', (_, res) => {
  res.status(200).json({
    message: 'success',
  })
})

app.use('/api/user', userRoute)
app.use('/api/interest', interestRoute)

httpServer.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`the server has started on port ${process.env.PORT}`)
})
