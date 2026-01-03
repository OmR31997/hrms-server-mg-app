import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceDeductionController } from './advance-deduction.controller';

describe('AdvanceDeductionController', () => {
  let controller: AdvanceDeductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvanceDeductionController],
    }).compile();

    controller = module.get<AdvanceDeductionController>(AdvanceDeductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
