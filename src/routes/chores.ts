import express from 'express'
import { HydratedDocument } from 'mongoose'
import { Chores, IChores } from '../models/choreModel'
import { getChore } from '../../middleware/getChore'
import { Request, Response } from 'express'
import { add, parse, setDefaultOptions } from 'date-fns'
import brazilianLocale from 'date-fns/locale/pt-BR'
export const router = express.Router()

setDefaultOptions({
    locale: brazilianLocale
})

// New Chore
router.post('/', async (req: Request, res: IChoreResponse) => {

    let today: Date = new Date()
    let lastTime: Date = (req.body.lastCompleted == null) ? today : parse(req.body.lastCompleted, 'dd/MM/yyyy', new Date());
    const chore: HydratedDocument<IChores> = new Chores({
        name: req.body.name, 
        frequency: req.body.frequency, 
        lastCompleted: lastTime, 
        nextTime: add(lastTime, {days: req.body.frequency})
    })

    try {
        const newChore: HydratedDocument<IChores> = await chore.save()
        res.status(201).json(newChore)
    } catch (e) {
        res.status(400).json({ error: e.message })
    }

})

// Get All
router.get('/', async (req: Request, res: IChoreResponse) => {

    try {
        const chores: HydratedDocument<IChores>[] = await Chores.find()
        res.json(chores)
    } catch(e) {
        console.log(e.message)
    }

})

// Get one
router.get('/:id', getChore, async (req: Request, res: IChoreResponse) => {
    res.send(res.data.chore)
})

// Update 
router.patch('/:id', getChore, async (req: Request, res: IChoreResponse) => {

    if (req.body.name != null) {
        res.data.chore.name = req.body.name
    }
    if (req.body.frequency != null) {
        res.data.chore.frequency = req.body.frequency
    }

    try {
        const updatedChore = await res.data.chore.save()
        res.json(updatedChore)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }

})

// Delete
router.delete('/:id', getChore, async (req, res: IChoreResponse) => {

    try {
        await res.data.chore.remove()
        res.json({ message: 'Deleted chore' })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }

})

interface IChoreResponse extends Response {
    data: {chore: HydratedDocument<IChores>}
}