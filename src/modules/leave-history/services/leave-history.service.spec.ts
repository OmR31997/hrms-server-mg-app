import { Test, TestingModule } from '@nestjs/testing';
import { LeaveHistoryService } from './leave-history.service';

describe('LeaveHistoryService', () => {
  let service: LeaveHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveHistoryService],
    }).compile();

    service = module.get<LeaveHistoryService>(LeaveHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
