import { EventsGateway } from "../controllers/sockets/sockets.controller";
import { Module } from "@nestjs/common";

@Module({
  providers: [EventsGateway]
})
export class SocketModule {}
