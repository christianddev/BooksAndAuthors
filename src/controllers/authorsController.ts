import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createAuthor,
  deleteAuthorTemporary,
  findAllAuthors,
  findAllBooksAuthorsGroupByAuthor,
  finOneAuthorById,
  updateAuthor,
  createAuthorWithBooks,
  setBooksAuthorsFromAuthorId,
} from "../helpers";

import { defaultErrorResponse } from "../utils";

import type { ErrorOperation } from "../typings/api";
import type { AuthorRequest } from "../typings/author";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await findAllAuthors();

    res.status(httpStatus?.OK).json({ data: { authors } });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;
    const author = await finOneAuthorById(Number(id));

    if (author) {
      return res.status(httpStatus?.OK).json({ data: { author } });
    }

    const error: ErrorOperation = {
      status: httpStatus?.NOT_FOUND,
      message: `author with id '${id}' not found`,
    };

    return res.status(httpStatus?.NOT_FOUND).json({ error });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const getAllBooksAuthorsGroupByAuthor = async (
  req: Request,
  res: Response
) => {
  try {
    const booksAuthors = await findAllBooksAuthorsGroupByAuthor();

    res.status(httpStatus?.OK).json({ data: { booksAuthors } });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const postAuthor = async (req: Request, res: Response) => {
  try {
    const rawAuthor: AuthorRequest = req?.body;
    const newAuthor = await createAuthor(rawAuthor);

    return res
      .status(httpStatus?.OK)
      .json({ data: { author: newAuthor?.data } });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const postAuthorWithBooks = async (req: Request, res: Response) => {
  try {
    const rawAuthor: AuthorRequest = req?.body;
    const newAuthor = await createAuthorWithBooks(rawAuthor);
    return res.status(httpStatus?.OK).json(newAuthor);
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
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
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const putAuthorWithBooks = async (req: Request, res: Response) => {
  try {
    const {
      body: { books },
      params: { id },
    } = req;

    const response = await setBooksAuthorsFromAuthorId(Number(id), books);
    if (response?.data?.length) {
      return res.status(httpStatus?.OK).json(response);
    }

    return res.status(httpStatus?.BAD_REQUEST).json({ error: response?.error });
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const { id } = req?.params;

    const response = await deleteAuthorTemporary(Number(id), true);

    return res.status(httpStatus?.OK).json(response);
  } catch (err) {
    console.trace(err);

    return defaultErrorResponse(res);
  }
};
