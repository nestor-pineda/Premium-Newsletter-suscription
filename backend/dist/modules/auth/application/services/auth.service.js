"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const user_repository_1 = require("../../../users/infrastructure/user.repository");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        try {
            const fs = require('fs');
            const logPath = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
            fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.service.ts:14', message: 'validateUser entry', data: { email, hasPassword: !!pass, passwordLength: pass?.length }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'C' }) + '\n');
        }
        catch (e) {
            console.log('LOG ERROR:', e.message);
        }
        try {
            const user = await this.userRepository.findByEmail(email);
            try {
                const fs2 = require('fs');
                const logPath2 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs2.appendFileSync(logPath2, JSON.stringify({ location: 'auth.service.ts:15', message: 'user found from repository', data: { userFound: !!user, userId: user?.id, hasPasswordHash: !!user?.passwordHash }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'C' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            console.log('Login attempt for:', email);
            console.log('User found:', !!user);
            if (user) {
                console.log('Has password hash:', !!user.passwordHash);
                console.log('Hash length:', user.passwordHash?.length);
            }
            if (user && user.passwordHash && (await bcrypt.compare(pass, user.passwordHash))) {
                try {
                    const fs3 = require('fs');
                    const logPath3 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                    fs3.appendFileSync(logPath3, JSON.stringify({ location: 'auth.service.ts:23', message: 'password match successful', data: { userId: user.id }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'C' }) + '\n');
                }
                catch (e) {
                    console.log('LOG ERROR:', e.message);
                }
                const { passwordHash, ...result } = user;
                return result;
            }
            try {
                const fs4 = require('fs');
                const logPath4 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs4.appendFileSync(logPath4, JSON.stringify({ location: 'auth.service.ts:27', message: 'validateUser returning null', data: { reason: !user ? 'user not found' : !user.passwordHash ? 'no password hash' : 'password mismatch' }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'C' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            return null;
        }
        catch (error) {
            try {
                const fs5 = require('fs');
                const logPath5 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs5.appendFileSync(logPath5, JSON.stringify({ location: 'auth.service.ts:validateUser:catch', message: 'validateUser error', data: { errorMessage: error.message, errorName: error.name }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'C' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            throw error;
        }
    }
    async login(user) {
        try {
            const fs = require('fs');
            const logPath = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
            fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.service.ts:30', message: 'login method entry', data: { userId: user?.id, userEmail: user?.email, userName: user?.name, hasAllFields: !!(user?.id && user?.email && user?.name) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'D' }) + '\n');
        }
        catch (e) {
            console.log('LOG ERROR:', e.message);
        }
        try {
            const payload = { email: user.email, sub: user.id, name: user.name };
            try {
                const fs2 = require('fs');
                const logPath2 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs2.appendFileSync(logPath2, JSON.stringify({ location: 'auth.service.ts:31', message: 'payload created, signing JWT', data: { payload }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'D' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            const token = this.jwtService.sign(payload);
            try {
                const fs3 = require('fs');
                const logPath3 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs3.appendFileSync(logPath3, JSON.stringify({ location: 'auth.service.ts:32', message: 'JWT signed successfully', data: { tokenLength: token?.length }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'D' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            return {
                access_token: token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
            };
        }
        catch (error) {
            try {
                const fs4 = require('fs');
                const logPath4 = '/Users/nestor/Documents/Master IA/Premium-Newsletter-suscription/.cursor/debug.log';
                fs4.appendFileSync(logPath4, JSON.stringify({ location: 'auth.service.ts:login:catch', message: 'login error', data: { errorMessage: error.message, errorName: error.name, errorStack: error.stack }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run2', hypothesisId: 'D' }) + '\n');
            }
            catch (e) {
                console.log('LOG ERROR:', e.message);
            }
            throw error;
        }
    }
    async register(user) {
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map