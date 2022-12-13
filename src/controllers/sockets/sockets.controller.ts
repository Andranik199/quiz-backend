import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { QuestionsResponse } from "../../dtos/question";


type AnswerEvent = {
  question: QuestionsResponse
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('answered')
  findAll(@MessageBody() data: AnswerEvent): AnswerEvent {
    return data
  }

  async handleConnection() {
    console.log('Connected')
  }
}
