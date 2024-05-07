import { Controller, Get } from '@nestjs/common';
import { SerialHandlerService } from './serial-handler.service';

@Controller('serial')
export class SerialController {
  constructor(
    private readonly serialHandlerService: typeof SerialHandlerService,
  ) {}

  @Get('connect')
  connectToSerial() {
    this.serialHandlerService;
    return 'Connecting to USB service device on COM3...';
  }
}
