"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQr = exports.generateToken = void 0;
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const qrcode_1 = __importDefault(require("qrcode"));
const config_1 = __importDefault(require("../config"));
const s3Config_1 = __importDefault(require("../config/s3Config"));
const File_1 = __importDefault(require("../models/File"));
const JWT_SECRET = process.env.JWT_SECRET ?? "rtnio345y8sdfjv142sdf123";
function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: "12h",
        }, (err, token) => {
            if (err || !token) {
                reject(err);
                return;
            }
            resolve(token);
        });
    });
}
exports.generateToken = generateToken;
// @ts-ignore
const generateQr = async (req, res) => {
    const { userId, orderId } = req.body.data;
    try {
        const token = await generateToken({ userId, orderId });
        const qrCode = await qrcode_1.default.toBuffer(token);
        const params = {
            Bucket: config_1.default.bucketName,
            Key: `qr_${userId}_${orderId}`,
            Body: qrCode,
        };
        const result = await s3Config_1.default.upload(params).promise();
        const file = new File_1.default({
            link: result.Location,
            fileName: `qr_${userId}_${orderId}`,
        });
        await file.save();
        const data = {
            _id: file._id,
            link: result.Location,
        };
        res
            .status(statusCode_1.default.CREATED)
            .send({ message: responseMessage_1.default.CREATE_FILE_SUCCESS, data });
    }
    catch (error) {
        console.log(error);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .send({ message: responseMessage_1.default.INTERNAL_SERVER_ERROR });
    }
};
exports.generateQr = generateQr;
//# sourceMappingURL=QrController.js.map