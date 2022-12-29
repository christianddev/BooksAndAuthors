export * from "./server";

import Author from "./author";
import Book from "./book";

Book.belongsToMany(Author, { through: "booksAuthors", foreignKey: "bookId"  });
Author.belongsToMany(Book, { through: "booksAuthors", foreignKey: "authorId" });

export { Author, Book };
