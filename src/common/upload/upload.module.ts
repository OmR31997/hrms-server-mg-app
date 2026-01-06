import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryModule } from '@common/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [UploadService],
  exports: [UploadService]
})
export class UploadModule {}
