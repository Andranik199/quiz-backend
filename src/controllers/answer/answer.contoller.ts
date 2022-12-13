import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AnswerService } from "./answer.service";

@Controller('questions')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('/')
  async getQuestions(): Promise<Array<any>> {
    try {
      return await this.answerService.getAllAnswers();
    } catch (err) {

    }
  }

  @HttpCode(201)
  @Post('/')
  async createQuestion(@Body() answer: any) {
    try {
      const response = await this.answerService.createAnswer(answer)
    } catch(err) {

    }
  }
}
