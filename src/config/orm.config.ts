import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'nestjs',
    autoLoadEntities: true,
    synchronize: true
}));