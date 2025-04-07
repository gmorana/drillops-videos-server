"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../controllers/index");
const accessKey_1 = require("../controllers/accessKey");
const router = express_1.default.Router();
router.get('/container', index_1.getContainerList);
router.post('/accessKey', accessKey_1.getSASKey);
exports.default = router;
//# sourceMappingURL=routesAPI.js.map