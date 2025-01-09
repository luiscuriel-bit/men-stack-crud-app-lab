const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    genre: [{ type: String, required: true, trim: true }],
    length: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    reviews: [{
        user: { type: String, trim: true},
        rating: { type: Number, min: 0, max: 5, default: 0},
        comment: { type: String, trim: true },
    }],
    image: { type: String, default: "", trim: true }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;