import { Test, TestingModule } from '@nestjs/testing';
import { SalaryAdvanceController } from './salary-advance.controller';

describe('SalaryAdvanceController', () => {
  let controller: SalaryAdvanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryAdvanceController],
    }).compile();

    controller = module.get<SalaryAdvanceController>(SalaryAdvanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
