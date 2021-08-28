"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
let NoteController = class NoteController {
    async add(title, text) {
        return "";
    }
    async put(id, newText) {
        return true;
    }
    async delete(id) {
        return true;
    }
    async find(filter) {
        return [];
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "add", null);
__decorate([
    (0, type_graphql_1.Mutation)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "put", null);
__decorate([
    (0, type_graphql_1.Mutation)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "delete", null);
__decorate([
    (0, type_graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NoteController.prototype, "find", null);
NoteController = __decorate([
    (0, type_graphql_1.Resolver)()
], NoteController);
exports.default = NoteController;
//# sourceMappingURL=note.controller.js.map