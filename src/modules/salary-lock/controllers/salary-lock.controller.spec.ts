import { Test, TestingModule } from '@nestjs/testing';
import { SalaryLockController } from './salary-lock.controller';

describe('SalaryLockController', () => {
  let controller: SalaryLockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryLockController],
    }).compile();

    controller = module.get<SalaryLockController>(SalaryLockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
