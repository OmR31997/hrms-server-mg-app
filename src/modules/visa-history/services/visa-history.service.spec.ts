import { Test, TestingModule } from '@nestjs/testing';
import { VisaHistoryService } from './visa-history.service';

describe('VisaHistoryService', () => {
  let service: VisaHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaHistoryService],
    }).compile();

    service = module.get<VisaHistoryService>(VisaHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
