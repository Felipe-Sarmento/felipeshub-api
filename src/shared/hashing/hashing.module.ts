import { Module } from '@nestjs/common';
import { HashingService } from './bycript.service';


@Module({
  imports: [
  ],
  providers: [
    HashingService,
  ],
  exports: [
    HashingService
  ]
})
export class HashingModule {}
