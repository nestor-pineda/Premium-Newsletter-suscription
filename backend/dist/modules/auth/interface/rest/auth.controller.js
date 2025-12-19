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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../../application/services/auth.service");
const login_dto_1 = require("./login.dto");
const create_user_dto_1 = require("../../../users/interface/rest/create-user.dto");
const create_user_command_1 = require("../../../users/application/commands/create-user.command");
const create_user_handler_1 = require("../../../users/application/handlers/create-user.handler");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    authService;
    createUserHandler;
    constructor(authService, createUserHandler) {
        this.authService = authService;
        this.createUserHandler = createUserHandler;
    }
    async login(loginDto) {
        try {
            const fs = require('fs');
            const logPath = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
            fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.controller.ts:24', message: 'login endpoint called', data: { email: loginDto.email, hasPassword: !!loginDto.password, passwordLength: loginDto.password?.length }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'E' }) + '\n');
        }
        catch (e) {
            console.log('LOG ERROR:', e.message);
        }
        try {
            const user = await this.authService.validateUser(loginDto.email, loginDto.password);
            try {
                const fs2 = require('fs');
                const logPath2 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs2.appendFileSync(logPath2, JSON.stringify({ location: 'auth.controller.ts:30', message: 'validateUser result', data: { userFound: !!user, userId: user?.id, userEmail: user?.email }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'C' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            try {
                const fs3 = require('fs');
                const logPath3 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs3.appendFileSync(logPath3, JSON.stringify({ location: 'auth.controller.ts:33', message: 'calling authService.login', data: { userId: user.id, userEmail: user.email, userName: user.name }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'D' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            return this.authService.login(user);
        }
        catch (error) {
            try {
                const fs4 = require('fs');
                const logPath4 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs4.appendFileSync(logPath4, JSON.stringify({ location: 'auth.controller.ts:catch', message: 'login error caught', data: { errorMessage: error.message, errorName: error.name, errorStack: error.stack }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'ALL' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            throw error;
        }
    }
    async register(createUserDto) {
        const command = new create_user_command_1.CreateUserCommand(createUserDto.email, createUserDto.password, createUserDto.name);
        const user = await this.createUserHandler.execute(command);
        return this.authService.register(user);
    }
    getProfile(req) {
        return req.user;
    }
    async logout() {
        return { message: 'Logged out' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        create_user_handler_1.CreateUserHandler])
], AuthController);
//# sourceMappingURL=auth.controller.js.map