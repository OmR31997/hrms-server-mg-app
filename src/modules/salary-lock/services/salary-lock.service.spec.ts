import { Test, TestingModule } from '@nestjs/testing';
import { SalaryLockService } from './salary-lock.service';

describe('SalaryLockService', () => {
  let service: SalaryLockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryLockService],
    }).compile();

    service = module.get<SalaryLockService>(SalaryLockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
