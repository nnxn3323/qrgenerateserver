"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FileSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    }
}, {
    timestamps: true // createdAt, updatedAt 자동기록
});
exports.default = mongoose_1.default.model("File", FileSchema);
//# sourceMappingURL=File.js.map