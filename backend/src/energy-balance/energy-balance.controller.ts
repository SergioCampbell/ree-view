import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ReeClientService } from './services/ree-client.service';

@Controller('ree-client')
export class DebugController {
  constructor(private readonly reeClient: ReeClientService) {}
  @Post()
  async getData(@Body() body: { start?: Date; end?: Date }) {
    const { start, end } = body;
    if (!start || !end) {
      throw new BadRequestException(
        'Parameters "start" and "end" are required.',
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new BadRequestException(
        'Parameters "start" and "end" must be valid dates in ISO 8601 format.',
      );
    }

    if (startDate > endDate) {
      throw new BadRequestException('"Start" date must be before "end" date.');
    }

    return this.reeClient.fetchData({ start: startDate, end: endDate });
  }

  @Get('test-ree')
  async testREE() {
    const start = new Date('2025-04-20');
    const end = new Date('2025-04-20');
    return this.reeClient.fetchData({ start, end });
  }
}
