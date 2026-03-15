const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    genre: [{
        type: String,
        enum: ["Fiction", "Historical", "Romance", "Fantasy", "Mystery", "Thriller", "Non-Fiction", "Self-help", "Business", "Autobiography"],
    }],
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    summary: {
        type: String,
    },
    coverImageUrl: {
        type: String,
    },
});

const Books = mongoose.model("Books", booksSchema);

module.exports = Books;