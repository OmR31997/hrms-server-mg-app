import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountHistoryController } from './bank-account-history.controller';

describe('BankAccountHistoryController', () => {
  let controller: BankAccountHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountHistoryController],
    }).compile();

    controller = module.get<BankAccountHistoryController>(BankAccountHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
