import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @Get('health')
  health(): void {
    return;
  }
}
