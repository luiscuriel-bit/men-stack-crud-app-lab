// Modules
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const morgan = require("morgan");

// Schemas
const Book = require("./models/book.js")
const Movie = require("./models/movie.js");

// Database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`);
});
mongoose.connection.on("error", err => {
    console.log(`Failed to connect due to ${err}`);
});

// Middlewares
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Routes Movies
app.get("/", (req, res) => {
    res.render("index", { title: "Index" });
});

app.get("/movies", async (req, res) => {
    const movies = await Movie.find();
    res.render("movies/index", { title: "Movies", movies });
});

app.get("/movies/new", (req, res) => {
    res.render("movies/new", { title: "Add a new movie" });
});

app.post("/movies", async (req, res) => {
    await Movie.create(req.body);
    res.redirect("/movies");
});

app.get("/movies/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("movies/show", { title: movie.title, movie })
});

app.get("/movies/:id/edit", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.render("movies/edit", { title: movie.title, movie });
});

app.post("/movies/:id/reviews", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    movie.reviews.push(req.body);
    await movie.save();
    res.redirect(`/movies/${req.params.id}`)
});

app.put("/movies/:id", async (req, res) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/movies/${req.params.id}`)
});

app.delete("/movies/:id", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
});

// Routes Books
app.get("/books", async (req, res) => {
    const books = await Book.find();
    res.render("books/index", { title: "Books", books });
});

app.get("/books/new", (req, res) => {
    res.render("books/new", { title: "Add a new book" });
});

app.post("/books", async (req, res) => {
    await Book.create(req.body);
    res.redirect("/books");
});

app.get("/books/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("books/show", { title: book.title, book })
});

app.get("/books/:id/edit", async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render("books/edit", { title: book.title, book })
});

app.post("/books/:id/reviews", async (req, res) => {
    const book = await Book.findById(req.params.id);
    book.reviews.push(req.body);
    await book.save();
    res.redirect(`/books/${req.params.id}`)

});

app.put("/books/:id", async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/books/${req.params.id}`);
});

app.delete("/books/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
});

app.listen(3000, (req, res) => {
    console.log("Listening");
});