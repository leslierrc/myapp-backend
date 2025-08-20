"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    url: process.env.MYSQL_PUBLIC_URL,
    synchronize: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    logging: false,
});
//# sourceMappingURL=typeorm.config.js.map