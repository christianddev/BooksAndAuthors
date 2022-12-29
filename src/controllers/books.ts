import { Request, Response } from "express";
import { Book } from "../models";

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll();

  res.json({ books });
};

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({
      msg: `book not found: ${id}`,
    });
  }
};

export const postBook = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existAuthor = await Book.findOne({
      where: {
        title: body.title,
      },
    });

    if (existAuthor) {
      return res.status(400).json({
        msg: `a books exists with the title ${body.title}`,
      });
    }

    const book = Book.build(body);
    await book.save();

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};

export const putBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        msg: `book not found: ${id}`,
      });
    }

    await book.update(body);

    res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await Book.findByPk(id);
  if (!book) {
    return res.status(404).json({
      msg: `book not found: ${id}`,
    });
  }

  await book.update({ isDeleted: true });

  // await book.destroy();

  res.json(book);
};
