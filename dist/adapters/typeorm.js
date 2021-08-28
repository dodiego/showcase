"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.init = void 0;
const typeorm_1 = require("typeorm");
let connection;
async function init() {
    connection = await (0, typeorm_1.createConnection)();
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