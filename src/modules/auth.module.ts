import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "../controllers/auth/auth.controller";

@Module({
  providers:[ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
