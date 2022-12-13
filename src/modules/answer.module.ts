import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Answer } from '../database/models/Answer.model';
import { AnswerService } from "../controllers/answer/answer.service";
import { AnswerController } from "../controllers/answer/answer.contoller";

@Module({
  imports:[SequelizeModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService]
})
export class AnswerModule {}
