import express, { urlencoded } from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"

config()
const app = express();

app.use(morgan("dev"))
app.use(urlencoded({ extended: "true" }))
app.use(
    cors({
        origin: "*"
    })
)
app.use(express.json())

app.get('/', (_, res) => {
    res.status(200).json({
        message: "success"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`the server has started on port ${process.env.PORT}`)
})