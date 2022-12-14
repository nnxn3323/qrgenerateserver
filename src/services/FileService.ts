import config from "../config";
import storage from "../config/s3Config";
import File from "../models/File";
import fs from "fs";
import { FileResponseDto } from "../interfaces/file/FileResponseDto";

const uploadFileToS3 = async (
  fileData: Express.Multer.File
): Promise<FileResponseDto> => {
  try {
    const fileContent: Buffer = fs.readFileSync(fileData.path);

    const params: {
      Bucket: string;
      Key: string;
      Body: Buffer;
    } = {
      Bucket: config.bucketName,
      Key: fileData.originalname,
      Body: fileContent,
    };

    const result = await storage.upload(params).promise();

    const file = new File({
      link: result.Location,
      fileName: fileData.originalname,
    });

    await file.save();

    const data = {
      _id: file._id,
      link: result.Location,
    };

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  uploadFileToS3,
};
