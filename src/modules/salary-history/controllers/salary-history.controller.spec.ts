import { Test, TestingModule } from '@nestjs/testing';
import { SalaryHistoryController } from './salary-history.controller';

describe('SalaryHistoryController', () => {
  let controller: SalaryHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryHistoryController],
    }).compile();

    controller = module.get<SalaryHistoryController>(SalaryHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
