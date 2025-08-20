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
exports.Office = void 0;
const asset_entity_1 = require("../../assets/entities/asset.entity");
const typeorm_1 = require("typeorm");
let Office = class Office {
    id;
    name;
    assets;
};
exports.Office = Office;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Office.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Office.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asset_entity_1.Asset, (asset) => asset.office),
    __metadata("design:type", Array)
], Office.prototype, "assets", void 0);
exports.Office = Office = __decorate([
    (0, typeorm_1.Entity)('offices')
], Office);
//# sourceMappingURL=office.entity.js.map