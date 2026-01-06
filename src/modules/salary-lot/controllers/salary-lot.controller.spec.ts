import { Test, TestingModule } from '@nestjs/testing';
import { SalaryLotController } from './salary-lot.controller';

describe('SalaryLotController', () => {
  let controller: SalaryLotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryLotController],
    }).compile();

    controller = module.get<SalaryLotController>(SalaryLotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
