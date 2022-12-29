import { Request, Response } from "express";
import { Author } from "../models/";

export const getAuthors = async (req: Request, res: Response) => {
  const authors = await Author.findAll();

  res.json({ authors });
};

export const getAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  const author = await Author.findByPk(id);

  if (author) {
    res.json(author);
  } else {
    res.status(404).json({
      msg: `author not found: ${id}`,
    });
  }
};

export const postAuthor = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existAuthor = await Author.findOne({
      where: {
        name: body.name,
        country: body.country,
      },
    });

    if (existAuthor) {
      return res.status(400).json({
        msg: `a authors exists with the name ${body.name} & country ${body.country}`,
      });
    }

    const author = Author.build(body);
    await author.save();

    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};

export const putAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).json({
        msg: `author not found: ${id}`,
      });
    }

    await author.update(body);

    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact with the administrator",
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  const author = await Author.findByPk(id);
  if (!author) {
    return res.status(404).json({
      msg: `author not found: ${id}`,
    });
  }

  await author.update({ isDeleted: true });

  // await author.destroy();

  res.json(author);
};
