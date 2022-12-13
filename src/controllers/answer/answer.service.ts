import { HttpCode, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Answer } from "../../database/models/Answer.model";
import { answerDto } from "../../dtos/answer";

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer)
    private answerModel: typeof Answer
  ) {
  }

  async getAllAnswers(): Promise<Array<any>> {
    try {
      const answers = await this.answerModel.findAll();
      return answers.map(item => item.dataValues);
    } catch (err) {

    }
  }

  async createAnswers(answers: Array<answerDto>): Promise<Array<answerDto>> {
    try {
      return await this.answerModel.bulkCreate(answers);
    } catch (err) {
      throw err;
    }
  }

  async createAnswer(answer: any): Promise<any> {
    try {
      return await this.answerModel.create(answer);
    } catch (err) {

    }
  }

  @HttpCode(204)
  async removeAnswersByQuestionId(questionId: string): Promise<any> {
    try {
      await this.answerModel.destroy({
        where: {
          questionId
        }
      });
    } catch (err) {
      throw err;
    }
  }
}
