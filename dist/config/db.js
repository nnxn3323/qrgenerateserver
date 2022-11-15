"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    console.log(process.env.S3_ACCESS_KEY);
    await mongoose_1.default.connect(process.env.MONGO_URI);
    console.log('MongoDb Connected');
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map