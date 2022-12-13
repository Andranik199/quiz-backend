import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Question } from '../database/models/Question.model';
import { QuestionsController } from "../controllers/question/questions.controller";
import { QuestionsService } from "../controllers/question/questions.service";
import { AnswerModule } from "./answer.module";
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";
@Module({
  imports:[SequelizeModule.forFeature([Question]), AnswerModule, JwtModule],
  providers: [QuestionsService, ConfigService],
  controllers: [QuestionsController]
})
export class QuestionModule {}
