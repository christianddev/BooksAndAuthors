import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createAuthor,
  deleteAuthorTemporary,
  findAllAuthors,
  findAllBooksAuthorsGroupByAuthor,
  findAuthorById,
  findOneAuthorByNameAndCountry,
  updateAuthor,
} from "../helpers";
import { AuthorModel, BookModel } from "../models";
import { AuthorRequest } from "../typings/author";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    // TODO: add pagination
    const authors = await findAllAuthors();

    res.status(httpStatus?.OK).json({ authors });
  } catch (error) {
    console.trace(error);
    res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;

    const author = await findAuthorById(id);

    if (author) {
      return res.status(httpStatus?.OK).json(author);
    }

    return res.status(httpStatus?.NOT_FOUND).json({
      msg: `author with id '${id}' not found`,
    });
  } catch (error) {
    console.trace(error);
    res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const getAllBooksAuthorsGroupByAuthor = async (
  req: Request,
  res: Response
) => {
  const booksAuthors = await findAllBooksAuthorsGroupByAuthor();

  res.status(httpStatus?.OK).json({ booksAuthors });
};

export const postAuthor = async (req: Request, res: Response) => {
  try {
    const rawAuthor: AuthorRequest = req?.body;
    const newAuthor = await createAuthor(rawAuthor);

    return res.status(httpStatus?.OK).json(newAuthor);
  } catch (error) {
    console.trace(error);
    res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const putAuthor = async (req: Request, res: Response) => {
  const {
    body: { name, country },
    params: { id },
  } = req;

  try {
    const response = await updateAuthor({ id: Number(id), name, country });

    return res.status(httpStatus?.OK).json(response);
  } catch (error) {
    console.trace(error);
    return res.status(httpStatus?.INTERNAL_SERVER_ERROR).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req?.params;

  const response = await deleteAuthorTemporary(Number(id), true);

  return res.status(httpStatus?.OK).json(response);
};
