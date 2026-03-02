"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("Connected to database");
    }
    catch (error) {
        console.log("Failed to connect database", error);
        process.exit(1);
    }
};
exports.config = {
    port: process.env.PORT || 3000,
    databaseURL: process.env.MONGO_CONNECTION_STRING
};
exports.default = connectDB;
