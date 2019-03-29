const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new mongoose.Schema({
    file: String,
    word: String,
    line: Number,
});

export const Word = mongoose.model('Dictionary', wordSchema);