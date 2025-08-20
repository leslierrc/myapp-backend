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
exports.Asset = void 0;
const office_entity_1 = require("../../offices/entities/office.entity");
const typeorm_1 = require("typeorm");
let Asset = class Asset {
    id;
    name;
    serial;
    inventory;
    status;
    createdAt;
    officeId;
    office;
};
exports.Asset = Asset;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Asset.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Asset.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Asset.prototype, "serial", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Asset.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Asset.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Asset.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'officeld' }),
    __metadata("design:type", String)
], Asset.prototype, "officeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => office_entity_1.Office, office => office.assets),
    (0, typeorm_1.JoinColumn)({ name: 'officeld' }),
    __metadata("design:type", office_entity_1.Office)
], Asset.prototype, "office", void 0);
exports.Asset = Asset = __decorate([
    (0, typeorm_1.Entity)()
], Asset);
//# sourceMappingURL=asset.entity.js.map