"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseMessage_1 = __importDefault(require("../modules/responseMessage"));
const statusCode_1 = __importDefault(require("../modules/statusCode"));
const FileService_1 = __importDefault(require("../services/FileService"));
const uploadFileToS3 = async (req, res) => {
    if (!req.file)
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .send({ message: responseMessage_1.default.NULL_VALUE });
    const fileData = req.file;
    try {
        const data = await FileService_1.default.uploadFileToS3(fileData);
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
exports.default = {
    uploadFileToS3,
};
//# sourceMappingURL=FileController.js.map