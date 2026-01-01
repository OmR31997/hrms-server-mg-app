import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { DocumentController } from './controllers/document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from './doc.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }])],
  providers: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule { }
