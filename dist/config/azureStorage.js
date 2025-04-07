"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.containerName = exports.containerClient = exports.blobServiceClient = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw Error('Azure Storage Connection string not found');
}
console.log('Azure Blob storage v12 -DrillOps Training Videos');
const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
exports.blobServiceClient = blobServiceClient;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
exports.containerName = containerName;
if (!containerName) {
    throw new Error('Azure Storage Container Dependencies Name not found');
}
const containerClient = blobServiceClient.getContainerClient(containerName);
exports.containerClient = containerClient;
//# sourceMappingURL=azureStorage.js.map