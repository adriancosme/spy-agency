import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APIModule } from './API/API.module';
import { DatabaseModule } from './Database/Database.module';

@Module({
  imports: [APIModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
