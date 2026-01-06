import { Test, TestingModule } from '@nestjs/testing';
import { AdvanceHistoryController } from './advance-history.controller';

describe('AdvanceHistoryController', () => {
  let controller: AdvanceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvanceHistoryController],
    }).compile();

    controller = module.get<AdvanceHistoryController>(AdvanceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
