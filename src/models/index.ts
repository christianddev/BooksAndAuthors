import ServerModel from "./ServerModel";
import AuthorModel from "./AuthorModel";
import BookModel from "./BookModel";
import BooksAuthorsModel from "./BooksAuthorsModel";

const bookId: string =
  (process.env.DATABASE_BOOK_AUTHORS_BOOK_ID as string) ?? "";

const authorId: string =
  (process.env.DATABASE_BOOK_AUTHORS_AUTHOR_ID as string) ?? "";

BookModel.belongsToMany(AuthorModel, {
  through: { model: BooksAuthorsModel },
  uniqueKey: bookId,
});

AuthorModel.belongsToMany(BookModel, {
  through: { model: BooksAuthorsModel },
  uniqueKey: authorId,
});

export { ServerModel, AuthorModel, BookModel, BooksAuthorsModel };
