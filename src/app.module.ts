import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AppImports } from './app.imports';

@Module({
  imports: [...AppImports, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
