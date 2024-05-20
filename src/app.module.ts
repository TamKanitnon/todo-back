import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

// const ormOptions: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   username: 'root',
//   password: '12345678',
//   database: 'nestjs',
//   autoLoadEntities: true,
//   synchronize: true
// };

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '147.50.231.83',
  port: 3306,
  username: 'tamkanitnon',
  password: 'P@ssword1234',
  database: 'nestjs',
  autoLoadEntities: true,
  synchronize: true
};

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    AuthModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
