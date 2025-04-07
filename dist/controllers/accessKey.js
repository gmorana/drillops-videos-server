"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSASKey = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function isTokenExpired(token) {
    if (!token)
        return;
    if (typeof token === 'undefined')
        return;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64)
        .split('')
        .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
        .join(''));
    const { exp } = JSON.parse(jsonPayload);
    const expired = Date.now() >= exp * 1000;
    return expired;
}
const getSASKey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secs_exp = Number(process.env.SECS_EXP_KEY) || 600;
    const { token, containerName } = req.body;
    const resIsExpired = isTokenExpired(token);
    if (!token || !containerName) {
        res.status(400).json({ message: 'Token and container name are required' });
        return;
    }
    if (resIsExpired) {
        res.status(401).json({ message: 'Token expired' });
    }
    try {
        const constants = {
            accountName: process.env.AZURE_ACCOUNT_NAME,
            accountKey: process.env.AZURE_ACCOUNT_KEY,
        };
        if (!constants.accountName || !constants.accountKey) {
            throw new Error('Azure account name or key is not defined in environment variables');
        }
        const sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(constants.accountName, constants.accountKey);
        const sasOptions = {
            containerName,
            permissions: storage_blob_1.ContainerSASPermissions.parse('r'), // Read only
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + secs_exp * 1000),
        };
        const sasToken = (0, storage_blob_1.generateBlobSASQueryParameters)(sasOptions, sharedKeyCredential).toString();
        res.status(200).json({ success: true, data: sasToken });
    }
    catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});
exports.getSASKey = getSASKey;
//# sourceMappingURL=accessKey.js.map