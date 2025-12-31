import { Test, TestingModule } from '@nestjs/testing';
import { DocLogService } from './doc-log.service';

describe('DocLogService', () => {
  let service: DocLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocLogService],
    }).compile();

    service = module.get<DocLogService>(DocLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
