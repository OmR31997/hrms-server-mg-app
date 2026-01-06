import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { DocumentController } from './controllers/document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from './doc.schema';
import { UploadModule } from '@common/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from '@common/upload/upload.service';
import { DocLogModule } from '@module/doc-log/doc-log.module';

@Module({
  imports: [
    DocLogModule,
    UploadModule,
    MulterModule.registerAsync({
      imports: [UploadModule],
      inject: [UploadService],
      useFactory: (uploadService: UploadService) => uploadService.multerOptions("DOC-")
    }),
    MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }]), 
  ],
  providers: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule { }
