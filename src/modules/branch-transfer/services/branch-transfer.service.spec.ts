import { Test, TestingModule } from '@nestjs/testing';
import { BranchTransferService } from './branch-transfer.service';

describe('BranchTransferService', () => {
  let service: BranchTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BranchTransferService],
    }).compile();

    service = module.get<BranchTransferService>(BranchTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
