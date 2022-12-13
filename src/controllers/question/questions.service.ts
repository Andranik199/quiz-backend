import { BadRequestException, HttpCode, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Question } from "../../database/models/Question.model";
import { questionDto, QuestionRequest, QuestionsResponse, UpdateQuestionQueryParams } from "../../dtos/question";
import { AnswerService } from "../answer/answer.service";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionsModel: typeof Question,
    @Inject(AnswerService) private answerService: AnswerService
  ) {
  }

  async getAllQuestions(): Promise<any> {
    try {
      const questions = (await this.questionsModel.findAll()).map(item => item.dataValues);
      const answers = await this.answerService.getAllAnswers();
      return questions.map(question => ({
        ...question,
        answeredUsers: JSON.parse(question.answeredUsers),
        answers: answers.filter(item => item.questionId === question.id)
      }));

    } catch (err) {
      new err;
    }
  }

  async createQuestion(body: QuestionRequest, userId: string): Promise<QuestionsResponse> {
    try {
      if (!body.question.title) {
        throw new BadRequestException({ message: "Please provide question title" });
      }

      if (body.answers.length < 4) {
        throw new BadRequestException({ message: `Please provide 4 answers for question, you provide ${body.answers.length}` });
      }

      if (body.answers.every(item => !item.isCorrectAnswer) || body.answers.filter(item => item.isCorrectAnswer).length > 1) {
        throw new BadRequestException({ message: "Please provide only one correct answer" });
      }
      const question = await this.questionsModel.create({ ...body.question, userId });
      const answers = await this.answerService.createAnswers(body.answers.map(item => ({
        ...item,
        questionId: question.dataValues.id
      })));
      return { ...question.dataValues, answeredUsers: [], answers };
    } catch (err) {
      throw err;
    }
  }


  async update(updateQuestionQueryParams: UpdateQuestionQueryParams, userId: string): Promise<any> {
    try {
      const question = await this.questionsModel.findOne({
        where: {
          id: updateQuestionQueryParams.questionId
        }
      });
      const currentAnswers = question.dataValues.answeredUsers ? JSON.parse(question.dataValues.answeredUsers) : [];
      const answers = await this.answerService.getAllAnswers();
      await this.questionsModel.update({
        ...question,
        answeredUsers: currentAnswers.some(item => item.userId === userId)
          ? JSON.stringify(currentAnswers.map(item => item.userId === userId ? {
            ...item,
            answerId: updateQuestionQueryParams.answerId
          } : item))
          : JSON.stringify(currentAnswers.concat({ userId, answerId: updateQuestionQueryParams.answerId }))
      }, {
        where: {
          id: updateQuestionQueryParams.questionId
        }
      });

      const updatedQuestion = await this.questionsModel.findOne({
        where: {
          id: updateQuestionQueryParams.questionId
        }
      });
      return {
        ...updatedQuestion.dataValues,
        answeredUsers: JSON.parse(updatedQuestion.dataValues.answeredUsers),
        answers: answers.filter(item => item.questionId === updatedQuestion.dataValues.id)
      };
      if (!question) {
        throw new NotFoundException();
      }
    } catch (err) {
      throw err;
    }
  }

  @HttpCode(204)
  async removeQuestion(questionId: string) {
    try {
      const response = this.questionsModel.destroy({
        where: {
          id: questionId
        }
      });
      await this.answerService.removeAnswersByQuestionId(questionId);
    } catch (err) {
      throw err;
    }

  }
}
