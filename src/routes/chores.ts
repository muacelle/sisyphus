import express from 'express'
import { HydratedDocument } from 'mongoose'
import { Chores, IChores } from '../models/choreModel.js'
export const router = express.Router()

// New Chore
router.post('/', async (req, res) => {

    let nextTime: Date = new Date()
    nextTime.setDate(nextTime.getDate() + req.body.frequency)
    const chore: HydratedDocument<IChores> = new Chores({
        name: req.body.name, 
        frequency: req.body.frequency, 
        lastCompleted: new Date(), 
        nextTime: nextTime
    })

    try {
        const newChore: HydratedDocument<IChores> = await chore.save()
        res.status(201).json(newChore)
    } catch (e) {
        res.status(400).json({ error: e.message })
    }

})

// Get All
router.get('/', async (req, res) => {

    try {
        const chores: HydratedDocument<IChores>[] = await Chores.find()
        res.json(chores)
    } catch(e) {
        console.log(e.message)
    }

})

// Get one
router.get('/:id', getChore, async (req, res) => {
    res.send(res.chore)
})

// Update 
router.patch('/:id', getChore, async (req, res) => {

    if (req.body.name != null) {
        res.chore.name = req.body.name
    }
    if (req.body.frequency != null) {
        res.chore.frequency = req.body.frequency
    }

    try {
        const updatedChore = await res.chore.save()
        res.json(updatedChore)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }

})

// Delete
router.delete('/:id', getChore, async (req, res) => {

    try {
        await res.chore.remove()
        res.json({ message: 'Deleted chore' })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

})

// Callback
async function getChore(req, res, next) {

    let chore: HydratedDocument<IChores>

    try {
        chore = await Chores.findById(req.params.id)
        if (chore == null) {
            return res.status(404).json({ message: 'Cannot find chore' })
        }
    } catch (e){
        return res.status(500).json({ message: e.message })
    }

    res.chore = chore
    next()

}