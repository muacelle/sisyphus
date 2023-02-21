import mongoose from 'mongoose'

export interface IChores {
    name: string
    frequency: number
    lastCompleted: Date
    nextTime: Date
}

const choresSchema: mongoose.Schema<IChores> = new mongoose.Schema({
    name: { type: String, required: true },
    frequency: { type: Number, required: true },
    lastCompleted: Date,
    nextTime: Date
})

export const Chores: mongoose.Model<IChores> = mongoose.model('Chores', choresSchema)