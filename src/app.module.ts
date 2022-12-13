import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from "../config/configuration";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { QuestionModule } from "./modules/question.module";
import { AnswerModule } from "./modules/answer.module";
import { AuthModule } from "./modules/auth.module";
import { SocketModule } from "./modules/socket.module";
require('dotenv').config();

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        expandVariables: true,
        cache: true,
        load: [configuration],
        validationOptions: {
            allowUnknown: true,
            abortEarly: false,
        },
    }),SequelizeModule.forRootAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            dialect: 'postgres',
            host: configService.get('database.host'),
            port: 5432,
            username: configService.get('database.username'),
            password: configService.get('database.password'),
            database: configService.get('database.database'),
            autoLoadModels: true,
            synchronize: true,
        }),
    }), QuestionModule, AnswerModule, AuthModule, SocketModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
