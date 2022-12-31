export * from "./server";
import Author from "./author";
import Book from "./book";
import BooksAuthors from "./booksAuthors";

const bookId: string =
  (process.env.DATABASE_BOOK_AUTHORS_BOOK_ID as string) ?? "";

const authorId: string =
  (process.env.DATABASE_BOOK_AUTHORS_AUTHOR_ID as string) ?? "";

Book.belongsToMany(Author, {
  through: { model: BooksAuthors },
  uniqueKey: bookId,
});

Author.belongsToMany(Book, {
  through: { model: BooksAuthors },
  uniqueKey: authorId,
});

export { Author, Book, BooksAuthors };
