export * from "./server";

import Author from "./author";
import Book from "./book";

Book.belongsToMany(Author, {
  through: { model: "booksAuthors" },
  uniqueKey: "bookId",
});
Author.belongsToMany(Book, {
  through: { model: "booksAuthors" },
  uniqueKey: "authorId",
});

export { Author, Book };
