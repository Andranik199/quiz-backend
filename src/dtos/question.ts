import { answerDto } from "./answer";

export type questionDto = {
  id: string;
  title: string;
}


export type QuestionRequest = {
  question: questionDto,
  answers: Array<answerDto>
}


type userAnswer = {
  userId: string;
  answerId: string;
}
export type QuestionsResponse = questionDto & {
  answers: Array<answerDto>;
  answeredUsers: Array<userAnswer>
}


export type UpdateQuestionQueryParams = {
  questionId: string;
  answerId: string
}
