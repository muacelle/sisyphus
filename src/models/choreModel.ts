import mongoose from 'mongoose'

export interface IChores {
    name: string
    frequency: string
    lastCompleted: Date
    nextTime: Date
}

const choresSchema: mongoose.Schema<IChores> = new mongoose.Schema({
    name: String,
    frequency: Number,
    lastCompleted: Date,
    nextTime: Date
})

export const Chores: mongoose.Model<IChores> = mongoose.model('Chores', choresSchema)