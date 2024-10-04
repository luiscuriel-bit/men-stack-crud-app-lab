const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    genre: [{ type: String, required: true, trim: true }],
    author: { type: String, required: true, trim: true },
    reviews: [{
        user: { type: String, required: true, trim: true},
        rating: { type: Number, min: 0, max: 5, default: 0 },
        comment: {type: String, trim: true},
    }],
    image: { type: String, default: "", trim: true }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;