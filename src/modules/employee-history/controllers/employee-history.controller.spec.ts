import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeHistoryController } from './employee-history.controller';

describe('EmployeeHistoryController', () => {
  let controller: EmployeeHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeHistoryController],
    }).compile();

    controller = module.get<EmployeeHistoryController>(EmployeeHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
