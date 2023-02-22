import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { router } from './routes/chores'

dotenv.config()

if (process.env.DATABASE_URL) {
    mongoose.connect(process.env.DATABASE_URL)

    const db = mongoose.connection
    db.on('error', (e) => console.log(e))
    db.once('open', () => console.log('Connected to Database'))

    const app = express()
    app.use(express.json())
    app.use('/chores', router)

    app.listen(3000, () => console.log('Server Started'))
}