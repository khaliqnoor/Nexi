import express from 'express'
  import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import {inngest, functions} from './inngest/index.js'
import {serve} from 'inngest/express'
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import storyRouter from './routes/storyRoutes.js'
import messageRouter from './routes/messageRoutes.js'

const app = express()
await connectDB()


// The below clerkmiddleware will add the auth property when the user is authenticated like login or not 

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

app.get('/', (req, res) => {
  res.send('Hello World!, how are you all doing is everything all right')
})
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT} `)
})