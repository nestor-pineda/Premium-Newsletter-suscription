"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_controller_1 = require("./interface/rest/users.controller");
const create_user_handler_1 = require("./application/handlers/create-user.handler");
const user_repository_1 = require("./infrastructure/user.repository");
const user_entity_1 = require("./domain/entities/user.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
        ],
        controllers: [users_controller_1.UsersController],
        providers: [user_repository_1.UserRepository, create_user_handler_1.CreateUserHandler],
        exports: [user_repository_1.UserRepository, create_user_handler_1.CreateUserHandler],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map