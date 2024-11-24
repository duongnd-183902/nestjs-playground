import { Controller, Get } from '@nestjs/common';
import { ChatService } from '../../services';

@Controller()
export class ChatController {
    constructor(private readonly appService: ChatService) { }

    @Get("/chat")
    getHello(): string {
        return this.appService.getHello();
    }
}
