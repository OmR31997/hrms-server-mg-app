import { Test, TestingModule } from '@nestjs/testing';
import { BranchTransferController } from './branch-transfer.controller';

describe('BranchTransferController', () => {
  let controller: BranchTransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BranchTransferController],
    }).compile();

    controller = module.get<BranchTransferController>(BranchTransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
