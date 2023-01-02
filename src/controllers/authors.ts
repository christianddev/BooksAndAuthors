import { Request, Response } from "express";
import httpStatus from "http-status";

import { findOneAuthorByNameAndCountry } from "../helpers";
import { Author, Book } from "../models/";

export const getAuthors = async (req: Request, res: Response) => {
  const authors = await Author?.findAll();

  res.status(httpStatus?.OK).json({ authors });
};

export const getAuthor = async (req: Request, res: Response) => {
  const { id } = req?.params;

  const author = await Author?.findByPk(id);

  if (author) {
    res.status(httpStatus?.OK).json(author);
  } else {
    res.status(httpStatus?.NOT_FOUND).json({
      msg: `author not found: ${id}`,
    });
  }
};

export const getAllBooksAuthorsGroupByAuthor = async (
  req: Request,
  res: Response
) => {
  const booksAuthors = await Author?.findAll({
    include: [Book],
  });

  res.status(httpStatus?.OK).json({ booksAuthors });
};

export const postAuthor = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const author = await findOneAuthorByNameAndCountry({
      name: body?.name,
      country: body?.country,
    });

    if (author) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `a authors exists with the name ${body?.name} & country ${body?.country}`,
      });
    }

    const newAuthor = Author?.build(body);
    await newAuthor?.save();

    res.status(httpStatus?.OK).json(newAuthor);
  } catch (error) {
    console.trace(error);
    res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const putAuthor = async (req: Request, res: Response) => {
  const { id } = req?.params;
  const { body } = req;

  try {
    const author = await Author?.findByPk(id);
    if (!author) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `author not found: ${id}`,
      });
    }

    await author?.update(body);

    res.status(httpStatus?.OK).json(author);
  } catch (error) {
    console.trace(error);
    res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req?.params;

  const author = await Author?.findByPk(id);
  if (!author) {
    return res.status(httpStatus?.NOT_FOUND).json({
      msg: `author not found: ${id}`,
    });
  }

  await author?.update({ isDeleted: true });

  res.status(httpStatus?.OK).json(author);
};
