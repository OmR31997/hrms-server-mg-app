import { Test, TestingModule } from '@nestjs/testing';
import { DocLogController } from './doc-log.controller';

describe('DocLogController', () => {
  let controller: DocLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocLogController],
    }).compile();

    controller = module.get<DocLogController>(DocLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
