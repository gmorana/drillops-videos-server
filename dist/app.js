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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const dotenv_1 = __importDefault(require("dotenv"));
const routesAPI_1 = __importDefault(require("./routes/routesAPI")); // Import your API routes
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware (example)
const loggerMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Or you could potentially return a Promise here in more complex scenarios
});
app.use(loggerMiddleware);
app.use(express_1.default.static('public')); // Serve static files from the 'public' directory
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // For parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/api', routesAPI_1.default); // Use the API routes
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map