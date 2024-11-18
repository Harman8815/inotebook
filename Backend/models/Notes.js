const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },  // no unique constraint here
    tag: { type: String, default: "General" },
    date: { type: Date, default: Date.now }
});

const Notes = mongoose.model('Notes', NotesSchema);
module.exports = Notes;
