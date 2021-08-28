"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.init = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../domain/config"));
let connection;
async function init() {
    connection = await (0, typeorm_1.createConnection)({
        url: config_1.default.databaseConnectionString,
        type: "postgres",
    });
    return connection;
}
exports.init = init;
async function disconnect() {
    if (!connection) {
        throw new Error("TypeORM not initialized");
    }
    return connection === null || connection === void 0 ? void 0 : connection.close();
}
exports.disconnect = disconnect;
//# sourceMappingURL=typeorm.js.map