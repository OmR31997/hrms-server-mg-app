import { Test, TestingModule } from '@nestjs/testing';
import { SalaryLotService } from './salary-lot.service';

describe('SalaryLotService', () => {
  let service: SalaryLotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryLotService],
    }).compile();

    service = module.get<SalaryLotService>(SalaryLotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
