const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1
    },
    album: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    artist: {
        name: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true
        }
    },
    duration: {
        start: {
            type: Number,
            required: true
        },
        end: {
            type: Number,
            required: true
        }
    },
    url: {
        type: String,
        required: true
    }
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
