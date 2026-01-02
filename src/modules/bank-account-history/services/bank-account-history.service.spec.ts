import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountHistoryService } from './bank-account-history.service';

describe('BankAccountHistoryService', () => {
  let service: BankAccountHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankAccountHistoryService],
    }).compile();

    service = module.get<BankAccountHistoryService>(BankAccountHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
