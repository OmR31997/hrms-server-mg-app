import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceHistoryService } from './advance-history.service';

describe('AdvanceHistoryService', () => {
  let service: AdvanceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvanceHistoryService],
    }).compile();

    service = module.get<AdvanceHistoryService>(AdvanceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
