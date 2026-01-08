import { Test, TestingModule } from '@nestjs/testing';
import { LeaveHistoryController } from './leave-history.controller';

describe('LeaveHistoryController', () => {
  let controller: LeaveHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveHistoryController],
    }).compile();

    controller = module.get<LeaveHistoryController>(LeaveHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
