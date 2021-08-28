"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
class PinoWrapper {
    constructor() {
        this.logger = (0, pino_1.default)();
    }
    info(message, metadata = { when: new Date() }) {
        this.logger.info(metadata, message);
    }
    error(err) {
        this.logger.error(err, err.message);
    }
}
const logger = new PinoWrapper();
exports.default = logger;
//# sourceMappingURL=logger.js.map