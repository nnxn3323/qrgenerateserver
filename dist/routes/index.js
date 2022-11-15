"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FileRouter_1 = __importDefault(require("./FileRouter"));
const QrRouter_1 = __importDefault(require("./QrRouter"));
const router = (0, express_1.Router)();
router.use("/file", FileRouter_1.default);
router.use("/api", QrRouter_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map