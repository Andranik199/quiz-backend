import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    Req,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionRequest, QuestionsResponse, UpdateQuestionQueryParams } from "../../dtos/question";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";

@Controller('questions')
export class QuestionsController {
    constructor(
      private readonly questionsService: QuestionsService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
    ) {}

    @Get('/')
    async getQuestions(@Req() req: any): Promise<Array<QuestionsResponse>> {
        try {
            return await this.questionsService.getAllQuestions();
        } catch (err) {
            throw err
        }
    }

    @HttpCode(201)
    @Post('/')
    async createQuestion(@Req() req: any, @Body() question: QuestionRequest): Promise<any> {
        try {
            const token = req.headers?.authorization.split(' ')?.[1]
            const parsed = this.jwtService.decode(token) as {[key: string]: any}
            const userId = parsed.uid as string
            if(!userId) {
                throw UnauthorizedException
            }
            return await this.questionsService.createQuestion(question, userId)
        } catch(err) {
            throw err
        }
    }

    @Put('/')
    async update (@Req() req: any, @Body() updateQuestionParams: UpdateQuestionQueryParams) {
        try {
            const token = req.headers?.authorization?.split(' ')?.[1]
            if(!token) {
                return;
            }
            const parsed = this.jwtService.decode(token) as {[key: string]: any}
            const userId = parsed.uid as string
            return await this.questionsService.update(updateQuestionParams, userId)
        } catch(err) {
            throw err;
        }
    }
    @HttpCode(204)
    @Delete(':questionId')
    async deleteQuestion(@Param('questionId') questionId: string) {
        try {
            await this.questionsService.removeQuestion(questionId)
        } catch(err) {

        }
    }

}
