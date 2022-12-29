import { Request, Response } from "express";
import { Author, Book } from "../models";

export const getAllBooksAuthors = async (req: Request, res: Response) => {
  console.log('getAllBooksAuthors')
  const booksAuthors = await Book.findAll({
    include: [Author]
  });

  res.json({ booksAuthors });
};

// export const getBooksAuthorsByBook = async (req: Request, res: Response) => {
//   const { bookId } = req.params;

//   // todo: check this query
//   const books = Book.findByPk(bookId).then((book) => book?.get());

//   if (!books) {
//     console.log('No books', books)
//   }

//   const booksAuthors = books?.getAuthors()

//   if (booksAuthors) {
//     res.json(booksAuthors);
//   } else {
//     res.status(404).json({
//       msg: `book not found: ${bookId}`,
//     });
//   }
// };

// export const getBooksAuthorsByAuthor = async (req: Request, res: Response) => {
//   const { authorId } = req.params;

//   // todo: check this query
//   const booksAuthors = await Book.findByPk(authorId);

//   if (booksAuthors) {
//     res.json(booksAuthors);
//   } else {
//     res.status(404).json({
//       msg: `book not found: ${authorId}`,
//     });
//   }
// };

// export const postBookAuthor = async (req: Request, res: Response) => {
//   const { body } = req;

//   try {
//     // check authors
//     const existAuthor = await BookAuthor.findOne({
//       where: {
//         title: body.title,
//       },
//     });

//     if (existAuthor) {
//       return res.status(400).json({
//         msg: `a books exists with the title ${body.title}`,
//       });
//     }

//     const book = Book.build(body);
//     await book.save();

//     res.json(book);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: "contact with the administrator",
//     });
//   }
// };

// // export const putBook = async (req: Request, res: Response) => {
// //   const { id } = req.params;
// //   const { body } = req;

// //   try {
// //     const book = await Book.findByPk(id);
// //     if (!book) {
// //       return res.status(404).json({
// //         msg: `book not found: ${id}`,
// //       });
// //     }

// //     await book.update(body);

// //     res.json(book);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({
// //       msg: "contact with the administrator",
// //     });
// //   }
// // };

// export const deleteBookAuthor = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   const book = await Book.findByPk(id);
//   if (!book) {
//     return res.status(404).json({
//       msg: `book not found: ${id}`,
//     });
//   }

//   await book.update({ isDeleted: true });

//   // await book.destroy();

//   res.json(book);
// };
