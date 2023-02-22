import { HydratedDocument } from 'mongoose'
import { Chores, IChores } from '../src/models/choreModel'


export async function getChore(req, res, next) {

    let chore: HydratedDocument<IChores>

    try {
        chore = await Chores.findById(req.params.id)
        if (chore == null) {
            return res.status(404).json({ message: 'Cannot find chore' })
        }
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }

    res.data = {chore: chore}
    next()

}