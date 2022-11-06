import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import "dotenv/config";
import jwt from "jsonwebtoken";
import QrCode from "qrcode";
import FileService from "../services/FileService";
import config from "../config";
import storage from "../config/s3Config";
import File from "../models/File";
type TokenPayload = AccessTokenPayload;
export interface AccessTokenPayload {
  userId: string;
  orderId: string;
}
const JWT_SECRET = process.env.JWT_SECRET ?? "DevSecretKey";
export function generateToken(payload: TokenPayload) {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "12h",
      },
      (err, token) => {
        if (err || !token) {
          reject(err);
          return;
        }
        resolve(token);
      }
    );
  });
}
// @ts-ignore
export const generateQr = async (req: Request, res: Response) => {
  const { userId, orderId } = req.body;
  try {
    const token = await generateToken({ userId, orderId });
    const qrCode = await QrCode.toBuffer(token);
    const params: {
      Bucket: string;
      Key: string;
      Body: Buffer;
    } = {
      Bucket: config.bucketName,
      Key: `qr_${userId}_${orderId}`,
      Body: qrCode,
    };
    const result = await storage.upload(params).promise();

    const file = new File({
      link: result.Location,
      fileName: `qr_${userId}_${orderId}`,
    });

    await file.save();

    const data = {
      _id: file._id,
      link: result.Location,
    };

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
