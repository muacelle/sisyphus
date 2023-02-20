import express from 'express'
import { Chores, IChores } from '../models/choreModel.js'
export const router = express.Router()

// New Chore
router.post('/', async (req, res) => {

    let nextTime: Date = new Date()
    nextTime.setDate(nextTime.getDate() + req.body.frequency)

    try {

        const chore = await Chores.create({ name: req.body.name, frequency: req.body.frequency, lastCompleted: Date(), nextTime: nextTime })
        res.status(201).json(chore)

    } catch (e) {

        res.status(400).json({ error: e.message });

    }

})

// Getting All
router.get('/', async (req, res) => {

    try {

        const chores = await Chores.find()
        res.json(chores)

    } catch(e) {

        console.log(e.message)

    }

})

// Delete One

