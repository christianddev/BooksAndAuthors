import { Request, Response } from "express";
import httpStatus from "http-status";

import {
  createAuthor,
  findAllAuthorsMin,
  findOneAuthorByNameAndCountry,
} from "../helpers";
import { AuthorModel, BookModel } from "../models";
import { AuthorRequest } from "../typings/author";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    // TODO: add pagination
    const authors = await findAllAuthorsMin();

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

    if (!id) {
      return res.status(httpStatus?.BAD_REQUEST).json({
        msg: "check author id",
      });
    }
    const author = await AuthorModel?.findByPk(id);

    if (author) {
      return res.status(httpStatus?.OK).json(author);
    }

    return res.status(httpStatus?.NOT_FOUND).json({
      msg: `author not found: ${id}`,
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
  const booksAuthors = await AuthorModel?.findAll({
    include: [BookModel],
  });

  res.status(httpStatus?.OK).json({ booksAuthors });
};

export const postAuthor = async (req: Request, res: Response) => {
  try {
    const rawAuthor: AuthorRequest = req?.body;

    // add to middleware
    if (!rawAuthor?.name || !rawAuthor?.country) {
      return res.status(httpStatus?.NOT_FOUND).json({
        error: {
          msg: `check the author name '${rawAuthor?.name}' & country '${rawAuthor?.country}'`,
        },
      });
    }

    // add to middleware
    const author = await findOneAuthorByNameAndCountry({
      name: rawAuthor?.name,
      country: rawAuthor?.country,
    });

    if (author) {
      return res.status(httpStatus?.NOT_FOUND).json({
        msg: `a authors exists with the name '${rawAuthor?.name}' & country '${rawAuthor?.country}'`,
      });
    }

    const newAuthor = createAuthor(rawAuthor);

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
    body,
    params: { id },
  } = req;

  try {
    const author = await AuthorModel?.findByPk(id);
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

  const author = await AuthorModel?.findByPk(id);
  if (!author) {
    return res.status(httpStatus?.NOT_FOUND).json({
      msg: `author not found: ${id}`,
    });
  }

  await author?.update({ isDeleted: true });

  res.status(httpStatus?.OK).json(author);
};
