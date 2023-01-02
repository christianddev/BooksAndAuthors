import ServerModel from "./ServerModel";
import AuthorModel from "./AuthorModel";
import BookModel from "./BookModel";
import BooksAuthorsModel from "./BooksAuthorsModel";
import { AUTHOR_ID_FIELD, BOOK_ID_FIELD } from "../helpers/";

BookModel.belongsToMany(AuthorModel, {
  through: { model: BooksAuthorsModel },
  uniqueKey: BOOK_ID_FIELD,
});

AuthorModel.belongsToMany(BookModel, {
  through: { model: BooksAuthorsModel },
  uniqueKey: AUTHOR_ID_FIELD,
});

export { ServerModel, AuthorModel, BookModel, BooksAuthorsModel };
