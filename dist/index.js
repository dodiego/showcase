"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm = __importStar(require("./adapters/typeorm"));
const logger_1 = __importDefault(require("./adapters/logger"));
async function run() {
    logger_1.default.info("connecting to database");
    await typeorm.init();
    logger_1.default.info("database connected");
}
process.on("unhandledRejection", (reason) => {
    logger_1.default.error(reason);
    process.exit(2);
});
run()
    .then(async () => {
    await typeorm.disconnect();
    logger_1.default.info("graceful exit");
    process.exit(0);
})
    .catch(async (e) => {
    logger_1.default.error(e);
    await typeorm.disconnect();
    process.exit(1);
});
//# sourceMappingURL=index.js.map