"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEventBus = void 0;
const common_1 = require("@nestjs/common");
let InMemoryEventBus = class InMemoryEventBus {
    handlers = [];
    register(handler) {
        this.handlers.push(handler);
    }
    async publish(event) {
        const handlers = this.handlers.filter((h) => h.supports(event));
        await Promise.all(handlers.map((h) => Promise.resolve(h.handle(event))));
    }
    async publishAll(events) {
        for (const e of events)
            await this.publish(e);
    }
};
exports.InMemoryEventBus = InMemoryEventBus;
exports.InMemoryEventBus = InMemoryEventBus = __decorate([
    (0, common_1.Injectable)()
], InMemoryEventBus);
//# sourceMappingURL=in-memory-event-bus.js.map