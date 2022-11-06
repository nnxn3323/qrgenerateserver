import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import FileService from "../services/FileService";

const uploadFileToS3 = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(statusCode.BAD_REQUEST)
      .send({ message: message.NULL_VALUE });

  const fileData: Express.Multer.File = req.file;

  try {
    const data = await FileService.uploadFileToS3(fileData);

    res
      .status(statusCode.CREATED)
      .send({ message: message.CREATE_FILE_SUCCESS, data });
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send({ message: message.INTERNAL_SERVER_ERROR });
  }
};

export default {
  uploadFileToS3,
};
