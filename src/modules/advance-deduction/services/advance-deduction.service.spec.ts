import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceDeductionService } from './advance-deduction.service';

describe('AdvanceDeductionService', () => {
  let service: AdvanceDeductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvanceDeductionService],
    }).compile();

    service = module.get<AdvanceDeductionService>(AdvanceDeductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
