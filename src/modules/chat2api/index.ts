import { Module } from "@nestjs/common";
import { TypeOrmExModule } from "src/common/decorators";
import config from "src/config";
import { ChatService } from "src/services";
import { ChatController } from "src/controllers";
@Module({
    imports: [],
    controllers: [ChatController],
    providers: [
        ChatService
    ],
    exports: [ChatService],
})
export class ChatModule { }
