"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FileController_1 = __importDefault(require("../controllers/FileController"));
const multer_1 = __importDefault(require("multer"));
const multerConfig_1 = require("../config/multerConfig");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(multerConfig_1.multerConfig);
router.post('/upload', upload.single('image'), FileController_1.default.uploadFileToS3);
exports.default = router;
//# sourceMappingURL=FileRouter.js.map