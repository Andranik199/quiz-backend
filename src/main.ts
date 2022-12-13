import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { utilities, WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import configuration from "config/configuration";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
require('dotenv').config()
const { combine, ms } = format;
const { Console } = transports;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new Console({
          format: combine(
            ms(),
            utilities.format.nestLike(configuration().api.name, {
              prettyPrint: true
            })
          )
        })
      ]
    })
  });
  app.enableCors({
    origin: configuration().api.frontEndUrl,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  });
  const configService = app.get(ConfigService)
  app.setGlobalPrefix(configService.get('api.prefix'));
  await app.listen(configService.get('api.port'));
}

bootstrap();
