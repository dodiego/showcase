"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const require_env_1 = __importDefault(require("require-env"));
dotenv_1.default.config();
exports.default = {
    databaseConnectionString: require_env_1.default.require("DB_CONNECTION_STRING"),
};
//# sourceMappingURL=config.js.map