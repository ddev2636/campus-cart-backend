import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../error/index.js";
import Thing from "../models/Thing.js";
import path from "path";

const sellThing = async (req, res) => {
  const { name, price, desc, contact, category, image } = req.body;

  console.log(req.body);
  if (!name || !price || !desc || !contact || !image || !category) {
    throw new BadRequestError("please provide all value");
  }

  const thing = new Thing({ image, name, price, desc, category, contact });
  const savedthing = await thing.save();
  res.status(StatusCodes.CREATED).json(savedthing);
};

const buyThing = async (req, res) => {
  let result = Thing.find();
  const things = await result;
  res.status(StatusCodes.OK).json({ things });
};

export { sellThing, buyThing };
